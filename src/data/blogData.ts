export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  image: string;
  readTime: string;
  publishedAt: string;
  content: string;
  keywords: string[];
}

export const blogCategories = [
  { id: "all", name: "Todos" },
  { id: "direcao-defensiva", name: "Direção Defensiva" },
  { id: "prova-detran", name: "Prova do DETRAN" },
  { id: "legislacao", name: "Legislação" },
  { id: "dicas", name: "Dicas" },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "o-que-e-direcao-defensiva",
    title: "O que é Direção Defensiva? Guia Completo para Motoristas",
    description: "Aprenda os princípios fundamentais da direção defensiva e como aplicá-los no dia a dia para evitar acidentes e dirigir com mais segurança.",
    category: "direcao-defensiva",
    image: "/placeholder.svg",
    readTime: "8 min",
    publishedAt: "2024-12-01",
    keywords: ["direção defensiva", "segurança no trânsito", "autoescola são josé dos pinhais"],
    content: `
## O que é Direção Defensiva?

A **direção defensiva** é um conjunto de técnicas e atitudes que todo motorista deve adotar para prevenir acidentes de trânsito. Não se trata apenas de seguir as regras, mas de antecipar situações de risco e agir preventivamente.

## Os 5 Elementos da Direção Defensiva

### 1. Conhecimento
Conhecer as leis de trânsito, as características do seu veículo e as condições das vias por onde você trafega é fundamental.

### 2. Atenção
Mantenha o foco total na direção. Evite distrações como celular, conversas intensas ou ajustes no rádio enquanto dirige.

### 3. Previsão
Antecipe as ações de outros motoristas e pedestres. Observe sinais de comportamento perigoso e prepare-se para reagir.

### 4. Decisão
Após identificar um perigo, tome decisões rápidas e corretas. A hesitação pode ser tão perigosa quanto uma decisão errada.

### 5. Habilidade
Domine as técnicas de direção: frenagem, mudança de faixa, estacionamento e manobras em situações adversas.

## Dicas Práticas de Direção Defensiva

- **Mantenha distância segura**: Use a regra dos 2 segundos em condições normais e 4 segundos em chuva
- **Verifique os retrovisores constantemente**: A cada 5-8 segundos
- **Sinalize suas intenções**: Use setas com antecedência
- **Adapte-se às condições**: Reduza a velocidade em chuva, neblina ou à noite

## Por que a Direção Defensiva é Importante?

Segundo dados do DETRAN-PR, a maioria dos acidentes poderia ser evitada com práticas de direção defensiva. Na **Autoescola APTOS** em São José dos Pinhais, ensinamos não apenas a passar na prova, mas a ser um motorista consciente e seguro.

## Conclusão

A direção defensiva salva vidas. Invista em conhecimento e pratique sempre essas técnicas. Se você está em São José dos Pinhais e quer aprender direção defensiva com profissionais experientes, venha conhecer a Autoescola APTOS.
    `
  },
  {
    slug: "como-passar-prova-teorica-detran",
    title: "Como Passar na Prova Teórica do DETRAN: 15 Dicas Infalíveis",
    description: "Descubra as melhores estratégias para ser aprovado na prova teórica do DETRAN de primeira. Dicas de estudo, simulados e o que mais cai na prova.",
    category: "prova-detran",
    image: "/placeholder.svg",
    readTime: "10 min",
    publishedAt: "2024-11-28",
    keywords: ["prova teórica detran", "como passar no detran", "simulado detran", "autoescola são josé dos pinhais"],
    content: `
## A Prova Teórica do DETRAN

A prova teórica é o primeiro grande desafio para quem está tirando a CNH. Com 30 questões e necessidade de acertar pelo menos 21 (70%), muitos candidatos ficam nervosos. Mas com a preparação certa, a aprovação é garantida!

## 15 Dicas para Passar na Prova Teórica

### Preparação

1. **Estude o material oficial**: O CTB (Código de Trânsito Brasileiro) é a base de todas as questões
2. **Faça simulados online**: Pratique com questões similares às da prova real
3. **Estude um pouco todos os dias**: 30 minutos diários são mais eficientes que 5 horas em um dia
4. **Anote os erros**: Revise as questões que você errou nos simulados
5. **Use aplicativos de estudo**: Existem diversos apps gratuitos com questões do DETRAN

### Conteúdo que Mais Cai

6. **Sinalização**: Placas de regulamentação, advertência e indicação
7. **Legislação**: Infrações, penalidades e crimes de trânsito
8. **Direção defensiva**: Os 5 elementos e técnicas de prevenção
9. **Primeiros socorros**: Procedimentos básicos em acidentes
10. **Meio ambiente**: Poluição veicular e direção econômica

### No Dia da Prova

11. **Durma bem na noite anterior**: Descanse pelo menos 8 horas
12. **Chegue com antecedência**: 30 minutos antes é o ideal
13. **Leia cada questão com calma**: Não tenha pressa
14. **Atenção às pegadinhas**: Palavras como "sempre", "nunca", "somente" podem mudar o sentido
15. **Confie no seu preparo**: Você estudou, está pronto!

## Principais Erros dos Candidatos

- Não estudar sinalização de trânsito adequadamente
- Ignorar questões sobre meio ambiente
- Não fazer simulados suficientes
- Estudar apenas na véspera da prova

## Como a Autoescola APTOS Pode Ajudar

Na **Autoescola APTOS** em São José dos Pinhais, oferecemos:
- Aulas teóricas completas com instrutores experientes
- Acesso a simulados exclusivos
- Material de estudo atualizado
- Acompanhamento individual do progresso

## Conclusão

A aprovação na prova teórica depende de dedicação e método de estudo. Seguindo essas dicas e contando com uma boa autoescola, você estará pronto para conquistar sua CNH!
    `
  },
  {
    slug: "principais-placas-de-transito",
    title: "Principais Placas de Trânsito: Guia Completo com Imagens",
    description: "Conheça as placas de trânsito mais importantes: regulamentação, advertência e indicação. Essencial para a prova do DETRAN e para dirigir com segurança.",
    category: "legislacao",
    image: "/placeholder.svg",
    readTime: "12 min",
    publishedAt: "2024-11-25",
    keywords: ["placas de trânsito", "sinalização", "legislação trânsito", "prova detran"],
    content: `
## Entendendo as Placas de Trânsito

As placas de trânsito são a linguagem universal das vias. Conhecê-las é fundamental para a segurança de todos e é um dos temas mais cobrados na prova do DETRAN.

## Tipos de Placas de Trânsito

### 1. Placas de Regulamentação (Fundo Branco, Borda Vermelha)

As placas de regulamentação são **obrigatórias** e informam sobre obrigações, limitações, proibições ou restrições.

**Principais placas:**
- **R-1 (Parada Obrigatória)**: O famoso "PARE"
- **R-2 (Dê a preferência)**: Triângulo invertido
- **R-6a (Proibido estacionar)**: Círculo com "E" cortado
- **R-19 (Velocidade máxima)**: Indica o limite de velocidade

### 2. Placas de Advertência (Fundo Amarelo)

Alertam sobre condições potencialmente perigosas na via.

**Principais placas:**
- **A-1a (Curva acentuada à esquerda)**
- **A-5 (Pista sinuosa à esquerda)**
- **A-26a (Sentido único)**
- **A-32a (Passagem de pedestres)**

### 3. Placas de Indicação (Fundo Verde ou Azul)

Orientam sobre direções, serviços e pontos de interesse.

**Principais placas:**
- **Indicação de destino** (fundo verde)
- **Serviços auxiliares** (fundo azul): hospital, restaurante, hotel
- **Atrativos turísticos** (fundo marrom)

## Cores e Significados

| Cor de Fundo | Significado |
|--------------|-------------|
| Branco com borda vermelha | Regulamentação |
| Amarelo | Advertência |
| Verde | Indicação de direção |
| Azul | Serviços auxiliares |
| Marrom | Turismo |
| Laranja | Obras |

## Dicas para Memorizar as Placas

1. **Agrupe por categoria**: Estude todas as placas de regulamentação juntas
2. **Use flashcards**: Faça cartões com a placa de um lado e o significado do outro
3. **Observe no trânsito**: Durante o dia, identifique as placas que você vê
4. **Faça simulados específicos**: Foque em questões sobre sinalização

## Na Autoescola APTOS

Oferecemos material didático completo sobre sinalização e aulas práticas onde você aprende a identificar e respeitar as placas em situações reais de trânsito em São José dos Pinhais.
    `
  },
  {
    slug: "como-passar-prova-pratica-detran",
    title: "Prova Prática do DETRAN: O que Avaliam e Como Ser Aprovado",
    description: "Saiba exatamente o que os examinadores avaliam na prova prática do DETRAN e aprenda técnicas para evitar os erros mais comuns.",
    category: "prova-detran",
    image: "/placeholder.svg",
    readTime: "9 min",
    publishedAt: "2024-11-20",
    keywords: ["prova prática detran", "baliza", "exame de direção", "autoescola são josé dos pinhais"],
    content: `
## A Prova Prática do DETRAN

A prova prática é o último passo para conquistar sua CNH. É natural sentir nervosismo, mas com preparo adequado e conhecimento do que será avaliado, você pode ir confiante.

## O que é Avaliado na Prova Prática?

### 1. Verificações Iniciais
- Ajuste do banco e retrovisores
- Verificação do cinto de segurança
- Conhecimento dos comandos do veículo

### 2. Manobras no Pátio
- **Baliza (estacionamento)**: Você tem 3 tentativas
- **Rampa**: Arranque em subida sem deixar o carro descer

### 3. Percurso em Via Pública
- Conversões à esquerda e direita
- Mudanças de faixa
- Respeito à sinalização
- Velocidade adequada
- Uso correto das setas

## Erros Eliminatórios

Alguns erros causam reprovação imediata:
- Desobedecer sinalização de parada
- Avançar sinal vermelho
- Não usar cinto de segurança
- Exceder velocidade permitida
- Subir na calçada
- Cometer infração de trânsito

## Erros que Perdem Pontos

Cada erro tem uma pontuação negativa. Você reprova se acumular mais que determinado número de pontos:
- Não sinalizar com seta
- Controle irregular de embreagem
- Usar marcha inadequada
- Não verificar retrovisores

## Dicas para a Prova Prática

### Antes da Prova
1. **Pratique bastante**: Quanto mais horas de prática, melhor
2. **Conheça o percurso**: Familiarize-se com as ruas onde a prova é realizada
3. **Durma bem**: Chegue descansado e alimentado

### Durante a Prova
4. **Mantenha a calma**: Respire fundo se sentir nervosismo
5. **Seja metódico**: Faça cada passo conscientemente
6. **Não tenha pressa**: É melhor fazer devagar e certo

### Na Baliza
7. **Use as referências**: Aprenda os pontos de referência do veículo
8. **Movimentos suaves**: Evite movimentos bruscos no volante
9. **Atenção aos retrovisores**: Olhe sempre antes de movimentar

## Como a Autoescola APTOS Prepara Você

Na **Autoescola APTOS** em São José dos Pinhais:
- Instrutores pacientes e experientes
- Veículos novos e bem conservados
- Aulas no mesmo percurso da prova
- Simulação completa do exame

## Conclusão

A prova prática exige técnica e controle emocional. Com as aulas certas e prática suficiente, a aprovação é uma consequência natural. Confie no seu preparo!
    `
  },
  {
    slug: "direcao-economica-meio-ambiente",
    title: "Direção Econômica: Como Economizar Combustível e Ajudar o Meio Ambiente",
    description: "Aprenda técnicas de direção econômica para reduzir o consumo de combustível, economizar dinheiro e contribuir com o meio ambiente.",
    category: "dicas",
    image: "/placeholder.svg",
    readTime: "7 min",
    publishedAt: "2024-11-15",
    keywords: ["direção econômica", "economia combustível", "meio ambiente", "eco driving"],
    content: `
## O que é Direção Econômica?

A **direção econômica** (ou eco driving) é um conjunto de técnicas que permite reduzir o consumo de combustível em até 25%, economizando dinheiro e reduzindo a emissão de poluentes.

## Por que Praticar Direção Econômica?

- **Economia financeira**: Menos gastos com combustível
- **Preservação ambiental**: Menor emissão de CO2 e poluentes
- **Menor desgaste do veículo**: Componentes duram mais
- **Mais segurança**: Direção mais suave é mais segura

## 10 Técnicas de Direção Econômica

### 1. Acelere Gradualmente
Evite acelerações bruscas. Pressione o acelerador suavemente até atingir a velocidade desejada.

### 2. Mantenha Velocidade Constante
Variações de velocidade aumentam o consumo. Use o piloto automático quando possível.

### 3. Troque de Marcha no Momento Certo
- Carros a gasolina: troque entre 2.000 e 2.500 RPM
- Carros a diesel: troque entre 1.500 e 2.000 RPM

### 4. Use o Freio Motor
Ao se aproximar de um semáforo, solte o acelerador e deixe o carro desacelerar naturalmente.

### 5. Evite Marcha Lenta Prolongada
Se for ficar parado mais de 1 minuto, desligue o motor.

### 6. Planeje Seus Trajetos
Rotas mais curtas ou com menos trânsito economizam combustível.

### 7. Verifique os Pneus
Pneus com pressão baixa aumentam o consumo em até 3%.

### 8. Reduza o Peso
Retire objetos desnecessários do porta-malas.

### 9. Use o Ar-Condicionado com Moderação
O A/C pode aumentar o consumo em até 20% na cidade.

### 10. Faça Manutenção Regular
Motor bem regulado consome menos.

## Impacto Ambiental

Um carro popular emite cerca de 2,3 kg de CO2 por litro de gasolina. Com direção econômica, você pode:
- Reduzir suas emissões em até 25%
- Economizar centenas de litros por ano
- Contribuir para um ar mais limpo

## Direção Econômica na Autoescola APTOS

Ensinamos técnicas de direção econômica em nossas aulas práticas. Nossos instrutores em São José dos Pinhais estão preparados para formar motoristas conscientes e responsáveis.
    `
  },
  {
    slug: "primeiros-socorros-transito",
    title: "Primeiros Socorros no Trânsito: O que Fazer em Caso de Acidente",
    description: "Guia essencial sobre primeiros socorros em acidentes de trânsito. Aprenda o que fazer e o que não fazer para ajudar vítimas corretamente.",
    category: "legislacao",
    image: "/placeholder.svg",
    readTime: "11 min",
    publishedAt: "2024-11-10",
    keywords: ["primeiros socorros", "acidente trânsito", "samu", "resgate"],
    content: `
## A Importância dos Primeiros Socorros

Saber como agir nos primeiros minutos após um acidente pode salvar vidas. Este conhecimento é cobrado na prova teórica do DETRAN e é essencial para todo motorista.

## O que Fazer ao Presenciar um Acidente

### 1. Mantenha a Calma
Pare em local seguro e avalie a situação antes de agir.

### 2. Sinalize o Local
- Ligue o pisca-alerta
- Coloque o triângulo de segurança a 30 metros (em vias comuns) ou 200 metros (em rodovias)
- Use galhos, pedras ou outros objetos se necessário

### 3. Acione o Socorro
**Números de emergência:**
- **SAMU**: 192
- **Bombeiros**: 193
- **Polícia Rodoviária Federal**: 191
- **Polícia Militar**: 190

Informe:
- Localização exata
- Número de vítimas
- Gravidade aparente
- Se há vazamento de combustível ou risco de incêndio

### 4. Avalie as Vítimas
- Verifique se estão conscientes
- Observe a respiração
- Procure sangramentos visíveis

## O que NÃO Fazer

❌ **Não remova a vítima** (exceto em risco iminente de explosão/incêndio)
❌ **Não dê água ou medicamentos**
❌ **Não retire o capacete** de motociclistas
❌ **Não movimente a cabeça** de vítimas inconscientes
❌ **Não tente "consertar" fraturas**

## Situações Específicas

### Vítima Inconsciente mas Respirando
- Mantenha-a na posição em que está
- Proteja a cabeça
- Aguarde o socorro

### Sangramento Intenso
- Use um pano limpo para pressionar o ferimento
- Não retire objetos encravados
- Mantenha pressão até o socorro chegar

### Engasgamento
- Se a vítima consegue tossir, incentive
- Se não respira, aplique a manobra de Heimlich (apenas se souber)

## Kit de Primeiros Socorros no Veículo

É recomendado ter:
- Triângulo de sinalização (obrigatório)
- Lanterna
- Luvas descartáveis
- Gaze e ataduras
- Cobertor térmico

## Responsabilidade Legal

O Art. 176 do CTB determina que deixar de prestar socorro à vítima de acidente é infração gravíssima, além de poder configurar crime (omissão de socorro).

## Aprenda Mais na Autoescola APTOS

Nosso curso teórico em São José dos Pinhais inclui módulo completo sobre primeiros socorros, preparando você não apenas para a prova, mas para situações reais.
    `
  },
  {
    slug: "infracoes-transito-pontuacao",
    title: "Infrações de Trânsito: Entenda a Pontuação e as Multas",
    description: "Guia completo sobre infrações de trânsito no Brasil: tipos, pontuação, valores das multas e como evitar a suspensão da CNH.",
    category: "legislacao",
    image: "/placeholder.svg",
    readTime: "10 min",
    publishedAt: "2024-11-05",
    keywords: ["infrações trânsito", "multas", "pontuação CNH", "suspensão habilitação"],
    content: `
## Sistema de Pontuação no Brasil

Desde 2021, o limite de pontos para suspensão da CNH varia conforme o histórico do condutor:
- **40 pontos**: Condutores sem infração gravíssima
- **30 pontos**: Condutores com 1 infração gravíssima
- **20 pontos**: Condutores com 2+ infrações gravíssimas

## Classificação das Infrações

### Infração Leve (3 pontos)
**Valor da multa**: R$ 88,38 (valores de 2024)

Exemplos:
- Estacionar em desacordo com a regulamentação
- Não sinalizar com antecedência a conversão

### Infração Média (4 pontos)
**Valor da multa**: R$ 130,16

Exemplos:
- Usar veículo com equipamento obrigatório defeituoso
- Deixar de atualizar cadastro de endereço

### Infração Grave (5 pontos)
**Valor da multa**: R$ 195,23

Exemplos:
- Ultrapassar pela direita
- Dirigir com o braço de fora
- Transportar criança sem cadeirinha

### Infração Gravíssima (7 pontos)
**Valor da multa**: R$ 293,47

Exemplos:
- Avançar sinal vermelho
- Excesso de velocidade acima de 20%
- Usar celular ao dirigir
- Não usar cinto de segurança

### Infrações com Multiplicador

Algumas infrações têm multa multiplicada:
- **Excesso de velocidade acima de 50%**: 3x o valor = R$ 880,41
- **Dirigir embriagado**: 10x o valor = R$ 2.934,70
- **Participar de racha**: 10x o valor = R$ 2.934,70

## Crimes de Trânsito

Algumas condutas não são apenas infrações, mas crimes:
- Homicídio culposo
- Lesão corporal culposa
- Embriaguez ao volante
- Participar de racha
- Dirigir sem habilitação gerando perigo

## Como Consultar Suas Multas

1. Acesse o site do DETRAN-PR
2. Informe CPF e RENACH
3. Consulte infrações e pontuação

## Recurso de Multas

Você pode recorrer de multas em até 30 dias:
1. Defesa prévia (antes do auto de infração)
2. Recurso à JARI (1ª instância)
3. Recurso ao CETRAN (2ª instância)

## Evite Infrações

A melhor forma de não perder pontos é dirigir com responsabilidade. Na **Autoescola APTOS** em São José dos Pinhais, formamos motoristas conscientes das regras e preparados para um trânsito mais seguro.
    `
  },
  {
    slug: "renovacao-cnh-como-funciona",
    title: "Renovação de CNH: Passo a Passo Completo e Atualizado",
    description: "Saiba como renovar sua CNH: documentos necessários, exames, prazos e valores. Guia atualizado para São José dos Pinhais e região.",
    category: "dicas",
    image: "/placeholder.svg",
    readTime: "6 min",
    publishedAt: "2024-10-30",
    keywords: ["renovação CNH", "renovar habilitação", "detran PR", "autoescola são josé dos pinhais"],
    content: `
## Quando Renovar a CNH?

A CNH deve ser renovada antes da data de vencimento impressa no documento:
- **Condutores até 49 anos**: Validade de 10 anos
- **Condutores de 50 a 69 anos**: Validade de 5 anos
- **Condutores com 70 anos ou mais**: Validade de 3 anos

⚠️ **Importante**: Você pode iniciar o processo até 1 ano antes do vencimento.

## Passo a Passo para Renovação

### 1. Agende o Exame Médico
- Acesse o site do DETRAN-PR
- Agende em uma clínica credenciada
- O exame avalia aptidão física e mental

### 2. Realize o Exame Médico
- Leve documento de identidade
- Informe problemas de saúde
- Se usar óculos, leve-os

### 3. Exame Psicológico (se necessário)
Obrigatório para:
- Condutores de veículos de transporte (categorias C, D, E)
- Condutores remunerados
- Quando solicitado pelo médico

### 4. Pague as Taxas
- Taxa de renovação
- Taxa do exame médico
- Taxa do exame psicológico (se aplicável)

### 5. Aguarde a Emissão
Após aprovação nos exames, a nova CNH é emitida em até 5 dias úteis.

## Documentos Necessários

- RG ou CNH atual
- CPF
- Comprovante de residência
- Foto 3x4 (geralmente tirada no local)

## Valores Aproximados (2024)

| Item | Valor |
|------|-------|
| Exame médico | R$ 120 - R$ 180 |
| Exame psicológico | R$ 150 - R$ 200 |
| Taxa DETRAN | R$ 100 - R$ 150 |

*Valores podem variar conforme a clínica e região*

## E se a CNH Já Venceu?

Se vencida há menos de 5 anos:
- O processo é o mesmo da renovação normal

Se vencida há mais de 5 anos:
- É necessário refazer os exames teórico e prático

## Renovação na Autoescola APTOS

Na **Autoescola APTOS** em São José dos Pinhais, oferecemos:
- Orientação completa sobre o processo
- Encaminhamento para clínicas credenciadas
- Acompanhamento até a emissão da nova CNH
- Curso de reciclagem (se necessário)

## Dica Extra

Não deixe para a última hora! Comece o processo de renovação com pelo menos 1 mês de antecedência para evitar imprevistos.
    `
  }
];

export const getPostBySlug = (slug: string) => {
  return blogPosts.find(post => post.slug === slug);
};

export const getRelatedPosts = (currentSlug: string, limit: number = 3) => {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return blogPosts.slice(0, limit);
  
  return blogPosts
    .filter(post => post.slug !== currentSlug)
    .filter(post => post.category === currentPost.category)
    .slice(0, limit);
};
