import {
  Plus,
  RefreshCw,
  RotateCcw,
  Car,
  type LucideIcon,
} from "lucide-react";

export interface ServicoData {
  slug: string;
  badge: string;
  icon: LucideIcon;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  heroSubtitle: string;
  porQue: string;
  beneficios: { title: string; desc: string }[];
  passos: { title: string; desc: string }[];
  diferenciais: string[];
  publicoAlvo: string;
  duracao: string;
  preRequisitos: string[];
  faqs: { q: string; a: string }[];
  serviceType: string;
  ctaPrincipal: string;
  ctaSecundario: string;
}

export const SERVICOS: Record<string, ServicoData> = {
  "inclusao-categoria": {
    slug: "inclusao-categoria",
    badge: "Inclusão de Categoria",
    icon: Plus,
    h1: "Inclusão de Categoria na CNH em São José dos Pinhais",
    metaTitle: "Inclusão de Categoria CNH (A ou B) em São José dos Pinhais | APTOS",
    metaDescription:
      "Inclua a categoria A (moto) ou B (carro) na sua CNH com a Autoescola APTOS em São José dos Pinhais. Processo rápido, instrutores credenciados e alta aprovação.",
    heroSubtitle:
      "Já tem CNH e quer adicionar uma nova categoria? Faça a inclusão (A ou B) com quem mais aprova em São José dos Pinhais. Curso teórico 100% online e aulas práticas com veículos novos.",
    porQue:
      "A inclusão é o caminho mais rápido para quem já é habilitado e quer pilotar moto (A) ou dirigir carro (B). Você reaproveita seu histórico no DETRAN-PR e só faz o complemento necessário.",
    beneficios: [
      {
        title: "Processo mais curto que primeira habilitação",
        desc: "Você não refaz exames já realizados anteriormente — só faz o que falta.",
      },
      {
        title: "Curso teórico complementar online",
        desc: "Estude pelo app CNH do Brasil no seu ritmo, sem precisar ir até a autoescola.",
      },
      {
        title: "Aulas práticas com veículos compatíveis",
        desc: "Motos (manual e automática) para a categoria A e carros manuais para a categoria B.",
      },
      {
        title: "Acompanhamento do processo pelo WhatsApp",
        desc: "Você sabe exatamente em que etapa está e o que falta para sua aprovação.",
      },
    ],
    passos: [
      {
        title: "Solicite seu orçamento de inclusão",
        desc: "Em 3 perguntas no nosso simulador você recebe o valor exato no WhatsApp.",
      },
      {
        title: "Exames médico e psicotécnico (se necessários)",
        desc: "Renovações se sua avaliação anterior estiver vencida ou se a nova categoria exigir.",
      },
      {
        title: "Curso teórico complementar",
        desc: "Online pelo app CNH do Brasil, com conteúdo específico da categoria desejada.",
      },
      {
        title: "Aulas práticas",
        desc: "Com veículo da nova categoria. Você treina o quanto precisar para se sentir seguro.",
      },
      {
        title: "Exame prático no DETRAN-PR",
        desc: "Realizado no veículo da categoria escolhida. APTOS te leva e te acompanha.",
      },
      {
        title: "CNH atualizada com a nova categoria",
        desc: "Após aprovação, a emissão é feita em até 10 dias úteis.",
      },
    ],
    diferenciais: [
      "+15 anos de tradição em São José dos Pinhais",
      "Frota nova: carro manual e motos manual/automática",
      "Instrutores credenciados pelo DETRAN-PR",
      "95% de aprovação no DETRAN-PR",
    ],
    publicoAlvo:
      "Condutores já habilitados na A que querem incluir a B (carro), ou habilitados na B que querem incluir a A (moto) — passando a ter CNH AB.",
    duracao: "Em média 30 a 60 dias, dependendo da categoria e disponibilidade do aluno.",
    preRequisitos: [
      "Estar habilitado em outra categoria há pelo menos 1 ano (regra geral)",
      "Idade mínima: 18 anos completos",
      "Não ter cometido infração gravíssima nos últimos 12 meses",
    ],
    serviceType: "Inclusão de Categoria de CNH",
    ctaPrincipal: "Quero incluir uma categoria",
    ctaSecundario: "Falar com a APTOS",
    faqs: [
      {
        q: "Quanto tempo leva para incluir uma categoria?",
        a: "Em média 30 a 60 dias, dependendo da categoria e da disponibilidade do aluno. A categoria A (moto) costuma ser a mais rápida.",
      },
      {
        q: "Preciso refazer o curso teórico inteiro?",
        a: "Não. Para inclusão você faz apenas o complemento teórico da nova categoria, focado no que ainda não foi abordado. Tudo online pelo app CNH do Brasil.",
      },
      {
        q: "Quantas aulas práticas preciso fazer?",
        a: "Com a Resolução CONTRAN 1020/2025, o mínimo é de 2 horas. Mas a APTOS recomenda treinar até estar confortável — a maioria dos alunos faz de 5 a 15 aulas.",
      },
      {
        q: "Posso incluir a categoria A já tendo a B?",
        a: "Sim! É uma das inclusões mais procuradas. Você reaproveita seus exames médicos (se válidos) e faz só o complemento teórico de moto + as aulas práticas.",
      },
      {
        q: "Vocês oferecem inclusão para C, D ou E?",
        a: "Não. A APTOS trabalha exclusivamente com as categorias A (moto) e B (carro). Para categorias profissionais (C, D, E) recomendamos procurar um CFC especializado em transporte de cargas e passageiros.",
      },
      {
        q: "Atendem alunos de quais bairros de São José dos Pinhais?",
        a: "Atendemos toda São José dos Pinhais — Centro, Afonso Pena, Cidade Jardim, Guatupê, Costeira, São Marcos, Borda do Campo, Rio Pequeno e demais bairros. Nossa sede fica próxima ao DETRAN-PR para facilitar seus exames.",
      },
    ],
  },

  "reciclagem-cnh": {
    slug: "reciclagem-cnh",
    badge: "Curso de Reciclagem",
    icon: RefreshCw,
    h1: "Curso de Reciclagem de CNH em São José dos Pinhais",
    metaTitle: "Curso de Reciclagem de CNH em São José dos Pinhais | APTOS",
    metaDescription:
      "Atingiu 20 pontos ou teve sua CNH suspensa? Faça o Curso de Reciclagem na APTOS em São José dos Pinhais. 100% online (EAD), aprovado pelo DETRAN-PR.",
    heroSubtitle:
      "Recuperou pontos demais ou teve a CNH suspensa? O Curso de Reciclagem é obrigatório para voltar a dirigir — e na APTOS você faz 100% online, no seu ritmo, com certificação aceita pelo DETRAN-PR.",
    porQue:
      "Sem o Curso de Reciclagem o DETRAN não devolve sua CNH. Quanto antes você inicia, mais rápido volta a dirigir legalmente — e evita multa gravíssima de R$ 880,41 por dirigir suspenso.",
    beneficios: [
      {
        title: "100% online (EAD) — aprovado pelo DETRAN-PR",
        desc: "Estude pelo computador ou celular, em qualquer horário, sem precisar ir até a autoescola.",
      },
      {
        title: "Faça no seu ritmo",
        desc: "Sem cronograma rígido. Você pausa e retoma quando puder, dentro do prazo de conclusão.",
      },
      {
        title: "Conteúdo completo das 30 horas exigidas",
        desc: "Legislação, direção defensiva, primeiros socorros, meio ambiente, cidadania e relacionamento interpessoal.",
      },
      {
        title: "Certificado emitido rapidamente",
        desc: "Após aprovação, encaminhamos seu certificado para o DETRAN-PR e você pode voltar a dirigir.",
      },
    ],
    passos: [
      {
        title: "Solicite a matrícula no curso",
        desc: "Pelo nosso simulador você recebe valor e link de pagamento em poucos minutos.",
      },
      {
        title: "Acesse a plataforma online",
        desc: "Login e senha enviados por e-mail/WhatsApp para começar imediatamente.",
      },
      {
        title: "Estude as 30 horas de conteúdo",
        desc: "Aulas em vídeo, materiais de apoio e exercícios divididos por módulo.",
      },
      {
        title: "Realize a prova final",
        desc: "Avaliação online dentro da própria plataforma — aprovação com 70% de acertos.",
      },
      {
        title: "Certificado enviado ao DETRAN-PR",
        desc: "Você recebe a cópia e seu processo de reabilitação avança automaticamente.",
      },
    ],
    diferenciais: [
      "Plataforma estável, sem travamentos",
      "Suporte humano por WhatsApp tirando dúvidas",
      "Aprovado e auditado pelo DETRAN-PR",
      "Pagamento facilitado (cartão, PIX, boleto)",
    ],
    publicoAlvo:
      "Condutores com 20 pontos ou mais na CNH em 12 meses, que cometeram infração gravíssima com suspensão automática, ou cuja CNH foi cassada e precisa ser reaberta.",
    duracao: "30 horas/aula. Pode ser concluído em poucos dias, conforme sua disponibilidade.",
    preRequisitos: [
      "CNH suspensa por pontuação ou infração gravíssima",
      "Notificação de suspensão recebida do DETRAN-PR",
      "Documento de identidade e CPF",
    ],
    serviceType: "Curso de Reciclagem de CNH",
    ctaPrincipal: "Quero fazer o curso agora",
    ctaSecundario: "Tirar dúvidas",
    faqs: [
      {
        q: "Quando preciso fazer o Curso de Reciclagem?",
        a: "Sempre que sua CNH for suspensa por: 20 pontos ou mais em 12 meses, infração gravíssima de suspensão automática (ex.: dirigir embriagado, racha, excesso de velocidade acima de 50%) ou decisão judicial. Sem o curso o DETRAN não devolve a habilitação.",
      },
      {
        q: "O curso pode ser 100% online?",
        a: "Sim. O DETRAN-PR autoriza a Reciclagem na modalidade EAD desde 2020. A APTOS oferece a plataforma oficial, com certificado válido em todo o Paraná.",
      },
      {
        q: "Quanto tempo demora para concluir?",
        a: "São 30 horas/aula. A maioria dos alunos conclui em 4 a 7 dias, mas você pode fazer no seu ritmo. Não há prazo mínimo, apenas máximo definido pela plataforma.",
      },
      {
        q: "Posso dirigir enquanto faço o curso?",
        a: "Não. Enquanto sua CNH estiver suspensa, dirigir é infração gravíssima (R$ 880,41 + 7 pontos + apreensão da CNH). Faça o curso o quanto antes para regularizar.",
      },
      {
        q: "Preciso ir até a autoescola em algum momento?",
        a: "Não. Matrícula, aulas, prova e emissão do certificado são totalmente digitais. Você só precisará comparecer ao DETRAN-PR para os trâmites finais de devolução da CNH.",
      },
      {
        q: "Se eu reprovar na prova final, posso refazer?",
        a: "Sim, a plataforma permite refazer a avaliação até atingir os 70% mínimos. Sem custo adicional.",
      },
    ],
  },

  "reteste-pratico": {
    slug: "reteste-pratico",
    badge: "Reteste Prático",
    icon: RotateCcw,
    h1: "Reteste Prático de Direção em São José dos Pinhais",
    metaTitle: "Reteste Prático DETRAN-PR em São José dos Pinhais | APTOS",
    metaDescription:
      "Reprovou na prova prática? Refaça com a APTOS em São José dos Pinhais. Aulas focadas no que reprovou, instrutores experientes e suporte no dia do reteste.",
    heroSubtitle:
      "Foi reprovado no exame prático do DETRAN-PR? Não se desespere. Mais de 30% dos candidatos reprovam na primeira tentativa. Na APTOS você refaz com aulas direcionadas ao que reprovou e volta para o reteste preparado de verdade.",
    porQue:
      "Reprovar é normal — o que faz diferença é o que você faz depois. Vir treinar com instrutores experientes no padrão exato do exame DETRAN-PR aumenta drasticamente as chances de aprovação no reteste.",
    beneficios: [
      {
        title: "Aulas focadas no que você reprovou",
        desc: "Baliza? Conversão? Rampa? Diagnosticamos onde travou e treinamos isso especificamente.",
      },
      {
        title: "Simulado no circuito real do DETRAN-PR",
        desc: "Nossos instrutores conhecem cada detalhe do circuito de exame. Você chega na prova já familiarizado.",
      },
      {
        title: "Carro novo com direção elétrica",
        desc: "Mesma categoria de veículo usado no exame. Sem surpresas no dia do reteste.",
      },
      {
        title: "Suporte emocional e técnico",
        desc: "Reprovação afeta a confiança. Ajudamos você a recuperar a calma antes de voltar para o exame.",
      },
    ],
    passos: [
      {
        title: "Conte para a gente o que aconteceu",
        desc: "Por qual motivo foi reprovado? Falta grave, eliminatória, nervosismo? Já entramos com diagnóstico personalizado.",
      },
      {
        title: "Aulas direcionadas",
        desc: "Pacotes de 1, 2, 4 ou mais aulas, conforme seu nível. Você decide quanto quer treinar.",
      },
      {
        title: "Simulado no circuito real",
        desc: "Última aula no padrão do exame DETRAN-PR, com pontuação simulada.",
      },
      {
        title: "Agendamento do reteste",
        desc: "Ajudamos com o agendamento do reteste no DETRAN-PR.",
      },
      {
        title: "Dia do reteste com instrutor",
        desc: "Nosso instrutor te acompanha até o local. Você usa carro APTOS no exame.",
      },
    ],
    diferenciais: [
      "Instrutores que conhecem o circuito DETRAN-PR em São José dos Pinhais",
      "Pacotes flexíveis (de 1 aula até preparação completa)",
      "Carro novo, mesmo padrão do exame oficial",
      "Atendimento humano — sem julgamento pela reprovação",
    ],
    publicoAlvo:
      "Candidatos que foram reprovados no exame prático de direção do DETRAN-PR e querem chegar mais preparados no reteste — alunos de qualquer autoescola são bem-vindos.",
    duracao: "Geralmente 1 a 5 aulas práticas, dependendo da causa da reprovação.",
    preRequisitos: [
      "Ter sido reprovado em exame prático do DETRAN-PR recentemente",
      "Processo ativo no DETRAN-PR",
      "Documento de identidade e CPF",
    ],
    serviceType: "Reteste Prático de Direção",
    ctaPrincipal: "Quero treinar para o reteste",
    ctaSecundario: "Falar com instrutor",
    faqs: [
      {
        q: "Reprovei no exame prático. Quando posso fazer o reteste?",
        a: "O agendamento do reteste pode ser feito a partir de 15 dias após a reprovação, conforme regra do DETRAN-PR. Use esse tempo para treinar com calma na APTOS.",
      },
      {
        q: "Posso fazer o reteste em outra autoescola?",
        a: "Sim! Você não é obrigado a ficar com a autoescola que te aprovou no teórico. Muitos alunos vêm para a APTOS depois de uma reprovação em outra escola, porque queremos qualidade nas aulas práticas.",
      },
      {
        q: "Quantas aulas práticas preciso fazer antes do reteste?",
        a: "Depende. Para erros pontuais (baliza, rampa), 1 a 2 aulas resolvem. Para questões mais amplas (nervosismo, falta de domínio), recomendamos 4 a 5. Avaliamos seu caso na primeira aula.",
      },
      {
        q: "Posso usar o carro da APTOS no exame?",
        a: "Sim, se você fizer pelo menos uma aula de adaptação conosco. O carro é novo, com direção elétrica e está no padrão exato do exame DETRAN-PR.",
      },
      {
        q: "O reteste é grátis?",
        a: "A Resolução CONTRAN 1020/2025 prevê gratuidade para o primeiro reteste em algumas situações, mas no Paraná essa regra ainda não está em vigor — aguarda manifestação da PGE-PR. Consulte o valor atual com a APTOS.",
      },
      {
        q: "Quais são as causas mais comuns de reprovação?",
        a: "Baliza, rampa de estacionamento, não dar seta, exceder velocidade no circuito interno, frear bruscamente, não checar retrovisor antes de mudar de faixa e nervosismo. Treinamos todos esses pontos.",
      },
    ],
  },

  "aulas-praticas": {
    slug: "aulas-praticas",
    badge: "Aulas Práticas",
    icon: Car,
    h1: "Aulas Práticas de Direção em São José dos Pinhais",
    metaTitle: "Aulas Práticas de Direção em São José dos Pinhais | APTOS",
    metaDescription:
      "Aulas práticas de direção com instrutores credenciados, carros novos com direção elétrica e treino no circuito real do DETRAN-PR em São José dos Pinhais.",
    heroSubtitle:
      "Você dirige com quem mais aprova em São José dos Pinhais. Carros novos com direção elétrica, instrutores pacientes e treino no circuito do DETRAN-PR. Aulas avulsas ou pacotes para se preparar com confiança.",
    porQue:
      "A Resolução CONTRAN 1020/2025 reduziu o mínimo de aulas práticas para 2 horas — mas isso quase nunca é suficiente. Na APTOS você faz o número de aulas que precisa para realmente dirigir com segurança, não só passar na prova.",
    beneficios: [
      {
        title: "Carros novos com direção elétrica",
        desc: "Veículos atualizados, conforto e segurança em cada aula — sem surpresas no dia do exame.",
      },
      {
        title: "Instrutores pacientes e didáticos",
        desc: "Equipe credenciada pelo DETRAN-PR, com anos de experiência e abordagem humana com o aluno iniciante.",
      },
      {
        title: "Treino no circuito real do exame",
        desc: "Você chega na prova já familiarizado com o circuito DETRAN-PR de São José dos Pinhais.",
      },
      {
        title: "Pacotes flexíveis",
        desc: "Aulas avulsas, pacotes de 5/10/20 horas, ou combos com simulado no circuito de exame.",
      },
    ],
    passos: [
      {
        title: "Solicite o pacote ideal pelo simulador",
        desc: "Em 3 perguntas você recebe a recomendação personalizada e o valor.",
      },
      {
        title: "Avaliação inicial",
        desc: "Primeira aula serve para identificar seu nível e definir um plano de aulas adequado.",
      },
      {
        title: "Aulas progressivas",
        desc: "Pátio → ruas tranquilas → tráfego intenso → baliza → rampa → circuito DETRAN.",
      },
      {
        title: "Simulado no padrão do exame",
        desc: "Última aula simula o exame real, com pontuação e feedback completo.",
      },
      {
        title: "Acompanhamento até o exame",
        desc: "Vamos com você até o DETRAN-PR no dia da prova.",
      },
    ],
    diferenciais: [
      "Frota nova com direção elétrica",
      "Horários flexíveis (manhã, tarde, noite, sábado)",
      "Instrutores credenciados DETRAN-PR",
      "Aulas avulsas para alunos de outras autoescolas",
    ],
    publicoAlvo:
      "Alunos em processo de primeira habilitação, candidatos preparando reteste, motoristas inseguros que querem retomar a direção, ou pessoas que precisam de aulas avulsas extras.",
    duracao: "Aulas de 50 minutos. Pacotes recomendados: 10 a 20 aulas para iniciantes.",
    preRequisitos: [
      "Processo ativo no DETRAN-PR (para exame) ou CNH válida (para reciclagem voluntária)",
      "Idade mínima 18 anos",
      "Para alunos sem processo: aulas voluntárias estão disponíveis",
    ],
    serviceType: "Aulas Práticas de Direção Veicular",
    ctaPrincipal: "Quero contratar aulas práticas",
    ctaSecundario: "Tirar dúvidas",
    faqs: [
      {
        q: "Quantas aulas práticas preciso fazer?",
        a: "O mínimo legal pela Resolução 1020/2025 é de apenas 2 horas, mas a APTOS recomenda no mínimo 10 a 20 aulas para quem está começando. O número ideal depende do seu desempenho — avaliamos isso na primeira aula.",
      },
      {
        q: "Posso fazer aulas avulsas sem ser aluno?",
        a: "Sim. Atendemos alunos de outras autoescolas (especialmente para reteste) e também motoristas habilitados que querem retomar a direção depois de muito tempo sem dirigir.",
      },
      {
        q: "Os carros são automáticos ou manuais?",
        a: "Temos carros manuais (padrão para o exame DETRAN-PR categoria B). Todos com direção elétrica para máximo conforto e segurança.",
      },
      {
        q: "Como funciona a aula de baliza?",
        a: "A baliza é um dos pontos mais temidos. Treinamos a técnica passo a passo, com referências visuais que funcionam de verdade no circuito DETRAN-PR. A maioria dos alunos domina em 2 a 3 aulas.",
      },
      {
        q: "Tem aulas aos sábados?",
        a: "Sim! Aulas aos sábados de manhã, especialmente para alunos que trabalham durante a semana. Horários sob agendamento.",
      },
      {
        q: "Sou muito inseguro, vocês têm paciência com iniciante?",
        a: "Esse é o nosso diferencial. Nossos instrutores são selecionados pela didática e paciência. Começamos no pátio, sem pressão, e só vamos para a rua quando você se sentir pronto.",
      },
    ],
  },
};

export const SERVICOS_LIST = Object.values(SERVICOS);
