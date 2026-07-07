import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useAnalytics } from "@/hooks/useAnalytics";
import { whatsappLink, DEFAULT_MESSAGES } from "@/lib/whatsapp";

/**
 * Global floating WhatsApp button (DIRETO).
 * - Visible on all breakpoints.
 * - On mobile it sits ABOVE the MobileStickyBar (bottom-24) so both coexist.
 * - Dispara whatsapp_direto no dataLayer via useAnalytics.
 */
const FloatingWhatsApp = () => {
  const { trackWhatsAppClick } = useAnalytics();

  const handleClick = () => {
    trackWhatsAppClick("floating_button");
    if (typeof window !== "undefined") {
      const w = window as unknown as { dataLayer?: unknown[] };
      w.dataLayer?.push({
        event: "whatsapp_direto",
        source: "floating_button",
        kind: "direto",
      });
    }
  };

  return (
    <motion.a
      href={whatsappLink(DEFAULT_MESSAGES.direto, "direto")}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label="Falar agora no WhatsApp"
      className="fixed right-4 md:right-6 bottom-24 lg:bottom-6 z-[45] w-14 h-14 md:w-16 md:h-16 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full flex items-center justify-center shadow-large hover:scale-110 transition-all duration-300"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8, type: "spring", stiffness: 260, damping: 20 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Pulse rings */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping"
        style={{ animationDuration: "2.2s" }}
      />
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping"
        style={{ animationDuration: "2.2s", animationDelay: "0.6s" }}
      />

      <MessageCircle className="w-7 h-7 md:w-8 md:h-8 relative z-10" aria-hidden />

      {/* Notification dot */}
      <motion.span
        aria-hidden
        className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full border-2 border-background z-10"
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
    </motion.a>
  );
};

export default FloatingWhatsApp;
