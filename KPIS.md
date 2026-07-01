# KPIs — Autoescola APTOS

Documento vivo dos indicadores que medem sucesso, eventos monitorados e metas.

## 🎯 KPIs de Negócio

| KPI | Definição | Baseline | Meta 90d |
|-----|-----------|----------|----------|
| Leads/mês | Envios completos do funil `/orcamento` + cliques WhatsApp qualificados | — | 200+ |
| Taxa conversão site | (Leads + WhatsApp) / Pageviews | — | ≥ 4% |
| Matrículas atribuídas ao site | Novos alunos que citam site/WhatsApp na origem | — | 60+/mês |
| Custo por lead orgânico | R$ 0 (SEO) | R$ 0 | mantém |
| CTR SERP palavras-chave locais | "autoescola são josé dos pinhais" e long-tails | — | ≥ 6% |

## 📊 KPIs de Produto (client-side)

| KPI | Como é medido | Fonte |
|-----|---------------|-------|
| Sessões | `page_view` (GA4 + dataLayer) | Analytics |
| Tempo médio na página | `time_on_page_90s` + `exit_page` | dataLayer |
| Scroll depth | `useScrollTracking` (25/50/75/100%) | dataLayer |
| Lead score médio | `leadScore.ts` (localStorage) | `/admin/growth` |
| Bounce por página | Sessions com 1 pageview / sessions | GA4 |
| Taxa abandono funil | Sessões que abrem funil e não completam | `funnel_start` vs `generate_lead` |
| Handoff IA→humano | `smart_assistant_handoff` / `smart_assistant_query` | dataLayer |

## 🔔 Eventos Monitorados (GTM/GA4/dataLayer)

### Conversão
- `whatsapp_direto` — clique no WhatsApp direto (celular)
- `whatsapp_funil` — clique no WhatsApp funil (fixo)
- `generate_lead` — funil concluído (padrão Meta/Google Ads, currency BRL)
- `enrollment_intent` — botão "Quero começar" no Hero
- `phone_click` — clique em `tel:`
- `smart_assistant_handoff` — usuário vai do assistente ao WhatsApp

### Engajamento
- `page_view` — nova rota carregada
- `scroll_depth` — 25/50/75/100%
- `time_on_page_90s` — 90s+ na mesma rota
- `smart_assistant_open` — assistente aberto
- `smart_assistant_query` — pergunta enviada (com `intent` e `confidence`)
- `funnel_start` / `funnel_step` — jornada no modal
- `experiment_exposure` / `experiment_conversion` — A/B testing

### Diagnóstico
- `app_error` — capturado pelo ErrorBoundary global
- `404_view` — rota inexistente (logada em `aptos_404_log_v1`)
- `lead_identified` — snapshot de lead score enviado ao Clarity/dataLayer

## 🧪 Objetivos GA4 (Conversion events)

Marcar como conversão na propriedade GA4 `G-JKYFW14Z18`:
- `generate_lead`
- `whatsapp_direto`
- `whatsapp_funil`
- `phone_click`
- `enrollment_intent`
- `smart_assistant_handoff`

## 🎯 Objetivos Google Ads

Labels declaradas em `src/hooks/useAnalytics.ts` (`AW-16491950534`):
- `enrollment_click`, `primeira_habilitacao`, `renovacao_cnh`, `mudanca_categoria`, `curso_reciclagem`, `whatsapp_geral`, `telefone_click`, `consultor_click`.

## 📈 Como consultar

- **Sessão local em tempo real:** `/admin/growth` (noindex)
- **Diagnóstico SEO / 404:** `/diagnostico-seo`
- **GA4/GTM (agregado):** Google Analytics propriedade principal
- **Search Console:** submissão manual do `sitemap.xml`

## 🔄 Cadência

- Revisar KPIs de conversão: semanal
- Revisar SEO / posições: quinzenal
- Auditar Core Web Vitals: mensal (PSI/CrUX)
- Rodar novo experimento A/B: mensal
