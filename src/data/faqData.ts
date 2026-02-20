export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const faqData: FAQItem[] = [
  // Primeira Habilitação - Resolução 1020/2025
  {
    category: "Primeira Habilitação",
    question: "Qual a idade mínima para tirar a primeira habilitação?",
    answer: "A idade mínima para tirar a primeira habilitação é de 18 anos completos. É necessário também saber ler e escrever e possuir documento de identidade."
  },
  {
    category: "Primeira Habilitação",
    question: "Quanto tempo demora para tirar a CNH com a nova resolução?",
    answer: "Com a nova Resolução CONTRAN 1020/2025, tirar a CNH ficou mais rápido. O processo pode ser concluído em algumas semanas a meses (média de 2 a 3 meses), graças à redução da carga horária prática para apenas 2 horas, fim da carga horária mínima teórica, aulas 100% online e acompanhamento digital do processo. O tempo final ainda depende da disponibilidade de agenda do DETRAN-PR para os exames (médico, psicotécnico, teórico e prático) e do ritmo do candidato. Após aprovação, a emissão da PPD (Permissão para Dirigir) leva cerca de 10 dias úteis."
  },
  {
    category: "Primeira Habilitação",
    question: "Quais documentos preciso para iniciar o processo de habilitação?",
    answer: "Você precisa de documento de identificação oficial com foto (RG ou CNH vencida), CPF e comprovante de residência atualizado. O processo pode ser iniciado diretamente em uma autoescola credenciada ou pelo aplicativo CNH do Brasil para as aulas teóricas. Após concluir o teórico, é necessário agendar a abertura do processo no DETRAN-PR (pelo site ou aplicativo Detran Inteligente) para biometria, exame médico e psicológico."
  },
  {
    category: "Primeira Habilitação",
    question: "Quantas aulas práticas são obrigatórias pela nova resolução?",
    answer: "Com a Resolução CONTRAN 1020/2025, a carga horária mínima de aulas práticas caiu de 20 horas para apenas 2 horas para a primeira habilitação. As autoescolas do Paraná já estão autorizadas a oferecer o curso prático na nova modalidade. Recomendamos que o candidato avalie se já se sente preparado antes de agendar o teste prático para evitar reprovações. A Autoescola APTOS oferece aulas adicionais conforme a necessidade do aluno."
  },
  {
    category: "Primeira Habilitação",
    question: "Como inicio o processo de obtenção da CNH pelo aplicativo?",
    answer: "O candidato pode usar o aplicativo CNH do Brasil para realizar as aulas teóricas online. Após a conclusão do curso, é necessário encaminhar o certificado pelo próprio aplicativo para a base nacional de dados (RENACH). Em seguida, o candidato deve agendar a abertura do processo no site do DETRAN-PR (agendamento.detran.pr.gov.br) ou pelo aplicativo Detran Inteligente, para biometria e demais exames. Importante: o início formal do processo não se dá pelo aplicativo CNH do Brasil, mas sim pelo agendamento no DETRAN."
  },
  {
    category: "Primeira Habilitação",
    question: "As novas regras da Resolução 1020/2025 já valem no Paraná?",
    answer: "Sim! As mudanças da Resolução CONTRAN 1020/2025 já estão valendo em todo o território nacional desde 10 de dezembro de 2025, quando foram publicadas no Diário Oficial da União. No Paraná, o CETRAN (Conselho Estadual de Trânsito) publicou uma resolução para normatizar e readequar todos os fluxos do processo de obtenção de CNH no âmbito do DETRAN-PR. Você pode buscar orientações na Ciretran mais próxima."
  },
  {
    category: "Primeira Habilitação",
    question: "Ainda existe prazo máximo para concluir o processo de habilitação?",
    answer: "Não! Uma das principais mudanças da Resolução 1020/2025 é que não existe mais o prazo obrigatório de 12 meses para concluir o processo de obtenção da CNH. Essa mudança já foi implementada no sistema do DETRAN-PR, dando mais tranquilidade ao candidato para concluir cada etapa no seu ritmo."
  },
  {
    category: "Primeira Habilitação",
    question: "O que mudou na prova teórica com a nova resolução?",
    answer: "O tempo de prova aumentou de 50 para 60 minutos (ou 120 minutos para candidatos com dislexia, TDAH ou transtorno do espectro autista - TEA), e o número mínimo de acertos das 30 questões diminuiu de 21 para 20. Os candidatos que realizaram as aulas pelo aplicativo CNH Brasil devem estar cientes de que as questões utilizadas pelo DETRAN-PR podem divergir do conteúdo ensinado na plataforma durante o período de sincronização com o novo Banco Nacional de Questões."
  },
  {
    category: "Primeira Habilitação",
    question: "O que é a PPD e quanto tempo leva para receber?",
    answer: "A PPD (Permissão Para Dirigir) é o documento emitido após a aprovação em todos os exames, que permite ao novo motorista dirigir por 2 anos. Com a nova regulamentação, o candidato aprovado poderá optar por receber a CNH Digital gratuitamente ou pagar a taxa para o documento impresso. Atualmente o documento impresso ainda é obrigatório no final do processo no Paraná, com previsão de mudança nas próximas semanas. O prazo de emissão após aprovação é de aproximadamente 10 dias úteis."
  },

  // Resolução 1020/2025 - Detalhes
  {
    category: "Resolução 1020/2025",
    question: "O que é a Resolução CONTRAN 1020/2025?",
    answer: "A Resolução CONTRAN 1020/2025 é a norma aprovada pelo Conselho Nacional de Trânsito que modernizou o processo de obtenção da CNH no Brasil. Suas principais mudanças incluem: aulas teóricas livres (sem carga horária mínima), possibilidade de estudo 100% online pelo aplicativo CNH do Brasil, redução das aulas práticas para apenas 2 horas, fim do prazo de 12 meses para concluir o processo, possibilidade futura de instrutores autônomos e abertura e acompanhamento do processo de forma digital."
  },
  {
    category: "Resolução 1020/2025",
    question: "Qual a diferença entre fazer o teórico pela autoescola e pelo aplicativo CNH do Brasil?",
    answer: "Pela autoescola (CFC): a abertura do processo e o envio dos dados ao RENACH são feitos pela própria instituição, com acompanhamento personalizado de uma equipe especializada. Pelo aplicativo CNH do Brasil: o candidato estuda no próprio ritmo, de forma 100% online, e ao concluir, encaminha o certificado pelo aplicativo. Em seguida, deve agendar presencialmente no DETRAN-PR a abertura formal do processo. Ambas as formas são válidas; a diferença é no suporte e acompanhamento oferecidos."
  },
  {
    category: "Resolução 1020/2025",
    question: "Quanto custam os exames médico e psicológico?",
    answer: "A portaria 927/2025 da Senatran prevê um teto nacional de R$ 180 para a soma dos dois exames (médico e psicológico). No entanto, no Paraná, os valores praticados atualmente são previstos em lei estadual e estão vinculados a contratos vigentes com as clínicas credenciadas (atualmente R$ 404). O DETRAN-PR aguarda orientação jurídica da Procuradoria Geral do Estado (PGE-PR) para avaliar a viabilidade de implementar o teto nacional. Entre em contato com a autoescola para consultar os valores atualizados."
  },
  {
    category: "Resolução 1020/2025",
    question: "Em caso de reprovação na prova, preciso pagar nova taxa?",
    answer: "A nova resolução prevê gratuidade para o primeiro reteste. No entanto, no Paraná essa regra ainda não pode ser aplicada por questões jurídicas — aguarda-se orientação da Procuradoria Geral do Estado (PGE-PR) sobre a viabilidade de implementação, assim como ocorre com o teto dos exames médico e psicológico. Consulte a Autoescola APTOS para informações atualizadas sobre valores."
  },
  {
    category: "Resolução 1020/2025",
    question: "O que mudou no teste prático (exame de direção)?",
    answer: "A Resolução 1020/2025 prevê um novo Manual Brasileiro de Exames de Direção Veicular, que ainda não foi publicado pela Senatran. Por isso, o teste prático ainda segue o mesmo procedimento anterior à resolução (incluindo baliza). Com a publicação do novo manual, pode ser necessário um período de adequação das pistas e capacitação dos examinadores. A Autoescola APTOS informará os alunos assim que houver atualizações."
  },

  // Renovação de CNH
  {
    category: "Renovação de CNH",
    question: "Com quanto tempo de antecedência posso renovar minha CNH?",
    answer: "Você pode iniciar o processo de renovação até 30 dias antes do vencimento da sua CNH. Recomendamos não deixar para última hora para evitar transtornos."
  },
  {
    category: "Renovação de CNH",
    question: "Preciso fazer aulas para renovar a CNH?",
    answer: "Não, para renovação de CNH não são necessárias aulas teóricas ou práticas. Você precisa apenas passar pelos exames médico e psicológico."
  },
  {
    category: "Renovação de CNH",
    question: "O que acontece se eu dirigir com a CNH vencida?",
    answer: "Dirigir com CNH vencida é infração gravíssima, com multa de R$ 293,47 e 7 pontos na carteira. O veículo pode ser retido até a apresentação de condutor habilitado."
  },
  {
    category: "Renovação de CNH",
    question: "Quanto tempo demora a renovação da CNH?",
    answer: "O processo de renovação é rápido. Após passar pelos exames médico e psicológico, a nova CNH fica pronta em até 5 dias úteis."
  },
  
  // Mudança de Categoria
  {
    category: "Mudança de Categoria",
    question: "Como faço para adicionar a categoria A na minha CNH?",
    answer: "Para adicionar a categoria A (moto), você precisa ter pelo menos 1 ano de habilitação na categoria B, passar por exame médico e psicológico, fazer o curso teórico específico e as aulas práticas de moto conforme as regras atuais da Resolução 1020/2025."
  },
  {
    category: "Mudança de Categoria",
    question: "Posso tirar a CNH categoria AB direto?",
    answer: "Sim! Na primeira habilitação você pode optar por tirar a categoria AB (carro e moto) simultaneamente. É uma opção mais econômica do que fazer separadamente."
  },
  {
    category: "Mudança de Categoria",
    question: "Quanto custa para adicionar uma categoria?",
    answer: "O valor varia conforme a categoria desejada. Entre em contato conosco pelo WhatsApp (41) 99145-3627 para consultar valores atualizados e condições especiais de pagamento."
  },
  
  // Curso de Reciclagem
  {
    category: "Curso de Reciclagem",
    question: "Quando preciso fazer o curso de reciclagem?",
    answer: "O curso de reciclagem é obrigatório quando o condutor atinge 20 pontos ou mais na CNH dentro de 12 meses, ou comete infração gravíssima que resulte em suspensão do direito de dirigir."
  },
  {
    category: "Curso de Reciclagem",
    question: "Quantas horas tem o curso de reciclagem?",
    answer: "O curso de reciclagem tem duração de 30 horas/aula teóricas, abordando legislação de trânsito, direção defensiva, primeiros socorros, meio ambiente e cidadania."
  },
  {
    category: "Curso de Reciclagem",
    question: "Posso fazer o curso de reciclagem online?",
    answer: "Sim, oferecemos o curso de reciclagem na modalidade EAD (Ensino a Distância), aprovado pelo DETRAN, permitindo que você faça o curso no conforto da sua casa."
  },
  
  // Sobre a Autoescola
  {
    category: "Sobre a Autoescola",
    question: "Onde fica a Autoescola APTOS?",
    answer: "A Autoescola APTOS está localizada em São José dos Pinhais, com fácil acesso para moradores de todos os bairros da cidade. Entre em contato para mais informações sobre nossa localização."
  },
  {
    category: "Sobre a Autoescola",
    question: "Quais formas de pagamento a autoescola aceita?",
    answer: "Aceitamos pagamento em dinheiro, cartão de débito, cartão de crédito (parcelamento em até 12x), PIX e boleto bancário. Consulte condições especiais para pagamento à vista."
  },
  {
    category: "Sobre a Autoescola",
    question: "A autoescola oferece aulas aos sábados?",
    answer: "Sim! Oferecemos aulas teóricas e práticas aos sábados para melhor atender nossos alunos que trabalham durante a semana."
  },
  {
    category: "Sobre a Autoescola",
    question: "Qual o horário de funcionamento da Autoescola APTOS?",
    answer: "Funcionamos de segunda a sexta das 8h às 18h e aos sábados das 8h às 12h. Para aulas práticas, temos horários flexíveis conforme disponibilidade dos instrutores."
  }
];

export const faqCategories = [...new Set(faqData.map(item => item.category))];
