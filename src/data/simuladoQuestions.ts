export interface SimuladoQuestion {
  id: number;
  category: "Legislação" | "Direção Defensiva" | "Primeiros Socorros" | "Mecânica" | "Meio Ambiente e Cidadania";
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const simuladoQuestions: SimuladoQuestion[] = [
  {
    id: 1,
    category: "Legislação",
    question: "Qual é a velocidade máxima permitida em vias locais, quando não houver sinalização?",
    options: ["30 km/h", "40 km/h", "60 km/h", "80 km/h"],
    correctIndex: 0,
    explanation: "Conforme o CTB, nas vias locais a velocidade máxima é de 30 km/h quando não há sinalização."
  },
  {
    id: 2,
    category: "Legislação",
    question: "Dirigir sob influência de álcool é infração de natureza:",
    options: ["Leve", "Média", "Grave", "Gravíssima"],
    correctIndex: 3,
    explanation: "Dirigir sob influência de álcool é infração gravíssima, com multa multiplicada por 10 e suspensão do direito de dirigir."
  },
  {
    id: 3,
    category: "Legislação",
    question: "Em rodovias, o farol baixo deve ser utilizado:",
    options: ["Apenas à noite", "Apenas em túneis", "Durante o dia e à noite", "Apenas em dias chuvosos"],
    correctIndex: 2,
    explanation: "Desde a Lei do Farol Baixo, o uso é obrigatório em rodovias de pista simples fora dos perímetros urbanos, dia e noite."
  },
  {
    id: 4,
    category: "Legislação",
    question: "O condutor que atingir 20 pontos ou mais em 12 meses (sem infrações gravíssimas) terá sua CNH:",
    options: ["Cassada", "Suspensa", "Apreendida", "Cancelada"],
    correctIndex: 1,
    explanation: "Com 20 pontos sem gravíssimas, ocorre a suspensão do direito de dirigir e curso de reciclagem obrigatório."
  },
  {
    id: 5,
    category: "Legislação",
    question: "A categoria B permite conduzir:",
    options: ["Motocicletas", "Veículos de até 3.500kg e até 8 passageiros, além do motorista", "Caminhões acima de 6.000kg", "Ônibus"],
    correctIndex: 1,
    explanation: "Categoria B: automóveis com peso bruto total até 3.500kg e capacidade de até 8 passageiros, exceto o condutor."
  },
  {
    id: 6,
    category: "Legislação",
    question: "É proibido estacionar:",
    options: ["Em vagas de idosos com credencial", "A menos de 5 metros do bordo do alinhamento da via transversal", "Em estacionamentos rotativos pagos", "Em ruas com mão única"],
    correctIndex: 1,
    explanation: "O CTB proíbe estacionar a menos de 5 metros de esquinas (alinhamento da via transversal)."
  },
  {
    id: 7,
    category: "Legislação",
    question: "Conduzir veículo com CNH vencida há mais de 30 dias é infração:",
    options: ["Leve", "Média", "Grave", "Gravíssima"],
    correctIndex: 3,
    explanation: "Dirigir com CNH vencida há mais de 30 dias é infração gravíssima, com multa e retenção do veículo."
  },
  {
    id: 8,
    category: "Legislação",
    question: "A Permissão para Dirigir (PPD) tem validade de:",
    options: ["6 meses", "1 ano", "2 anos", "5 anos"],
    correctIndex: 2,
    explanation: "A PPD tem validade de 1 ano. Após esse período, sem cometer infração grave/gravíssima ou reincidente média, o condutor obtém a CNH definitiva (período probatório de 2 anos)."
  },
  {
    id: 9,
    category: "Direção Defensiva",
    question: "O que é direção defensiva?",
    options: ["Dirigir em alta velocidade para evitar engarrafamentos", "Conduzir de forma a prever situações de risco e evitar acidentes", "Andar sempre na faixa da direita", "Buzinar para alertar outros motoristas"],
    correctIndex: 1,
    explanation: "Direção defensiva é a forma de conduzir que permite prever situações de risco e agir para evitar acidentes, mesmo causados por terceiros."
  },
  {
    id: 10,
    category: "Direção Defensiva",
    question: "A distância de seguimento ideal em condições normais é de pelo menos:",
    options: ["1 segundo", "2 segundos", "5 segundos", "10 segundos"],
    correctIndex: 1,
    explanation: "A regra dos 2 segundos define a distância mínima segura do veículo da frente em condições normais de pista."
  },
  {
    id: 11,
    category: "Direção Defensiva",
    question: "Em pista molhada, a distância de frenagem:",
    options: ["Diminui", "Aumenta", "Permanece igual", "Depende do tipo do veículo apenas"],
    correctIndex: 1,
    explanation: "Em pista molhada, a aderência dos pneus diminui e a distância necessária para frear aumenta significativamente."
  },
  {
    id: 12,
    category: "Direção Defensiva",
    question: "O fenômeno da aquaplanagem ocorre quando:",
    options: ["O pneu perde contato com o solo devido à água acumulada", "O motor superaquece em dias chuvosos", "Os freios travam em pista seca", "O para-brisa embaça"],
    correctIndex: 0,
    explanation: "Aquaplanagem é a perda de contato dos pneus com o solo por causa de uma camada de água, fazendo o veículo deslizar."
  },
  {
    id: 13,
    category: "Direção Defensiva",
    question: "Ao se aproximar de uma curva, o condutor deve:",
    options: ["Acelerar para sair mais rápido", "Reduzir a velocidade antes da curva", "Frear bruscamente no meio da curva", "Trocar de marcha durante a curva"],
    correctIndex: 1,
    explanation: "A redução de velocidade deve ser feita antes da curva. Na curva, o ideal é manter velocidade constante."
  },
  {
    id: 14,
    category: "Direção Defensiva",
    question: "O ponto cego de um veículo é:",
    options: ["A parte de trás do veículo", "Área que não pode ser vista pelos espelhos retrovisores", "O para-brisa traseiro", "A parte sob o capô"],
    correctIndex: 1,
    explanation: "Ponto cego é a área ao redor do veículo que não é visualizada nem pelos retrovisores nem pela visão periférica do motorista."
  },
  {
    id: 15,
    category: "Primeiros Socorros",
    question: "Ao se deparar com um acidente, a primeira atitude é:",
    options: ["Mover as vítimas para a calçada", "Sinalizar o local e acionar socorro (192/193)", "Tirar fotos do acidente", "Aguardar a polícia chegar"],
    correctIndex: 1,
    explanation: "Primeiro: sinalizar o local para evitar novos acidentes e acionar socorro especializado (SAMU 192, Bombeiros 193)."
  },
  {
    id: 16,
    category: "Primeiros Socorros",
    question: "Vítima de acidente com suspeita de fratura na coluna deve ser:",
    options: ["Movida imediatamente para um local seguro", "Mantida imóvel até a chegada do socorro especializado", "Colocada sentada", "Virada de bruços"],
    correctIndex: 1,
    explanation: "Movimentar vítima com suspeita de lesão na coluna pode causar paralisia permanente. Mantenha-a imóvel até o resgate."
  },
  {
    id: 17,
    category: "Primeiros Socorros",
    question: "O número do SAMU é:",
    options: ["190", "191", "192", "193"],
    correctIndex: 2,
    explanation: "SAMU: 192. Polícia Militar: 190. Polícia Rodoviária Federal: 191. Corpo de Bombeiros: 193."
  },
  {
    id: 18,
    category: "Primeiros Socorros",
    question: "Em caso de hemorragia em um membro, o procedimento adequado é:",
    options: ["Aplicar gelo no ferimento", "Comprimir o local com pano limpo e elevar o membro", "Aplicar torniquete imediatamente", "Lavar com água sanitária"],
    correctIndex: 1,
    explanation: "A compressão direta com pano limpo e elevação do membro acima do nível do coração ajuda a estancar o sangramento."
  },
  {
    id: 19,
    category: "Mecânica",
    question: "Para que serve o líquido de arrefecimento (água do radiador)?",
    options: ["Lubrificar o motor", "Resfriar o motor", "Limpar o sistema de combustível", "Aumentar a potência"],
    correctIndex: 1,
    explanation: "O líquido de arrefecimento mantém a temperatura do motor adequada, evitando superaquecimento."
  },
  {
    id: 20,
    category: "Mecânica",
    question: "Pneus com a calibragem abaixo do recomendado:",
    options: ["Melhoram a aderência", "Reduzem o consumo de combustível", "Aumentam o consumo e desgaste irregular", "Não afetam a dirigibilidade"],
    correctIndex: 2,
    explanation: "Pneus murchos aumentam o atrito, elevam o consumo de combustível, causam desgaste irregular e comprometem a segurança."
  },
  {
    id: 21,
    category: "Mecânica",
    question: "A luz de óleo acesa no painel indica:",
    options: ["Falta de combustível", "Problema na pressão do óleo do motor", "Bateria descarregada", "Necessidade de troca de pneus"],
    correctIndex: 1,
    explanation: "A luz vermelha do óleo indica baixa pressão. O veículo deve ser parado imediatamente para evitar danos graves ao motor."
  },
  {
    id: 22,
    category: "Mecânica",
    question: "O equipamento de segurança que deve constar obrigatoriamente em todo veículo é:",
    options: ["GPS", "Triângulo, chave de roda, macaco e estepe", "Rádio", "Câmera de ré"],
    correctIndex: 1,
    explanation: "Itens obrigatórios: triângulo, chave de roda, macaco e estepe (além de cintos, extintor quando exigido, etc.)."
  },
  {
    id: 23,
    category: "Meio Ambiente e Cidadania",
    question: "Qual atitude contribui para a redução da poluição do ar pelos veículos?",
    options: ["Acelerar bruscamente", "Manter o motor regulado e fazer revisões periódicas", "Andar com pneus murchos", "Dirigir com janelas abertas em alta velocidade"],
    correctIndex: 1,
    explanation: "Manutenção em dia reduz emissão de poluentes e o consumo de combustível."
  },
  {
    id: 24,
    category: "Meio Ambiente e Cidadania",
    question: "O óleo lubrificante usado deve ser descartado:",
    options: ["Na rede de esgoto", "No lixo comum", "Em postos de coleta de óleo usado", "No solo"],
    correctIndex: 2,
    explanation: "Óleo usado é altamente poluente e deve ser entregue em postos e oficinas que fazem a coleta para reciclagem."
  },
  {
    id: 25,
    category: "Meio Ambiente e Cidadania",
    question: "A buzina deve ser utilizada:",
    options: ["Para xingar outros motoristas", "Em sinais de advertência breves para evitar acidentes", "Em frente a hospitais e escolas", "Continuamente em engarrafamentos"],
    correctIndex: 1,
    explanation: "A buzina é toque breve e somente como advertência para evitar acidentes. Uso indevido é infração de trânsito."
  },
  {
    id: 26,
    category: "Legislação",
    question: "Ao se aproximar de uma faixa de pedestres sem semáforo, o condutor deve:",
    options: ["Acelerar para passar antes do pedestre", "Reduzir a velocidade e parar para o pedestre atravessar", "Buzinar para o pedestre esperar", "Desviar pela faixa ao lado"],
    correctIndex: 1,
    explanation: "O pedestre tem prioridade. Não dar passagem é infração gravíssima."
  },
  {
    id: 27,
    category: "Legislação",
    question: "A placa em formato octogonal (oito lados) na cor vermelha significa:",
    options: ["Atenção", "Pare", "Dê a preferência", "Proibido estacionar"],
    correctIndex: 1,
    explanation: "Placa R-1 (Pare): octogonal, vermelha com letras brancas. Obriga parada total."
  },
  {
    id: 28,
    category: "Direção Defensiva",
    question: "Conduzir utilizando o celular na mão é:",
    options: ["Permitido em paradas curtas", "Infração gravíssima", "Infração leve", "Permitido em rodovias"],
    correctIndex: 1,
    explanation: "Manusear celular ao volante é infração gravíssima, com multa e 7 pontos na CNH."
  },
  {
    id: 29,
    category: "Primeiros Socorros",
    question: "Em caso de queimadura, deve-se:",
    options: ["Aplicar pasta de dente ou manteiga", "Lavar com bastante água corrente em temperatura ambiente", "Estourar as bolhas", "Aplicar álcool"],
    correctIndex: 1,
    explanation: "Lavar com água em temperatura ambiente acalma a dor e evita aprofundamento da lesão. Nunca usar pasta, manteiga ou álcool."
  },
  {
    id: 30,
    category: "Meio Ambiente e Cidadania",
    question: "Dirigir de forma econômica significa:",
    options: ["Andar sempre em alta velocidade", "Acelerar e frear bruscamente", "Manter velocidade constante e trocar marchas no momento certo", "Andar em marcha alta em subidas"],
    correctIndex: 2,
    explanation: "Direção econômica reduz consumo e poluição: velocidade constante, trocas adequadas e antecipação de frenagens."
  }
];
