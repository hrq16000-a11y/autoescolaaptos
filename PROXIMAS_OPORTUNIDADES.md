# Próximas Oportunidades — Autoescola APTOS

Lista priorizada das próximas melhorias de maior impacto.
Cada item carrega: **objetivo + impacto estimado (SEO / Conversão / UX / Performance)**.

---

## 🚀 ALTA PRIORIDADE (Próxima rodada)

### 01 — Conversão de imagens para WebP/AVIF + lazy loading global
- Objetivo: reduzir 60–80% do peso das imagens em `src/assets`.
- Impacto: Performance +++, SEO ++, Bounce −, LCP −1.5s estimado.

### 02 — Preload do hero LCP + fonts críticas
- `<link rel="preload" as="image" href="hero.webp" fetchpriority="high">` em `index.html`.
- Impacto: Performance +++, Core Web Vitals +++.

### 03 — Migrar todos os CTAs antigos para `<CTAButton />`
- Varredura em: Hero, Navbar, MobileStickyBar, PromoSection, Services, Contact, About, Footer, todas as pages legadas.
- Impacto: Manutenção +++, Analytics +++, A/B testing futuro habilitado.

### 04 — Reescrever `/primeira-habilitacao` e `/aulas-praticas-direcao` no novo formato `<Servico />`
- Hoje são 626 + 501 linhas. Migrar conteúdo para `servicosData.ts` e usar template unificado.
- Impacto: Manutenção +++, Consistência +++, SEO ++.

### 05 — Página `/categoria-c`, `/categoria-d`, `/categoria-e`
- Estender `Categoria.tsx` para categorias profissionais.
- Impacto: SEO local +++ (keywords pouco exploradas), Leads profissionais ++.

### 06 — LP `/cnh-em-curitiba` e `/autoescola-pinhais`
- Expandir SEO para cidades vizinhas (Curitiba, Pinhais, Piraquara, Mandirituba).
- Impacto: SEO regional +++, alcance ++.

### 07 — Implementar `react-helmet-async` (vs `react-helmet`)
- Necessário para SSR-safe meta tags e prepara terreno para futuro SSR.
- Impacto: SEO ++, técnico ++.

---

## 🎯 MÉDIA PRIORIDADE

### 08 — Página `/depoimentos` com depoimentos reais + fotos
- Integrar API Google Places para puxar reviews automáticos.
- Impacto: Conversão +++, autoridade +++.

### 09 — Blog: 10 novos posts focados em keywords long-tail
- "Como tirar CNH em SJP em 2 meses", "Preço da CNH em SJP 2026", "Reciclagem online vale a pena?".
- Impacto: SEO +++, tráfego orgânico +++.

### 10 — Calculadora interativa "Quanto custa minha CNH?"
- Componente que calcula estimativa em tempo real conforme escolhas.
- Impacto: Conversão +++, tempo no site ++.

### 11 — Página `/empresas` para treinamento de frotas
- CNH C/D/E + EAR para colaboradores. Mercado B2B.
- Impacto: Receita ++, mercado novo +++.

### 12 — Pop-up de saída com oferta (`exit intent`)
- Captura último lead antes de abandonar.
- Impacto: Conversão ++ (5-8% lift típico).

### 13 — Form de captura curto na home (acima da dobra)
- Apenas nome + WhatsApp + categoria → CTA "Receber valores".
- Impacto: Conversão +++ (acima do funil de 3 etapas, para mobile).

### 14 — Página de aprovados (`/aprovados`) com fotos + datas
- Conteúdo dinâmico + UGC. Prova social máxima.
- Impacto: Conversão +++, SEO ++.

### 15 — Comparativo "APTOS vs concorrentes" (transparente e leve)
- Tabela com prazos, valores estimados, diferenciais.
- Impacto: Conversão ++, autoridade +.

---

## 🛠 TÉCNICO / INFRA

### 16 — Conectar Google Search Console
- Validar indexação, rastrear impressões reais, monitorar core web vitals.
- Impacto: Visibilidade SEO mensurável +++.

### 17 — Adicionar GA4 Enhanced Conversions
- Hash do telefone/email no envio para Ads. Melhor atribuição.
- Impacto: Ads ROI ++.

### 18 — Sitemap dinâmico via `scripts/generate-sitemap.ts`
- Hoje sitemap é estático; transformar em gerado a partir das rotas.
- Impacto: Manutenção +++.

### 19 — `robots.txt` enriquecido com `Sitemap:` directive
- Hoje OK, validar e adicionar `Crawl-delay` apropriado.
- Impacto: SEO +.

### 20 — Implementar PWA (manifest + service worker)
- Instalável no celular como app. Ícone na home.
- Impacto: UX ++, retenção ++.

### 21 — Schema `Course` para `/reciclagem-cnh` e cursos
- Rich results de cursos no Google.
- Impacto: SEO ++.

### 22 — Schema `Event` para datas de turmas (se aplicável)
- Aparição em "eventos próximos" no Google.
- Impacto: SEO +.

---

## 🎨 UX / VISUAL

### 23 — Animação Lottie no Hero (carro/moto saindo)
- Substituir imagem estática por animação leve.
- Impacto: UX ++, percepção de modernidade ++.

### 24 — Modo escuro (toggle no topo)
- Mais 5% dos usuários preferem. Engaja techie/jovem.
- Impacto: UX +.

### 25 — Atalho de teclado para o funil (?)
- Power users e teste de UX experimental.
- Impacto: UX +.

### 26 — Mapa interativo do DETRAN-PR + APTOS
- Iframe embed do Google Maps com rota.
- Impacto: UX ++, confiança +.

---

## 📞 ATENDIMENTO

### 27 — Chatbot WhatsApp com IA para tirar dúvidas básicas
- Reduz carga humana. Disponível 24/7.
- Impacto: Operação ++, conversão fora do horário comercial +++.

### 28 — Integração com CRM (HubSpot ou Pipedrive)
- Leads do funil entram direto no pipeline.
- Impacto: Vendas +++.

### 29 — E-mail nurturing para leads que não fecharam
- Sequência de 5 e-mails durante 30 dias.
- Impacto: Conversão ++ (10-15% recuperação típica).

### 30 — SMS de lembrete antes de exames
- Reduz no-shows em exames agendados.
- Impacto: Operação ++, satisfação aluno ++.

---

> Lista revisada e priorizada para a Rodada 4.
> Estimativa: as primeiras 5 entregam ~70% do impacto restante em SEO + conversão.
