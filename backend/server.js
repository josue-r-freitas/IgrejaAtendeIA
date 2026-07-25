import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { routeMessage } from './agents/agentRouter.js';
import { sendWhatsAppMessage, sendInstagramMessage } from './services/messagingService.js';

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

// Start listening
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` Igreja Atende IA - Servidor Orquestrador de Agentes`);
  console.log(` Servidor escutando na porta: ${PORT}`);
  console.log(` - Webhook WhatsApp:  http://localhost:${PORT}/webhooks/whatsapp`);
  console.log(` - Webhook Instagram: http://localhost:${PORT}/webhooks/instagram`);
  console.log(`====================================================`);
});
