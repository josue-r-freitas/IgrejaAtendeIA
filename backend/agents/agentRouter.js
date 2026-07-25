import { generateAgentResponse } from '../services/llmService.js';
import { getFormattedHistory, addMessage } from '../services/memoryService.js';

// Simulated database of agent configurations (in-sync with frontend specs)
const agentConfigs = {
  recepcionista: {
    id: 'recepcionista',
    name: 'Recepcionista IA',
    model: 'Google Gemini 1.5 Pro',
    tone: 'Acolhedor e Atencioso',
    description: 'Atende novos usuários, envia horários de cultos, localização, estacionamento e informações gerais da igreja.',
    channels: { whatsapp: true, instagram: true }
  },
  secretaria: {
    id: 'secretaria',
    name: 'Secretária IA',
    model: 'OpenAI GPT-4o',
    tone: 'Formal, Eficiente e Claro',
    description: 'Agenda horários de gabinete pastoral, reservas de salas, envia chaves PIX para ofertas e dízimos e gera certificados.',
    channels: { whatsapp: true, instagram: false }
  },
  integracao: {
    id: 'integracao',
    name: 'Integração & Consolidação IA',
    model: 'Google Gemini 1.5 Flash',
    tone: 'Caloroso e Encorajador',
    description: 'Envia mensagem aos visitantes na segunda-feira, indica PGs/Células próximos e atualiza o funil de consolidação.',
    channels: { whatsapp: true, instagram: true }
  },
  oracao: {
    id: 'oracao',
    name: 'Oração & Cuidado Pastoral IA',
    model: 'Google Gemini 1.5 Pro',
    tone: 'Empático, Respeitoso e Consolador',
    description: 'Recebe pedidos de oração, oferece palavra de apoio bíblico e aciona alerta pastoral em casos graves de desespero.',
    channels: { whatsapp: true, instagram: true }
  },
  eventos: {
    id: 'eventos',
    name: 'Eventos & Inscrições IA',
    model: 'OpenAI GPT-4o',
    tone: 'Entusiasmado e Claro',
    description: 'Informa programação de eventos, tira dúvidas sobre hospedagem/alimentação e emite ingressos em QR Code.',
    channels: { whatsapp: true, instagram: false }
  },
  midia: {
    id: 'midia',
    name: 'Mídia & Comunicação IA',
    model: 'OpenAI GPT-4o Mini',
    tone: 'Jovem e Prático',
    description: 'Notifica voluntários sobre suas escalas no domingo, confirma presença e envia boletim semanal.',
    channels: { whatsapp: true, instagram: false }
  }
};

// Simulated human takeover active list (temporary database)
export const pausedChats = new Set();

/**
 * Classify user intent and route to the correct agent
 * @param {string} text - User message text
 * @param {string} channel - 'whatsapp' or 'instagram'
 * @returns {Object} agentConfig
 */
export function classifyAgent(text, channel) {
  const textLower = text.toLowerCase();

  // Intent classification keyword heuristics
  // 1. Prayer/comfort
  if (textLower.includes('oração') || textLower.includes('orar') || textLower.includes('jesus') || textLower.includes('triste') || textLower.includes('doente')) {
    return agentConfigs.oracao;
  }
  // 2. Secretarial / Admin / Pix
  if (textLower.includes('agenda') || textLower.includes('marcar') || textLower.includes('gabinete') || textLower.includes('pix') || textLower.includes('oferta') || textLower.includes('dízimo') || textLower.includes('certificado')) {
    return agentConfigs.secretaria;
  }
  // 3. Events/Tickets
  if (textLower.includes('evento') || textLower.includes('ingresso') || textLower.includes('inscrição') || textLower.includes('retiro') || textLower.includes('acampamento')) {
    return agentConfigs.eventos;
  }
  // 4. Cell groups / PG / integration
  if (textLower.includes('célula') || textLower.includes('pg') || textLower.includes('grupo pequeno') || textLower.includes('visita') || textLower.includes('participar')) {
    return agentConfigs.integracao;
  }
  // 5. Mídia/Roster
  if (textLower.includes('escala') || textLower.includes('tocar') || textLower.includes('música') || textLower.includes('voluntário')) {
    return agentConfigs.midia;
  }

  // Fallback to Recepcionista IA
  return agentConfigs.recepcionista;
}

/**
 * Route message, query LLM and check for human transbordo triggers
 * @param {string} sessionId - user id (phone or username)
 * @param {string} messageText - user text
 * @param {string} channel - 'whatsapp' or 'instagram'
 * @returns {Promise<Object>} { responseText, activeAgent, transbordoTriggered }
 */
export async function routeMessage(sessionId, messageText, channel) {
  // If human takeover is active, do not answer automatically
  if (pausedChats.has(sessionId)) {
    console.log(`[Router] Session ${sessionId} is PAUSED (Human takeover active). Ignoring.`);
    return { responseText: null, activeAgent: null, transbordoTriggered: false };
  }

  // Determine which agent should handle this message
  let activeAgent = classifyAgent(messageText, channel);

  // If the selected agent is not active on this channel, fall back to Recepcionista
  if (!activeAgent.channels[channel]) {
    console.log(`[Router] Agent "${activeAgent.name}" is not active on "${channel}". Falling back to Recepcionista IA.`);
    activeAgent = agentConfigs.recepcionista;
  }

  // Fetch formatted history and store new incoming message
  const history = getFormattedHistory(sessionId);
  addMessage(sessionId, 'user', messageText);

  // Call the LLM
  let responseText = await generateAgentResponse(activeAgent, history, messageText);

  // Monitor for transbordo keywords/tags in response
  let transbordoTriggered = false;
  if (responseText.includes('TRANSBORDO_PASTORAL')) {
    console.log(`[Router] Transbordo pastoral triggered for session: ${sessionId}`);
    transbordoTriggered = true;
    pausedChats.add(sessionId);
    // Remove the technical tag from user-facing text
    responseText = responseText.replace('TRANSBORDO_PASTORAL', '').trim();
  }

  // Save the assistant response in history
  addMessage(sessionId, 'assistant', responseText);

  return {
    responseText,
    activeAgent: activeAgent.name,
    transbordoTriggered
  };
}

/**
 * Reset human takeover pause status for a chat session (unpause IA)
 * @param {string} sessionId 
 */
export function resumeAgent(sessionId) {
  pausedChats.delete(sessionId);
}

/**
 * Manually trigger human takeover (pause IA)
 * @param {string} sessionId 
 */
export function pauseAgent(sessionId) {
  pausedChats.add(sessionId);
}
