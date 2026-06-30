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

---

# Rodada 2 — Conversão, SEO Local e Mobile

## 010 — Barra fixa inferior no mobile (`MobileStickyBar`)
- **O que:** novo componente sempre visível em telas mobile com dois CTAs:
  esquerda "Simular Orçamento" → `/orcamento`; direita "Falar Agora" → WhatsApp Direto.
  Respeita `env(safe-area-inset-bottom)` para iPhones com notch.
- **Por que:** no mobile o usuário rola muito e perde de vista o CTA. Barra fixa garante
  ação a um toque, separando intenção (qualificar vs. falar direto).
- **Impacto:** Conversão Mobile +++, UX +++, Taxa de clique no CTA estimada +30-60%.

## 011 — FloatingWhatsApp escondido no mobile
- **O que:** o botão flutuante agora só aparece em telas `lg+` (desktop), evitando
  sobreposição com a nova barra fixa mobile.
- **Por que:** dois CTAs sobrepostos confundem; cada formato ganha seu espaço.
- **Impacto:** UX ++, Clareza ++.

## 012 — Funil reduzido para 3 etapas (era 4)
- **O que:** `/orcamento` agora pergunta apenas: categoria → quando começar → experiência.
  A etapa redundante "tipo (primeira/inclusão/reciclagem)" foi removida porque já está
  embutida em "categoria".
- **Por que:** quanto menor o esforço, maior a taxa de conclusão do funil.
- **Impacto:** Conversão de funil ++, Atrito −−.

## 013 — Hero reformulado com sinais de confiança
- **O que:** subtítulo reescrito com foco em diferencial competitivo. Adicionados 7
  badges (carros novos, simulador / direção elétrica, próximo ao DETRAN, curso 100% online,
  atendimento rápido, processo simplificado, 4,9 no Google). CTA principal renomeado para
  "Simular meu Orçamento".
- **Por que:** o usuário precisa entender em <5s **o que** fazemos, **onde** estamos e
  **por que** somos a escolha certa. Badges entregam essa informação visualmente.
- **Impacto:** Conversão Home +++, Bounce −, Tempo na página +, SEO Local + (palavras-chave
  no above-the-fold).

## 014 — Landing page de SEO local `/autoescola-sao-jose-dos-pinhais`
- **O que:** página dedicada com H1 "Autoescola em São José dos Pinhais", hero com
  prova social (4,9/320 avaliações), stats, grid de categorias com links internos para
  `/categoria-a|b|ab`, lista de diferenciais, passo a passo, FAQ com 6 perguntas e
  schema `DrivingSchool + FAQPage + BreadcrumbList`.
- **Por que:** capturar a busca de maior volume comercial da região ("autoescola
  são josé dos pinhais") com uma página pensada para conversão E ranqueamento.
- **Impacto:** SEO Local +++, Conversão ++, Autoridade ++.
- **Bônus:** rota `/cnh-sao-jose-dos-pinhais` aponta para o mesmo conteúdo (variação
  semântica para outra intent de busca).

## 015 — Landing pages por categoria `/categoria-a|b|ab`
- **O que:** componente único `Categoria.tsx` parametrizado por slug, renderizando
  páginas específicas para CNH A, B e AB. Cada uma com hero próprio, lista de
  veículos permitidos, idade mínima, benefícios, passo a passo, trust row, FAQ
  específico e schema `Service + FAQPage + BreadcrumbList`.
- **Por que:** intenção de busca por categoria é muito específica ("tirar cnh categoria
  ab são josé dos pinhais"). Páginas dedicadas ranqueiam melhor que uma genérica e
  permitem CTA direcionado.
- **Impacto:** SEO +++, Conversão ++, Arquitetura de links interna +++ (linka da LP local
  → categoria → funil).

## 016 — Navbar com link da LP local
- **O que:** "Início" no menu substituído por "São José dos Pinhais" apontando para a
  nova LP local.
- **Por que:** dar destaque na navegação principal à página de maior valor SEO local e
  reduzir links inúteis (Início já é a logo).
- **Impacto:** SEO interno ++, Descoberta da LP +++.

## 017 — Sitemap atualizado
- **O que:** adicionadas `/autoescola-sao-jose-dos-pinhais` (prioridade 1.0),
  `/cnh-sao-jose-dos-pinhais` e as três `/categoria-*` (prioridade 0.9).
- **Por que:** sinalizar ao Google a importância das novas LPs para indexação rápida.
- **Impacto:** SEO ++ (tempo de indexação −).

## 018 — Schema.org expandido (LocalBusiness + FAQ + Breadcrumb)
- **O que:** cada LP nova ship com `@graph` contendo `DrivingSchool` ou `Service`,
  `FAQPage` (rich snippets de FAQ no Google) e `BreadcrumbList` (caminho na SERP).
  A LP local inclui `aggregateRating` (4.9 / 320 reviews).
- **Por que:** rich results ocupam mais espaço na SERP e aumentam CTR em 20-40%.
- **Impacto:** CTR orgânico ++, Autoridade ++, SEO local +++.

## 019 — CTAs padronizados com intenção estratégica
- **O que:** botões da LP local e LPs de categoria seguem padrão:
  "Simular meu Orçamento" / "Quero saber valores" / "Quero começar agora" → funil;
  "Tirar dúvidas" / "Falar Agora" / "(41) 3383-3627" → WhatsApp direto ou telefone.
- **Por que:** cada microcopy mapeia intenção do usuário ao canal certo (qualificação
  vs. atendimento imediato).
- **Impacto:** Qualidade do lead +++, Tempo de resposta do atendente −, Conversão ++.

---

## Próximas rodadas (priorizadas)

1. Páginas restantes: `/inclusao-categoria`, `/aulas-praticas`, `/reteste`,
   `/reciclagem`, `/mudanca-de-categoria`.
2. FAQ master com 50–100 perguntas (`/perguntas-frequentes` expandido).
3. Conversão de imagens para WebP e `loading="lazy"` revisado em todo o site.
4. Componente reutilizável `<CTAButton intent="funil|direto">` para eliminar variações
   manuais e impor o padrão da rodada 019.
5. Seção "Depoimentos com fotos reais" + integração de avaliações Google na home.

