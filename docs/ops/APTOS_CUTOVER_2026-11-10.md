# Autoescola APTOS — preparação de migração de domínio (2026-11-10)

**Status: NO-GO para troca de DNS.** Preparação autorizada; troca de DNS e desligamento do Lovable **não autorizados**.
Fonte de código: `hrq16000-a11y/autoescolaaptos` (`main`). Não fazer reset, rebase, squash, force-push ou desconectar Lovable enquanto os commits locais não forem exportados.

## Ambientes

- Site atual: https://autoescolaaptos.com.br (hospedagem ligada ao Lovable).
- Vercel independente: https://autoescolaaptos-campanhas.vercel.app (projeto `prj_PeuQOAUOh6h3ZE3sMicG9SBpTvQq`, equipe `msolus`).
- Deploy Vercel aprovado: `becea227`, `dpl_ALZDg8DAriv77tPnBPomri8H26md`.
- DNS atual (consulta read-only Vercel): nameservers `ns1.myhostvip.com`, `ns2.myhostvip.com`, A apex e www `185.158.133.1`.
- **Nenhum registro DNS alterado nesta rodada.**
- Lovable reportou três commits exclusivos na sua interface; SHA local `050fe58` não foi encontrado no histórico acessível do GitHub. Fazer **backup/exportação do Lovable** antes de qualquer decisão sobre a integração.

## Evidência real e pendências

Read-only E2E: https://github.com/hrq16000-a11y/autoescolaaptos/actions/runs/42936832727

- Vercel: home, /inclusao-moto, /carro-automatico, /1contato, /ofertas, /login, /admin e /admin/ofertas carregam em 390 px sem erro de JavaScript.
- Domínio antigo: /inclusao-moto ainda retorna visual de erro 404, embora HTTP seja 200.
- Triagem /1contato tem overflow de 12 px em 390 px no deploy atual. Corrigido como patch **não publicado** na branch de preparação: usar `inset-0` em vez de `-inset-6` na camada decorativa.
- Supabase Edge /submit-triagem e /marketing-optin: resposta HTTP 200 para OPTIONS, **não equivale a validação de gravação real**. A conexão Supabase disponível não tem permissão de inspecionar o projeto correspondente.
- Novo Vercel tem **zero variáveis de ambiente configuradas**; /api/marketing-optin = 500; /api/admin-marketing-optins = 503; /api/sync-marketing-optins = 500. Não copiar tokens privados de outro projeto sem plano de migração. Separar rotas realmente usadas de duplicatas.
- /ofertas envia para Edge Function Supabase. Os painéis de leads/opt-in Supabase usam endpoints externos. /admin/ofertas-vercel aponta para um projeto separado `autoescolaaptos-marketing-api`. Confirmar integração e CORS pós-cutover.
- /login renderiza, mas login Google usa `@lovable.dev/cloud-auth-js`; **OAuth com conta real ainda não homologado**. Também não foram testados login por senha, e-mail, redirecionamentos ou callbacks.
- Mídias, seleção de moto, UTMs até o início da triagem e link de carro automático: passaram no smoke https://github.com/hrq16000-a11y/autoescolaaptos/actions/runs/42935543309 .
- Plano `msolus` observado como **Vercel Hobby**, que não permite hospedagem de projetos comerciais. Regularizar para Pro ou escolher hospedagem comercial antes de colocar domínio/campanhas pagos na Vercel.

## Gates obrigatórios pré-DNS

1. [ ] Exportar/arquivar versão completa do Lovable (inclusive alterações que não existem no GitHub). NÃO desconectar o Lovable.
2. [ ] Plano de hospedagem adequado ao uso comercial, com custos aprovados.
3. [ ] Validar envio autêntico e consentido da triagem por contato de teste autorizado: recibo `ok/id`, armazenamento, atribuição, painel e WhatsApp, sem duplicidade.
4. [ ] Validar cadastro de ofertas, reaproveitamento de dados existentes, Google Sheets/opt-in e os painéis administrativos sem expor dados.
5. [ ] Homologar Google OAuth, login por e-mail, redirect e logout com conta autorizada no domínio que será usado.
6. [ ] Corrigir/contornar as APIs próprias com erro e decidir sobre a segregação do serviço `marketing-api` existente.
7. [ ] Homologar correção mobile de /1contato, segurança, SEO/canonical/OG, 404 real, sitemap/robots, analytics e LGPD.
8. [ ] Inventariar e exportar zona DNS completa (A/AAAA/CNAME/MX/TXT/SPF/DKIM/DMARC/CAA/SRV e subdomínios), guardar captura dos apontamentos antigos e prover janela de rollback.
9. [ ] Adicionar apex e www no projeto Vercel, completar eventual verificação de posse e emitir TLS, **apenas com autorização específica para o que exigir DNS**.
10. [ ] Aprovar formalmente o cutover e sua janela antes de alterar A/CNAME.

## Procedimento planejado, ainda NÃO executado

- Manter nameservers no provedor atual, MyHostVIP. Não alterar MX, SPF, DKIM, DMARC nem serviços de e-mail.
- Baixar o TTL dos registros web apenas na janela aprovada, e aguardar propagação quando necessário.
- No painel Vercel do projeto correto, adicionar `autoescolaaptos.com.br` (apex) e `www.autoescolaaptos.com.br`; anotar valores A/CNAME de atribuição **fornecidos pelo painel nesse momento**. Eventual TXT de propriedade requer autorização.
- No editor DNS atual, alterar **somente** registros de tráfego web (@ e www) para os valores exatos validados no painel Vercel, depois de teste de pré-virada e homologação.
- Verificar SSL, apex/www, 301, roteamento SPA, API de triagem, /inclusao-moto, /carro-automatico, /ofertas, /login, admin, métricas, favicon, imagem social e relatórios de erros.
- Validar inserção de um lead autorizado pelo proprietário, sem usar dados fictícios, conferir recibo persistido e origem Meta/Google. Só depois ativar anúncios.
- Manter hospedagem Lovable e seus arquivos intactos para retorno.
- Se houver regressão: restaurar registros @/www aos valores anteriores documentados, preservando MX/TXT. Confirmar retorno no navegador e CDN e interromper campanhas até estabilidade.

## Política operacional

Este documento não concede autorização para DNS. Nunca usar `force` em branches; não copiar segredos por chat ou commit; evitar builds de preview desnecessários. Backend e dados de clientes não devem ser recriados nem clonados por conveniência.
