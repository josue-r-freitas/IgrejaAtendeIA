import axios from 'axios';

const EVOLUTION_API_URL = 'http://localhost:8080';
const EVOLUTION_API_KEY = 'evolution_key_central_123';
const EVOLUTION_INSTANCE_NAME = 'igreja_instance';

const url = `${EVOLUTION_API_URL}/chat/fetchProfile/${EVOLUTION_INSTANCE_NAME}`;
const headers = {
  'apikey': EVOLUTION_API_KEY,
  'Content-Type': 'application/json'
};

const number = '84696872558677@lid';

async function run() {
  try {
    const res = await axios.post(url, { number }, { headers });
    console.log('Sucesso:', res.data);
  } catch (err) {
    console.log('Erro chat/fetchProfile:', JSON.stringify(err.response?.data, null, 2));
  }
}

run();
