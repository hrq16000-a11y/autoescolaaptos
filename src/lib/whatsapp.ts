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
