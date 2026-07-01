/**
 * SmartAssistant — resolvedor local de dúvidas frequentes.
 * Busca por palavras-chave nas FAQs e responde antes de encaminhar ao WhatsApp.
 *
 * Arquitetura preparada para upgrade: a função `resolve()` pode ser trocada
 * futuramente por uma chamada a uma Edge Function com Lovable AI Gateway
 * mantendo o mesmo contrato (input string → { answer, intent, related }).
 */
import { faqData, type FAQItem } from "@/data/faqData";

export type Intent =
  | "preco"
  | "prazo"
  | "documentos"
  | "processo"
  | "categoria"
  | "reciclagem"
  | "renovacao"
  | "pcd"
  | "aulas"
  | "outro";

interface IntentRule {
  intent: Intent;
  keywords: string[];
  quickAnswer?: string;
}

const RULES: IntentRule[] = [
  {
    intent: "preco",
    keywords: ["preço", "preco", "valor", "custa", "custo", "quanto é", "quanto é", "parcel", "desconto", "promoção", "promocao"],
    quickAnswer:
      "Cada pacote tem valor diferente (categoria, aulas extras, reteste). Para um orçamento exato em menos de 1 minuto, use nosso simulador — ele calcula o valor personalizado e envia direto pelo WhatsApp.",
  },
  {
    intent: "prazo",
    keywords: ["tempo", "demora", "prazo", "quanto tempo", "meses", "rápido", "rapido", "urgente"],
    quickAnswer:
      "Com a Resolução 1020/2025, o processo completo leva em média 2 a 4 meses. Depende do seu ritmo no curso teórico (agora livre no app CNH do Brasil) e da agenda do DETRAN-PR para os exames.",
  },
  {
    intent: "documentos",
    keywords: ["documento", "documentos", "rg", "cpf", "comprovante", "papelada"],
    quickAnswer:
      "Você só precisa de: RG (ou CNH atual), CPF e comprovante de residência recente. A APTOS abre todo o processo no DETRAN-PR para você — sem filas.",
  },
  {
    intent: "processo",
    keywords: ["como funciona", "como começa", "como comeca", "etapas", "passo a passo", "iniciar", "começar"],
    quickAnswer:
      "6 etapas: (1) abertura do processo, (2) exame médico e psicotécnico, (3) curso teórico no app CNH do Brasil, (4) prova teórica, (5) aulas práticas, (6) prova prática. Fim do prazo de 12 meses — você anda no seu ritmo.",
  },
  {
    intent: "categoria",
    keywords: ["categoria", "moto", "carro", "caminhão", "caminhao", "ônibus", "onibus", "cat a", "cat b", "ab"],
    quickAnswer:
      "Categoria A é moto, B é carro, AB é as duas juntas (mais econômico). Se você já tem B e quer adicionar A (ou vice-versa), chama-se 'Inclusão de Categoria' e é mais rápido.",
  },
  {
    intent: "reciclagem",
    keywords: ["reciclagem", "pontos", "suspens", "cassad", "curso reciclagem"],
    quickAnswer:
      "Nosso curso de reciclagem é 100% online (EAD), aprovado pelo DETRAN-PR. Ideal para quem foi suspenso, teve CNH cassada ou precisa cumprir os 30 horas obrigatórios.",
  },
  {
    intent: "renovacao",
    keywords: ["renovação", "renovacao", "renovar", "vencida", "vencer", "revalidar"],
    quickAnswer:
      "Renovação de CNH: exame médico + fotos + emissão. Não precisa fazer prova. A APTOS agenda tudo e cuida da documentação. Simples e rápido.",
  },
  {
    intent: "pcd",
    keywords: ["pcd", "deficiência", "deficiencia", "especial", "adaptado", "junta médica"],
    quickAnswer:
      "Temos atendimento especializado para PCD: acompanhamos você desde a Junta Médica Especial do DETRAN-PR até o exame no veículo adaptado. Veja detalhes em /pcd.",
  },
  {
    intent: "aulas",
    keywords: ["aula", "aulas", "prática", "pratica", "direção", "direcao", "instrutor", "horário", "horario"],
    quickAnswer:
      "Aulas práticas com carros novos, direção elétrica e ar-condicionado. Horários flexíveis (manhã, tarde, noite e sábado). Mínimo legal é 2h, mas recomendamos 10 a 20 aulas para você chegar confiante à prova.",
  },
];

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export interface AssistantResponse {
  intent: Intent;
  answer: string;
  related: FAQItem[];
  confidence: "high" | "medium" | "low";
}

export function resolve(question: string): AssistantResponse {
  const q = normalize(question);
  if (!q) {
    return { intent: "outro", answer: "", related: [], confidence: "low" };
  }

  // 1. Match por regras (intenções fortes)
  let matched: IntentRule | undefined;
  let matchScore = 0;
  for (const rule of RULES) {
    const hits = rule.keywords.filter((k) => q.includes(normalize(k))).length;
    if (hits > matchScore) {
      matchScore = hits;
      matched = rule;
    }
  }

  // 2. Busca por FAQs relacionadas (keyword overlap)
  const tokens = q.split(/\s+/).filter((t) => t.length > 3);
  const scored = faqData
    .map((item) => {
      const hay = normalize(`${item.question} ${item.answer}`);
      const score = tokens.reduce((acc, t) => acc + (hay.includes(t) ? 1 : 0), 0);
      return { item, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => x.item);

  if (matched?.quickAnswer) {
    return {
      intent: matched.intent,
      answer: matched.quickAnswer,
      related: scored,
      confidence: matchScore >= 2 ? "high" : "medium",
    };
  }

  if (scored.length > 0) {
    return {
      intent: "outro",
      answer: scored[0].answer,
      related: scored.slice(1),
      confidence: "medium",
    };
  }

  return {
    intent: "outro",
    answer:
      "Não tenho uma resposta pronta para isso, mas nosso consultor humano responde em segundos pelo WhatsApp. Prefere que eu te encaminhe?",
    related: [],
    confidence: "low",
  };
}

/**
 * Sugestões iniciais mostradas quando o assistant abre.
 */
export const SUGGESTED_QUESTIONS = [
  "Quanto custa a primeira habilitação?",
  "Quanto tempo demora para tirar a CNH?",
  "Quais documentos eu preciso?",
  "Como funciona o curso de reciclagem?",
  "Quero categoria A e B juntas",
];
