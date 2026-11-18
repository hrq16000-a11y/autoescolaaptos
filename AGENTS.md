# Publicação da Autoescola Aptos

- Use exclusivamente o projeto Vercel `msolus/autoescolaaptos-marketing-api` (`prj_4QJFT2zpKZ1fWhIf2A0jWgpZNKe9`) para site, campanhas, APIs e validações que precisem da Vercel. Não crie projetos adicionais nem recrie os projetos de campanhas e staging.
- A produção Vercel acompanha `main` neste repositório e usa a raiz do repositório. Valide localmente e no CI; se precisar publicar um preview, use o mesmo projeto. O piloto em `migration/tanstack` pode ser validado no CI ou localmente.
- Preserve o endereço da API `https://autoescolaaptos-marketing-api-msolus.vercel.app`: o painel e o Google Apps Script o utilizam. Qualquer migração do domínio oficial exige uma tarefa separada.

## Adoção visual de referências externas (17/11/2026)

- **TasteSkill** (https://www.tasteskill.dev/): usar como referência crítica de direção de arte, identidade, hierarquia e layout; preservar a marca e criar composição original.
- **Transitions.dev** (https://transitions.dev/): adotar microtransições CSS pontuais em menus, filtros, modais e feedback; respeitar teclado, foco, contraste e `prefers-reduced-motion`. Evitar `transition: all`.
- **React Bits** (https://reactbits.dev/): avaliar componentes React gratuitos individualmente e verificar licença MIT + Commons Clause, dependências e custo de hidratação. Sem instalação em massa ou uso de Pro não licenciado.
- **RiseClub** (https://riseclub.tech/): somente benchmark de comunidade, trilhas, notícias e engajamento; nunca copiar conteúdo, interface, imagens ou dados.
- Aplicação específica: Cursos, conversão e formulários. Priorizar legibilidade e CTA no mobile, preservar APIs, projeto Vercel existente e integrações de campanhas.
- Implementar em micro-PR própria, medir 390/1440 e preservar SEO, SSR (se houver), LCP, segurança, privacidade, funis e conteúdo factual. Nenhuma regra aqui autoriza mexer em produção, banco, RLS, DNS ou pagamentos.
