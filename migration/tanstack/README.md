# Migração TanStack Start — ambiente isolado

Esta aplicação valida a nova infraestrutura; não é o site APTOS migrado.
Não trocar o diretório de publicação de produção para esta pasta enquanto as rotas reais não forem migradas e validadas.

Requer Node >=22.12.0. O site atual permanece com Vite 5: a versão atual do Start exige Vite 8, por isso esta etapa mantém dependências isoladas.

```sh
npm ci --prefix migration/tanstack
npm run build --prefix migration/tanstack
npm run typecheck --prefix migration/tanstack
npm run dev --prefix migration/tanstack
```

Porta local: 3001. Todas as páginas deste piloto têm noindex,nofollow.
Nenhuma conexão com banco, login ou alteração de dados é feita pelo piloto.
Próximo marco: migrar roteamento e componentes reais, validar conteúdo SSR, metadados, hidratação, navegação, autenticação e conversão; então configurar preview de hospedagem e publicar o site completo.

## Primeira rota migrada

`/perguntas-frequentes` reutiliza `src/pages/FAQ.tsx` e os dados originais.
Metadados são entregues no head do TanStack; o Helmet é substituído somente neste piloto.
O adaptador temporário cobre Link e useLocation. Rotas ainda não migradas abrem o site público.
Build exige também `npm ci` na raiz para componentes compartilhados.
`npm run check:ssr --prefix migration/tanstack` valida HTML, metadados e CSS gerado.
O typecheck cobre o piloto; a página legada compartilhada mantém sua verificação no projeto original.
Validação visual, hidratação e interação em navegador ainda pendentes.

## Rotas adicionais

Também migradas no piloto: `/primeira-habilitacao`, `/exames-detran`, `/resolucao-1020-2025`.
Os objetos JSON-LD foram exportados dos componentes originais sem alterar conteúdo,
para reutilização pelo head do servidor. Os layouts seguem nos mesmos componentes.
O adaptador ainda usa navegação nativa; navegação cliente completa e validação em navegador estão pendentes.

## Home migrada

`/` reutiliza `src/pages/Index.tsx`, seus componentes, dados estruturados e FunnelProvider real.
A ponte useNavigate mantém navegação nativa durante a migração. SSR e links WhatsApp são verificados no CI.
A home não foi aprovada visualmente nem para cliques em navegador nesta etapa.

## Navegação e testes de navegador

Rotas migradas agora usam Link e navigate do TanStack; destinos não migrados continuam no site público.
`npm run test:browser --prefix migration/tanstack` cobre desktop e celular: hidratação da home,
ausência de overflow horizontal, abertura e fechamento do modal, navegação sem recarga e accordion FAQ.
O CI instala Chromium e salva screenshots/traces se ocorrer falha. Nenhum envio de formulário ou WhatsApp é executado pelo teste.

## Expansão e validação do build de produção

Rotas adicionais: `/formas-estudo-teorico`, `/aulas-praticas-direcao`, `/por-que-autoescola-credenciada` e `/carro-automatico`.
São nove páginas reais no piloto, com os schemas originais.
As variáveis existentes são carregadas do diretório raiz por envDir; nenhuma chave privilegiada é adicionada.
O Playwright agora usa `serve:production`, um adaptador HTTP local/CI para testar o bundle construído.
O modo dev apresentou incompatibilidade CommonJS/React e ainda precisa de ajuste; não usar esse adaptador de teste como configuração de hospedagem.

## Blog e bairros

Índices e páginas por slug reutilizam componentes e dados originais, com schema entregue no head.
Artigo inexistente redireciona para `/blog` com HTTP 302; bairro inexistente retorna HTTP 404.
Datas do blog usam UTC para preservar o dia publicado entre servidor e navegador.
As novas rotas têm verificações SSR e cenários Playwright próprios.

## Rodada 7 — evidência visual e pré-requisitos de hospedagem

A CI do piloto guarda um relatório Playwright com capturas de home, blog e
bairro Centro em **desktop e celular**, quando os testes passam. O artefato
`tanstack-visual-evidence` expira em 14 dias; as capturas são evidência para
revisão humana, **não** aprovação automática de fidelidade visual.

O `check:ssr` impede a promoção inadvertida de rotas de conteúdo caso o piloto
perca `noindex, nofollow` ou produza JSON-LD inválido. Esse `noindex` é
intencional para o ambiente de testes e não deve ser copiado para uma
implantação pública definitiva sem revisão de SEO.

### Condições antes da migração da hospedagem

1. Manter `autoescolaaptos.com.br` na aplicação Vite existente; não modificar
   DNS, domínio no Lovable ou diretório de publicação durante este piloto.
2. Hospedar a aplicação TanStack **em um ambiente de pré-produção isolado**,
   com um adaptador de servidor próprio, HTTPS, credenciais limitadas e
   `noindex`; o adaptador `serve-production.mjs` serve somente para CI/local.
3. Migrar e validar rotas restantes, sobretudo `/orcamento`, `/login`,
   autorização OAuth, campanhas e formulários, sem alterar os dois destinos
   WhatsApp (direto e funil). Executar testes reais de conversão com
   autorização dos responsáveis e sem enviar contatos de teste a alunos.
4. Conferir manualmente os screenshots de desktop/celular e metadados
   HTTP/SSR/SEO; aplicar corte gradual **somente após** aprovação explícita.
5. Registrar DNS e configurações anteriores, manter o deploy Vite funcional e
   planejar reversão verificável: restaurar o roteamento/DNS anterior,
   republicar a versão Vite aprovada e executar o smoke test de produção.
   Nunca presumir rollback concluído sem verificar domínio e funções.

O processo acima é um checklist de liberação; **não** executa troca de
hospedagem ou rollback automaticamente.

## Rodada 8 — simulação do funil e pré-produção independente

O piloto agora monta `/orcamento` por SSR reutilizando a página legada,
sem mudar a home pública nem o número ou a mensagem do WhatsApp. O Playwright
verifica as 3 respostas e inspeciona o `href` final (triagem
`554133833627`) com desktop e celular, sem clicar, enviar lead,
abrir WhatsApp ou escrever em serviços externos.

O ambiente segue **sem hospedagem de pré-produção externa configurada**.
Para disponibilizá-lo por domínio independente antes do corte, escolher
primeiro um provedor com suporte real a SSR/Node 22 e preview privado,
configurar um runtime seguro (o adaptador `serve-production.mjs` atual
serve somente para CI/local), HTTPS, variáveis públicas estritamente
necessárias, logs sem dados pessoais, autenticação e `noindex` com
confirmação pelo cabeçalho/HTML. Não duplicar chaves privilegiadas nem
assumir compatibilidade do login Lovable/Supabase sem testes.

O ponto de retorno continua sendo a aplicação Vite já hospedada:
nenhuma troca de DNS/hosting ocorre nesta rodada. Antes do corte real:
validar formulários, consentimento OAuth, páginas ainda não migradas,
funil completo, CTR de CTAs, analytics, SEO e evidências visuais.

## Rodada 9 — servidor independente de pré-produção (sem troca de hospedagem)

O comando `npm run serve:preview --prefix migration/tanstack` executa
**o bundle SSR compilado**, sem plugins nem servidor Lovable:

```sh
npm ci --no-audit --no-fund
npm ci --prefix migration/tanstack --no-audit --no-fund
npm run build --prefix migration/tanstack
npm run check:preview --prefix migration/tanstack
npm run serve:preview --prefix migration/tanstack
```

O serviço abre em `127.0.0.1:3002` por padrão e responde a
`/healthz`. Todas as respostas incluem `X-Robots-Tag:
noindex, nofollow, noarchive`, políticas de proteção e cache `no-store`.
Aceita apenas GET/HEAD, servindo `/assets/*` somente do diretório
compilado. O CI testa SSR, headers, 404, métodos e assets.

**O servidor não hospeda o site publicamente nem substitui o Vite.**
Expor fora de loopback requer opt-in `APTOS_PREVIEW_ALLOW_PUBLIC=1` e
um ingresso HTTPS **autenticado e restrito** configurado por um provedor:
o opt-in sozinho NÃO é controle de acesso. Nunca exponha a aplicação
a terceiros sem esse ingresso e sem validar privacidade, logs,
monitoramento, CSP compatível, limites de requisição e variáveis de ambiente.
Não usar esta configuração como servidor público final.

A aplicação antiga continua no domínio oficial, sem alteração de DNS,
sem migração de login/OAuth e sem envio de leads. O teste HTTP de produção
continuará comprovando qual commit chegou ao site atual.

## Rodada 10 — Vercel protegida e plugin Nitro

Projeto Vercel separado: `autoescolaaptos-tanstack-staging` (equipe `msolus`).
Usa Node.js 22, raiz `migration/tanstack`, código externo à raiz permitido,
SSO da Vercel em **todas** as implantações e nenhum domínio customizado.
O código público da Aptos **não** é redirecionado para essa pré-produção.

A primeira implantação compilou, mas respondeu HTTP 404. A causa foi ausência
do adaptador Nitro necessário para emitir as funções SSR no build da Vercel.
No `vite.config.ts`, Nitro Vercel é ativado somente quando `VERCEL=1`;
o build local/CI permanece usando o SSR original para não quebrar os testes.

A dependência `nitro` é fixada exatamente na versão
`3.0.260903-beta`. Exigir `npm ci`, lockfile sincronizado e validação
concreta de rotas HTTP protegidas na Vercel, inclusive `/orcamento` e 404,
antes de classificar o ambiente como funcional. O build `READY` sozinho
NÃO prova que o conteúdo esteja acessível.

A hospedagem externa continua um **piloto** com `noindex`; jamais conectar
DNS oficial ou retirar SSO sem aprovação e testes completos de segurança,
identidade visual, autenticação, matrícula e conversão.

### Evidência do staging Vercel (primeiro teste)

Projeto `prj_mTngOVoFszQ73DjFydGfYS9ICmLJ`, equipe `msolus`.
A primeira implantação sem Nitro (`dpl_87qqCSmPgxit69WxLuFaTbxvkFWv`)
foi READY, mas devolvia 404. Após adicionar Nitro ao build Vercel,
`dpl_CVkCBKgEUW29k4MeRTA6CqFheLHZ` respondeu HTTP 200 na
home e em `/orcamento`, com HTML SSR e `X-Robots-Tag` de noindex.
O acesso permanece protegido via SSO (deploymentType=all).
Os checks GitHub e o deploy definitivo pós-merge devem ser validados
antes do encerramento da rodada; READY sozinho não comprova a publicação.


## Rodada 11 — separação de autenticação e conversões

O piloto TanStack na Vercel continua com **SSO habilitado em todos os deploys**
e cabeçalhos `noindex`; isso é diferente da autenticação funcional do portal.
O login do portal, o consentimento `/.lovable/oauth/consent`, o admin e a
página de agradecimento **não** foram migrados: devem retornar 404 no piloto
até que autenticação, autorização, callbacks, redirecionamentos, prevenção de
CSRF e sessões sejam migrados e revisados especificamente.

A CI agora verifica essas respostas tanto no SSR como no navegador, sem
usar contas, tokens, `authorization_id` reais ou credenciais. O navegador
também percorre mais duas combinações de orçamento (moto e inclusão),
inspeciona o texto e o número da triagem `554133833627` sem clicar,
enviar leads ou iniciar uma conversa no WhatsApp.

Esses testes **não validam** autenticação real nem a entrega de mensagens;
essas duas capacidades precisam de testes separados e autorizados antes de
qualquer troca de hospedagem. Não desativar SSO ou remover noindex para
facilitar o teste.
