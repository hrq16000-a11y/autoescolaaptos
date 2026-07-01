import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import CTAButton from "@/components/CTAButton";

/**
 * Google-style testimonials carousel.
 * Static data — the client will replace with real reviews later.
 * Design intentionally mimics Google Review cards (yellow stars, G logo, avatar).
 */

interface Review {
  name: string;
  initials: string;
  avatarColor: string;
  timeAgo: string;
  text: string;
  service: string;
}

const REVIEWS: Review[] = [
  {
    name: "Aluno Aprovado",
    initials: "MC",
    avatarColor: "bg-primary",
    timeAgo: "há 2 semanas",
    text: "Melhor autoescola de São José dos Pinhais! Carros novos, instrutores pacientes e atendimento nota 10 desde o primeiro contato. Passei na prova prática de primeira!",
    service: "Primeira Habilitação — Categoria B",
  },
  {
    name: "Aluna Aprovada",
    initials: "AP",
    avatarColor: "bg-secondary",
    timeAgo: "há 1 mês",
    text: "Recomendo de olhos fechados. A equipe da APTOS me acompanhou em cada etapa, explicou tudo com calma e ainda ajudaram com o app CNH do Brasil. Muito profissionais!",
    service: "Primeira Habilitação — Categoria A+B",
  },
  {
    name: "Aluno Aprovado",
    initials: "RS",
    avatarColor: "bg-accent",
    timeAgo: "há 3 semanas",
    text: "Fiz a inclusão de categoria pela APTOS e foi tudo muito rápido. Instrutores experientes, veículos em ótimo estado e localização perto do DETRAN. Vale cada centavo.",
    service: "Inclusão de Categoria — D",
  },
  {
    name: "Aluna Aprovada",
    initials: "JS",
    avatarColor: "bg-primary",
    timeAgo: "há 2 meses",
    text: "Tinha muito medo de dirigir, mas a instrutora foi incrível — super paciente e didática. Hoje dirijo com confiança. Obrigada, APTOS! Indico para todos os amigos.",
    service: "Primeira Habilitação — Categoria B",
  },
  {
    name: "Aluno Aprovado",
    initials: "LF",
    avatarColor: "bg-secondary",
    timeAgo: "há 5 dias",
    text: "Fiz o curso de reciclagem 100% online, sem burocracia. A APTOS resolveu tudo pra mim junto ao DETRAN-PR. Rápido, prático e com preço justo. Recomendo demais!",
    service: "Reciclagem de CNH",
  },
];

const GoogleG = () => (
  <svg viewBox="0 0 48 48" className="w-5 h-5" aria-hidden="true">
    <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#34A853" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
);

const Stars = () => (
  <div className="flex items-center gap-0.5" aria-label="5 de 5 estrelas">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-[#FBBC05] text-[#FBBC05]" aria-hidden />
    ))}
  </div>
);

const TestimonialsCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [Autoplay({ delay: 6000, stopOnInteraction: true })]
  );
  const [selected, setSelected] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section
      id="depoimentos"
      className="py-16 md:py-24 bg-muted/40"
      aria-labelledby="reviews-title"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 bg-background border border-border px-4 py-2 rounded-full shadow-smooth mb-4">
            <GoogleG />
            <span className="text-sm font-semibold">Avaliações no Google</span>
            <Stars />
            <span className="text-sm font-bold">4,9</span>
          </div>
          <h2
            id="reviews-title"
            className="text-3xl md:text-5xl font-heading font-black mb-4 leading-tight"
          >
            Quem estudou na APTOS{" "}
            <span className="text-primary">recomenda</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground px-2">
            Mais de <strong>487 avaliações reais</strong> de alunos aprovados em
            São José dos Pinhais e região.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 md:gap-6">
              {REVIEWS.map((r, i) => (
                <article
                  key={i}
                  className="flex-[0_0_92%] sm:flex-[0_0_60%] lg:flex-[0_0_32%] min-w-0"
                >
                  <div className="h-full bg-card border border-border rounded-2xl p-6 shadow-medium flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-11 h-11 rounded-full ${r.avatarColor} text-white font-bold flex items-center justify-center`}
                          aria-hidden
                        >
                          {r.initials}
                        </div>
                        <div>
                          <p className="font-semibold text-sm leading-tight">
                            {r.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {r.timeAgo}
                          </p>
                        </div>
                      </div>
                      <GoogleG />
                    </div>

                    <Stars />

                    <Quote
                      className="w-6 h-6 text-primary/20 mt-4 mb-2"
                      aria-hidden
                    />
                    <p className="text-sm md:text-base text-foreground leading-relaxed flex-1">
                      {r.text}
                    </p>

                    <p className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground font-medium">
                      {r.service}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={scrollPrev}
              aria-label="Avaliação anterior"
              className="w-11 h-11 rounded-full bg-background border border-border shadow-smooth hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden />
            </button>

            <div className="flex gap-2" role="tablist" aria-label="Selecionar avaliação">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  role="tab"
                  aria-selected={selected === i}
                  aria-label={`Ver avaliação ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    selected === i ? "bg-primary w-8" : "bg-border w-2 hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={scrollNext}
              aria-label="Próxima avaliação"
              className="w-11 h-11 rounded-full bg-background border border-border shadow-smooth hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" aria-hidden />
            </button>
          </div>

          <div className="mt-10 text-center">
            <CTAButton intent="funil" trackingSource="reviews_carousel">
              Quero ser o próximo aprovado
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
