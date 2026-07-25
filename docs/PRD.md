# Documento de Requisitos de Produto (PRD) — Igreja Atende IA

## 1. Visão Geral do Produto
O **Igreja Atende IA** é um Sistema Operacional completo e Plataforma de Agentes de IA Inteligentes desenhado para transformar a gestão, o atendimento e o engajamento de membros e visitantes em igrejas evangélicas e comunidades cristãs.

A plataforma substitui chatbots tradicionais engessados por uma **Secretaria Digital Inteligente** baseada em LLMs (Modelos de Linguagem de Grande Porte) e RAG (Retrieval-Augmented Generation), capaz de conversar de forma empática, contextualizada e precisa via WhatsApp, Instagram e Web.

---

## 2. Personas do Sistema

### 2.1. Pastor Principal / Equipe Pastoral
* **Objetivo:** Acompanhar o crescimento da igreja, engajamento dos membros, saúde dos ministérios e ter insights em tempo real sem depender de relatórios manuais.
* **Necessidades:**
  * Perguntar em linguagem natural: *"Quantos novos visitantes tivemos este mês e quantos foram integrados a um grupo pequeno?"*
  * Visão consolidada de pedidos de oração e casos que exigem visita ou aconselhamento pastoral urgente.
* **Ferramenta no Sistema:** **Dashboard Executivo Pastoral + Analytics IA**.

### 2.2. Secretária / Equipe Administrativa
* **Objetivo:** Desafogar o atendimento repetitivo diário e gerenciar agendamentos, documentos, inscrições em eventos e cadastros de membros.
* **Necessidades:**
  * Automação de respostas sobre horários de cultos, localização, chaves PIX de dízimos/ofertas e agenda.
  * Transição suave entre atendimento automatizado (IA) e atendimento humano (transbordo para operador).
* **Ferramenta no Sistema:** **Painel de Atendimentos ao Vivo & CRM de Membros**.

### 2.3. Líder de Integração / Consolidação
* **Objetivo:** Garantir que nenhum novo visitante fique sem acompanhamento ou acolhimento.
* **Necessidades:**
  * Funil visual (Kanban) dos novos visitantes.
  * Automação do envio de mensagens de acolhimento e convites para Pequenos Grupos (PGs) / Células.
* **Ferramenta no Sistema:** **Funil de Integração (Kanban de Visitantes)**.

### 2.4. Membro / Visitante da Igreja
* **Objetivo:** Obter respostas rápidas, fazer pedidos de oração, inscrever-se em eventos e agendar atendimentos.
* **Necessidades:**
  * Comunicação via WhatsApp 24 horas por dia, 7 dias por semana.
  * Diálogo humanizado, sem menus confusos de discagem de opções numeradas ("Digite 1 para...").

---

## 3. Requisitos Funcionais

### RF-01: Atendimento Multicanal com Agentes de IA
* O sistema deve integrar com o WhatsApp (via API Oficial Meta / Evolution / Z-API).
* A IA deve ser capaz de responder com tom de voz acolhedor, fundamentado na base de dados e conhecimentos específicos da igreja local.

### RF-02: Transbordo Humano Inteligente (Human-in-the-loop)
* Quando a IA detectar um tema sensível (ex: crise pessoal, pedido grave de oração, questão financeira sigilosa) ou solicitação explícita de falar com um humano, a conversa deve ser imediatamente transferida para a fila de atendimento humano no painel da secretária/pastor.

### RF-03: Funil Automatizado de Acompanhamento de Visitantes
* Quando um novo visitante fornece seus dados via WhatsApp ou QR Code no culto, o sistema registra a ficha e inicia uma régua de relacionamento automatizada e personalizada.

### RF-04: Chatbot Analítico Pastoral (BI em Linguagem Natural)
* O pastor ou liderança pode conversar diretamente com o banco de dados da igreja usando IA para extrair gráficos, métricas e análises executivas sem conhecimento de SQL ou Excel.

---

## 4. Requisitos Não Funcionais

### RNF-01: Segurança e Privacidades de Dados (LGPD)
* Pedidos de oração e registros pastorais devem ter criptografia e níveis rígidos de acesso (permissão estrita por perfil).

### RNF-02: Disponibilidade e Escalabilidade
* O gateway de WhatsApp e a camada de mensageria de IA devem manter 99.9% de uptime, com tempo de resposta médio inferior a 3 segundos por mensagem.

### RNF-03: Multi-tenant (SaaS Multi-Igrejas)
* A arquitetura deve permitir isolamento completo de dados por igreja/filial (tenant), com base de conhecimento (RAG) individualizada.
