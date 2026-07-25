import axios from 'axios';
import fs from 'fs';
import path from 'path';

const EVOLUTION_API_URL = 'http://localhost:8080';
const EVOLUTION_API_KEY = 'evolution_key_central_123';
const EVOLUTION_INSTANCE_NAME = 'igreja_instance';

const url = `${EVOLUTION_API_URL}/instance/connect/${EVOLUTION_INSTANCE_NAME}`;
const headers = {
  'apikey': EVOLUTION_API_KEY
};

async function getQrCode() {
  try {
    console.log('Buscando QR Code da API...');
    const res = await axios.get(url, { headers });
    
    if (res.data && res.data.base64) {
      console.log('QR Code recebido com sucesso!');
      
      // Extract base64 image data
      const base64Data = res.data.base64.replace(/^data:image\/png;base64,/, "");
      
      // Save to disk in workspace root
      const outputPath = path.resolve('..', 'qrcode.png');
      fs.writeFileSync(outputPath, base64Data, 'base64');
      
      console.log(`QR Code salvo com sucesso em: ${outputPath}`);
      console.log('Abra o arquivo qrcode.png na pasta raiz do projeto e escaneie com seu celular!');
    } else {
      console.log('Não foi possível obter o QR Code. Resposta da API:', res.data);
    }
  } catch (err) {
    console.error('Erro ao buscar QR Code:', err.response?.status, err.response?.data || err.message);
  }
}

getQrCode();
