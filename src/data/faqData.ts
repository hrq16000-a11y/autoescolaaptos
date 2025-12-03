export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const faqData: FAQItem[] = [
  // Primeira Habilitação
  {
    category: "Primeira Habilitação",
    question: "Qual a idade mínima para tirar a primeira habilitação?",
    answer: "A idade mínima para tirar a primeira habilitação é de 18 anos completos. É necessário também saber ler e escrever e possuir documento de identidade."
  },
  {
    category: "Primeira Habilitação",
    question: "Quanto tempo demora para tirar a CNH?",
    answer: "O processo completo para tirar a primeira habilitação leva em média de 2 a 4 meses, dependendo da disponibilidade do aluno para as aulas teóricas e práticas, além do agendamento dos exames no DETRAN."
  },
  {
    category: "Primeira Habilitação",
    question: "Quais documentos preciso para iniciar o processo de habilitação?",
    answer: "Você precisa de RG ou CNH vencida, CPF, comprovante de residência atualizado e, para menores de 18 anos, autorização dos pais. Também é necessário passar pelo exame médico e psicológico."
  },
  {
    category: "Primeira Habilitação",
    question: "Quantas aulas práticas são necessárias?",
    answer: "São obrigatórias no mínimo 20 horas/aula de prática para cada categoria (A ou B). Na Autoescola APTOS, oferecemos aulas adicionais conforme necessidade do aluno para garantir sua segurança e aprovação."
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
    answer: "Para adicionar a categoria A (moto), você precisa ter pelo menos 1 ano de habilitação na categoria B, passar por exame médico e psicológico, fazer o curso teórico específico e as 20 horas de aula prática de moto."
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
