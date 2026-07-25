import axios from 'axios';

const EVOLUTION_API_URL = 'http://localhost:8080';
const EVOLUTION_API_KEY = 'evolution_key_central_123';
const EVOLUTION_INSTANCE_NAME = 'igreja_instance';

const headers = {
  'apikey': EVOLUTION_API_KEY,
  'Content-Type': 'application/json'
};

const number = '84696872558677@lid';

async function testProfile() {
  const urls = [
    `${EVOLUTION_API_URL}/contact/profile/${EVOLUTION_INSTANCE_NAME}?number=${number}`,
    `${EVOLUTION_API_URL}/contact/profile/${EVOLUTION_INSTANCE_NAME}/${number}`,
    `${EVOLUTION_API_URL}/chat/profile/${EVOLUTION_INSTANCE_NAME}?number=${number}`,
    `${EVOLUTION_API_URL}/contact/profile?instanceName=${EVOLUTION_INSTANCE_NAME}&number=${number}`
  ];

  for (const url of urls) {
    try {
      console.log(`\nTestando GET: ${url}`);
      const res = await axios.get(url, { headers });
      console.log('Sucesso:', res.data);
    } catch (err) {
      console.log('Falhou:', err.response?.status, err.response?.data?.message || err.message);
    }
  }
}

testProfile();
