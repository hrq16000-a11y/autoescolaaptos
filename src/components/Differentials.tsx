import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  CreditCard,
  Clock,
  Shield,
  Users,
  Trophy,
  MapPin,
} from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";

const Differentials = () => {
  const { trackFormOpen, trackWhatsAppClick } = useAnalytics();
  const differentials = [
    {
      icon: Trophy,
      title: "Alta Taxa de Aprovação",
      description: "95% dos nossos alunos são aprovados já na primeira tentativa",
    },
    {
      icon: Users,
      title: "Instrutores Experientes",
      description: "Equipe credenciada pelo Detran PR com mais de 15 anos de experiência",
    },
    {
      icon: CreditCard,
      title: "Facilidade de Pagamento",
      description: "Parcelamento flexível e promoções exclusivas para primeira habilitação",
    },
    {
      icon: Clock,
      title: "Horários Flexíveis",
      description: "Aulas práticas e teóricas em horários que se adaptam à sua rotina",
    },
    {
      icon: Shield,
      title: "Frota Moderna",
      description: "Veículos novos e seguros, com tecnologia e conforto para seu aprendizado",
    },
    {
      icon: MapPin,
      title: "Localização Privilegiada",
      description: "Fácil acesso em São José dos Pinhais, perto de você",
    },
  ];

  return (
    <section id="diferenciais" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-4">
            Por que escolher a APTOS?
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-black mb-6">
            Diferenciais que Fazem a{" "}
            <span className="text-primary">Diferença</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Mais de 15 anos de tradição e inovação em formação de condutores
          </p>
        </motion.div>

        {/* Differentials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-8 h-full hover:shadow-medium transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20 group">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center mb-6 shadow-glow group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Promotion Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground border-0 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <div className="inline-block px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-bold mb-4">
                PROMOÇÃO ESPECIAL
              </div>
              <h3 className="text-3xl md:text-4xl font-heading font-black mb-4">
                Cartão Exclusivo APTOS
              </h3>
              <p className="text-lg md:text-xl mb-6 text-primary-foreground/90">
                Descontos especiais para primeira habilitação de carro ou moto. Grátis e sem vínculo de matrícula!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://forms.gle/BEmCcm8opdQoA3N79"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackFormOpen('cartao_exclusivo', 'differentials_banner')}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-lg font-bold hover:bg-white/90 transition-colors shadow-lg"
                >
                  Solicitar Cartão Exclusivo
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=5541991453627&text=Olá,%20gostaria%20de%20informações%20sobre%20o%20Cartão%20Exclusivo"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('differentials_banner', 'Cartão Exclusivo')}
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary-foreground/20 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg font-bold hover:bg-primary-foreground/30 transition-colors"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Differentials;
