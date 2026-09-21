# Landing do Polo automático e painel de campanhas

## Resultado esperado

Publicar uma landing oficial em `/carro-automatico`, rápida e focada em conversas no WhatsApp, integrar a campanha ao site e ao sitemap, atualizar a comunicação sobre a frota automática e criar uma visão administrativa por campanha.

## Auditoria: o que já existe e será reutilizado

- A página-base `CarroAutomatico` já foi criada com estrutura enxuta, visual vermelho/preto/branco, prova social, localização e CTAs móveis.
- O WhatsApp oficial está centralizado: **(41) 99145-3627** para contato direto e **(41) 3383-3627** para o funil. A campanha usará o contato direto e a mensagem específica do Polo.
- GA4, Google Tag Manager, Google Ads, Meta Pixel (quando carregado), Clarity e o `dataLayer` já passam pela camada unificada de eventos. Não serão instalados pixels ou tags adicionais.
- PageView global já é emitido em toda troca de página. A landing já identifica visualização da campanha e cliques por posição.
- As UTMs já podem ser lidas sem alterar a URL. A campanha preservará `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` e `utm_term` nos eventos.
- O site já possui SEO reutilizável, prova social, componentes de botões, mapa de rotas, sitemap e bloqueio de páginas administrativas no `robots.txt`.
- O painel de leads e `/admin/ofertas` já usam os mesmos estados comerciais: novo, contatado, agendado, ganho e perdido.
- O projeto já tem uma foto real de veículo da APTOS, mas ela **não é a arte específica do Polo automático**. Os arquivos enviados disponíveis são promoções antigas e fotos institucionais; nenhum corresponde ao banner solicitado.

## Implementação

### 1. Finalizar e ligar a landing

- Registrar `/carro-automatico` no roteamento existente, sem header/menu desnecessário na experiência de anúncio.
- Manter a página objetiva: chamada principal, veículo, benefícios comprovados, motivos para escolher a APTOS, localização, prova social e CTA final.
- Reutilizar o WhatsApp oficial e a mensagem: “Olá! Vim pelo anúncio do Polo automático da Autoescola APTOS e gostaria de saber mais sobre as aulas.”
- Acrescentar dados estruturados `Service`, `DrivingSchool` e `BreadcrumbList`, além dos metadados e Open Graph exclusivos.
- Incluir a URL no sitemap com data atual e prioridade de campanha.
- Usar a foto real atual como imagem provisória, sem afirmar que ela é o Polo. Assim que o banner correto for enviado, substituir e gerar WebP responsivo sem mudar a estrutura.

### 2. Rastreamento sem duplicidade

- Manter o PageView global e emitir eventos específicos da campanha uma única vez.
- Padronizar os eventos da landing para visualização, clique de CTA e entrega ao WhatsApp, incluindo campanha, posição do botão, dispositivo e UTMs.
- Preservar todos os parâmetros recebidos na URL e carregá-los nos eventos.
- Não registrar clique como lead confirmado: o painel separará **cliques/entregas ao WhatsApp** de **leads realmente capturados** por formulário.

### 3. Painel de campanhas

- Criar `/admin/campanhas`, protegido pelo mesmo acesso administrativo já existente.
- Adicionar uma área para cada campanha cadastrada no site, começando por Polo automático, aniversário, indique um amigo e campanha geral.
- Mostrar por campanha e período: visualizações, cliques, entregas ao WhatsApp, taxa de clique, leads capturados e distribuição por UTM/dispositivo.
- Persistir eventos agregáveis no Lovable Cloud por uma função validada, evitando depender apenas do navegador do administrador.
- Reutilizar os status e filtros comerciais do painel atual; leads continuarão vinculados por origem/UTM, sem criar um CRM paralelo.
- Adicionar o acesso “Campanhas” na página `/admin`.

### 4. Comunicação do site e home

- Corrigir somente textos que dizem que a APTOS oferece **apenas carros manuais**. A comunicação passará a informar opções manual e automática, sem afirmar que todos os exames ou todos os veículos são automáticos.
- Atualizar os pontos encontrados em serviços, FAQ, aulas práticas e comparativos.
- Criar na home uma chamada visual “Agora com moto e carro automático”, ligada à nova landing.
- Trocar a aparência laranja dos botões principais por vermelho APTOS e adicionar transições discretas de brilho/elevação, preservando contraste, acessibilidade e o azul institucional de apoio.

### 5. Validação e publicação

- Validar tipagem, auditoria de SEO e ausência de regressão das páginas `/`, `/orcamento`, `/1contato`, `/admin/ofertas` e `/admin`.
- Testar `/carro-automatico` em celular e desktop: enquadramento, barra fixa, ausência de sobreposição, WhatsApp oficial, mensagem preenchida, UTMs e eventos sem duplicidade.
- Conferir o sitemap publicado e publicar o site.

## Informação ainda necessária

- **Banner oficial do Polo automático:** não está nos arquivos atualmente enviados. A publicação poderá seguir com a foto real existente da APTOS como provisória; a troca pelo banner será feita quando o arquivo correto chegar.

## Detalhes técnicos

- React/Vite e componentes atuais serão mantidos.
- Nova persistência seguirá as regras de acesso e segurança já adotadas no Lovable Cloud.
- Nenhuma configuração existente de GA4, Google Ads, GTM, Meta Pixel, WhatsApp, CRM, autenticação ou automação será removida.
- A métrica “lead” será contabilizada somente quando houver registro real; abertura do WhatsApp será exibida separadamente como conversão de clique/handoff.
