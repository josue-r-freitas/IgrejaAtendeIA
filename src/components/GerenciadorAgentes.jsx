import React, { useState } from 'react';
import { 
  Bot, Settings, Sparkles, CheckCircle2, Sliders, 
  MessageSquare, BookOpen, Clock, ShieldAlert, Zap,
  X, Send
} from 'lucide-react';

export default function GerenciadorAgentes() {
  const [agents, setAgents] = useState([
    {
      id: 'recepcionista',
      name: 'Recepcionista IA',
      role: 'Boas-vindas, Horários & Dúvidas Gerais',
      status: true,
      model: 'Google Gemini 1.5 Pro',
      tone: 'Acolhedor e Atencioso',
      interactions: 640,
      channels: { whatsapp: true, instagram: true },
      sampleQuestions: ["Quais são os horários dos cultos de domingo?", "Onde fica a igreja e tem estacionamento?"],
      description: 'Atende novos usuários no WhatsApp e Instagram, envia horários de cultos, localização, estacionamento e informações gerais da igreja.'
    },
    {
      id: 'secretaria',
      name: 'Secretária IA',
      role: 'Agendamentos & Demandas Administrativas',
      status: true,
      model: 'OpenAI GPT-4o',
      tone: 'Formal, Eficiente e Claro',
      interactions: 320,
      channels: { whatsapp: true, instagram: false },
      sampleQuestions: ["Como posso agendar um horário com o pastor?", "Qual a chave PIX para dízimos?"],
      description: 'Agenda horários de gabinete pastoral, reservas de salas, envia chave PIX para ofertas e gera certificados.'
    },
    {
      id: 'integracao',
      name: 'Integração & Consolidação IA',
      role: 'Acompanhamento de Novos Visitantes',
      status: true,
      model: 'Google Gemini 1.5 Flash',
      tone: 'Caloroso e Encorajador',
      interactions: 215,
      channels: { whatsapp: true, instagram: true },
      sampleQuestions: ["Como me junto a um Pequeno Grupo?", "Fui no culto ontem, como posso ser acompanhado?"],
      description: 'Envia mensagem aos visitantes na segunda-feira, indica PGs/Células próximos e atualiza o funil de integração.'
    },
    {
      id: 'oracao',
      name: 'Oração & Cuidado Pastoral IA',
      role: 'Coleta Sigilosa de Pedidos & Triagem de Urgência',
      status: true,
      model: 'Google Gemini 1.5 Pro',
      tone: 'Empático, Respeitoso e Consolador',
      interactions: 142,
      channels: { whatsapp: true, instagram: true },
      sampleQuestions: ["Quero pedir oração pela saúde da minha família.", "Preciso de um aconselhamento espiritual."],
      description: 'Recebe pedidos de oração, oferece palavra de apoio bíblico e aciona alerta pastoral em casos graves de desespero.'
    },
    {
      id: 'eventos',
      name: 'Eventos & Inscrições IA',
      role: 'Gestão de Conferências & Retiros',
      status: true,
      model: 'OpenAI GPT-4o',
      tone: 'Entusiasmado e Claro',
      interactions: 198,
      channels: { whatsapp: true, instagram: false },
      sampleQuestions: ["Como retiro meu QR Code de ingresso?", "Quais conferências estão com inscrições abertas?"],
      description: 'Informa programação de eventos, tira dúvidas sobre hospedagem/alimentação e emite ingressos em QR Code.'
    },
    {
      id: 'midia',
      name: 'Mídia & Comunicação IA',
      role: 'Escalas de Louvor, Som e Voluntários',
      status: false,
      model: 'OpenAI GPT-4o Mini',
      tone: 'Jovem e Prático',
      interactions: 85,
      channels: { whatsapp: true, instagram: false },
      sampleQuestions: ["Qual a escala do louvor no domingo?", "Como confirmo a presença na escala?"],
      description: 'Notifica voluntários sobre suas escalas no domingo, confirma presença e envia boletim semanal.'
    },
    {
      id: 'analytics',
      name: 'Analytics Pastoral IA',
      role: 'Assistente Executivo de Dados do Pastor',
      status: true,
      model: 'Google Gemini 1.5 Pro',
      tone: 'Analítico e Consultivo',
      interactions: 54,
      channels: { whatsapp: true, instagram: false },
      sampleQuestions: ["Quantos novos membros tivemos este mês?", "Qual a média de visitantes no ano?"],
      description: 'Responde perguntas executivas do Pastor em linguagem natural sobre métricas de frequência, doações e crescimento.'
    }
  ]);

  const [selectedAgent, setSelectedAgent] = useState(agents[0]);
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false);
  const [playgroundMessages, setPlaygroundMessages] = useState([]);
  const [playgroundInput, setPlaygroundInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const toggleAgent = (id) => {
    const updated = agents.map(a => a.id === id ? { ...a, status: !a.status } : a);
    setAgents(updated);
    const currSelected = updated.find(a => a.id === selectedAgent.id);
    if (currSelected) {
      setSelectedAgent(currSelected);
    }
  };

  const handleSaveAgentConfig = () => {
    setAgents(agents.map(a => a.id === selectedAgent.id ? selectedAgent : a));
    alert(`Configurações de "${selectedAgent.name}" salvas com sucesso!`);
  };

  const handleOpenPlayground = (agent) => {
    setSelectedAgent(agent);
    setIsPlaygroundOpen(true);
    setPlaygroundMessages([
      {
        sender: 'ai',
        text: `Olá! Eu sou o ${agent.name} configurado com o modelo ${agent.model}. Como posso ajudar você hoje? (Tom de voz: ${agent.tone})`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleSendPlaygroundMessage = (textToSend) => {
    const text = textToSend || playgroundInput;
    if (!text.trim()) return;

    const userMessage = {
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setPlaygroundMessages(prev => [...prev, userMessage]);
    setPlaygroundInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let aiText = '';
      const toneLower = selectedAgent.tone.toLowerCase();

      if (selectedAgent.id === 'recepcionista') {
        if (text.includes('horário') || text.includes('culto')) {
          aiText = `Olá! Com certeza! Nossos cultos de domingo acontecem às 10h (Escola Bíblica) e às 19h (Culto da Família). Terei grande alegria em ver você lá!`;
        } else if (text.includes('estacionamento') || text.includes('onde') || text.includes('endereço')) {
          aiText = `Claro! Nós ficamos localizados na Avenida Principal, nº 1000. Temos um estacionamento gratuito no local com segurança, além de rampa de acessibilidade.`;
        } else {
          aiText = `Olá! Que bom falar com você. Sou o assistente de recepção da nossa igreja. Posso te ajudar com horários, localização, ministérios ou qualquer dúvida sobre nossa comunidade!`;
        }
      } else if (selectedAgent.id === 'secretaria') {
        if (text.includes('agendar') || text.includes('gabinete') || text.includes('pastor')) {
          aiText = `Olá. Para agendamento de aconselhamento ou gabinete pastoral, temos vagas disponíveis às terças e quintas à tarde. Gostaria que eu verificasse um horário livre para você?`;
        } else if (text.includes('pix') || text.includes('oferta') || text.includes('dízimo')) {
          aiText = `Seguem os dados oficiais para contribuições: Chave PIX (CNPJ): 12.345.678/0001-99 (Igreja Batista Central). Que Deus abençoe sua generosidade.`;
        } else {
          aiText = `Olá. Sou o assistente da secretaria da igreja. Posso lhe auxiliar com agendamento de reuniões, reservas de salas, chaves PIX de dízimos ou emissão de certificados. Em que posso ser útil?`;
        }
      } else if (selectedAgent.id === 'oracao') {
        aiText = `Que o Senhor traga paz ao seu coração. Registrei seu pedido de oração em nossa base de intercessores confidenciais. Estaremos clamando juntos por essa situação. Saiba que você não está sozinho nessa jornada.`;
      } else if (selectedAgent.id === 'integracao') {
        aiText = `Que alegria enorme saber do seu interesse! Nossos Pequenos Grupos (Células) se reúnem nas casas durante a semana. Temos grupos de jovens, casais e famílias. Me diga qual o seu bairro para que eu indique o mais pertinho de você!`;
      } else if (selectedAgent.id === 'eventos') {
        aiText = `Estamos muito animados com as nossas próximas atividades! Nossas inscrições para o Acampamento de Primavera já estão abertas. Posso gerar o seu link de inscrição ou tirar qualquer dúvida sobre a programação!`;
      } else if (selectedAgent.id === 'midia') {
        aiText = `A paz! A escala de voluntários para o próximo culto está fechada. Você foi escalado para a Operação de Projeção às 19h. Por favor, confirme se poderá estar presente clicando em "Confirmar Presença"!`;
      } else {
        aiText = `Entendido. Puxando dados consolidados do banco da igreja: identificamos 64 novos visitantes cadastrados neste mês. O crescimento de membros ativos está em +4.2% comparado ao mês anterior. Deseja que eu gere um relatório detalhado em PDF?`;
      }

      if (toneLower.includes('acolhedor') || toneLower.includes('caloroso') || toneLower.includes('empático')) {
        aiText += ` Deus te abençoe ricamente! 🙏`;
      } else if (toneLower.includes('formal') || toneLower.includes('analítico')) {
        aiText += ` Permanecemos à disposição para maiores esclarecimentos.`;
      } else {
        aiText += ` Valeu! ⚡`;
      }

      setPlaygroundMessages(prev => [...prev, {
        sender: 'ai',
        text: aiText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header explicativo */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Matriz de Agentes de IA da Igreja</h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Ative, personalize os prompts de sistema, configure os canais de atuação e escolha os modelos para cada função.</p>
        </div>
        <button className="btn btn-primary" onClick={() => handleOpenPlayground(selectedAgent)}>
          <Zap size={16} /> Testar Agente no Playground
        </button>
      </div>

      {/* Grid Principal: Lista de Agentes + Painel de Configuração */}
      <div className="grid-2col" style={{ gridTemplateColumns: '1fr 1.2fr' }}>
        
        {/* Lista de Agentes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {agents.map((ag) => (
            <div
              key={ag.id}
              onClick={() => setSelectedAgent(ag)}
              className="card"
              style={{
                cursor: 'pointer',
                borderColor: selectedAgent.id === ag.id ? 'var(--accent-primary)' : 'var(--border-color)',
                background: selectedAgent.id === ag.id ? 'rgba(99, 102, 241, 0.12)' : 'var(--bg-card)',
                padding: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: 'var(--radius-md)',
                  background: ag.status ? 'var(--gradient-primary)' : 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: ag.status ? 'white' : 'var(--text-dim)'
                }}>
                  <Bot size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {ag.name}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{ag.role}</div>
                  
                  {/* Canais Ativos */}
                  <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.35rem' }}>
                    {ag.channels?.whatsapp && (
                      <span style={{ fontSize: '0.62rem', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>
                        WhatsApp
                      </span>
                    )}
                    {ag.channels?.instagram && (
                      <span style={{ fontSize: '0.62rem', background: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>
                        Instagram
                      </span>
                    )}
                    {!ag.channels?.whatsapp && !ag.channels?.instagram && (
                      <span style={{ fontSize: '0.62rem', background: 'rgba(244, 63, 94, 0.15)', color: '#fda4af', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>
                        Inativo
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{ag.interactions} interações</span>
                <label className="switch" onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox" checked={ag.status} onChange={() => toggleAgent(ag.id)} />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          ))}
        </div>

        {/* Painel de Configuração do Agente Selecionado */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '40px', height: '40px', background: 'var(--gradient-primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Configuração: {selectedAgent.name}</h3>
                <span style={{ fontSize: '0.75rem', color: selectedAgent.status ? 'var(--accent-emerald)' : 'var(--accent-rose)', fontWeight: 600 }}>
                  ● {selectedAgent.status ? `Ativo em: ${[selectedAgent.channels?.whatsapp && 'WhatsApp', selectedAgent.channels?.instagram && 'Instagram Direct'].filter(Boolean).join(', ') || 'Nenhum canal'}` : 'Agente Pausado'}
                </span>
              </div>
            </div>
            <button className="btn btn-secondary" onClick={handleSaveAgentConfig} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
              <Settings size={14} /> Salvar Parâmetros
            </button>
          </div>

          {/* Form Parâmetros */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                Modelo de Linguagem (LLM)
              </label>
              <select
                value={selectedAgent.model}
                onChange={(e) => setSelectedAgent({ ...selectedAgent, model: e.target.value })}
                style={{
                  width: '100%',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.65rem 0.85rem',
                  color: 'white',
                  fontSize: '0.88rem'
                }}
              >
                <option value="OpenAI GPT-4o">OpenAI GPT-4o (Recomendado para raciocínio complexo)</option>
                <option value="OpenAI GPT-4o Mini">OpenAI GPT-4o Mini (Rápido e econômico)</option>
                <option value="Google Gemini 1.5 Pro">Google Gemini 1.5 Pro (Ideal para RAG e multimodalidade)</option>
                <option value="Google Gemini 1.5 Flash">Google Gemini 1.5 Flash (Alta velocidade e baixo custo)</option>
              </select>
            </div>

            {/* Canais de Comunicação */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                Canais de Comunicação Ativos
              </label>
              <div style={{ display: 'flex', gap: '1.5rem', background: 'rgba(15, 23, 42, 0.8)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                  <input
                    type="checkbox"
                    checked={selectedAgent.channels?.whatsapp || false}
                    onChange={(e) => setSelectedAgent({
                      ...selectedAgent,
                      channels: { ...selectedAgent.channels, whatsapp: e.target.checked }
                    })}
                    style={{ accentColor: 'var(--accent-primary)' }}
                  />
                  WhatsApp
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                  <input
                    type="checkbox"
                    checked={selectedAgent.channels?.instagram || false}
                    onChange={(e) => setSelectedAgent({
                      ...selectedAgent,
                      channels: { ...selectedAgent.channels, instagram: e.target.checked }
                    })}
                    style={{ accentColor: 'var(--accent-primary)' }}
                  />
                  Instagram Direct
                </label>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                Tom de Voz & Personalidade
              </label>
              <input
                type="text"
                value={selectedAgent.tone}
                onChange={(e) => setSelectedAgent({ ...selectedAgent, tone: e.target.value })}
                style={{
                  width: '100%',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.65rem 0.85rem',
                  color: 'white',
                  fontSize: '0.88rem'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                Prompt de Sistema (Instruções de Comportamento)
              </label>
              <textarea
                rows={5}
                value={`Você é a ${selectedAgent.name} da Igreja. Seu objetivo principal é: ${selectedAgent.description}
Sempre responda com tom de voz ${selectedAgent.tone}.
Ao identificar solicitações que fujam do seu escopo, execute o transbordo para atendimento humano.`}
                onChange={() => {}}
                style={{
                  width: '100%',
                  background: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.75rem',
                  color: '#e2e8f0',
                  fontSize: '0.82rem',
                  lineHeight: 1.5,
                  fontFamily: 'monospace'
                }}
              />
            </div>

            {/* Base de Conhecimento RAG Vinculada */}
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <BookOpen size={16} color="var(--accent-primary)" /> Base de Conhecimento (RAG)
                </span>
                <span style={{ fontSize: '0.75rem', color: '#a5b4fc', cursor: 'pointer' }}>+ Adicionar PDF/Documento</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Documentos vinculados: <span style={{ color: 'white' }}>Horários_Cultos_2026.pdf</span>, <span style={{ color: 'white' }}>Manual_de_Membros_V1.pdf</span>, <span style={{ color: 'white' }}>Chaves_PIX_Oficiais.txt</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gaveta Lateral do Playground de Testes */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '440px',
        height: '100vh',
        background: 'rgba(15, 23, 42, 0.95)',
        borderLeft: '1px solid var(--border-color)',
        boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(20px)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        transform: isPlaygroundOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        padding: 0
      }}>
        
        {/* Playground Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(30, 41, 59, 0.4)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'var(--gradient-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              <Bot size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                Playground: {selectedAgent.name}
              </h3>
              <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.15rem' }}>
                <span style={{ fontSize: '0.65rem', color: '#a5b4fc', background: 'rgba(99, 102, 241, 0.2)', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>
                  {selectedAgent.model}
                </span>
                <span style={{ fontSize: '0.65rem', color: '#c084fc', background: 'rgba(139, 92, 246, 0.2)', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>
                  {selectedAgent.tone}
                </span>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setIsPlaygroundOpen(false)}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-muted)',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Playground Messages Body */}
        <div style={{
          flex: 1,
          padding: '1.5rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          background: 'radial-gradient(circle at 50% 50%, rgba(30, 41, 59, 0.2) 0%, rgba(15, 23, 42, 0.6) 100%)'
        }}>
          {playgroundMessages.map((m, idx) => {
            const isUser = m.sender === 'user';
            return (
              <div key={idx} style={{
                alignSelf: isUser ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: isUser ? 'flex-end' : 'flex-start'
              }}>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)', marginBottom: '0.2rem' }}>
                  {isUser ? 'Você' : selectedAgent.name} • {m.time}
                </span>
                <div style={{
                  padding: '0.75rem 1rem',
                  borderRadius: isUser ? '16px 0 16px 16px' : '0 16px 16px 16px',
                  background: isUser ? 'var(--gradient-primary)' : 'rgba(30, 41, 59, 0.8)',
                  border: isUser ? 'none' : '1px solid var(--border-color)',
                  color: 'white',
                  fontSize: '0.85rem',
                  lineHeight: 1.45,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                }}>
                  {m.text}
                </div>
              </div>
            );
          })}
          
          {isTyping && (
            <div style={{ alignSelf: 'flex-start', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>{selectedAgent.name} está digitando...</span>
              <div style={{ padding: '0.75rem 1rem', borderRadius: '0 16px 16px 16px', background: 'rgba(30, 41, 59, 0.8)', border: '1px solid var(--border-color)', display: 'flex', gap: '4px', alignItems: 'center' }}>
                <span className="dot" style={{ width: '6px', height: '6px', background: 'var(--text-muted)', borderRadius: '50%', display: 'inline-block', animation: 'bounce 1.4s infinite ease-in-out both' }}></span>
                <span className="dot" style={{ width: '6px', height: '6px', background: 'var(--text-muted)', borderRadius: '50%', display: 'inline-block', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '0.2s' }}></span>
                <span className="dot" style={{ width: '6px', height: '6px', background: 'var(--text-muted)', borderRadius: '50%', display: 'inline-block', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '0.4s' }}></span>
              </div>
            </div>
          )}
        </div>

        {/* Sugestões Rápidas */}
        {selectedAgent.sampleQuestions && (
          <div style={{ padding: '0.75rem 1.25rem', background: 'rgba(30, 41, 59, 0.2)', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)', fontWeight: 600 }}>Perguntas Sugeridas:</span>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {selectedAgent.sampleQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendPlaygroundMessage(q)}
                  style={{
                    background: 'rgba(99, 102, 241, 0.08)',
                    border: '1px solid rgba(99, 102, 241, 0.25)',
                    color: '#a5b4fc',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.75rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Playground Input Footer */}
        <div style={{
          padding: '1rem 1.25rem',
          background: 'rgba(15, 23, 42, 0.95)',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          gap: '0.75rem'
        }}>
          <input
            type="text"
            placeholder={`Conversar com ${selectedAgent.name}...`}
            value={playgroundInput}
            onChange={(e) => setPlaygroundInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendPlaygroundMessage()}
            style={{
              flex: 1,
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '0.65rem 0.85rem',
              color: 'white',
              outline: 'none',
              fontSize: '0.85rem'
            }}
          />
          <button className="btn btn-primary" onClick={() => handleSendPlaygroundMessage()} style={{ padding: '0.65rem 1rem' }}>
            <Send size={16} />
          </button>
        </div>

      </div>

    </div>
  );
}
