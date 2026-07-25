import React, { useState } from 'react';
import { 
  MessageSquare, User, Bot, PhoneCall, Send, 
  CheckCheck, AlertCircle, Search, UserCheck, Shield 
} from 'lucide-react';

export default function PainelAtendimentos() {
  const [chats, setChats] = useState([
    {
      id: 1,
      name: "Mariana Souza",
      phone: "+55 11 98765-4321",
      status: "transbordo", // transbordo pastoral
      agent: "Oração IA",
      unread: 1,
      lastMessage: "Minha mãe deu entrada no hospital hoje. Preciso muito de oração e se um pastor puder conversar.",
      time: "14:32",
      messages: [
        { sender: 'user', text: 'Boa tarde, a paz do Senhor!', time: '14:28' },
        { sender: 'ai', text: 'Amém, Mariana! A paz do Senhor. Como posso te apoiar e orar por você hoje?', time: '14:29' },
        { sender: 'user', text: 'Minha mãe deu entrada no hospital hoje. Preciso muito de oração e se um pastor puder conversar.', time: '14:32' },
        { sender: 'system', text: '⚠️ A IA identificou solicitação de apoio pastoral urgente e transferiu esta conversa para o atendimento humano.', time: '14:32' }
      ]
    },
    {
      id: 2,
      name: "Carlos Eduardo (Novo Visitante)",
      phone: "+55 11 97654-3210",
      status: "ia_active",
      agent: "Recepcionista IA",
      unread: 0,
      lastMessage: "Obrigado! Estarei no culto das 19h com minha família.",
      time: "13:15",
      messages: [
        { sender: 'user', text: 'Olá! Qual o horário do culto de domingo?', time: '13:12' },
        { sender: 'ai', text: 'Olá, Carlos! Que alegria ter você aqui. Nossos cultos de domingo acontecem às 10h (Escola Bíblica) e às 19h (Culto da Família). O endereço é Av. Principal, 1000. Temos espaço kids preparado!', time: '13:13' },
        { sender: 'user', text: 'Obrigado! Estarei no culto das 19h com minha família.', time: '13:15' },
        { sender: 'ai', text: 'Deus abençoe! Aguardamos vocês com muito carinho. Se precisar de ajuda na chegada, é só procurar nossa equipe de recepção!', time: '13:15' }
      ]
    },
    {
      id: 3,
      name: "Lucas Lima",
      phone: "+55 11 96543-2109",
      status: "ia_active",
      agent: "Integração IA",
      unread: 0,
      lastMessage: "Qual Célula/PG fica perto do bairro Jardim das Flores?",
      time: "11:40",
      messages: [
        { sender: 'user', text: 'Fui no culto domingo passado e gostei muito.', time: '11:38' },
        { sender: 'ai', text: 'Que bênção, Lucas! Ficamos muito felizes. Gostaria de participar de um Grupo Pequeno na sua região?', time: '11:39' },
        { sender: 'user', text: 'Qual Célula/PG fica perto do bairro Jardim das Flores?', time: '11:40' }
      ]
    }
  ]);

  const [activeChat, setActiveChat] = useState(chats[0]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage = {
      sender: 'human_operator',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...activeChat.messages, newMessage];
    const updatedChat = { ...activeChat, messages: updatedMessages, lastMessage: inputText, time: newMessage.time };

    setActiveChat(updatedChat);
    setChats(chats.map(c => c.id === activeChat.id ? updatedChat : c));
    setInputText('');
  };

  const handleTakeover = () => {
    const updated = { ...activeChat, status: 'human_active' };
    setActiveChat(updated);
    setChats(chats.map(c => c.id === activeChat.id ? updated : c));
  };

  return (
    <div style={{ height: 'calc(100vh - 150px)', display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.25rem' }}>
      
      {/* Lista Lateral de Atendimentos WhatsApp */}
      <div className="card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Conversas no Zap</h3>
          <span style={{ fontSize: '0.75rem', background: 'rgba(244, 63, 94, 0.2)', color: '#fda4af', padding: '2px 8px', borderRadius: '10px', fontWeight: 600 }}>
            1 Alerta Pastoral
          </span>
        </div>

        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(15, 23, 42, 0.8)', padding: '0.5rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <Search size={16} color="var(--text-muted)" />
          <input type="text" placeholder="Buscar por nome ou fone..." style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none', fontSize: '0.85rem', width: '100%' }} />
        </div>

        {/* Chat Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowY: 'auto', flex: 1 }}>
          {chats.map(chat => (
            <div
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              style={{
                padding: '0.85rem',
                borderRadius: 'var(--radius-md)',
                background: activeChat.id === chat.id ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                border: activeChat.id === chat.id ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>{chat.name}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{chat.time}</span>
              </div>

              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {chat.lastMessage}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem' }}>
                <span style={{ fontSize: '0.7rem', color: '#a5b4fc', background: 'rgba(99, 102, 241, 0.15)', padding: '2px 6px', borderRadius: '6px' }}>
                  {chat.agent}
                </span>

                {chat.status === 'transbordo' ? (
                  <span style={{ fontSize: '0.7rem', color: '#f43f5e', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <AlertCircle size={12} /> Assumir Chat
                  </span>
                ) : chat.status === 'human_active' ? (
                  <span style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 600 }}>● Atendimento Humano</span>
                ) : (
                  <span style={{ fontSize: '0.7rem', color: '#34d399', fontWeight: 600 }}>● IA Atendendo</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Janela do Chat Principal */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
        
        {/* Header do Chat */}
        <div style={{ padding: '1rem 1.5rem', background: 'rgba(15, 23, 42, 0.8)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{activeChat.name}</h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{activeChat.phone}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {activeChat.status === 'transbordo' && (
              <button className="btn btn-primary" onClick={handleTakeover} style={{ background: 'var(--gradient-rose)', fontSize: '0.82rem', padding: '0.4rem 0.9rem' }}>
                <UserCheck size={16} /> Assumir Atendimento Humano
              </button>
            )}
            {activeChat.status === 'human_active' && (
              <span style={{ fontSize: '0.8rem', background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', padding: '0.35rem 0.85rem', borderRadius: '20px', fontWeight: 600 }}>
                Modo Operador Ativo (IA Pausada)
              </span>
            )}
          </div>
        </div>

        {/* Área das Mensagens */}
        <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.5) 0%, rgba(11, 15, 25, 0.9) 100%)' }}>
          {activeChat.messages.map((m, idx) => {
            if (m.sender === 'system') {
              return (
                <div key={idx} style={{ textAlign: 'center', margin: '0.5rem 0' }}>
                  <span style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.3)', color: '#fda4af', fontSize: '0.78rem', padding: '0.4rem 1rem', borderRadius: '20px' }}>
                    {m.text}
                  </span>
                </div>
              );
            }

            const isUser = m.sender === 'user';
            const isAI = m.sender === 'ai';

            return (
              <div key={idx} style={{
                alignSelf: isUser ? 'flex-start' : 'flex-end',
                maxWidth: '70%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: isUser ? 'flex-start' : 'flex-end'
              }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  {isUser ? <User size={12} /> : isAI ? <Bot size={12} color="#a5b4fc" /> : <UserCheck size={12} color="#38bdf8" />}
                  <span>{isUser ? activeChat.name : isAI ? activeChat.agent : 'Você (Operador)'} • {m.time}</span>
                </div>

                <div style={{
                  padding: '0.85rem 1.1rem',
                  borderRadius: isUser ? '0 16px 16px 16px' : '16px 0 16px 16px',
                  background: isUser ? 'rgba(30, 41, 59, 0.9)' : isAI ? 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)' : 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                  color: 'white',
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
                }}>
                  {m.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Bar de Resposta */}
        <div style={{ padding: '1rem', background: 'rgba(15, 23, 42, 0.9)', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.75rem' }}>
          <input
            type="text"
            placeholder={activeChat.status === 'ia_active' ? "Digite para assumir e responder no lugar da IA..." : "Escreva sua resposta como operador..."}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            style={{
              flex: 1,
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '0.75rem 1rem',
              color: 'white',
              outline: 'none'
            }}
          />
          <button className="btn btn-primary" onClick={handleSendMessage}>
            <Send size={18} /> Enviar no Zap
          </button>
        </div>

      </div>

    </div>
  );
}
