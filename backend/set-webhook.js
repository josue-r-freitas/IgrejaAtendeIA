import axios from 'axios';

const EVOLUTION_API_URL = 'http://localhost:8080';
const EVOLUTION_API_KEY = 'evolution_key_central_123';
const EVOLUTION_INSTANCE_NAME = 'igreja_instance';

const url = `${EVOLUTION_API_URL}/webhook/set/${EVOLUTION_INSTANCE_NAME}`;
const headers = {
  'apikey': EVOLUTION_API_KEY,
  'Content-Type': 'application/json'
};

const payload = {
  webhook: {
    enabled: true,
    url: 'https://sprig-jigsaw-unwieldy.ngrok-free.dev/webhooks/whatsapp',
    byEvents: false,
    events: [
      'MESSAGES_UPSERT'
    ]
  }
};

async function setWebhook() {
  try {
    console.log('Configurando Webhook via API...');
    const res = await axios.post(url, payload, { headers });
    console.log('Webhook configurado com sucesso! Resposta:', res.data);
  } catch (err) {
    console.error('Erro ao configurar webhook:', err.response?.status, JSON.stringify(err.response?.data, null, 2) || err.message);
  }
}

setWebhook();
