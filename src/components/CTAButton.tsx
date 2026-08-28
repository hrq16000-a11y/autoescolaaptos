import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { whatsappLink, type WhatsAppKind } from "@/lib/whatsapp";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useFunnelModal } from "@/hooks/useFunnelModal";
import { trackWhatsAppClick as trackWaClick } from "@/lib/events";

/**
 * <CTAButton /> — Centralized CTA component for the entire site.
 *
 * intent:
 *  - "funil"     → leva ao /orcamento (lead qualificado).
 *  - "whatsapp"  → abre WhatsApp DIRETO (decidido).
 *  - "whatsapp-funil" → abre WhatsApp do FUNIL (pré-qualificado).
 *  - "telefone"  → WhatsApp FUNIL (fixo (41) 3383-3627 é WhatsApp de triagem).
 *  - "internal"  → navegação interna (precisa de `to`).
 *  - "external"  → link externo (precisa de `href`).
 *
 * Centraliza analytics, microcopy padrão e roteamento entre números.
 */
export type CTAIntent =
  | "funil"
  | "whatsapp"
  | "whatsapp-funil"
  | "telefone"
  | "internal"
  | "external";

interface CTAButtonProps {
  intent: CTAIntent;
  children: React.ReactNode;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "outline" | "secondary" | "ghost";
  className?: string;
  to?: string;
  href?: string;
  message?: string;
  trackingLabel?: string;
  trackingSource?: string;
  service?: string;
  showIcon?: boolean;
  fullWidth?: boolean;
}

const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(
  (
    {
      intent,
      children,
      size = "lg",
      variant = "default",
      className,
      to,
      href,
      message = "Olá! Vim pelo site da Autoescola APTOS.",
      trackingLabel,
      trackingSource = "cta_button",
      service,
      showIcon = true,
      fullWidth = false,
    },
    ref
  ) => {
    const { trackWhatsAppClick, trackPhoneClick, trackEvent } = useAnalytics();
    const funnel = useFunnelModal();

    const handleClick = () => {
      const label = trackingLabel || intent;
      switch (intent) {
        case "whatsapp":
          trackEvent("whatsapp_direto", { source: trackingSource, label });
          trackWhatsAppClick(trackingSource, service);
          trackWaClick({ source: trackingSource, kind: "direto", service });
          break;
        case "whatsapp-funil":
          trackEvent("whatsapp_funil_direct", { source: trackingSource, label });
          trackWhatsAppClick(trackingSource, service);
          trackWaClick({ source: trackingSource, kind: "funil", service });
          break;
        case "telefone":
          trackPhoneClick(trackingSource);
          trackWaClick({ source: trackingSource, kind: "funil", service });
          break;
        case "funil":
          trackEvent("cta_funil_click", { source: trackingSource, label });
          break;
        default:
          trackEvent("cta_click", { source: trackingSource, label, intent });
      }
    };

    const baseClasses = cn(
      "font-semibold transition-all",
      size === "lg" && "h-14 px-8 shadow-glow",
      fullWidth && "w-full",
      className
    );

    const icon = !showIcon ? null : intent === "internal" || intent === "external" ? (
      <ArrowRight className="w-5 h-5 ml-2" aria-hidden />
    ) : (
      <MessageCircle className="w-5 h-5 mr-2" aria-hidden />
    );

    const content =
      intent === "internal" || intent === "external" ? (
        <>
          {children}
          {icon}
        </>
      ) : (
        <>
          {icon}
          {children}
        </>
      );

    // Resolve destination
    // "funil" abre o FunnelModal (multi-etapas). Se `to` for passado explicitamente,
    // navega para essa rota (ex.: manter link direto para /orcamento em algum caso).
    if (intent === "funil") {
      if (to) {
        return (
          <Button ref={ref} size={size} variant={variant} className={baseClasses} onClick={handleClick} asChild>
            <Link to={to}>{content}</Link>
          </Button>
        );
      }
      return (
        <Button
          ref={ref}
          size={size}
          variant={variant}
          className={baseClasses}
          onClick={() => {
            handleClick();
            funnel.open(trackingSource);
          }}
          data-intent="funil"
        >
          {content}
        </Button>
      );
    }

    if (intent === "internal") {
      return (
        <Button ref={ref} size={size} variant={variant} className={baseClasses} onClick={handleClick} asChild>
          <Link to={to || "/"}>{content}</Link>
        </Button>
      );
    }

    if (intent === "external") {
      return (
        <Button ref={ref} size={size} variant={variant} className={baseClasses} onClick={handleClick} asChild>
          <a href={href} target="_blank" rel="noopener noreferrer">
            {content}
          </a>
        </Button>
      );
    }

    if (intent === "telefone") {
      // Ambos os telefones da autoescola são WhatsApp. O fixo é o número de triagem/funil.
      return (
        <Button ref={ref} size={size} variant={variant} className={baseClasses} onClick={handleClick} asChild>
          <a href={whatsappLink(message, "funil")} target="_blank" rel="noopener noreferrer">
            {content}
          </a>
        </Button>
      );
    }

    // WhatsApp
    const kind: WhatsAppKind = intent === "whatsapp-funil" ? "funil" : "direto";
    return (
      <Button ref={ref} size={size} variant={variant} className={baseClasses} onClick={handleClick} asChild>
        <a href={whatsappLink(message, kind)} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      </Button>
    );
  }
);

CTAButton.displayName = "CTAButton";
export default CTAButton;
