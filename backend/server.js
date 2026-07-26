import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { routeMessage, pausedChats, resumeAgent, pauseAgent } from './agents/agentRouter.js';
import { sendWhatsAppMessage, sendInstagramMessage } from './services/messagingService.js';
import { sessions } from './services/memoryService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Server health check route
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

/**
 * WEBHOOK: WHATSAPP (Evolution API style webhook)
 */
app.post('/webhooks/whatsapp', async (req, res) => {
  try {
    const payload = req.body;
    console.log('[Webhook WhatsApp] Payload received:', JSON.stringify(payload, null, 2));

    // Evolution API sends different event formats. We look for 'messages.upsert' or 'MESSAGES_UPSERT'
    const event = payload.event || payload.type;
    const data = payload.data;

    if (!data || data.key?.fromMe) {
      // Ignore self messages or empty payloads
      return res.status(200).send('Ignored: self or empty message');
    }

    const sessionId = data.key.remoteJid; // Unique contact JID

    // Ignore group messages (group JIDs end with @g.us)
    if (sessionId && sessionId.endsWith('@g.us')) {
      console.log(`[Webhook WhatsApp] Ignored group message from ${sessionId}`);
      return res.status(200).send('Ignored: Group message');
    }

    const textMessage = data.message?.conversation || 
                        data.message?.extendedTextMessage?.text || 
                        data.message?.imageMessage?.caption ||
                        '';

    if (!textMessage.trim()) {
      return res.status(200).send('Ignored: Empty text content');
    }

    const contactName = payload.data?.pushName || 'Membro WhatsApp';
    console.log(`[Webhook WhatsApp] Message from ${contactName} (${sessionId}): "${textMessage}"`);

    // Route message and generate response from LLM
    const { responseText, activeAgent, transbordoTriggered } = await routeMessage(
      sessionId,
      textMessage,
      'whatsapp'
    );

    // Send the response back if IA is not paused
    if (responseText) {
      await sendWhatsAppMessage(sessionId, responseText);
      console.log(`[Webhook WhatsApp] Replied using agent [${activeAgent}]: "${responseText}"`);
    }

    res.status(200).json({
      status: 'success',
      agent: activeAgent,
      replied: !!responseText,
      transbordo: transbordoTriggered
    });

  } catch (error) {
    console.error('[Webhook WhatsApp Error]:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

/**
 * WEBHOOK: INSTAGRAM DIRECT (Meta Graph API webhook)
 */
// 1. Webhook verification for Meta setup
app.get('/webhooks/instagram', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  const META_VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || 'verify_token_123';

  if (mode && token) {
    if (mode === 'subscribe' && token === META_VERIFY_TOKEN) {
      console.log('[Webhook Instagram] Webhook verified successfully.');
      return res.status(200).send(challenge);
    } else {
      console.log('[Webhook Instagram] Verification token mismatch.');
      return res.sendStatus(403);
    }
  }
  res.sendStatus(400);
});

// 2. Handle incoming Instagram Direct messages
app.post('/webhooks/instagram', async (req, res) => {
  try {
    const body = req.body;
    console.log('[Webhook Instagram] Message body:', JSON.stringify(body, null, 2));

    if (body.object === 'instagram') {
      for (const entry of body.entry) {
        // Entry messaging array holds the event details
        if (entry.messaging) {
          for (const messagingEvent of entry.messaging) {
            const senderId = messagingEvent.sender?.id;
            const message = messagingEvent.message;

            // Only respond to text messages not sent by our own page
            if (message && message.text && !message.is_echo) {
              const textMessage = message.text;
              console.log(`[Webhook Instagram] DM from ${senderId}: "${textMessage}"`);

              // Route message and generate response from LLM
              const { responseText, activeAgent, transbordoTriggered } = await routeMessage(
                senderId,
                textMessage,
                'instagram'
              );

              // Send the response back if IA is not paused
              if (responseText) {
                await sendInstagramMessage(senderId, responseText);
                console.log(`[Webhook Instagram] Replied using agent [${activeAgent}]: "${responseText}"`);
              }
            }
          }
        }
      }
      return res.status(200).send('EVENT_RECEIVED');
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.error('[Webhook Instagram Error]:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Retrieve list of active chats/sessions with history
app.get('/api/chats', (req, res) => {
  const result = [];
  for (const [sessionId, messages] of sessions.entries()) {
    const lastMsgObj = messages[messages.length - 1];
    result.push({
      id: sessionId,
      phone: sessionId,
      name: sessionId.split('@')[0], // fallback name
      channel: 'whatsapp',
      status: pausedChats.has(sessionId) ? 'human_active' : 'ia_active',
      agent: 'Recepcionista IA',
      unread: 0,
      lastMessage: lastMsgObj ? lastMsgObj.text : '',
      time: lastMsgObj ? new Date(lastMsgObj.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
      messages: messages.map(msg => ({
        sender: msg.role === 'user' ? 'user' : msg.role === 'assistant' ? 'ai' : 'system',
        text: msg.text,
        time: new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }))
    });
  }
  res.json(result);
});

// Retrieve list of paused chats
app.get('/api/chats/paused', (req, res) => {
  res.json({ paused: Array.from(pausedChats) });
});

// Resume AI for a session
app.post('/api/chats/resume', (req, res) => {
  const { sessionId } = req.body;
  if (!sessionId) {
    return res.status(400).json({ error: 'sessionId is required' });
  }
  resumeAgent(sessionId);
  console.log(`[Admin] Resumed AI for session: ${sessionId}`);
  res.json({ status: 'success', message: `AI resumed for ${sessionId}` });
});

// Pause AI for a session
app.post('/api/chats/pause', (req, res) => {
  const { sessionId } = req.body;
  if (!sessionId) {
    return res.status(400).json({ error: 'sessionId is required' });
  }
  pauseAgent(sessionId);
  console.log(`[Admin] Paused AI for session: ${sessionId}`);
  res.json({ status: 'success', message: `AI paused for ${sessionId}` });
});

// Send manual message from operator
app.post('/api/chats/send', async (req, res) => {
  const { sessionId, text } = req.body;
  if (!sessionId || !text) {
    return res.status(400).json({ error: 'sessionId and text are required' });
  }
  try {
    await sendWhatsAppMessage(sessionId, text);
    // Add to history
    const history = sessions.get(sessionId) || [];
    history.push({
      role: 'assistant',
      text: text,
      timestamp: new Date().toISOString()
    });
    sessions.set(sessionId, history);
    console.log(`[Admin] Operator sent message to ${sessionId}: "${text}"`);
    res.json({ status: 'success' });
  } catch (err) {
    console.error('[Admin Error] Failed to send operator message:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Start listening
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` Igreja Atende IA - Servidor Orquestrador de Agentes`);
  console.log(` Servidor escutando na porta: ${PORT}`);
  console.log(` - Webhook WhatsApp:  http://localhost:${PORT}/webhooks/whatsapp`);
  console.log(` - Webhook Instagram: http://localhost:${PORT}/webhooks/instagram`);
  console.log(`====================================================`);
});
