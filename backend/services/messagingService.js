import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const {
  EVOLUTION_API_URL,
  EVOLUTION_API_KEY,
  EVOLUTION_INSTANCE_NAME,
  INSTAGRAM_ACCESS_TOKEN
} = process.env;

/**
 * Send WhatsApp text message via Evolution API
 * @param {string} to - recipient phone number (e.g. "5511987654321@s.whatsapp.net" or "5511987654321")
 * @param {string} text - message content
 */
export async function sendWhatsAppMessage(to, text) {
  try {
    const formattedTo = to.includes('@') ? to : `${to}@s.whatsapp.net`;
    const url = `${EVOLUTION_API_URL}/message/sendText/${EVOLUTION_INSTANCE_NAME}`;
    
    console.log(`[Messaging] Sending WhatsApp to ${formattedTo}...`);
    
    // In test environment, skip real HTTP request if key is mock
    if (EVOLUTION_API_KEY === 'mock_key' || !EVOLUTION_API_URL) {
      console.log(`[Messaging MOCK] WhatsApp sent: "${text}"`);
      return { status: 'mock_success' };
    }

    const response = await axios.post(url, {
      number: formattedTo,
      options: {
        delay: 1200,
        presence: "composing"
      },
      textMessage: {
        text: text
      }
    }, {
      headers: {
        'apikey': EVOLUTION_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('[Messaging Error] Failed to send WhatsApp message:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Send Instagram Direct message via Meta Graph API
 * @param {string} recipientId - user PSID
 * @param {string} text - message content
 */
export async function sendInstagramMessage(recipientId, text) {
  try {
    console.log(`[Messaging] Sending Instagram DM to ${recipientId}...`);

    // In test environment, skip real HTTP request if token is mock
    if (INSTAGRAM_ACCESS_TOKEN === 'mock_key' || !INSTAGRAM_ACCESS_TOKEN) {
      console.log(`[Messaging MOCK] Instagram DM sent: "${text}"`);
      return { status: 'mock_success' };
    }

    const url = `https://graph.facebook.com/v19.0/me/messages?access_token=${INSTAGRAM_ACCESS_TOKEN}`;

    const response = await axios.post(url, {
      recipient: {
        id: recipientId
      },
      message: {
        text: text
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('[Messaging Error] Failed to send Instagram message:', error.response?.data || error.message);
    throw error;
  }
}
