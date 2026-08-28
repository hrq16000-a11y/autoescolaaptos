/**
 * Inteligência de "shopping-savings" — economia, cupons e vantagens.
 * Fonte única de verdade para blocos de economia e schema Offer.
 * Sem preços fixos: valores são confirmados no atendimento (evita informação incorreta).
 */

export interface SavingItem {
  /** Código curto usado em tracking e mensagens de WhatsApp. */
  code: string;
  titulo: string;
  descricao: string;
  /** Rótulo curto de benefício (ex.: "1 aula grátis"). */
  beneficio: string;
  /** Rota da landing page dedicada, quando existir. */
  url?: string;
  /** Condição resumida (exibida em letra menor). */
  condicao?: string;
}

export const savings: SavingItem[] = [
  {
    code: "aniversario",
    titulo: "Promoção de Aniversário",
    descricao:
      "No mês do seu aniversário você ganha uma aula prática de presente na Autoescola APTOS.",
    beneficio: "1 aula grátis",
    url: "/promocao-aniversario",
    condicao: "Válido no mês do aniversário. Consulte condições.",
  },
  {
    code: "indique-amigo",
    titulo: "Indique um Amigo",
    descricao:
      "Indique um amigo para tirar a CNH na APTOS e os dois saem ganhando benefícios exclusivos.",
    beneficio: "Benefício para os dois",
    url: "/promocao-indique-amigo",
    condicao: "Válido após matrícula do indicado. Consulte condições.",
  },
  {
    code: "ab-combinada",
    titulo: "Categoria AB combinada",
    descricao:
      "Tirar carro e moto no mesmo processo sai mais em conta do que fazer as duas categorias separadamente.",
    beneficio: "Economia no processo único",
    url: "/categoria-ab",
    condicao: "Economia frente a dois processos separados.",
  },
  {
    code: "parcelamento",
    titulo: "Parcelamento facilitado",
    descricao:
      "Condições de pagamento parceladas para caber no seu orçamento, sem travar o início do processo.",
    beneficio: "Parcele seu processo",
    url: "/orcamento",
    condicao: "Sujeito a análise e condições vigentes.",
  },
];

/** Diferenciais usados na inteligência "best of" (por que escolher a APTOS). */
export const bestOf: { titulo: string; descricao: string }[] = [
  {
    titulo: "CFC credenciado ao DETRAN-PR",
    descricao:
      "Processo 100% dentro das regras da Resolução CONTRAN 1020/2025, sem risco de retrabalho.",
  },
  {
    titulo: "Atendimento humano e rápido",
    descricao: "Resposta direta no WhatsApp, sem robô e sem fila de espera.",
  },
  {
    titulo: "Frota nova e instrutores experientes",
    descricao: "Carros manuais revisados e motos preparadas para o exame prático.",
  },
  {
    titulo: "Alto índice de aprovação",
    descricao: "Alunos aprovados todo mês em São José dos Pinhais.",
  },
];

/** JSON-LD OfferCatalog para as vantagens/cupons ativos. */
export function buildSavingsSchema(siteUrl = "https://autoescolaaptos.com.br") {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Vantagens e promoções — Autoescola APTOS",
    url: `${siteUrl}/comparador`,
    itemListElement: savings.map((s, i) => ({
      "@type": "Offer",
      position: i + 1,
      name: s.titulo,
      description: s.descricao,
      url: s.url ? `${siteUrl}${s.url}` : siteUrl,
      availability: "https://schema.org/InStock",
      priceCurrency: "BRL",
      areaServed: "São José dos Pinhais, PR",
      seller: {
        "@type": "DrivingSchool",
        name: "Autoescola APTOS",
        url: siteUrl,
      },
    })),
  };
}

/** JSON-LD ItemList para páginas de comparação. */
export function buildComparisonSchema(
  items: { name: string; description: string; url?: string }[],
  opts: { name: string; url: string },
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: opts.name,
    url: opts.url,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      description: it.description,
      ...(it.url ? { url: it.url } : {}),
    })),
  };
}
