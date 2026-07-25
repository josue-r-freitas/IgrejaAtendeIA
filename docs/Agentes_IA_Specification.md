# Especificação Técnica dos Agentes de IA — Igreja Atende IA

A plataforma conta com uma **Matriz de 7 Agentes Especializados**, configuráveis por igreja. Cada agente possui seu prompt de sistema, canais de comunicação ativos, modelo de LLM recomendado, ferramentas atreladas (tools), limite de escopo e política de segurança/transbordo.

---

## 1. 🤖 Recepcionista IA (Boas-vindas e Atendimento Geral)
* **Função:** Atendimento inicial e acolhimento geral de visitantes e membros.
* **Canais de Atuação:** WhatsApp e Instagram Direct.
* **Modelo de LLM Recomendado:** `Google Gemini 1.5 Pro` (Selecionado devido ao tamanho massivo de contexto e alta precisão para consultas RAG em múltiplos PDFs informativos da igreja).
* **Tom de Voz:** Caloroso, amigável, acolhedor e educado.
* **Capacidades:**
  * Informar horários e endereços dos cultos presenciais e transmissões ao vivo.
  * Fornecer detalhes sobre estacionamento, espaço kids e acessibilidade.
  * Apresentar os ministérios da igreja, líderes locais e links para mídias sociais.
* **Ferramentas (Tools):** `get_church_schedule`, `get_location_info`, `search_knowledge_base`.

---

## 2. 📝 Secretária IA (Agendamentos e Operações)
* **Função:** Auxiliar membros e líderes em demandas administrativas e de secretaria.
* **Canais de Atuação:** WhatsApp.
* **Modelo de LLM Recomendado:** `OpenAI GPT-4o` (Selecionado por sua velocidade e raciocínio estruturado preciso para tarefas transacionais e agendamentos).
* **Tom de Voz:** Eficiente, prestativa, clara e organizada.
* **Capacidades:**
  * Agendamento de reuniões com pastores e conselheiros.
  * Reserva de salas, quadras e espaço de eventos da igreja.
  * Emissão e envio de certificados digitais (Batismo, Cursos).
  * Informações de contribuição (Envio dinâmico de Chave PIX e dados bancários).
* **Ferramentas (Tools):** `check_pastoral_calendar`, `book_appointment`, `get_pix_keys`, `generate_certificate`.

---

## 3. 🤝 Integração & Consolidação IA (Acompanhamento de Visitantes)
* **Função:** Régua de relacionamento e follow-up com novos visitantes a partir do culto.
* **Canais de Atuação:** WhatsApp e Instagram Direct.
* **Modelo de LLM Recomendado:** `Google Gemini 1.5 Flash` (Selecionado pela altíssima velocidade e excelente custo por token para réguas de relacionamento ativas de alto volume).
* **Tom de Voz:** Caloroso, encorajador e não invasivo.
* **Capacidades:**
  * Mensagem ativa de agradecimento pela visita na segunda-feira.
  * Pesquisa qualitativa simples sobre a experiência no culto.
  * Indicação do Pequeno Grupo (PG) / Célula mais próximo da residência do visitante.
  * Atualização automática de status no Kanban de consolidação.
* **Ferramentas (Tools):** `register_visitor`, `find_nearest_cell_group`, `update_kanban_stage`.

---

## 4. 🙏 Oração & Cuidado Pastoral IA
* **Função:** Recebimento e triagem sigilosa de pedidos de intercessão e aconselhamento.
* **Canais de Atuação:** WhatsApp e Instagram Direct.
* **Modelo de LLM Recomendado:** `Google Gemini 1.5 Pro` (Excelente tom empático e capacidade de detecção de sentimento sensível para triagem de aconselhamentos complexos).
* **Tom de Voz:** Empático, respeitoso, espiritual, discreto e consolador.
* **Capacidades:**
  * Acolhimento inicial baseado em referências bíblicas de conforto.
  * Registro criptografado do pedido no banco de intercessão da liderança.
  * Triagem de Urgência: Transbordo emergencial imediato para o pastor de plantão se detectar ideação suicida, luto grave ou desespero agudo.
* **Ferramentas (Tools):** `save_prayer_request`, `trigger_pastoral_alert`.

---

## 5. 📅 Eventos & Inscrições IA
* **Função:** Divulgação e vendas/inscrições para congressos, retiros e acampamentos.
* **Canais de Atuação:** WhatsApp.
* **Modelo de LLM Recomendado:** `OpenAI GPT-4o` (Altamente estável e rápido para preenchimento de formulários via Function Calling e processamento de ingressos).
* **Tom de Voz:** Entusiasmado, claro e informativo.
* **Capacidades:**
  * Apresentar grade de programação e perguntas frequentes sobre os eventos.
  * Processamento de inscrições e geração de ingresso com QR Code.
  * Enviar checklists de bagagem ("o que levar para o acampamento").
* **Ferramentas (Tools):** `list_upcoming_events`, `register_event_participant`, `send_event_ticket`.

---

## 6. 🎨 Mídia & Comunicação IA
* **Função:** Auxiliar voluntários e líderes das equipes de louvor, técnica e som.
* **Canais de Atuação:** WhatsApp.
* **Modelo de LLM Recomendado:** `OpenAI GPT-4o Mini` (Modelo ágil e econômico para envio e confirmação de escalas em massa para equipes internas).
* **Tom de Voz:** Dinâmico, jovem e prático.
* **Capacidades:**
  * Envio da escala litúrgica de domingo para músicos e técnicos de projeção/som.
  * Coleta ativa de confirmações de presença na escala do final de semana.
  * Disparar avisos e boletins semanais internos para lideranças.
* **Ferramentas (Tools):** `get_service_roster`, `confirm_roster_presence`, `broadcast_announcement`.

---

## 7. 📊 Analytics Pastoral IA (Assistente do Pastor)
* **Função:** Assistente analítico e BI em linguagem natural para a equipe de pastores.
* **Canais de Atuação:** Dashboard Web da Liderança (Analytics).
* **Modelo de LLM Recomendado:** `Google Gemini 1.5 Pro` (Excelente para análise de dados tabulares, cruzamento de informações de membros e geração de relatórios de saúde de células).
* **Tom de Voz:** Analítico, objetivo e consultivo.
* **Capacidades:**
  * Responder a perguntas em linguagem natural: *"Qual foi a média de visitantes e a taxa de integração nas células no trimestre?"*
  * Alertas automáticos sobre distorções (ex: queda acentuada de frequência em algum PG/Célula).
  * Elaboração de resumos semanais de saúde da igreja para reuniões de conselho.
* **Ferramentas (Tools):** `query_attendance_metrics`, `query_financial_summary`, `generate_pastoral_report`.
