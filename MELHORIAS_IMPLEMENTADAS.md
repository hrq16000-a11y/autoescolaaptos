# Melhorias Implementadas — Autoescola APTOS

Lista numerada e contínua. Cada item descreve: **o que / por que / impacto**.

---

## 001 — Centralização da configuração de WhatsApp
- **O que:** criado `src/lib/whatsapp.ts` com dois números separados por função (`WHATSAPP_DIRETO` = 41 99145-3627, `WHATSAPP_FUNIL` = 41 3383-3627) e helper `whatsappLink(message, kind)`.
- **Por que:** o projeto tinha o número direto hardcoded em 30+ locais, impedindo separação estratégica entre atendimento direto e funil de qualificação.
- **Impacto:** UX +, Conversão ++, Manutenção +++. Permite trocar números, mensagens e roteamento de leads em um único arquivo.

## 002 — Página de funil de orçamento `/orcamento`
- **O que:** nova página com fluxo de 4 etapas (categoria → tipo → experiência → prazo), barra de progresso animada, micro-animações de transição entre etapas, resumo das respostas e CTA final que abre o WhatsApp do funil (41 3383-3627) com mensagem pré-preenchida estruturada.
- **Por que:** o usuário pediu para o WhatsApp 2 funcionar como pré-qualificação, descobrindo rapidamente qual orçamento enviar, com no máximo 1–2 perguntas por etapa.
- **Impacto:** Conversão +++, Qualidade do lead +++, Tempo de resposta operacional + (atendente já recebe contexto completo).

## 003 — CTA principal do Hero redirecionado ao funil
- **O que:** botão "Fazer Matrícula Agora" virou "Solicitar Orçamento" apontando para `/orcamento` em vez do WhatsApp direto.
- **Por que:** matrícula direta sem qualificação gera ruído e perde leads frios; o funil captura, qualifica e envia o lead para o atendente já pronto.
- **Impacto:** Conversão ++, Funil +++.

## 004 — Navbar com CTA de orçamento
- **O que:** botão primário da Navbar (desktop e mobile) trocado de "WhatsApp" genérico para "Solicitar Orçamento" → `/orcamento`. O telefone (41) 3383-3627 permanece visível como botão de ligação.
- **Por que:** o CTA mais valioso da página deve apontar para o ativo de conversão mais qualificado.
- **Impacto:** Conversão ++, Clareza UX ++.

## 005 — Botão flutuante mantido como atendimento direto
- **O que:** `FloatingWhatsApp` continua apontando para o WhatsApp direto (41 99145-3627), exatamente como solicitado ("escondido atrás de botões, para quem já está decidido").
- **Por que:** separa intenção: usuário decidido fala direto; usuário pesquisando entra no funil.
- **Impacto:** UX ++, Operação ++.

## 006 — Rastreamento do funil
- **O que:** cada etapa do funil dispara `trackEvent("funnel_step", ...)` e a conclusão dispara `funnel_complete` com todas as respostas via `useAnalytics`.
- **Por que:** permite medir abandono por etapa no GA4 e otimizar copy/ordem das perguntas.
- **Impacto:** Decisão data-driven +++, Performance comercial ++.

## 007 — SEO da página de orçamento
- **O que:** título "Solicitar Orçamento de CNH | Autoescola APTOS São José dos Pinhais", meta description focada em conversão, canonical próprio.
- **Por que:** captura buscas comerciais ("orçamento autoescola", "quanto custa CNH são josé dos pinhais").
- **Impacto:** SEO local ++, Conversão ++.

## 008 — Sitemap atualizado com `/orcamento`
- **O que:** entrada de prioridade 0.95 adicionada ao `public/sitemap.xml`.
- **Por que:** garantir indexação rápida da nova landing de conversão.
- **Impacto:** SEO +.

## 009 — Sinais de confiança no funil
- **O que:** trio de cards (+15 anos, 95% aprovação, "sem enrolação") logo abaixo do formulário, mais badge "Atendimento humano em poucos minutos" no topo.
- **Por que:** reduzir fricção e ansiedade no momento da decisão.
- **Impacto:** Conversão ++.

---

> Esta lista é viva e continuará crescendo a cada nova rodada de melhorias.
