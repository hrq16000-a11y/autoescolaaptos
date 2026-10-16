# Contrato de triagem — Rodada 18

Este teste executa a função real `public.submit_triagem(jsonb)` e as migrações históricas necessárias num **PostgreSQL 16 descartável** do GitHub Actions, com exemplos `example.invalid` e IP reservado `192.0.2.55`. Não utiliza credenciais, URLs ou registros de produção, nem faz requisições ao Supabase, CRM ou WhatsApp.

Execução em CI: `.github/workflows/triagem-db-contract.yml`. Para reproduzir localmente, use **somente um banco temporário vazio e dedicado**, com `anon`, `authenticated` e `service_role` ausentes, e execute a partir da raiz do repositório:

```sh
psql -X -v ON_ERROR_STOP=1 -f scripts/test-triagem-db-contract.sql
```

Cobertura: execução autorizada da RPC; honeypot sem gravação; LGPD; mínimo de tempo; nome válido; recibo `created` com linha real; atualização via telefone normalizado; atualização via e-mail sem diferenciar maiúsculas; preservação de `won`; limite de deduplicação de 60 dias; rate limit de 5 leads distintos por IP/10 minutos. O teste falha no primeiro desvio.

**Limites:** o teste é sequencial e verifica apenas a função SQL. Não comprova segurança contra submissões concorrentes, um IP de cliente autenticado de fato, deploy das migrações no banco real, entrega ao CRM, validação LGPD integral ou funcionamento de login/OAuth. A base de teste é descartada ao final do job. A migração do formulário `/1contato` para TanStack continua bloqueada até serem validadas também essas condições. Nenhum dado pessoal real é necessário para esta rodada.


## Rodada 19 — concorrência real em PostgreSQL descartável

A migração `supabase/migrations/20261016163000_triagem_rpc_advisory_locks.sql` altera **somente** a função
`submit_triagem` para adquirir bloqueios de transação, nesta ordem
invariável: IP do request, telefone normalizado, e-mail normalizado.
Isso serializa consultas/atualizações com identidades compartilhadas
antes de consultar a janela de 60 dias e o limite de 5 registros/10min,
sem modificar o JSON devolvido, o contrato de autenticação ou as tabelas.

No GitHub Actions o teste sequencial da R18 aplica essa migração
**apenas no banco efêmero**, seguido por
`scripts/test-triagem-concurrency.py` com conexões `psql` independentes.
Um gatilho de atraso de INSERT temporário aumenta a sobreposição real das
transações e os cenários validam: 2 envios com mesmo telefone, 2 com
mesmo e-mail, 6 simultâneos por um único IP. O teste exige no máximo
uma gravação para contatos duplicados e no máximo cinco para o IP.
Usa exclusivamente IPs reservados e e-mails `example.invalid`.

**Atenção: registrar a migração no Git não garante sua aplicação no
Supabase remoto.** Não executar diretamente em produção nesta rodada.
Antes da ativação, verificar backup, plano de rollback, concorrência
com outras rotas gravadoras, performance/lock waits, webhook downstream
e provisionamento dos privilégios.
