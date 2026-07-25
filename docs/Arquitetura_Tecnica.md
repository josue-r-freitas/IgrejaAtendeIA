# Arquitetura Técnica — Igreja Atende IA

## 1. Visão Geral da Arquitetura (Diagrama de Alto Nível)

```
 [Usuário / WhatsApp / Web]
            │
            ▼
 ┌────────────────────────┐
 │   Gateway Mensageria   │ (Evolution API / Meta Cloud API)
 └──────────┬─────────────┘
            │ Webhook
            ▼
 ┌────────────────────────┐
 │   Orquestrador de IA   │ (Node.js / LangChain / Router de Agentes)
 └──────────┬─────────────┘
            ├───────────────────────┬──────────────────────┐
            ▼                       ▼                      ▼
  ┌──────────────────┐    ┌──────────────────┐   ┌──────────────────┐
  │   Vector DB      │    │  PostgreSQL DB   │   │     LLMs         │
  │ (RAG / Doutrina) │    │(Membros, CRM, PG)│   │ (OpenAI, Gemini) │
  └──────────────────┘    └──────────────────┘   └──────────────────┘
            │
            ▼
 ┌────────────────────────┐
 │ Painel Web (Frontend)  │ (Vite / React / Dashboard Pastor & Operador)
 └────────────────────────┘
```

---

## 2. Componentes da Solução

### 2.1. Gateway de Mensageria (WhatsApp Integration)
* Recebe e envia mensagens via Webhook.
* Suporta Evolution API / Z-API / WhatsApp Business Cloud API.
* Trata fila de mensagens com Redis/BullMQ para resiliência e concorrência.

### 2.2. Engine de Agentes de IA & Router
* Classifica a intenção da mensagem e roteia para o agente especialista correto (Recepcionista, Secretária, Integração, Oração, etc.).
* Gerencia o estado da conversa (Memória de curto e longo prazo).
* Executa *Function Calling* para consultar ou gravar dados no sistema da igreja.

### 2.3. Base de Conhecimento RAG (Retrieval-Augmented Generation)
* Armazena em banco vetorial (Pgvector / Qdrant) os documentos específicos da igreja:
  * Horários e locais dos cultos e ministérios.
  * Regimento interno, visão e valores da igreja.
  * Informações de eventos vigentes.
  * FAQ geral.

### 2.4. Banco de Dados Relacional (PostgreSQL)
Módulos do banco de dados:
1. `tenants`: Cadastro das igrejas contratantes.
2. `members` & `visitors`: Fichas completas de membros e visitantes.
3. `conversations` & `messages`: Histórico auditável de interações da IA e operadores humanos.
4. `prayer_requests`: Pedidos de oração com níveis de privacidade.
5. `cell_groups`: Cadastro de Células / PGs com localização geográfica.
6. `events` & `registrations`: Gestão de inscrições.

---

## 3. Estratégia de Transbordo Humano (Human-in-the-Loop)
1. **Gatilho de Transbordo:** Ocorre por solicitação do usuário (*"Quero falar com a secretária"*) ou detecção de sentimento/gravidade (*Score de Urgência > 0.8*).
2. **Pausa Automática da IA:** A IA entra no modo `PAUSED` naquele chat.
3. **Notificação em Tempo Real:** O operador no Painel Web recebe notificação sonoras e visuais para assumir o chat no canal de atendimento ao vivo.
