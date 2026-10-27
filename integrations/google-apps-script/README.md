# Autoescola APTOS — sincronização de Ofertas sem conta de serviço Google

## Objetivo

Sincronizar automaticamente a planilha oficial `Optins` com os cadastros de Ofertas Exclusivas guardados em **Vercel Blob privada** sem Google Cloud, credencial JSON ou Lovable.

A solução é um **Google Apps Script vinculado à própria planilha**. Depois de uma autorização única pelo proprietário, consulta a API administrativa Vercel usando credencial privada e concilia a cada **5 minutos**, preservando cadastros históricos e evitando repetição de telefone/ID.

> **Limitação real:** não é possível instalar/autorizar o Apps Script por GitHub ou pela API de células do Google Sheets. O proprietário da planilha precisa realizar os passos de instalação abaixo **uma única vez**. O código já está pronto no repositório, não é necessário desenvolver nada no Lovable.

## Ativação (somente proprietário ou editor de absoluta confiança)

1. Abra a [planilha oficial](https://docs.google.com/spreadsheets/d/1ta5aB4OxmF9dxCEx8Ql0S2K0cwYamW6rrxh-2FlO9x0/edit).
2. Selecione **Extensões → Apps Script**. Substitua o conteúdo inicial de `Código.gs` pelo conteúdo integral de [AutoescolaAptosOfertas.gs](./AutoescolaAptosOfertas.gs). Salve o projeto como **APTOS - Ofertas - Sync**.
3. Volte à planilha e atualize a página. No menu **APTOS | Ofertas**, escolha **Ativar sincronização automática**.
4. Autorize os acessos ao Google solicitados pelo Apps Script. Quando a caixa da APTOS pedir, informe a credencial vigente da variável `APTOS_OFFERS_ADMIN_TOKEN` da **Vercel → projeto `autoescolaaptos-marketing-api` → Environment Variables**. **Nunca** cole esse segredo em células, GitHub, WhatsApp, chat ou tickets.
5. O script faz a primeira conciliação imediatamente e cria o gatilho privado para repetir a cada 5 minutos. Use o menu **Consultar último resultado** para acompanhar números (sem expor telefones).

A credencial é armazenada em `PropertiesService.getUserProperties()` do Apps Script, específica do usuário que configurou o gatilho, não nas células. O script usa o painel Vercel já existente, sem criar endpoint público nem mudar DNS. Para revogar, menu **Desativar sincronização**.

**Segurança:** editores da mesma planilha podem ter permissão para editar scripts vinculados a ela. Portanto, use somente em planilha compartilhada com **editores de confiança**; caso haja colaboradores externos com acesso de edição, restrinja as permissões antes de instalar. A variável administrativa concede acesso somente leitura aos números e consentimentos, não deve ser redistribuída.

## Contrato de dados e integridade

- Origem: `GET https://autoescolaaptos-marketing-api-msolus.vercel.app/api/admin-marketing-optins?limit=40`, autenticado no header `X-Aptos-Admin-Token`.
- Destino: somente aba `Optins` da planilha cujo ID é validado no script.
- Chave de conciliação: coluna **B (id)** ou coluna **C (telefone)** normalizado, com ou sem o código de país `55`.
- Insere somente registros com `lgpd_aceite === true` e telefone/data válidos.
- Colunas antigas preservadas: A `created_at`, B `id`, C `telefone`, D `status`, E `campaign_source`, F vazio, G `origem_url` se disponível, H/I vazios, J `data_aceite`. O painel Vercel não retorna IP, user-agent nem URL de origem, logo não se fabricam esses dados.
- A primeira execução recupera registros válidos da Vercel que não estão na planilha; as seguintes são idempotentes.
- Os 22 registros históricos não são alterados.
- Não há envio de mensagem pelo WhatsApp nesta integração. O envio permanece manual pelo participante.

## Limites

O script lê todas as páginas da API administrativa, até 4.000 registros por execução; acima disso, falha de forma explícita antes de inserir e exige revisão da paginação. O gatilho do Google depende das cotas e autorização do Apps Script. Não há garantias de execução em tempo real; o intervalo previsto é de **5 minutos**, quando o gatilho está ativo.

## Testes

`node --test tests/apps-script-optins.test.mjs` — testes com dados sintéticos, sem acessar Vercel ou Google reais. A PR de introdução deve passar no CI antes da publicação.

## Alternativa anterior

A PR #70 permanece no GitHub: integração direta via Google Sheets API usando `GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON`. Enquanto essa variável não for configurada, a API preserva o opt-in na Blob, mas não escreve no Sheets. Este Apps Script **substitui a necessidade da conta de serviço**: a sincronização é feita do lado do Google, por gatilho autorizado, consultando a Blob através da API administrativa.
