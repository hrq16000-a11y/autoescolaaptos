import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SEO from "@/components/SEO";
import promoIndique from "@/assets/promo-indique-amigo.webp";
import { Button } from "@/components/ui/button";
import { Users, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { whatsappLink as buildWhatsAppLink } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import { trackWhatsAppClick } from "@/lib/events";
import { recordCampaignEvent, readCampaignUtms } from "@/lib/campaignTracking";

const PromoIndiqueAmigo = () => {
  const whatsappLink = buildWhatsAppLink("Olá! Quero saber mais sobre a promoção Indique um Amigo!", "direto");

  useEffect(() => {
    const utms = readCampaignUtms();
    track("campaign_view", { campaign: "indique_amigo", ...utms });
    recordCampaignEvent("indique_amigo", "view", "landing");
  }, []);

  const handleWhatsApp = () => {
    trackWhatsAppClick({ source: "indique_amigo", kind: "direto", service: "promocao_indicacao" });
    recordCampaignEvent("indique_amigo", "whatsapp_click", "cta_principal");
  };

  return (
    <main className="min-h-screen">
      <SEO
        title="Indique um Amigo e Ganhe | Autoescola APTOS"
        description="Indique um amigo para tirar a CNH na Autoescola APTOS em São José dos Pinhais e os dois ganham benefícios. Consulte condições."
        canonical="/promocao-indique-amigo"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Offer",
          name: "Indique um Amigo — benefício para os dois",
          description:
            "Indique um amigo para a Autoescola APTOS e ganhe benefícios exclusivos junto com o indicado.",
          url: "https://autoescolaaptos.com.br/promocao-indique-amigo",
          availability: "https://schema.org/InStock",
          priceCurrency: "BRL",
          areaServed: "São José dos Pinhais, PR",
          seller: {
            "@type": "DrivingSchool",
            name: "Autoescola APTOS",
            url: "https://autoescolaaptos.com.br",
          },
        }}
      />
      <Navbar />

      <section className="pt-24 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                <Users className="h-5 w-5" />
                <span className="font-semibold text-sm">Programa de Indicação</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-heading font-black mb-6">
                Indique um Amigo e{" "}
                <span className="text-primary">Ganhe Aula Grátis!</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Conhece alguém que precisa tirar a habilitação? Indique para a
                Autoescola APTOS e <strong>ganhe uma aula grátis</strong> como
                recompensa! Quanto mais indicações, mais aulas você ganha.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Indique amigos ou familiares",
                  "Ganhe uma aula grátis por indicação",
                  "Sem limite de indicações",
                  "Consulte condições com nossa equipe",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" className="text-lg px-8" asChild>
                 <a href={whatsappLink} target="_blank" rel="noopener noreferrer" onClick={handleWhatsApp} data-component="PromoIndiqueAmigoCTA" data-intent="whatsapp">
                  Quero indicar um amigo!
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <img
                src={promoIndique}
                alt="Promoção Indique um Amigo - Autoescola APTOS"
                className="rounded-2xl shadow-strong max-w-sm w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
};

export default PromoIndiqueAmigo;
