import React, { useState } from 'react';
import { 
  Bot, Settings, Sparkles, CheckCircle2, Sliders, 
  MessageSquare, BookOpen, Clock, ShieldAlert, Zap 
} from 'lucide-react';

export default function GerenciadorAgentes() {
  const [agents, setAgents] = useState([
    {
      id: 'recepcionista',
      name: 'Recepcionista IA',
      role: 'Boas-vindas, Horários & Dúvidas Gerais',
      status: true,
      model: 'GPT-4o / Gemini 1.5 Pro',
      tone: 'Acolhedor e Atencioso',
      interactions: 640,
      description: 'Atende novos usuários no WhatsApp, envia horários de cultos, localização, estacionamento e informações gerais da igreja.'
    },
    {
      id: 'secretaria',
      name: 'Secretária IA',
      role: 'Agendamentos & Demandas Administrativas',
      status: true,
      model: 'GPT-4o',
      tone: 'Formal, Eficiente e Claro',
      interactions: 320,
      description: 'Agenda horários de gabinete pastoral, reservas de salas, envia chave PIX para ofertas e gera certificados.'
    },
    {
      id: 'integracao',
      name: 'Integração & Consolidação IA',
      role: 'Acompanhamento de Novos Visitantes',
      status: true,
      model: 'Claude 3.5 Sonnet / GPT-4o',
      tone: 'Caloroso e Encorajador',
      interactions: 215,
      description: 'Envia mensagem aos visitantes na segunda-feira, indica PGs/Células próximos e atualiza o funil de integração.'
    },
    {
      id: 'oracao',
      name: 'Oração & Cuidado Pastoral IA',
      role: 'Coleta Sigilosa de Pedidos & Triagem de Urgência',
      status: true,
      model: 'Claude 3.5 Sonnet (Sensibilidade Alta)',
      tone: 'Empático, Respeitoso e Consolador',
      interactions: 142,
      description: 'Recebe pedidos de oração, oferece palavra de apoio bíblico e aciona alerta pastoral em casos graves de desespero.'
    },
    {
      id: 'eventos',
      name: 'Eventos & Inscrições IA',
      role: 'Gestão de Conferências & Retiros',
      status: true,
      model: 'GPT-4o',
      tone: 'Entusiasmado e Claro',
      interactions: 198,
      description: 'Informa programação de eventos, tira dúvidas sobre hospedagem/alimentação e emite ingressos em QR Code.'
    },
    {
      id: 'midia',
      name: 'Mídia & Comunicação IA',
      role: 'Escalas de Louvor, Som e Voluntários',
      status: false,
      model: 'GPT-4o Mini',
      tone: 'Jovem e Prático',
      interactions: 85,
      description: 'Notifica voluntários sobre suas escalas no domingo, confirma presença e envia boletim semanal.'
    },
    {
      id: 'analytics',
      name: 'Analytics Pastoral IA',
      role: 'Assistente Executivo de Dados do Pastor',
      status: true,
      model: 'Claude 3.5 Sonnet / OpenAI o1',
      tone: 'Analítico e Consultivo',
      interactions: 54,
      description: 'Responde perguntas executivas do Pastor em linguagem natural sobre métricas de frequência, doações e crescimento.'
    }
  ]);

  const [selectedAgent, setSelectedAgent] = useState(agents[0]);

  const toggleAgent = (id) => {
    setAgents(agents.map(a => a.id === id ? { ...a, status: !a.status } : a));
    if (selectedAgent.id === id) {
      setSelectedAgent({ ...selectedAgent, status: !selectedAgent.status });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header explicativo */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Matriz de Agentes de IA da Igreja</h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Ative, personalize os prompts de sistema e escolha os modelos para cada função.</p>
        </div>
        <button className="btn btn-primary">
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
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                  ● {selectedAgent.status ? 'Agente Ativo no WhatsApp' : 'Agente Pausado'}
                </span>
              </div>
            </div>
            <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
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
                <option value="GPT-4o">OpenAI GPT-4o (Recomendado para respostas rápidas)</option>
                <option value="Claude 3.5 Sonnet">Anthropic Claude 3.5 Sonnet (Ideal para empatia e aconselhamento)</option>
                <option value="Gemini 1.5 Pro">Google Gemini 1.5 Pro (Multimodal & RAG)</option>
                <option value="GPT-4o Mini">OpenAI GPT-4o Mini (Econômico)</option>
              </select>
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

    </div>
  );
}
