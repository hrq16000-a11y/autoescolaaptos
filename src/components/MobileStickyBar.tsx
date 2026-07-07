import { Link } from "react-router-dom";
import { MessageCircle, Phone } from "lucide-react";
import { whatsappLink, DEFAULT_MESSAGES } from "@/lib/whatsapp";
import { useAnalytics } from "@/hooks/useAnalytics";

/**
 * Sticky bottom action bar for mobile.
 * Left CTA → /orcamento funnel (high-intent leads).
 * Right CTA → direct WhatsApp (already-decided users).
 * Hidden on lg+ to avoid covering desktop content.
 */
const MobileStickyBar = () => {
  const { trackEvent, trackWhatsAppClick } = useAnalytics();

  return (
    <>
      {/* Spacer so page content never sits beneath the bar on mobile */}
      <div aria-hidden className="h-16 lg:hidden" />

      <nav
        aria-label="Ações rápidas"
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur-md border-t border-border shadow-large grid grid-cols-2 gap-2 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
      >
        <Link
          to="/orcamento"
          onClick={() => trackEvent("mobile_bar_orcamento")}
          aria-label="Simular orçamento da CNH"
          className="flex items-center justify-center gap-2 min-h-[48px] px-3 rounded-lg bg-primary text-primary-foreground font-bold text-sm shadow-glow active:scale-95 transition-transform"
        >
          <MessageCircle className="w-5 h-5" aria-hidden />
          Simular Orçamento
        </Link>

        <a
          href={whatsappLink(DEFAULT_MESSAGES.direto, "direto")}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick("mobile_bar_direto")}
          aria-label="Falar agora no WhatsApp"
          className="flex items-center justify-center gap-2 min-h-[48px] px-3 rounded-lg bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-sm active:scale-95 transition-transform"
        >
          <Phone className="w-5 h-5" aria-hidden />
          Falar Agora
        </a>
      </nav>
    </>
  );
};

export default MobileStickyBar;
