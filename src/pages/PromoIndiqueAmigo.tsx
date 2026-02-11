import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SEO from "@/components/SEO";
import promoIndique from "@/assets/promo-indique-amigo.png";
import { Button } from "@/components/ui/button";
import { Users, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const PromoIndiqueAmigo = () => {
  const whatsappLink = "https://wa.me/5511999999999?text=Olá! Quero saber mais sobre a promoção Indique um Amigo!";

  return (
    <main className="min-h-screen">
      <SEO
        title="Indique um Amigo e Ganhe - Autoescola APTOS"
        description="Indique um amigo para a Autoescola APTOS e ganhe uma aula grátis! Consulte condições."
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
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
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
