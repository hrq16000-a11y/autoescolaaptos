import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SEO from "@/components/SEO";
import promoAniversario from "@/assets/promo-aniversario.png";
import { Button } from "@/components/ui/button";
import { Gift, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const PromoAniversario = () => {
  const whatsappLink = "https://wa.me/5541991453627?text=Olá! Quero saber mais sobre a promoção de aniversário!";

  return (
    <main className="min-h-screen">
      <SEO
        title="Promoção de Aniversário - Autoescola APTOS"
        description="No mês do seu aniversário, ganhe uma aula grátis de presente na Autoescola APTOS. Consulte condições."
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
                <Gift className="h-5 w-5" />
                <span className="font-semibold text-sm">Promoção Especial</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-heading font-black mb-6">
                Promoção de{" "}
                <span className="text-primary">Aniversário</span> 🎉
              </h1>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                No mês do seu aniversário, a Autoescola APTOS te dá de presente
                <strong> uma aula grátis</strong>! Aproveite essa oportunidade
                exclusiva para avançar na sua habilitação.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Uma aula prática totalmente gratuita",
                  "Válido no mês do seu aniversário",
                  "Para alunos novos e matriculados",
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
                  Quero minha aula grátis!
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
                src={promoAniversario}
                alt="Promoção de Aniversário - Autoescola APTOS"
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

export default PromoAniversario;
