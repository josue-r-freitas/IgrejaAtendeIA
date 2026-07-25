import axios from 'axios';

const EVOLUTION_API_URL = 'http://localhost:8080';
const EVOLUTION_API_KEY = 'evolution_key_central_123';
const EVOLUTION_INSTANCE_NAME = 'igreja_instance';

const url = `${EVOLUTION_API_URL}/message/sendText/${EVOLUTION_INSTANCE_NAME}`;
const headers = {
  'apikey': EVOLUTION_API_KEY,
  'Content-Type': 'application/json'
};

const samaraLid = '84696872558677@lid'; // LID from log
const text = 'Olá Samara! Este é um teste com JID LID.';

async function testSendLid() {
  try {
    console.log(`Testando envio direto para o JID LID: ${samaraLid}...`);
    const res = await axios.post(url, {
      number: samaraLid,
      textMessage: {
        text
      }
    }, { headers });
    console.log('Sucesso LID:', res.data);
  } catch (err) {
    console.log('Erro LID:', JSON.stringify(err.response?.data, null, 2) || err.message);
  }
}

testSendLid();
