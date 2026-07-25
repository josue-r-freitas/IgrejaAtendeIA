import React, { useState } from 'react';
import { 
  Bot, LayoutDashboard, MessageSquare, Users, 
  Sparkles, Church, Sliders, Shield, Bell, Search, Layers 
} from 'lucide-react';
import DashboardPastor from './components/DashboardPastor';
import GerenciadorAgentes from './components/GerenciadorAgentes';
import PainelAtendimentos from './components/PainelAtendimentos';
import FunilIntegracao from './components/FunilIntegracao';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard Pastor & BI', icon: LayoutDashboard, badge: null },
    { id: 'agentes', label: 'Agentes de IA (7)', icon: Bot, badge: '7 Ativos' },
    { id: 'atendimentos', label: 'Atendimento WhatsApp CRM', icon: MessageSquare, badge: '1 Alerta' },
    { id: 'funil', label: 'Funil de Integração', icon: Layers, badge: null }
  ];

  return (
    <div className="app-container">
      
      {/* Sidebar Lateral */}
      <aside className="sidebar">
        {/* Logotipo da Startup/Solução */}
        <div className="brand-header">
          <div className="brand-logo">
            <Bot size={26} />
          </div>
          <div>
            <div className="brand-title">Igreja Atende IA</div>
            <div className="brand-subtitle">Secretaria Digital IA</div>
          </div>
        </div>

        {/* Menu de Navegação */}
        <nav className="nav-menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <div
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {item.badge && <span className="nav-item-badge">{item.badge}</span>}
              </div>
            );
          })}
        </nav>

        {/* Seletor de Igreja / Tenant */}
        <div className="church-selector">
          <div className="church-avatar">
            <Church size={18} />
          </div>
          <div className="church-info">
            <span className="church-name">Igreja Batista Central</span>
            <span className="church-plan">Plano Pro • Multi-Agentes</span>
          </div>
        </div>
      </aside>

      {/* Área de Conteúdo Principal */}
      <main className="main-content">
        
        {/* Top Header Bar */}
        <header className="top-bar">
          <div className="page-title-group">
            <h1 className="page-title">
              {activeTab === 'dashboard' && 'Visão Geral Executiva Pastor'}
              {activeTab === 'agentes' && 'Central de Controle dos Agentes de IA'}
              {activeTab === 'atendimentos' && 'Atendimentos ao Vivo no WhatsApp'}
              {activeTab === 'funil' && 'Funil de Acolhimento & Visitantes'}
            </h1>
            <p className="page-description">
              {activeTab === 'dashboard' && 'Acompanhe indicadores da igreja, métricas de acolhimento e interaja com a IA.'}
              {activeTab === 'agentes' && 'Gerencie o tom de voz, modelos de LLM e a base de conhecimento de cada agente.'}
              {activeTab === 'atendimentos' && 'CRM de mensageria com transbordo inteligente para a equipe humana.'}
              {activeTab === 'funil' && 'Kanban de novos visitantes, acompanhamento e batismos.'}
            </p>
          </div>

          <div className="top-bar-actions">
            <div className="status-indicator">
              <span className="pulse-dot"></span>
              <span>WhatsApp API & Agentes IA Online</span>
            </div>
          </div>
        </header>

        {/* Corpo do Conteúdo Dinâmico */}
        <section className="content-body">
          {activeTab === 'dashboard' && <DashboardPastor />}
          {activeTab === 'agentes' && <GerenciadorAgentes />}
          {activeTab === 'atendimentos' && <PainelAtendimentos />}
          {activeTab === 'funil' && <FunilIntegracao />}
        </section>

      </main>

    </div>
  );
}
