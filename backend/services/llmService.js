import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const { OPENAI_API_KEY, GEMINI_API_KEY } = process.env;

// Initialize OpenAI client
let openai = null;
if (OPENAI_API_KEY && OPENAI_API_KEY !== 'mock_key') {
  openai = new OpenAI({ apiKey: OPENAI_API_KEY });
}

// Initialize Gemini client
let gemini = null;
if (GEMINI_API_KEY && GEMINI_API_KEY !== 'mock_key') {
  gemini = new GoogleGenerativeAI(GEMINI_API_KEY);
}

/**
 * Generate agent response using selected LLM (OpenAI or Gemini)
 * @param {Object} agentConfig - { name, model, tone, description, prompt }
 * @param {Array} history - session formatted history
 * @param {string} userMessage - incoming message
 * @returns {Promise<string>} responseText
 */
export async function generateAgentResponse(agentConfig, history, userMessage) {
  const modelName = agentConfig.model.toLowerCase();
  
  // Assemble full system prompt
  const systemInstruction = `Você é o ${agentConfig.name} da nossa igreja local.
Sua função é: ${agentConfig.description}
Sempre responda de forma condizente com o tom de voz: ${agentConfig.tone}.
Ao identificar solicitações que necessitem de atendimento humano emergencial (ex: luto severo, crise aguda, assunto financeiro sigiloso), responda acolhendo e adicione a tag "TRANSBORDO_PASTORAL" na mensagem.`;

  console.log(`[LLM] Querying model: "${agentConfig.model}" for agent: "${agentConfig.name}"...`);

  // --- GOOGLE GEMINI ---
  if (modelName.includes('gemini')) {
    const isFlash = modelName.includes('flash');
    // Map to Gemini's official stable aliases which always point to the latest active version
    const selectedModel = isFlash ? 'gemini-flash-latest' : 'gemini-pro-latest';

    // Mock response if key is missing or mock
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'mock_key') {
      return getMockResponse(agentConfig, userMessage) + " [Simulação Gemini]";
    }

    try {
      const ai = gemini.getGenerativeModel({ 
        model: selectedModel,
        systemInstruction: systemInstruction
      });

      // Format history for Gemini chat structure
      const chat = ai.startChat({
        history: history.geminiHistory || []
      });

      const result = await chat.sendMessage(userMessage);
      const response = await result.response;
      return response.text();
    } catch (err) {
      console.warn(`[LLM Warning] Gemini failed, falling back to OpenAI: ${err.message}`);
      // If OpenAI key is missing or mock, throw the original error
      if (!OPENAI_API_KEY || OPENAI_API_KEY === 'mock_key') {
        throw err;
      }
    }
  } 
  
  // --- OPENAI GPT ---
  const isMini = modelName.includes('mini');
  const selectedModel = isMini ? 'gpt-4o-mini' : 'gpt-4o';

  // Mock response if key is missing or mock
  if (!OPENAI_API_KEY || OPENAI_API_KEY === 'mock_key') {
    return getMockResponse(agentConfig, userMessage) + " [Simulação GPT-4o]";
  }

  const messages = [
    { role: 'system', content: systemInstruction },
    ...(history.openaiHistory || []),
    { role: 'user', content: userMessage }
  ];

  const response = await openai.chat.completions.create({
    model: selectedModel,
    messages: messages,
    temperature: 0.7
  });

  return response.choices[0].message.content;
}

/**
 * Generate a generic mock answer when API Keys are not set or are mock keys
 */
function getMockResponse(agentConfig, msg) {
  const tone = agentConfig.tone.toLowerCase();
  let baseMsg = `A paz do Senhor! Sou o ${agentConfig.name} da igreja. Recebi sua mensagem: "${msg}". `;
  
  if (agentConfig.id === 'recepcionista') {
    baseMsg += `Nossos cultos são aos domingos às 10h e 19h. Nosso endereço é Av. Principal, 1000.`;
  } else if (agentConfig.id === 'secretaria') {
    baseMsg += `Para dízimos e ofertas, utilize o PIX CNPJ da igreja: 12.345.678/0001-99.`;
  } else if (agentConfig.id === 'oracao') {
    baseMsg += `Deus conforte seu coração. Estaremos intercedendo por você em nosso grupo semanal.`;
  } else if (agentConfig.id === 'integracao') {
    baseMsg += `Que bom ter você aqui! Me informe seu bairro para eu indicar um Pequeno Grupo próximo de você.`;
  } else {
    baseMsg += `Como posso lhe apoiar com mais informações nesta área?`;
  }

  if (msg.includes('pastor') || msg.includes('ajuda urgente') || msg.includes('suicídio')) {
    baseMsg += ` Entendo que você precisa conversar com urgência. Estarei direcionando sua conversa para um pastor de plantão agora mesmo. TRANSBORDO_PASTORAL`;
  }

  return baseMsg;
}
