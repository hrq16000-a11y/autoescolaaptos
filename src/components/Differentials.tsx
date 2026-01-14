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

      </div>
    </section>
  );
};

export default Differentials;
