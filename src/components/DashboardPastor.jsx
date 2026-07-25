import React, { useState } from 'react';
import { 
  Users, UserPlus, HeartHandshake, MessageSquare, 
  TrendingUp, Sparkles, Send, CheckCircle2, AlertCircle, ArrowUpRight 
} from 'lucide-react';

export default function DashboardPastor() {
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const sampleQuestions = [
    "Como foi a igreja ontem?",
    "Quantos novos visitantes tivemos este mês?",
    "Quais os principais pedidos de oração recebidos?",
    "Como está a taxa de transbordo humano da IA?"
  ];

  const handleAskAI = (q) => {
    const questionToAsk = q || query;
    if (!questionToAsk.trim()) return;

    setQuery(questionToAsk);
    setLoading(true);
    setAiResponse(null);

    setTimeout(() => {
      setLoading(false);
      if (questionToAsk.includes("ontem")) {
        setAiResponse({
          title: "Resumo do Culto de Domingo (Ontem)",
          metrics: [
            { label: "Presença Estimada", val: "342 pessoas" },
            { label: "Novos Visitantes", val: "18 fichas preenchidas via WhatsApp" },
            { label: "Pedidos de Oração", val: "7 registrados" }
          ],
          summary: "No Culto da Família ontem às 19h, tivemos 342 presentes. O Agente Recepcionista recebeu 18 mensagens de novos visitantes no WhatsApp. Todos já foram incluídos no Funil de Integração e receberão a mensagem de boas-vindas da liderança hoje às 14h."
        });
      } else if (questionToAsk.includes("visitantes")) {
        setAiResponse({
          title: "Análise de Visitantes do Mês",
          metrics: [
            { label: "Total de Visitantes", val: "64 pessoas" },
            { label: "Retorno a Cultos", val: "42 (65%)" },
            { label: "Encaminhados p/ PGs", val: "28 (43%)" }
          ],
          summary: "Neste mês, 64 novos visitantes conversaram com o Agente de Integração via WhatsApp. 43% já participaram de pelo menos um encontro de Célula/PG este mês."
        });
      } else {
        setAiResponse({
          title: "Relatório de Atendimentos da IA",
          metrics: [
            { label: "Mensagens Respondidas", val: "1.420 msgs" },
            { label: "Atendidas 100% IA", val: "92%" },
            { label: "Transbordo Pastoral", val: "8%" }
          ],
          summary: "A IA resolveu 92% das dúvidas automaticamente (horários de culto, chaves PIX, endereço e inscrições de eventos). 8% dos atendimentos foram encaminhados para a equipe humana por envolverem aconselhamento específico."
        });
      }
    }, 900);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Cards de Métricas Principais */}
      <div className="metrics-grid">
        <div className="card metric-card">
          <div className="metric-icon" style={{ background: 'var(--gradient-primary)' }}>
            <Users size={24} />
          </div>
          <div className="metric-data">
            <span className="metric-value">1.280</span>
            <span className="metric-label">Membros Ativos</span>
            <span className="metric-trend up">↑ +4.2% este mês</span>
          </div>
        </div>

        <div className="card metric-card">
          <div className="metric-icon" style={{ background: 'var(--gradient-emerald)' }}>
            <UserPlus size={24} />
          </div>
          <div className="metric-data">
            <span className="metric-value">64</span>
            <span className="metric-label">Novos Visitantes (Mês)</span>
            <span className="metric-trend up">↑ +18% vs mês anterior</span>
          </div>
        </div>

        <div className="card metric-card">
          <div className="metric-icon" style={{ background: 'var(--gradient-amber)' }}>
            <HeartHandshake size={24} />
          </div>
          <div className="metric-data">
            <span className="metric-value">28</span>
            <span className="metric-label">Pedidos de Oração (Semana)</span>
            <span className="metric-trend neutral">• 3 urgências atendidas</span>
          </div>
        </div>

        <div className="card metric-card">
          <div className="metric-icon" style={{ background: 'var(--gradient-rose)' }}>
            <MessageSquare size={24} />
          </div>
          <div className="metric-data">
            <span className="metric-value">92%</span>
            <span className="metric-label">Resolução por IA</span>
            <span className="metric-trend up">↑ 1.420 interações no Zap</span>
          </div>
        </div>
      </div>

      {/* Seção 2: Analytics IA Executivo Pastoral */}
      <div className="card" style={{ border: '1px solid rgba(99, 102, 241, 0.4)', background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '8px', background: 'rgba(99, 102, 241, 0.2)', borderRadius: '12px', color: '#a5b4fc' }}>
              <Sparkles size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Analytics Pastoral IA — "Pergunte à Sua Igreja"</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Faça perguntas em linguagem natural para consultar dados de frequência, visitantes, oração e finanças.</p>
            </div>
          </div>
          <span style={{ fontSize: '0.75rem', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '4px 10px', borderRadius: '20px', fontWeight: 600 }}>
            ● IA Conectada ao Banco
          </span>
        </div>

        {/* Input Bar */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Ex: Como foi o movimento da igreja ontem? Quantos visitantes se integraram?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
            style={{
              flex: 1,
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem 1.25rem',
              color: 'white',
              fontSize: '0.95rem',
              outline: 'none'
            }}
          />
          <button className="btn btn-primary" onClick={() => handleAskAI()} disabled={loading}>
            {loading ? <Sparkles className="spin" size={18} /> : <Send size={18} />}
            Perguntar à IA
          </button>
        </div>

        {/* Sugestões de perguntas rápidas */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: aiResponse ? '1.5rem' : '0' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', alignSelf: 'center', marginRight: '0.25rem' }}>Exemplos:</span>
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleAskAI(q)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 'var(--radius-full)',
                padding: '0.35rem 0.85rem',
                color: 'var(--text-muted)',
                fontSize: '0.78rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {q}
            </button>
          ))}
        </div>

        {/* AI Response Card */}
        {aiResponse && (
          <div style={{
            background: 'rgba(15, 23, 42, 0.9)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            animation: 'fadeIn 0.3s ease'
          }}>
            <h4 style={{ color: '#a5b4fc', fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} /> {aiResponse.title}
            </h4>
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {aiResponse.metrics.map((m, idx) => (
                <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.label}</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#38bdf8' }}>{m.val}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '0.9rem', color: '#e2e8f0', lineHeight: 1.6 }}>{aiResponse.summary}</p>
          </div>
        )}
      </div>

      {/* Grid Duplo: Atividades Recentes + Resumo dos Agentes */}
      <div className="grid-2col">
        {/* Atendimentos Recentes no WhatsApp */}
        <div className="card">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>Últimos Atendimentos (WhatsApp IA)</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', cursor: 'pointer' }}>Ver Todos →</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {[
              { name: "Carlos Eduardo (Visitante)", text: "Perguntou sobre horário de cultos e endereço.", agent: "Recepcionista IA", time: "Há 12 min", status: "IA Resolveu" },
              { name: "Mariana Souza", text: "Pediu oração pela saúde da mãe.", agent: "Oração IA", time: "Há 34 min", status: "Encaminhado Pastor" },
              { name: "Pr. Roberto", text: "Agendou sala de reunião para 3ª feira.", agent: "Secretária IA", time: "Há 1h", status: "IA Agendou" },
              { name: "Lucas Lima (Visitante)", text: "Solicitou localização do PG mais próximo no Centro.", agent: "Integração IA", time: "Há 2h", status: "Indicação Enviada" }
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>{item.name}</span>
                    <span style={{ fontSize: '0.72rem', background: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc', padding: '2px 8px', borderRadius: '10px' }}>{item.agent}</span>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>"{item.text}"</span>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.2rem' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{item.time}</span>
                  <span style={{ fontSize: '0.72rem', color: item.status.includes('Encaminhado') ? '#f43f5e' : '#34d399', fontWeight: 600 }}>● {item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resumo de Células & Visitas */}
        <div className="card">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem' }}>Funil de Acolhimento</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                <span>Novos Visitantes (Semana)</span>
                <span style={{ fontWeight: 700 }}>18 pessoas</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', background: 'var(--gradient-primary)' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                <span>Contato via WhatsApp feito</span>
                <span style={{ fontWeight: 700 }}>16 (88%)</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '88%', height: '100%', background: 'var(--gradient-emerald)' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                <span>Encaminhados para Célula/PG</span>
                <span style={{ fontWeight: 700 }}>11 (61%)</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '61%', height: '100%', background: 'var(--gradient-amber)' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                <span>Batismo / Membro Oficial</span>
                <span style={{ fontWeight: 700 }}>5 (27%)</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '27%', height: '100%', background: 'var(--gradient-rose)' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
