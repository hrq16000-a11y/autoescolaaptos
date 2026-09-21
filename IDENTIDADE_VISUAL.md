# Identidade Visual — Autoescola APTOS

## Logo oficial do portal

A identidade visual oficial do portal passa a usar o arquivo:

`src/assets/logo-aptos-2026.webp`

Esta versão foi aprovada em 21/09/2026 e combina:

- a tipografia esportiva original da marca **APTOS** como elemento principal;
- o contraste vermelho, preto e cinza já associado à marca;
- a identificação **AUTOESCOLA**;
- um elemento automotivo superior com silhueta e linhas de movimento;
- composição horizontal otimizada para uso digital.

O arquivo foi preparado em WebP com fundo transparente e dimensões adequadas para uso no portal.

## Aplicação obrigatória

A logo oficial está aplicada em:

- `src/components/Navbar.tsx` — cabeçalho global;
- `src/components/Footer.tsx` — rodapé global.

Novos componentes institucionais devem reutilizar `logo-aptos-2026.webp` em vez de criar cópias ou variantes locais sem necessidade.

## Regras de uso

1. Não distorcer a proporção da marca.
2. Usar `object-contain` e controlar tamanho por largura/altura máxima.
3. Evitar `scale` para compensar margens internas: o novo asset já está recortado e otimizado.
4. Em fundo claro, a logo pode ser usada diretamente sobre o layout.
5. Em fundo escuro, manter uma área clara/branca de proteção para preservar a leitura das partes pretas da marca.
6. Não aplicar `brightness-0`, `invert` ou filtros que alterem as cores oficiais.
7. Não substituir a tipografia do wordmark APTOS por fonte genérica.
8. Manter o arquivo legado `src/assets/logo.webp` apenas como referência histórica/rollback. Ele não deve ser usado em novas superfícies do portal.

## Tamanhos atuais

### Cabeçalho

- mobile: altura aproximada de 48 px;
- tablet: altura aproximada de 56 px;
- desktop: altura aproximada de 64 px;
- largura limitada de forma responsiva para não competir com a navegação.

### Rodapé

- largura aproximada de 220 px no mobile;
- largura aproximada de 260 px em telas médias ou maiores;
- aplicada sobre bloco branco para garantir contraste no fundo escuro.

## Governança

A fonte canônica da identidade visual no código é:

`src/assets/logo-aptos-2026.webp`

Qualquer futura atualização de marca deve:

1. criar um novo asset versionado;
2. atualizar Navbar e Footer no mesmo PR;
3. registrar a mudança neste documento;
4. preservar a versão anterior para rollback enquanto a nova versão é validada;
5. verificar legibilidade em mobile e desktop antes do merge.

