import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function list() {
  try {
    console.log('Chave atual:', process.env.GEMINI_API_KEY.substring(0, 10) + '...');
    
    console.log('Listando modelos disponíveis...');
    const result = await genAI.listModels();
    for (const model of result.models) {
      console.log(`- ${model.name} (${model.displayName})`);
    }
  } catch (err) {
    console.error('Erro ao listar modelos:', err.message);
  }
}

list();
