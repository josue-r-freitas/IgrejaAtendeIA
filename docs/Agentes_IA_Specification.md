# Especificação Técnica dos Agentes de IA — Igreja Atende IA

A plataforma conta com uma **Matriz de 7 Agentes Especializados**, configuráveis por igreja. Cada agente possui seu prompt de sistema, ferramentas atreladas (tools), limite de escopo e política de segurança/transbordo.

---

## 1. 🤖 Recepcionista IA (Boas-vindas e Atendimento Geral)
* **Função:** Atendimento inicial de quem envia mensagem no WhatsApp da igreja.
* **Tom de Voz:** Caloroso, amigável, acolhedor e educado.
* **Capacidades:**
  * Informar horários e endereços dos cultos presencias e transmissões ao vivo.
  * Fornecer informações sobre estacionamento, espaço kids e acessibilidade.
  * Apresentar os líderes da igreja e links para redes sociais e site.
* **Ferramentas (Tools):** `get_church_schedule`, `get_location_info`, `search_knowledge_base`.

---

## 2. 📝 Secretária IA (Agendamentos e Operações)
* **Função:** Auxiliar membros e líderes em demandas administrativas da secretaria.
* **Tom de Voz:** Eficiente, prestativa, clara e organizada.
* **Capacidades:**
  * Agendamento de gabinete pastoral / aconselhamento.
  * Reserva de salas da igreja para reuniões de ministérios.
  * Emissão e envio de certificados (Batismo, Curso de Membros).
  * Informações sobre dízimos e ofertas (Chaves PIX oficiais, conta bancária).
* **Ferramentas (Tools):** `check_pastoral_calendar`, `book_appointment`, `get_pix_keys`, `generate_certificate`.

---

## 3. 🤝 Integração & Consolidação IA (Boas-vindas a Visitantes)
* **Função:** Acompanhar o visitante a partir do momento em que ele preenche a ficha no culto.
* **Tom de Voz:** Atencioso, encorajador, não invasivo.
* **Capacidades:**
  * Mensagem de agradecimento pela visita na segunda-feira.
  * Pesquisa rápida sobre como foi a experiência no culto.
  * Indicação do Pequeno Grupo (PG) / Célula mais próximo da residência do visitante.
  * Atualização automática do Kanban de Integração.
* **Ferramentas (Tools):** `register_visitor`, `find_nearest_cell_group`, `update_kanban_stage`.

---

## 4. 🙏 Oração & Cuidado Pastoral IA
* **Função:** Receber pedidos de oração, intercessões e desabafos.
* **Tom de Voz:** Empático, respeitoso, espiritual, discreto e consolador.
* **Capacidades:**
  * Acolhimento inicial com palavra bíblica de conforto.
  * Registro sigiloso do pedido de oração no banco intercessor da igreja.
  * Triagem de Urgência: Se a IA detectar ideação suicida, luto grave ou desespero agudo, aciona a **Alerta Pastoral Urgente** para contato humano imediato.
* **Ferramentas (Tools):** `save_prayer_request`, `trigger_pastoral_alert`.

---

## 5. 📅 Eventos & Inscrições IA
* **Função:** Informar e gerenciar a participação em conferências, acampamentos e retiros.
* **Tom de Voz:** Entusiasmado, claro e informativo.
* **Capacidades:**
  * Divulgação de eventos futuros e grade de programação.
  * Processamento de inscrições e geração de comprovante / QR Code de entrada.
  * Respostas a dúvidas frequentes (o que levar para o acampamento, alimentação, hospedagem).
* **Ferramentas (Tools):** `list_upcoming_events`, `register_event_participant`, `send_event_ticket`.

---

## 6. 🎨 Mídia & Comunicação IA
* **Função:** Atender aos voluntários dos ministérios de louvor, mídia e comunicação.
* **Tom de Voz:** Dinâmico, jovem e prático.
* **Capacidades:**
  * Distribuição da escala do domingo para músicos, operadores de som e transmissão.
  * Envio de boletins informativos e avisos para a liderança.
  * Coleta de confirmações de presença nas escalas.
* **Ferramentas (Tools):** `get_service_roster`, `confirm_roster_presence`, `broadcast_announcement`.

---

## 7. 📊 Analytics Pastoral IA (Assistente do Pastor)
* **Função:** Atuar como um analista de inteligência de dados exclusivo para a liderança da igreja via chat interno ou WhatsApp privado.
* **Tom de Voz:** Analítico, objetivo e consultivo.
* **Capacidades:**
  * Responder perguntas complexas: *"Qual a média de frequência de visitantes nos últimos 3 meses?"* ou *"Quais células tiveram queda na frequência este mês?"*
  * Gerar resumos semanais de saúde da igreja.
* **Ferramentas (Tools):** `query_attendance_metrics`, `query_financial_summary`, `generate_pastoral_report`.
