// In-memory chat storage for session management
export const sessions = new Map();

// Max memory size per session to prevent token bloating
const MAX_HISTORY_SIZE = 10;

/**
 * Retrieve chat history for a session (by contact phone/username)
 * @param {string} sessionId 
 * @returns {Array} messages
 */
export function getHistory(sessionId) {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, []);
  }
  return sessions.get(sessionId);
}

/**
 * Add message to chat history
 * @param {string} sessionId 
 * @param {string} role - 'user', 'assistant' or 'system'
 * @param {string} text 
 */
export function addMessage(sessionId, role, text) {
  const history = getHistory(sessionId);
  history.push({
    role,
    text,
    timestamp: new Date().toISOString()
  });

  // Keep history size within limits
  if (history.length > MAX_HISTORY_SIZE * 2) {
    history.splice(0, history.length - (MAX_HISTORY_SIZE * 2));
  }
}

/**
 * Format history for OpenAI and Gemini SDK formats
 * @param {string} sessionId 
 * @returns {Object} { openaiHistory, geminiHistory }
 */
export function getFormattedHistory(sessionId) {
  const rawHistory = getHistory(sessionId);
  
  const openaiHistory = rawHistory.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'assistant',
    content: msg.text
  }));

  // Gemini uses 'user' and 'model'
  const geminiHistory = rawHistory.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  return { openaiHistory, geminiHistory };
}

/**
 * Clear history for a session (e.g. on human takeover)
 * @param {string} sessionId 
 */
export function clearHistory(sessionId) {
  sessions.delete(sessionId);
}
