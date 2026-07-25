import axios from 'axios';
import fs from 'fs';
import path from 'path';

const EVOLUTION_API_URL = 'http://localhost:8080';
const EVOLUTION_API_KEY = 'evolution_key_central_123';
const EVOLUTION_INSTANCE_NAME = 'igreja_instance';

const headers = {
  'apikey': EVOLUTION_API_KEY,
  'Content-Type': 'application/json'
};

async function run() {
  try {
    console.log('1. Criando a instância "igreja_instance"...');
    const createUrl = `${EVOLUTION_API_URL}/instance/create`;
    const createRes = await axios.post(createUrl, {
      instanceName: EVOLUTION_INSTANCE_NAME,
      token: '6FE4F6D4587D-4830-9E26-3A434CF98789',
      qrcode: true,
      integration: 'WHATSAPP-BAILEYS'
    }, { headers });
    
    console.log('Instância criada com sucesso! Resposta:', createRes.data);
  } catch (err) {
    if (err.response?.status === 403 || err.response?.data?.response?.message?.includes('already exists')) {
      console.log('A instância já existe.');
    } else {
      console.error('Erro ao criar instância:', err.response?.status, err.response?.data || err.message);
    }
  }

  try {
    console.log('\n2. Buscando o QR Code...');
    const connectUrl = `${EVOLUTION_API_URL}/instance/connect/${EVOLUTION_INSTANCE_NAME}`;
    const connectRes = await axios.get(connectUrl, { headers });
    
    if (connectRes.data && connectRes.data.base64) {
      console.log('QR Code recebido com sucesso!');
      
      const base64Data = connectRes.data.base64.replace(/^data:image\/png;base64,/, "");
      const outputPath = path.resolve('..', 'qrcode.png');
      fs.writeFileSync(outputPath, base64Data, 'base64');
      
      console.log(`\n======================================================`);
      console.log(`QR Code salvo com sucesso em: ${outputPath}`);
      console.log(`Abra o arquivo qrcode.png na pasta raiz do projeto e escaneie com seu celular!`);
      console.log(`======================================================`);
    } else {
      console.log('Não foi possível obter o QR Code. Resposta:', connectRes.data);
    }
  } catch (err) {
    console.error('Erro ao buscar QR Code:', err.response?.status, err.response?.data || err.message);
  }
}

run();
