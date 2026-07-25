import axios from 'axios';

const EVOLUTION_API_URL = 'http://localhost:8080';
const EVOLUTION_API_KEY = 'evolution_key_central_123';
const EVOLUTION_INSTANCE_NAME = 'igreja_instance';

const headers = {
  'apikey': EVOLUTION_API_KEY,
  'Content-Type': 'application/json'
};

const number = '84696872558677@lid';

async function testFetchProfile() {
  const urls = [
    `${EVOLUTION_API_URL}/profile/fetchProfile/${EVOLUTION_INSTANCE_NAME}`,
    `${EVOLUTION_API_URL}/profile/fetchBusinessProfile/${EVOLUTION_INSTANCE_NAME}`,
    `${EVOLUTION_API_URL}/chat/fetchProfile/${EVOLUTION_INSTANCE_NAME}`
  ];

  for (const url of urls) {
    try {
      console.log(`\nTestando POST: ${url}`);
      const res = await axios.post(url, { number }, { headers });
      console.log('Sucesso:', res.data);
    } catch (err) {
      console.log('Falhou:', err.response?.status, err.response?.data?.message || err.message);
    }
  }
}

testFetchProfile();
