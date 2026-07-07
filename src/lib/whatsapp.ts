// Central WhatsApp configuration for Autoescola APTOS.
// Two numbers with different purposes:
// - DIRETO: hidden behind generic "WhatsApp" / floating button CTAs.
//   Used when the user is already decided and just wants to talk.
// - FUNIL: used by qualification funnel (/orcamento) and pricing/quote CTAs.
//   Receives pre-qualified leads with structured first message.

export const WHATSAPP_DIRETO = "5541991453627"; // (41) 99145-3627
export const WHATSAPP_FUNIL = "554133833627";   // (41) 3383-3627

export type WhatsAppKind = "direto" | "funil";

export function whatsappLink(message: string, kind: WhatsAppKind = "direto"): string {
  const phone = kind === "funil" ? WHATSAPP_FUNIL : WHATSAPP_DIRETO;
  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
}

/**
 * Mensagens padrão pensadas para conversão (SJP + intenção clara).
 * Use DEFAULT_MESSAGES.direto para CTAs "falar agora" e
 * DEFAULT_MESSAGES.funil para CTAs de qualificação (fixo/triagem).
 */
export const DEFAULT_MESSAGES = {
  direto:
    "Olá! Quero informações sobre a Autoescola APTOS em São José dos Pinhais. Pode me passar valores e próximas turmas?",
  funil:
    "Olá! Vim pelo site e gostaria de simular meu orçamento na Autoescola APTOS (São José dos Pinhais).",
} as const;
