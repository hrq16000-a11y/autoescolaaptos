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
