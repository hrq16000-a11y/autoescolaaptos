import { useEffect, useMemo } from "react";
import { MessageCircle, MapPin, ShieldCheck, Car, GraduationCap, CalendarClock, Star } from "lucide-react";
import SEO from "@/components/SEO";
import SocialProof from "@/components/SocialProof";
import { track } from "@/lib/analytics";
import { trackWhatsAppClick } from "@/lib/events";
import { whatsappLink } from "@/lib/whatsapp";
import { recordCampaignEvent, readCampaignUtms } from "@/lib/campaignTracking";
import { Button } from "@/components/ui/button";
import carroAptos from "@/assets/carro-aptos.webp";

/**
 * Landing page de tráfego pago (Meta Ads) — /carro-automatico
 * Objetivo único: converter o clique do anúncio em conversa no WhatsApp.
 * Reutiliza SEO, SocialProof, camada de analytics e o WhatsApp oficial do projeto.
 * Paleta da campanha (vermelho/preto/branco) aplicada via tokens escopados nesta rota.
 */

const CAMPAIGN_MESSAGE =
  "Olá! Vim pelo anúncio do Polo automático da Autoescola APTOS e gostaria de saber mais sobre as aulas.";

const diferenciaisCarro = [
  { icon: Car, titulo: "Câmbio automático", texto: "Aulas práticas em veículo de câmbio automático, sem embreagem e sem troca de marchas." },
  { icon: GraduationCap, titulo: "Instrutores credenciados", texto: "Acompanhamento de instrutores credenciados ao DETRAN-PR durante todas as aulas." },
  { icon: CalendarClock, titulo: "Agenda flexível", texto: "Aulas nos períodos manhã, tarde e noite, conforme disponibilidade da agenda." },
];

const porQueAptos = [
  "Autoescola credenciada ao DETRAN-PR",
  "Frota nova, com direção elétrica",
  "Aulas práticas com instrutores credenciados",
  "Acompanhamento de cada etapa do processo pelo WhatsApp",
  "Atendimento em São José dos Pinhais, a 4 quadras do DETRAN",
  "Também atendemos aulas avulsas e reteste prático",
];

const CarroAutomatico = () => {
  const utm = useMemo(() => {
    if (typeof window === "undefined") return {};
    return readCampaignUtms();
  }, []);

  useEffect(() => {
    track("campaign_view", { page_path: "/carro-automatico", campaign: "polo_automatico", ...utm });
    recordCampaignEvent("polo_automatico", "view", "landing");
  }, [utm]);

  const waHref = whatsappLink(CAMPAIGN_MESSAGE, "direto");

  const handleWhats = (source: string) => {
    trackWhatsAppClick({ source, kind: "direto", service: "aulas_carro_automatico" });
    track("campaign_whatsapp_click", { source, campaign: "polo_automatico", ...utm });
    recordCampaignEvent("polo_automatico", "whatsapp_click", source);
  };

  const WhatsCTA = ({ source, label = "Falar no WhatsApp", className = "" }: { source: string; label?: string; className?: string }) => (
    <Button asChild size="lg" className={`min-h-[56px] px-7 text-base font-bold uppercase hover:-translate-y-0.5 hover:shadow-glow active:scale-[0.98] ${className}`}>
      <a href={waHref} target="_blank" rel="noopener noreferrer" onClick={() => handleWhats(source)} data-component="CarroAutomaticoCTA" data-intent="whatsapp">
        <MessageCircle className="w-5 h-5" aria-hidden />{label}
      </a>
    </Button>
  );

  return (
    <div className="campaign-automatico bg-background text-foreground">
      <SEO
        title="Aulas de direção em carro automático | Autoescola APTOS SJP"
        description="Aulas práticas em carro automático na Autoescola APTOS, em São José dos Pinhais, a 4 quadras do DETRAN. Instrutores credenciados ao DETRAN-PR. Fale agora no WhatsApp."
        canonical="/carro-automatico"
        image="/og-image.png"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              name: "Aulas práticas em carro automático",
              url: "https://autoescolaaptos.com.br/carro-automatico",
              areaServed: "São José dos Pinhais, PR",
              provider: { "@type": "DrivingSchool", name: "Autoescola APTOS", telephone: "+5541991453627" },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Início", item: "https://autoescolaaptos.com.br/" },
                { "@type": "ListItem", position: 2, name: "Carro automático", item: "https://autoescolaaptos.com.br/carro-automatico" },
              ],
            },
          ],
        }}
      />

      <main>
        {/* HERO */}
        <section className="relative">
          <img
            src={carroAptos}
            alt="Veículo da Autoescola APTOS usado nas aulas práticas em São José dos Pinhais"
            className="absolute inset-0 w-full h-full object-cover opacity-45"
            loading="eager"
            decoding="async"
            {...({ fetchpriority: "high" } as Record<string, string>)}
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
          <div className="relative container mx-auto px-4 py-16 md:py-24 max-w-3xl">
            <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Autoescola APTOS
            </p>
            <h1 className="mt-3 text-3xl md:text-5xl font-extrabold leading-[1.1] uppercase">
              Aprenda a dirigir em <span className="text-primary">carro automático</span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-xl">
              A APTOS agora oferece aulas práticas em veículo de câmbio automático, em São José
              dos Pinhais. Fale com a nossa equipe e tire suas dúvidas sobre as aulas.
            </p>
            <div className="mt-8">
              <WhatsCTA source="hero" />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Atendimento direto pelo WhatsApp oficial da autoescola.
            </p>
          </div>
        </section>

        {/* CARRO AUTOMÁTICO */}
        <section aria-labelledby="carro" className="border-t border-border py-14 md:py-20">
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
            <img
              src={carroAptos}
              alt="Carro da Autoescola APTOS para aulas práticas de direção"
              className="w-full rounded-lg object-cover aspect-[4/3]"
              loading="lazy"
              decoding="async"
            />
            <div>
              <h2 id="carro" className="text-2xl md:text-4xl font-extrabold uppercase">
                Uma nova experiência para <span className="text-primary">suas aulas práticas</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                No câmbio automático você não usa embreagem nem troca marchas, o que deixa a
                condução mais simples e permite concentrar a atenção no trânsito.
              </p>
              <ul className="mt-8 space-y-5">
                {diferenciaisCarro.map(({ icon: Icon, titulo, texto }) => (
                  <li key={titulo} className="flex gap-4">
                    <Icon className="w-6 h-6 text-primary shrink-0 mt-0.5" aria-hidden />
                    <div>
                      <h3 className="font-bold">{titulo}</h3>
                      <p className="text-sm text-muted-foreground">{texto}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <WhatsCTA source="secao_carro" label="Quero saber mais" />
              </div>
            </div>
          </div>
        </section>

        {/* POR QUE A APTOS */}
        <section aria-labelledby="porque" className="bg-muted/50 border-y border-border py-14 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 id="porque" className="text-2xl md:text-4xl font-extrabold uppercase text-center">
              Por que fazer suas aulas na <span className="text-primary">APTOS</span>?
            </h2>
            <ul className="mt-10 grid sm:grid-cols-2 gap-4">
              {porQueAptos.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                  <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden />
                  <span className="text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* LOCALIZAÇÃO */}
        <section aria-labelledby="local" className="py-14 md:py-20">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <MapPin className="w-8 h-8 text-primary mx-auto" aria-hidden />
            <h2 id="local" className="mt-4 text-2xl md:text-3xl font-extrabold uppercase">
              Autoescola APTOS — São José dos Pinhais, PR
            </h2>
            <p className="mt-3 text-muted-foreground">
              Estamos a apenas 4 quadras do DETRAN de São José dos Pinhais, o que facilita todas as
              etapas do seu processo.
            </p>
            <div className="mt-8">
              <WhatsCTA source="localizacao" label="Falar no WhatsApp" />
            </div>
          </div>
        </section>

        {/* PROVA SOCIAL (dados já existentes no site) */}
        <SocialProof variant="compact" />

        {/* CTA FINAL */}
        <section className="border-t border-border py-16 text-center">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="flex justify-center gap-1 text-primary" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <h2 className="mt-4 text-2xl md:text-4xl font-extrabold uppercase">
              Pronto para começar suas aulas em <span className="text-primary">carro automático</span>?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Fale agora com a equipe da APTOS pelo WhatsApp e tire suas dúvidas.
            </p>
            <div className="mt-8">
              <WhatsCTA source="cta_final" />
            </div>
          </div>
        </section>

        {/* Barra fixa mobile */}
        <div aria-hidden className="h-20 md:hidden" />
        <div className="md:hidden fixed bottom-0 inset-x-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-background/95 backdrop-blur border-t border-border">
          <WhatsCTA source="sticky_mobile" className="w-full" />
        </div>
      </main>
    </div>
  );
};

export default CarroAutomatico;
