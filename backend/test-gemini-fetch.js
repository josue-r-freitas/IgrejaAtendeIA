import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

async function testFetch() {
  console.log('Testando chamada HTTP para o alias gemini-pro-latest...');
  console.log('Chave:', API_KEY.substring(0, 10) + '...');

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-latest:generateContent?key=${API_KEY}`;
    const response = await axios.post(url, {
      contents: [{ parts: [{ text: 'Diga Olá!' }] }]
    });
    console.log('\nSucesso! Resposta:', response.data.candidates[0].content.parts[0].text);
  } catch (err) {
    console.error('Falha no teste:', err.response?.status, err.response?.data || err.message);
  }
}

testFetch();
