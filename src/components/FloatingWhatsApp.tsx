import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useAnalytics } from "@/hooks/useAnalytics";
import { whatsappLink } from "@/lib/whatsapp";

// Hidden on mobile (lg:flex) because MobileStickyBar already covers
// the same intent at the bottom of the viewport on phones.
const FloatingWhatsApp = () => {
  const { trackWhatsAppClick } = useAnalytics();

  return (
    <motion.a
      href={whatsappLink("Olá, gostaria de informações sobre a Autoescola APTOS", "direto")}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick("floating_button")}
      className="hidden lg:flex fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full items-center justify-center shadow-large hover:scale-110 transition-all duration-300"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
      <motion.div
        className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
    </motion.a>
  );
};

export default FloatingWhatsApp;
