import axios from 'axios';

const EVOLUTION_API_URL = 'http://localhost:8080';
const EVOLUTION_API_KEY = 'evolution_key_central_123';
const EVOLUTION_INSTANCE_NAME = 'igreja_instance';

const url = `${EVOLUTION_API_URL}/chat/findContacts/${EVOLUTION_INSTANCE_NAME}`;
const headers = {
  'apikey': EVOLUTION_API_KEY,
  'Content-Type': 'application/json'
};

async function findContacts() {
  try {
    console.log('Testando POST /chat/findContacts sem filtros...');
    const res = await axios.post(url, {}, { headers });
    const matching = res.data.filter(c => 
      (c.pushName && c.pushName.toLowerCase().includes('samara')) || 
      (c.id && c.id.includes('lid'))
    );
    console.log('Resultados Filtrados:', JSON.stringify(matching, null, 2));
    console.log('Total contatos retornados:', res.data.length);
  } catch (err) {
    console.log('Erro findContacts:', err.response?.status, err.response?.data?.message || err.message);
  }
}

findContacts();
