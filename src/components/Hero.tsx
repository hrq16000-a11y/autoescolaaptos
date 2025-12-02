import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MessageCircle, CheckCircle, Award, Users } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { useAnalytics } from "@/hooks/useAnalytics";

const Hero = () => {
  const { trackEnrollmentClick, trackEvent } = useAnalytics();
  
  const stats = [
    { icon: Award, value: "+15", label: "Anos de Experiência" },
    { icon: Users, value: "95%", label: "Taxa de Aprovação" },
    { icon: CheckCircle, value: "+5000", label: "Alunos Formados" },
  ];

  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Aluno feliz com CNH conquistada na Autoescola APTOS"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-overlay" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-primary/90 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-full mb-6 shadow-glow"
          >
            <Award className="w-4 h-4" />
            <span className="text-sm font-semibold">
              Referência em São José dos Pinhais
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-heading font-black text-white mb-6 leading-tight"
          >
            Conquiste Sua{" "}
            <span className="text-primary drop-shadow-lg">CNH</span> com
            Confiança
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 mb-8 font-medium"
          >
            Autoescola APTOS - Mais de 15 anos formando condutores qualificados
            em São José dos Pinhais
          </motion.p>

          {/* Benefits List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-3 mb-10"
          >
            {[
              "Instrutores credenciados pelo Detran PR",
              "Promoções especiais e facilidade de pagamento",
              "Aulas práticas e teóricas de qualidade",
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-white font-medium">{item}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Button
              size="lg"
              className="text-lg h-14 px-8 shadow-glow hover:scale-105 transition-transform"
              asChild
            >
              <a
                href="https://api.whatsapp.com/send?phone=5541991453627&text=Olá,%20gostaria%20de%20fazer%20minha%20matrícula%20na%20Autoescola%20APTOS"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEnrollmentClick()}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Fazer Matrícula Agora
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg h-14 px-8 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              asChild
            >
              <a href="#servicos" onClick={() => trackEvent('view_services', { source: 'hero' })}>
                Ver Serviços
              </a>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-3 gap-6"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
              >
                <stat.icon className="w-8 h-8 text-primary mb-2" />
                <div className="text-2xl md:text-3xl font-heading font-black text-white">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-white/80 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
