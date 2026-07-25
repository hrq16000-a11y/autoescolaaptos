export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const faqData: FAQItem[] = [
  // ========================= PRIMEIRA HABILITAÇÃO =========================
  {
    category: "Primeira Habilitação",
    question: "Qual a idade mínima para tirar a primeira habilitação?",
    answer: "A idade mínima é 18 anos completos. É necessário também saber ler e escrever e possuir documento oficial de identidade com foto e CPF."
  },
  {
    category: "Primeira Habilitação",
    question: "Quanto tempo demora para tirar a CNH com a nova resolução?",
    answer: "Com a Resolução CONTRAN 1020/2025 o processo ficou mais ágil — em média de 2 a 4 meses. O tempo final depende da agenda do DETRAN-PR para exames e do ritmo do candidato no curso teórico (que agora é livre, sem carga horária mínima)."
  },
  {
    category: "Primeira Habilitação",
    question: "Quais documentos preciso para iniciar o processo?",
    answer: "RG ou CNH (se já habilitado), CPF e comprovante de residência atualizado. A APTOS faz a abertura do processo para você no DETRAN-PR, sem você precisar ir até o órgão na primeira etapa."
  },
  {
    category: "Primeira Habilitação",
    question: "Quantas aulas práticas são obrigatórias?",
    answer: "Pela Resolução 1020/2025, o mínimo é apenas 2 horas. Na prática, a APTOS recomenda 10 a 20 aulas para chegar preparado ao exame — o número exato depende do seu desempenho."
  },
  {
    category: "Primeira Habilitação",
    question: "Como inicio o processo pela APTOS?",
    answer: "Pelo nosso simulador você responde 3 perguntas (categoria, prazo e experiência) e recebe valor e próximos passos no WhatsApp. A partir dali, abrimos seu processo no DETRAN-PR."
  },
  {
    category: "Primeira Habilitação",
    question: "As novas regras da Resolução 1020/2025 já valem no Paraná?",
    answer: "Sim. Estão valendo desde 10 de dezembro de 2025 em todo o Brasil. O DETRAN-PR já implementou as principais mudanças: fim do prazo de 12 meses, redução das aulas práticas e curso teórico pelo app CNH do Brasil."
  },
  {
    category: "Primeira Habilitação",
    question: "Ainda existe prazo máximo para concluir o processo?",
    answer: "Não. O prazo de 12 meses foi extinto. Você conclui no seu ritmo — sem stress nem perda de etapas por demora."
  },
  {
    category: "Primeira Habilitação",
    question: "Posso começar mesmo trabalhando o dia todo?",
    answer: "Sim. O curso teórico é 100% online (app CNH do Brasil) e as aulas práticas têm horários flexíveis incluindo manhã, tarde, noite e sábados."
  },

  // ========================= CATEGORIA A =========================
  {
    category: "Categoria A",
    question: "O que dá direito a Categoria A?",
    answer: "Permite dirigir motos, motonetas, scooters e ciclomotores acima de 50 cilindradas. Idade mínima: 18 anos."
  },
  {
    category: "Categoria A",
    question: "Quanto custa tirar a CNH A em São José dos Pinhais?",
    answer: "Depende das taxas atuais do DETRAN-PR e da forma de pagamento. Responda 3 perguntas no nosso simulador e receba o valor exato no WhatsApp."
  },
  {
    category: "Categoria A",
    question: "Vocês fornecem capacete e equipamento de segurança?",
    answer: "Sim. Capacete, jaqueta, luvas, joelheira e cotoveleira são fornecidos pela APTOS durante todas as aulas práticas e exame."
  },
  {
    category: "Categoria A",
    question: "Qual moto é usada no exame?",
    answer: "Usamos motos de baixa cilindrada (até 162cc), no padrão exigido pelo DETRAN-PR. Você treina exatamente no modelo do exame."
  },
  {
    category: "Categoria A",
    question: "Nunca andei de moto. Vocês ensinam do zero?",
    answer: "Sim. Começamos no pátio, com aulas de equilíbrio, troca de marchas e frenagem. Só vamos para o circuito quando você se sentir confiante."
  },

  // ========================= CATEGORIA B =========================
  {
    category: "Categoria B",
    question: "O que a Categoria B permite dirigir?",
    answer: "Carros, SUVs, utilitários e veículos de até 3.500 kg, com lotação de até 8 passageiros (excluindo motorista). É a categoria mais comum."
  },
  {
    category: "Categoria B",
    question: "Quanto tempo leva para tirar a CNH B?",
    answer: "Em média 2 a 4 meses, dependendo da sua disponibilidade. Sem prazo máximo no Paraná desde a Resolução 1020/2025."
  },
  {
    category: "Categoria B",
    question: "Como funciona o exame teórico do DETRAN-PR para a B?",
    answer: "São 30 questões em 60 minutos, com aprovação a partir de 20 acertos. Candidatos com dislexia, TDAH ou TEA têm 120 minutos."
  },
  {
    category: "Categoria B",
    question: "Os carros de aula são manuais ou automáticos?",
    answer: "Manuais — pois o exame DETRAN-PR exige veículo manual para categoria B. Carros novos, com direção elétrica."
  },
  {
    category: "Categoria B",
    question: "Quantas aulas práticas a APTOS recomenda?",
    answer: "Para alunos iniciantes recomendamos no mínimo 10 aulas, podendo chegar a 20 a 25 dependendo do progresso. A primeira aula é diagnóstica."
  },

  // ========================= CATEGORIA AB =========================
  {
    category: "Categoria AB",
    question: "Vale a pena tirar AB de uma vez?",
    answer: "Sim. Uma única matrícula, um único curso teórico e economia significativa em relação a tirar A e B separadamente. A maioria dos alunos que querem moto + carro escolhe AB."
  },
  {
    category: "Categoria AB",
    question: "Os exames práticos da AB são feitos juntos?",
    answer: "Não. Cada categoria tem seu exame prático no DETRAN-PR (um de moto, um de carro), mas o processo administrativo é único."
  },
  {
    category: "Categoria AB",
    question: "Posso começar pela moto ou pelo carro?",
    answer: "Sim, definimos juntos a melhor ordem na matrícula — geralmente alunos preferem começar pelo que têm mais facilidade."
  },
  {
    category: "Categoria AB",
    question: "Quanto custa a CNH AB em São José dos Pinhais?",
    answer: "É mais econômico que tirar A e B separadas. O valor depende de taxas DETRAN-PR e forma de pagamento — solicite seu orçamento no simulador."
  },

  // ========================= INCLUSÃO =========================
  {
    category: "Inclusão",
    question: "O que é inclusão de categoria?",
    answer: "É adicionar uma categoria nova à sua CNH atual sem perder a que você já tem. Exemplo: você tem B e inclui a A — passa a ter AB."
  },
  {
    category: "Inclusão",
    question: "Posso incluir a categoria A já tendo a B?",
    answer: "Sim. É a inclusão mais comum. Aproveita exames médicos válidos e exige apenas o complemento teórico de moto + aulas práticas."
  },
  {
    category: "Inclusão",
    question: "Quanto tempo demora uma inclusão?",
    answer: "Em média 30 a 60 dias. Categoria A (moto) costuma ser a mais rápida; a categoria B (carro) leva um pouco mais por exigir mais aulas práticas."
  },
  {
    category: "Inclusão",
    question: "Precisa refazer exame médico para inclusão?",
    answer: "Depende. Se sua avaliação anterior estiver válida e a nova categoria não exigir avaliação específica adicional, não precisa. A APTOS confirma antes de você gastar."
  },
  {
    category: "Inclusão",
    question: "Vocês oferecem C, D ou E?",
    answer: "Não. A APTOS trabalha apenas com as categorias A (moto) e B (carro). Para categorias profissionais (C, D, E), recomendamos procurar um CFC especializado em transporte de cargas e passageiros."
  },

  // ========================= RECICLAGEM =========================
  {
    category: "Reciclagem",
    question: "Quando preciso fazer o Curso de Reciclagem?",
    answer: "Quando atinge 20 pontos ou mais na CNH em 12 meses, ou comete infração gravíssima com suspensão automática (embriaguez, racha, excesso de velocidade acima de 50%)."
  },
  {
    category: "Reciclagem",
    question: "Quantas horas tem o curso?",
    answer: "30 horas/aula, abordando legislação, direção defensiva, primeiros socorros, meio ambiente, cidadania e relacionamento interpessoal no trânsito."
  },
  {
    category: "Reciclagem",
    question: "Posso fazer 100% online?",
    answer: "Sim. A APTOS oferece o curso na modalidade EAD aprovada pelo DETRAN-PR. Você estuda pelo celular ou computador, no seu ritmo."
  },
  {
    category: "Reciclagem",
    question: "Posso dirigir enquanto faço o curso?",
    answer: "Não. Sua CNH está suspensa — dirigir é infração gravíssima (R$ 880,41 + 7 pontos + apreensão). Conclua o curso o quanto antes para regularizar."
  },
  {
    category: "Reciclagem",
    question: "Se eu reprovar na prova final, posso refazer?",
    answer: "Sim. A plataforma EAD permite refazer a avaliação até atingir os 70% mínimos. Sem custo adicional."
  },

  // ========================= RETESTE =========================
  {
    category: "Reteste",
    question: "Reprovei no exame prático. Quando posso refazer?",
    answer: "O reteste pode ser agendado a partir de 15 dias após a reprovação, conforme regra do DETRAN-PR."
  },
  {
    category: "Reteste",
    question: "Posso fazer o reteste em outra autoescola?",
    answer: "Sim! Muitos alunos vêm para a APTOS após reprovar em outra escola. Atendemos reteste para qualquer aluno em processo ativo no DETRAN-PR."
  },
  {
    category: "Reteste",
    question: "Quantas aulas preciso antes do reteste?",
    answer: "Depende da causa da reprovação. Erros pontuais (baliza, rampa): 1 a 2 aulas. Insegurança geral: 4 a 5 aulas. Avaliamos seu caso na primeira aula."
  },
  {
    category: "Reteste",
    question: "O reteste é grátis?",
    answer: "A Resolução 1020/2025 prevê gratuidade em algumas situações, mas no Paraná essa regra ainda aguarda regulamentação pela PGE-PR. Consulte o valor atual com a APTOS."
  },
  {
    category: "Reteste",
    question: "Quais erros mais reprovam no exame prático?",
    answer: "Baliza, rampa de estacionamento, não dar seta, frear bruscamente, não usar retrovisor antes de mudar de faixa, ultrapassar velocidade no circuito interno e nervosismo geral."
  },

  // ========================= AULAS PRÁTICAS =========================
  {
    category: "Aulas Práticas",
    question: "Os carros da APTOS são novos?",
    answer: "Sim. Frota nova com direção elétrica, ar condicionado e em ótimo estado. Mesmo padrão usado no exame DETRAN-PR."
  },
  {
    category: "Aulas Práticas",
    question: "Posso pagar aulas avulsas?",
    answer: "Sim. Pacotes flexíveis: avulsa, 5 aulas, 10 aulas, 20 aulas ou combo com simulado de circuito DETRAN-PR."
  },
  {
    category: "Aulas Práticas",
    question: "Tenho CNH mas não dirijo há anos. Posso fazer aulas?",
    answer: "Sim. Atendemos motoristas habilitados que querem retomar a direção depois de muito tempo parados. Aulas de reciclagem voluntária."
  },
  {
    category: "Aulas Práticas",
    question: "As aulas são em pista ou em rua?",
    answer: "Começamos no pátio (para iniciantes), passamos para ruas tranquilas, depois tráfego intenso e finalizamos com simulado no circuito DETRAN-PR."
  },
  {
    category: "Aulas Práticas",
    question: "Quanto tempo dura cada aula?",
    answer: "50 minutos cada aula, padrão DETRAN-PR. Você pode agendar uma ou várias aulas seguidas no mesmo dia."
  },
  {
    category: "Aulas Práticas",
    question: "Como funciona a aula de baliza?",
    answer: "Treinamos a técnica passo a passo com referências visuais reais (cones, ângulos). A maioria dos alunos domina em 2 a 3 aulas focadas."
  },

  // ========================= EXAMES =========================
  {
    category: "Exames",
    question: "Quais exames preciso fazer para tirar a CNH?",
    answer: "Exame médico, exame psicotécnico, exame teórico (no DETRAN-PR) e exame prático de direção (no DETRAN-PR)."
  },
  {
    category: "Exames",
    question: "Como é o exame médico para CNH?",
    answer: "Avaliação de visão, audição, equilíbrio, condições neurológicas e cardiológicas. Feito em clínica credenciada pelo DETRAN-PR. Validade: 10 anos (até 49 anos) ou 5 anos (50+)."
  },
  {
    category: "Exames",
    question: "Como é o exame psicotécnico?",
    answer: "Avaliação psicológica em clínica credenciada, com testes de atenção, raciocínio, personalidade e capacidade para a função de condutor. Duração aproximada: 1 a 2 horas."
  },
  {
    category: "Exames",
    question: "Quantas questões tem a prova teórica?",
    answer: "30 questões em 60 minutos. Aprovação a partir de 20 acertos (≈67%). Quem tem dislexia, TDAH ou TEA tem 120 minutos."
  },
  {
    category: "Exames",
    question: "Como é o exame prático no DETRAN-PR?",
    answer: "Circuito pré-definido com baliza, rampa, sinalizações e direção em via pública. Examinador do DETRAN-PR avalia em tempo real. Faltas eliminatórias reprovam imediatamente."
  },
  {
    category: "Exames",
    question: "Posso usar o carro da APTOS no exame?",
    answer: "Sim. Alunos APTOS usam nossos veículos. Mesmo aluno externo (de outra escola) pode contratar o carro para o reteste."
  },

  // ========================= TAXAS =========================
  {
    category: "Taxas",
    question: "Quanto custa o processo de primeira habilitação no DETRAN-PR?",
    answer: "Há taxas de abertura de processo (RENACH), exames médico e psicotécnico (~R$ 404 no PR), prova teórica e prova prática. A APTOS te informa o valor total no orçamento."
  },
  {
    category: "Taxas",
    question: "Quanto custam os exames médico e psicotécnico em SJP?",
    answer: "Atualmente em torno de R$ 404 somando os dois (valor previsto em lei estadual). A Resolução 1020/2025 prevê teto nacional de R$ 180, mas isso ainda aguarda regulamentação no Paraná."
  },
  {
    category: "Taxas",
    question: "Há custo extra para usar o app CNH do Brasil?",
    answer: "O app é gratuito. Mas o curso teórico via autoescola dá direito a suporte personalizado, simulados específicos e acompanhamento do processo — vantagens que muitos alunos preferem."
  },
  {
    category: "Taxas",
    question: "Posso parcelar o valor da CNH na APTOS?",
    answer: "Sim, em até 12x no cartão de crédito. Também aceitamos PIX (com desconto), boleto e dinheiro à vista."
  },

  // ========================= PRAZO =========================
  {
    category: "Prazo",
    question: "Existe prazo máximo para terminar o processo?",
    answer: "Não. A Resolução 1020/2025 acabou com o prazo de 12 meses. Você termina no seu ritmo."
  },
  {
    category: "Prazo",
    question: "Quanto tempo demora cada etapa?",
    answer: "Matrícula e exames: 1 a 2 semanas. Curso teórico: 2 a 4 semanas (no seu ritmo). Aulas práticas: 4 a 8 semanas. Exames DETRAN: depende de agenda. Total médio: 2 a 4 meses."
  },
  {
    category: "Prazo",
    question: "Tem como acelerar o processo?",
    answer: "Sim. Concentrando aulas teóricas, agendando exames sequenciais e mantendo disponibilidade contínua, alunos APTOS já concluíram em 6 semanas. Pergunte sobre nosso processo turbinado."
  },
  {
    category: "Prazo",
    question: "E se eu pausar o processo no meio?",
    answer: "Sem problema. Como não há mais prazo de 12 meses, você pode pausar e retomar depois sem perder o que já fez."
  },

  // ========================= DOCUMENTAÇÃO =========================
  {
    category: "Documentação",
    question: "Quais documentos levar na matrícula?",
    answer: "RG, CPF e comprovante de residência atualizado (últimos 90 dias). Se já é habilitado: CNH original. Estrangeiros: RNE/CRNM."
  },
  {
    category: "Documentação",
    question: "Sou menor de 18 anos. Posso me matricular antes?",
    answer: "Sim. Você pode iniciar exames e curso teórico aos 17 anos e 6 meses, mas só recebe a PPD após completar 18 anos."
  },
  {
    category: "Documentação",
    question: "Estrangeiro pode tirar CNH brasileira?",
    answer: "Sim, com Carteira de Registro Nacional Migratório (CRNM) válida e CPF. O processo é o mesmo dos brasileiros."
  },
  {
    category: "Documentação",
    question: "Preciso ter conta no Detran Inteligente?",
    answer: "Sim, recomendamos. É pelo app/site Detran Inteligente que você acompanha seu processo, agenda exames e emite documentos."
  },

  // ========================= PAGAMENTO =========================
  {
    category: "Pagamento",
    question: "Quais formas de pagamento a APTOS aceita?",
    answer: "Dinheiro, PIX (com desconto), cartão de débito, cartão de crédito (até 12x), boleto bancário e transferência."
  },
  {
    category: "Pagamento",
    question: "Tem desconto à vista?",
    answer: "Sim. Pagamento à vista no PIX ou dinheiro tem desconto especial. Consulte no orçamento."
  },
  {
    category: "Pagamento",
    question: "Posso pagar em partes ao longo do processo?",
    answer: "Sim. Algumas etapas (aulas práticas, taxas DETRAN) podem ser pagas conforme avançam. Falamos sobre isso no atendimento."
  },
  {
    category: "Pagamento",
    question: "O que está incluso no valor?",
    answer: "Depende do pacote: matrícula no DETRAN, curso teórico, simulados, número de aulas práticas contratadas e acompanhamento. Taxas DETRAN, médico e psicotécnico geralmente são pagos à parte (mas você sabe antes)."
  },

  // ========================= DETRAN-PR =========================
  {
    category: "DETRAN-PR",
    question: "Onde fica o DETRAN-PR em São José dos Pinhais?",
    answer: "A unidade DETRAN-PR em São José dos Pinhais fica na Rua Joaquim Nabuco, próxima ao centro. Nossa autoescola fica a poucos minutos para facilitar a logística."
  },
  {
    category: "DETRAN-PR",
    question: "Como agendar exames no DETRAN-PR?",
    answer: "Pelo site agendamento.detran.pr.gov.br ou pelo app Detran Inteligente. A APTOS faz esse agendamento para você como parte do serviço."
  },
  {
    category: "DETRAN-PR",
    question: "O que é a PPD e a CNH definitiva?",
    answer: "PPD (Permissão Para Dirigir) é emitida após aprovação em todos os exames e vale 2 anos. Se nesse período você não cometer infração grave/gravíssima, recebe a CNH definitiva sem novos exames."
  },
  {
    category: "DETRAN-PR",
    question: "Posso receber a CNH Digital?",
    answer: "Sim. Pelo app Carteira Digital de Trânsito (CDT) você acessa sua CNH no celular. A Resolução 1020/2025 prevê que ela seja gratuita; o impresso continua disponível mediante taxa."
  },
  {
    category: "DETRAN-PR",
    question: "Como acompanho meu processo?",
    answer: "Pelo app Detran Inteligente (Paraná) com seu CPF. A APTOS também atualiza você por WhatsApp a cada etapa."
  },

  // ========================= SÃO JOSÉ DOS PINHAIS =========================
  {
    category: "São José dos Pinhais",
    question: "A APTOS atende quais bairros de São José dos Pinhais?",
    answer: "Atendemos toda a cidade: Centro, Afonso Pena, Cidade Jardim, Guatupê, Costeira, São Marcos, Borda do Campo, Rio Pequeno e demais. Nossa sede fica próxima ao DETRAN-PR."
  },
  {
    category: "São José dos Pinhais",
    question: "Por que tirar CNH em São José dos Pinhais com a APTOS?",
    answer: "Trânsito menos congestionado para treinar, exames no DETRAN-PR local (Joaquim Nabuco), instrutores que conhecem cada rua do circuito e atendimento próximo a você."
  },
  {
    category: "São José dos Pinhais",
    question: "Qual o melhor horário para começar?",
    answer: "Qualquer momento — não há ‘temporada ideal’. Mas no segundo semestre a procura é maior; quem matricula entre janeiro e junho pega menos fila nos exames."
  },

  // ========================= APTOS =========================
  {
    category: "APTOS",
    question: "Onde fica a Autoescola APTOS?",
    answer: "Em São José dos Pinhais, próximo ao DETRAN-PR e com fácil acesso para todos os bairros. Confira nossa página de bairros para detalhes."
  },
  {
    category: "APTOS",
    question: "Há quanto tempo a APTOS atua?",
    answer: "Mais de 15 anos formando motoristas em São José dos Pinhais. Mais de 5.000 alunos aprovados no DETRAN-PR."
  },
  {
    category: "APTOS",
    question: "Qual é o horário de atendimento?",
    answer: "Segunda a sexta das 8h às 18h e sábado das 8h às 12h. Aulas práticas têm agenda estendida, incluindo noite, conforme instrutor."
  },
  {
    category: "APTOS",
    question: "A APTOS oferece aulas aos sábados?",
    answer: "Sim. Aulas práticas aos sábados de manhã (e tarde sob demanda). Ideal para quem trabalha durante a semana."
  },
  {
    category: "APTOS",
    question: "Qual a taxa de aprovação da APTOS?",
    answer: "Cerca de 95% dos nossos alunos são aprovados no DETRAN-PR — acima da média do estado. Isso por causa da nossa metodologia de simulado em circuito real."
  },
];

export const faqCategories = [...new Set(faqData.map(item => item.category))];
