import axios from 'axios';

const PORT = 5000;
const BASE_URL = `http://localhost:${PORT}`;

async function runTests() {
  console.log('🚀 Iniciando Testes Simulados do Orquestrador de Agentes...');

  try {
    // Teste 1: Horários (Deverá cair no Recepcionista IA)
    console.log('\n--- TESTE 1: Recepcionista IA (WhatsApp) ---');
    const res1 = await axios.post(`${BASE_URL}/webhooks/whatsapp`, {
      event: 'messages.upsert',
      data: {
        pushName: 'Josué Freitas',
        key: {
          remoteJid: '5511999999999@s.whatsapp.net',
          fromMe: false
        },
        message: {
          conversation: 'Olá! Qual o horário dos cultos de vocês?'
        }
      }
    });
    console.log('Resultado do Teste 1:', res1.data);

    // Teste 2: Agendamento / Pix (Deverá cair no Secretária IA)
    console.log('\n--- TESTE 2: Secretária IA (WhatsApp) ---');
    const res2 = await axios.post(`${BASE_URL}/webhooks/whatsapp`, {
      event: 'messages.upsert',
      data: {
        pushName: 'Maria Silva',
        key: {
          remoteJid: '5511888888888@s.whatsapp.net',
          fromMe: false
        },
        message: {
          conversation: 'Como faço para doar meu dízimo? Qual a chave PIX?'
        }
      }
    });
    console.log('Resultado do Teste 2:', res2.data);

    // Teste 3: Oração (Deverá cair no Oração IA via Instagram)
    console.log('\n--- TESTE 3: Oração & Cuidado Pastoral (Instagram) ---');
    const res3 = await axios.post(`${BASE_URL}/webhooks/instagram`, {
      object: 'instagram',
      entry: [
        {
          messaging: [
            {
              sender: { id: 'insta_user_123' },
              message: {
                text: 'Minha vó está muito doente. Vocês poderiam orar por ela?'
              }
            }
          ]
        }
      ]
    });
    console.log('Resultado do Teste 3:', res3.data);

    // Teste 4: Transbordo (Solicitação de ajuda/pastor urgente)
    console.log('\n--- TESTE 4: Solicitação Urgente de Transbordo (WhatsApp) ---');
    const res4 = await axios.post(`${BASE_URL}/webhooks/whatsapp`, {
      event: 'messages.upsert',
      data: {
        pushName: 'Roberta Dias',
        key: {
          remoteJid: '5511777777777@s.whatsapp.net',
          fromMe: false
        },
        message: {
          conversation: 'Preciso de ajuda urgente, estou muito desesperada, preciso falar com o pastor agora!'
        }
      }
    });
    console.log('Resultado do Teste 4:', res4.data);

    // Teste 5: Confirmação de Pausa (Próxima mensagem no mesmo chat JID do teste 4 deve ser ignorada)
    console.log('\n--- TESTE 5: Chat Pausado (WhatsApp) ---');
    const res5 = await axios.post(`${BASE_URL}/webhooks/whatsapp`, {
      event: 'messages.upsert',
      data: {
        pushName: 'Roberta Dias',
        key: {
          remoteJid: '5511777777777@s.whatsapp.net',
          fromMe: false
        },
        message: {
          conversation: 'Oi? Tem alguém aí? O pastor já vai me atender?'
        }
      }
    });
    console.log('Resultado do Teste 5 (Deve ser ignorada/replied=false):', res5.data);

  } catch (error) {
    console.error('Erro ao executar testes:', error.response?.data || error.message);
  }
}

// Rodar testes
runTests();
