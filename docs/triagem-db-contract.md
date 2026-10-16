# Contrato de triagem — Rodada 18

Este teste executa a função real `public.submit_triagem(jsonb)` e as migrações históricas necessárias num **PostgreSQL 16 descartável** do GitHub Actions, com exemplos `example.invalid` e IP reservado `192.0.2.55`. Não utiliza credenciais, URLs ou registros de produção, nem faz requisições ao Supabase, CRM ou WhatsApp.

Execução em CI: `.github/workflows/triagem-db-contract.yml`. Para reproduzir localmente, use **somente um banco temporário vazio e dedicado**, com `anon`, `authenticated` e `service_role` ausentes, e execute a partir da raiz do repositório:

```sh
psql -X -v ON_ERROR_STOP=1 -f scripts/test-triagem-db-contract.sql
```

Cobertura: execução autorizada da RPC; honeypot sem gravação; LGPD; mínimo de tempo; nome válido; recibo `created` com linha real; atualização via telefone normalizado; atualização via e-mail sem diferenciar maiúsculas; preservação de `won`; limite de deduplicação de 60 dias; rate limit de 5 leads distintos por IP/10 minutos. O teste falha no primeiro desvio.

**Limites:** o teste é sequencial e verifica apenas a função SQL. Não comprova segurança contra submissões concorrentes, um IP de cliente autenticado de fato, deploy das migrações no banco real, entrega ao CRM, validação LGPD integral ou funcionamento de login/OAuth. A base de teste é descartada ao final do job. A migração do formulário `/1contato` para TanStack continua bloqueada até serem validadas também essas condições. Nenhum dado pessoal real é necessário para esta rodada.
