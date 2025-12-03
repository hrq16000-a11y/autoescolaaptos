export interface Neighborhood {
  slug: string;
  name: string;
  title: string;
  description: string;
  metaDescription: string;
  content: string;
  highlights: string[];
  nearbyAreas: string[];
}

export const neighborhoods: Neighborhood[] = [
  {
    slug: "centro",
    name: "Centro",
    title: "Autoescola no Centro de São José dos Pinhais",
    description: "A Autoescola APTOS está localizada no coração de São José dos Pinhais, oferecendo fácil acesso para moradores do Centro.",
    metaDescription: "Autoescola APTOS no Centro de São José dos Pinhais. CNH, renovação, mudança de categoria. Localização privilegiada com fácil acesso. Ligue: (41) 3383-3627",
    content: "Localizada no Centro de São José dos Pinhais, a Autoescola APTOS oferece toda estrutura necessária para sua habilitação. Com instrutores experientes e veículos modernos, proporcionamos a melhor experiência de aprendizado. Nossa localização central facilita o acesso de moradores de toda a região.",
    highlights: [
      "Localização central e de fácil acesso",
      "Próximo ao terminal de ônibus",
      "Estacionamento próprio",
      "Horários flexíveis"
    ],
    nearbyAreas: ["Afonso Pena", "Cidade Jardim", "São Marcos"]
  },
  {
    slug: "afonso-pena",
    name: "Afonso Pena",
    title: "Autoescola em Afonso Pena - São José dos Pinhais",
    description: "Atendemos moradores de Afonso Pena e região do aeroporto com cursos completos de habilitação e renovação de CNH.",
    metaDescription: "Autoescola para moradores de Afonso Pena em SJP. Próximo ao aeroporto. Primeira habilitação, renovação CNH. Atendimento especializado. (41) 3383-3627",
    content: "A Autoescola APTOS atende moradores de Afonso Pena e região próxima ao Aeroporto Afonso Pena. Oferecemos cursos de primeira habilitação, renovação de CNH, mudança de categoria e reciclagem. Nossa equipe está preparada para atender você com excelência.",
    highlights: [
      "Atendimento para região do aeroporto",
      "Rotas de treinamento diversificadas",
      "Instrutores conhecedores da região",
      "Aulas práticas em vias movimentadas"
    ],
    nearbyAreas: ["Centro", "Guatupê", "Aeroporto"]
  },
  {
    slug: "cidade-jardim",
    name: "Cidade Jardim",
    title: "Autoescola na Cidade Jardim - São José dos Pinhais",
    description: "Moradores da Cidade Jardim contam com a Autoescola APTOS para tirar a primeira habilitação ou renovar a CNH.",
    metaDescription: "Autoescola na Cidade Jardim em São José dos Pinhais. Cursos de CNH categoria A e B. Aprovação garantida. Agende sua aula: (41) 3383-3627",
    content: "Atendemos moradores da Cidade Jardim em São José dos Pinhais com toda dedicação. A Autoescola APTOS oferece infraestrutura completa para sua formação como condutor. Venha conhecer nossos diferenciais e comece sua jornada para a habilitação.",
    highlights: [
      "Fácil acesso para moradores do bairro",
      "Simulador de direção disponível",
      "Aulas teóricas e práticas completas",
      "Aprovação no DETRAN garantida"
    ],
    nearbyAreas: ["Centro", "São Marcos", "Costeira"]
  },
  {
    slug: "guatupe",
    name: "Guatupê",
    title: "Autoescola em Guatupê - São José dos Pinhais",
    description: "A Autoescola APTOS atende moradores de Guatupê com cursos de habilitação de qualidade e preços acessíveis.",
    metaDescription: "Autoescola em Guatupê, São José dos Pinhais. Primeira habilitação, renovação, reciclagem. Preços especiais para moradores da região. (41) 3383-3627",
    content: "Moradores de Guatupê podem contar com a Autoescola APTOS para todos os serviços relacionados à habilitação. Nossa equipe oferece atendimento personalizado e acompanhamento completo durante todo o processo de formação.",
    highlights: [
      "Preços especiais para moradores",
      "Transporte para aulas práticas",
      "Horários adaptados à sua rotina",
      "Instrutores pacientes e experientes"
    ],
    nearbyAreas: ["Afonso Pena", "Centro", "Borda do Campo"]
  },
  {
    slug: "costeira",
    name: "Costeira",
    title: "Autoescola na Costeira - São José dos Pinhais",
    description: "Moradores da Costeira têm na Autoescola APTOS a melhor opção para primeira habilitação e renovação de CNH.",
    metaDescription: "Autoescola para moradores da Costeira em SJP. CNH A, B, AB. Curso completo com material incluso. Parcele em até 12x. Ligue: (41) 3383-3627",
    content: "A Autoescola APTOS oferece atendimento especializado para moradores da Costeira em São José dos Pinhais. Com anos de experiência no mercado, somos referência em formação de condutores na região.",
    highlights: [
      "Atendimento preferencial para o bairro",
      "Parcelamento facilitado",
      "Material didático incluso",
      "Alto índice de aprovação"
    ],
    nearbyAreas: ["Cidade Jardim", "São Marcos", "Centro"]
  },
  {
    slug: "sao-marcos",
    name: "São Marcos",
    title: "Autoescola em São Marcos - São José dos Pinhais",
    description: "A Autoescola APTOS está próxima ao bairro São Marcos, oferecendo cursos de CNH com qualidade e tradição.",
    metaDescription: "Autoescola perto de São Marcos em São José dos Pinhais. Habilitação categoria A, B, AB. Instrutores experientes. Agende: (41) 3383-3627",
    content: "Moradores de São Marcos encontram na Autoescola APTOS a parceira ideal para conquistar a habilitação. Nossa metodologia de ensino é reconhecida pela alta taxa de aprovação no DETRAN.",
    highlights: [
      "Metodologia comprovada de ensino",
      "Veículos novos e seguros",
      "Acompanhamento individual",
      "Suporte até a aprovação"
    ],
    nearbyAreas: ["Centro", "Cidade Jardim", "Costeira"]
  },
  {
    slug: "borda-do-campo",
    name: "Borda do Campo",
    title: "Autoescola em Borda do Campo - São José dos Pinhais",
    description: "Atendemos moradores de Borda do Campo com serviços completos de autoescola e CNH.",
    metaDescription: "Autoescola para Borda do Campo em São José dos Pinhais. Primeira CNH, renovação, mudança de categoria. Atendimento humanizado. (41) 3383-3627",
    content: "A Autoescola APTOS está preparada para atender moradores de Borda do Campo e região. Oferecemos todos os serviços de formação de condutores com a qualidade que você merece.",
    highlights: [
      "Atendimento humanizado",
      "Flexibilidade de horários",
      "Aulas aos sábados",
      "Equipe dedicada"
    ],
    nearbyAreas: ["Guatupê", "Centro", "Rio Pequeno"]
  },
  {
    slug: "rio-pequeno",
    name: "Rio Pequeno",
    title: "Autoescola em Rio Pequeno - São José dos Pinhais",
    description: "Moradores de Rio Pequeno contam com a Autoescola APTOS para serviços de habilitação e renovação de CNH.",
    metaDescription: "Autoescola em Rio Pequeno, SJP. Cursos de CNH com alta aprovação. Instrutores qualificados. Entre em contato: (41) 3383-3627",
    content: "A Autoescola APTOS atende moradores de Rio Pequeno com excelência em serviços de habilitação. Nossa estrutura completa e equipe qualificada garantem sua aprovação no DETRAN.",
    highlights: [
      "Estrutura completa",
      "Equipe qualificada",
      "Treinamento intensivo disponível",
      "Garantia de satisfação"
    ],
    nearbyAreas: ["Borda do Campo", "Centro", "Guatupê"]
  }
];

export const getNeighborhoodBySlug = (slug: string): Neighborhood | undefined => {
  return neighborhoods.find(n => n.slug === slug);
};
