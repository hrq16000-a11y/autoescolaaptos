# Publicação da Autoescola Aptos

- Use exclusivamente o projeto Vercel `msolus/autoescolaaptos-marketing-api` (`prj_4QJFT2zpKZ1fWhIf2A0jWgpZNKe9`) para site, campanhas, APIs e validações que precisem da Vercel. Não crie projetos adicionais nem recrie os projetos de campanhas e staging.
- A produção Vercel acompanha `main` neste repositório e usa a raiz do repositório. Valide localmente e no CI; se precisar publicar um preview, use o mesmo projeto. O piloto em `migration/tanstack` pode ser validado no CI ou localmente.
- Preserve o endereço da API `https://autoescolaaptos-marketing-api-msolus.vercel.app`: o painel e o Google Apps Script o utilizam. Qualquer migração do domínio oficial exige uma tarefa separada.
