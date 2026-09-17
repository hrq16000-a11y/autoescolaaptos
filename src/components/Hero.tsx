import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, CheckCircle, Award, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useVariant, trackExperimentConversion } from "@/lib/featureFlags";
import Autoplay from "embla-carousel-autoplay";

// Import slide images
import heroSlide1 from "@/assets/hero-slide-1.webp";
import heroSlide2 from "@/assets/hero-slide-2.webp";
import heroSlide3 from "@/assets/hero-slide-3.webp";
import heroImage from "@/assets/hero-image.webp";

const slides = [
  {
    image: heroSlide1,
    alt: "Aluna feliz com CNH conquistada na Autoescola APTOS",
  },
  {
    image: heroImage,
    alt: "Autoescola APTOS - Formação de condutores em São José dos Pinhais",
  },
  {
    image: heroSlide2,
    alt: "Aula prática de direção com instrutor da Autoescola APTOS",
  },
  {
    image: heroSlide3,
    alt: "Aluna aprovada celebrando com sua CNH",
  },
];

const Hero = () => {
  const { trackEnrollmentClick, trackEvent } = useAnalytics();
  // A/B do CTA principal do Hero — exposição/conversão registradas no dataLayer.
  const ctaVariant = useVariant("hero_cta", ["controle", "urgencia"] as const);
  const ctaLabel =
    ctaVariant === "urgencia" ? "Quero minha CNH agora" : "Simular meu Orçamento";
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const stats = [
    { icon: Award, value: "+15", label: "Anos de Experiência" },
    { icon: Users, value: "95%", label: "Taxa de Aprovação" },
    { icon: CheckCircle, value: "+5000", label: "Alunos Formados" },
  ];

  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-20">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0 overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 relative h-full">
              <img
                src={slide.image}
                alt={slide.alt}
                loading={index === 0 ? "eager" : "lazy"}
                {...({ fetchpriority: index === 0 ? "high" : "auto" } as Record<string, string>)}
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 gradient-overlay" />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-6 h-6 text-foreground" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        aria-label="Próximo slide"
      >
        <ChevronRight className="w-6 h-6 text-foreground" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === selectedIndex
                ? "bg-primary w-8"
                : "bg-white/60 hover:bg-white/80"
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
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
            Autoescola APTOS — referência em São José dos Pinhais. Carros novos, curso online e atendimento rápido para tirar sua CNH sem complicação.
          </motion.p>

          {/* Trust pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {[
              "🚗 Carros novos",
              "🎮 Simulador / direção elétrica",
              "📍 Próximo ao DETRAN",
              "💻 Curso 100% online",
              "⚡ Atendimento rápido",
              "✅ Processo simplificado",
              "⭐ 4,9 no Google",
            ].map((item) => (
              <span
                key={item}
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full"
              >
                {item}
              </span>
            ))}
          </motion.div>

          {/* Benefits List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="space-y-3 mb-10"
          >
            {[
              "Instrutores credenciados pelo DETRAN-PR",
              "Promoções especiais e parcelamento facilitado",
              "Aulas práticas em carros novos com direção elétrica",
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
                href="/orcamento"
                onClick={() => {
                  trackEnrollmentClick();
                  trackExperimentConversion("hero_cta", "cta_click");
                }}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                {ctaLabel}
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
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
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