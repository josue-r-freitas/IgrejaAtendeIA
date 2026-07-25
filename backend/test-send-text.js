import axios from 'axios';

const EVOLUTION_API_URL = 'http://localhost:8080';
const EVOLUTION_API_KEY = 'evolution_key_central_123';
const EVOLUTION_INSTANCE_NAME = 'igreja_instance';

const url = `${EVOLUTION_API_URL}/message/sendText/${EVOLUTION_INSTANCE_NAME}`;
const headers = {
  'apikey': EVOLUTION_API_KEY,
  'Content-Type': 'application/json'
};

const number = '5511999999999'; // Test number
const text = 'Olá do Orquestrador!';

async function testPayloads() {
  // Test 1: Flat "text" payload
  try {
    console.log('\n1. Testando formato plano {"number", "text"}:');
    const res = await axios.post(url, { number, text }, { headers });
    console.log('Sucesso Flat:', res.data);
  } catch (err) {
    console.log('Erro Flat:', JSON.stringify(err.response?.data, null, 2) || err.message);
  }

  // Test 2: Nested "textMessage" payload
  try {
    console.log('\n2. Testando formato aninhado {"number", "textMessage": {"text"}}}:');
    const res = await axios.post(url, {
      number,
      textMessage: {
        text
      }
    }, { headers });
    console.log('Sucesso Nested:', res.data);
  } catch (err) {
    console.log('Erro Nested:', JSON.stringify(err.response?.data, null, 2) || err.message);
  }
}

testPayloads();
