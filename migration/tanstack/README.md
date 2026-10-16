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
