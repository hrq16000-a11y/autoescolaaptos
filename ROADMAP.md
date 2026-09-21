# ROADMAP — Autoescola APTOS

Priorização com foco em impacto financeiro (matrículas geradas).

## Em execução — Campanha Polo automático

- [ ] Publicar e validar `/carro-automatico` em celular e desktop
- [ ] Medir visualizações e cliques por campanha no painel administrativo
- [ ] Atualizar comunicação da frota e chamada da home
- [ ] Publicar sitemap e testar WhatsApp com UTMs

## P0 — Fazer imediatamente (impacto direto em matrículas)

| ID | Item | Impacto esperado | Métrica |
|----|------|------------------|---------|
| P0-1 | Integrar Microsoft Clarity (token) para heatmap real | Descobrir atrito em CTAs | % scroll até funil |
| P0-2 | Integrar Meta Pixel real + Conversions API | Retargeting qualificado | CPL Meta Ads |
| P0-3 | Google Reviews API real (Places) | +conversão em social proof | CTR reviews→funil |
| P0-4 | Edge function `/api/lead` gravando leadScore + envio p/ CRM | 100% leads capturados | Nº leads/dia |
| P0-5 | A/B test hero: "Simular Orçamento" vs "Falar no WhatsApp" | +10–20% CTR | conv rate hero |

## P1 — Próximas 2 semanas

| ID | Item | Impacto | Métrica |
|----|------|---------|---------|
| P1-1 | Escrever 10 artigos SEO (categorias já criadas) | Tráfego orgânico +30% | sessões orgânicas |
| P1-2 | Página `/precos` com tabela oficial + FAQ preço | Reduz atrito | conv preços→funil |
| P1-3 | Landing `/renovacao-cnh` (categoria ainda ausente) | Novo funil | matrículas renovação |
| P1-4 | Upload de fotos reais de aprovados | Prova social forte | conv aprovados→funil |
| P1-5 | Vídeo depoimentos (3–5) na home | +tempo na página | avg time on page |

## P2 — Próximo mês

| ID | Item | Impacto | Métrica |
|----|------|---------|---------|
| P2-1 | WhatsApp automation (n8n/Make) c/ tag lead_score | Priorização atendimento | tempo 1ª resposta |
| P2-2 | Programa "Indique e Ganhe" com tracking | Aquisição barata | CAC referral |
| P2-3 | Chatbot IA no site (Lovable AI) para dúvidas 24/7 | Captura noturna | leads fora horário |
| P2-4 | Página comparativa vs concorrentes | Autoridade | conv comparador→funil |
| P2-5 | Schema `Course` para cada serviço | Rich snippets | CTR SERP |

## P3 — Backlog estratégico

- App PWA instalável com progresso do aluno
- Área do aluno (login, ver aulas, financeiro)
- Integração ERP interno
- CRM próprio conectado ao lead score
- Google Business Profile automation (posts semanais)
- SEO local para bairros vizinhos (Fazenda Rio Grande, Piraquara)
