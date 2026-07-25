import React from 'react';
import { UserPlus, CheckCircle, MessageSquare, MapPin, ArrowRight, UserCheck } from 'lucide-react';

export default function FunilIntegracao() {
  const columns = [
    {
      title: "1. Novo Visitante",
      badge: "6 cadastros",
      color: "var(--accent-primary)",
      cards: [
        { name: "Lucas Lima", phone: "+55 11 96543-2109", date: "Culto Domingo 19h", tag: "Primeira Vez" },
        { name: "Beatriz Santos", phone: "+55 11 95432-1098", date: "Culto Domingo 19h", tag: "Primeira Vez" },
        { name: "Fernando Oliveira", phone: "+55 11 94321-0987", date: "Culto Domingo 10h", tag: "Ficha QR Code" }
      ]
    },
    {
      title: "2. Mensagem Boas-vindas IA",
      badge: "5 enviados",
      color: "var(--accent-cyan)",
      cards: [
        { name: "Carlos Eduardo", phone: "+55 11 97654-3210", date: "Mensagem enviada 14:00", tag: "Respondeu IA" },
        { name: "Amanda Ferreira", phone: "+55 11 93210-9876", date: "Mensagem enviada 14:00", tag: "Interessada PG" }
      ]
    },
    {
      title: "3. Encaminhado p/ Célula/PG",
      badge: "4 pessoas",
      color: "var(--accent-amber)",
      cards: [
        { name: "Gabriel Souza", phone: "+55 11 92109-8765", date: "PG Centro (Pr. Roberto)", tag: "Visitou PG 4ª-feira" },
        { name: "Patricia Mendes", phone: "+55 11 91098-7654", date: "PG Famílias", tag: "Acompanhamento Líder" }
      ]
    },
    {
      title: "4. Batismo / Membro Integrado",
      badge: "3 membros",
      color: "var(--accent-emerald)",
      cards: [
        { name: "Renato Alves", phone: "+55 11 90987-6543", date: "Turma Batismo Maio", tag: "Integrado 🎉" },
        { name: "Juliana Costa", phone: "+55 11 98877-6655", date: "Curso de Membros", tag: "Integrado 🎉" }
      ]
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Funil de Acolhimento & Integração de Visitantes</h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Acompanhe o caminho do visitante desde a primeira visita no culto até a integração em um Pequeno Grupo e Batismo.</p>
        </div>
        <button className="btn btn-primary">
          <UserPlus size={16} /> Cadastrar Ficha Manualmente
        </button>
      </div>

      {/* Kanban Board Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', overflowX: 'auto' }}>
        {columns.map((col, idx) => (
          <div key={idx} className="card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', background: 'rgba(17, 24, 39, 0.7)' }}>
            
            {/* Column Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <span style={{ fontWeight: 700, fontSize: '0.9rem', color: col.color, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                {col.title}
              </span>
              <span style={{ fontSize: '0.72rem', background: 'rgba(255, 255, 255, 0.08)', padding: '2px 8px', borderRadius: '10px', color: 'var(--text-muted)' }}>
                {col.badge}
              </span>
            </div>

            {/* Column Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
              {col.cards.map((card, cIdx) => (
                <div
                  key={cIdx}
                  style={{
                    background: 'rgba(30, 41, 59, 0.9)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    cursor: 'grab'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>{card.name}</span>
                    <span style={{ fontSize: '0.68rem', background: 'rgba(99, 102, 241, 0.15)', color: '#a5b4fc', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                      {card.tag}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <MessageSquare size={12} /> {card.phone}
                  </div>

                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', borderTop: '1px dashed rgba(255, 255, 255, 0.08)', paddingTop: '0.4rem', marginTop: '0.2rem' }}>
                    {card.date}
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
