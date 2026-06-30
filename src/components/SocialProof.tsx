import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  text: string;
  service: string;
  approvedIn?: string;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    name: "Juliana Ramos",
    text: "Passei de primeira na prova prática! Os instrutores explicam tudo com paciência e o carro é novo, super tranquilo de dirigir. Recomendo demais a APTOS para quem mora em São José dos Pinhais.",
    service: "Primeira Habilitação — Categoria B",
    approvedIn: "Aprovada em 2 meses",
  },
  {
    name: "Carlos Eduardo",
    text: "Tirei a AB com eles. O processo foi todo organizado, sem enrolação. Faziam questão de me avisar de cada etapa pelo WhatsApp. Vale cada centavo.",
    service: "Categoria AB (Moto + Carro)",
    approvedIn: "Aprovado em 3 meses",
  },
  {
    name: "Mariana Lopes",
    text: "Fui reprovada em outra autoescola e refiz só as aulas práticas na APTOS. O instrutor identificou o que estava me travando em 2 aulas. Passei no reteste.",
    service: "Reteste Prático",
    approvedIn: "Aprovada no reteste",
  },
  {
    name: "Diego Martins",
    text: "Inclusão da categoria A foi muito mais simples do que imaginei. Atendimento humanizado, agenda flexível e moto em ótimas condições para treinar.",
    service: "Inclusão Categoria A",
    approvedIn: "Aprovado em 45 dias",
  },
];

interface SocialProofProps {
  variant?: "full" | "compact";
  testimonials?: Testimonial[];
  rating?: number;
  reviewCount?: number;
  approvedCount?: string;
}

const SocialProof = ({
  variant = "full",
  testimonials = DEFAULT_TESTIMONIALS,
  rating = 4.9,
  reviewCount = 320,
  approvedCount = "+5.000",
}: SocialProofProps) => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 mb-4">
            <div className="flex" aria-label={`Avaliação ${rating} de 5 estrelas`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="font-bold text-sm">
              {rating.toFixed(1)} <span className="text-muted-foreground font-normal">({reviewCount} avaliações no Google)</span>
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-black mb-3">
            Quem fez na APTOS recomenda
          </h2>
          <p className="text-muted-foreground">
            <strong className="text-foreground">{approvedCount} alunos aprovados</strong> no DETRAN-PR com a metodologia APTOS em São José dos Pinhais.
          </p>
        </div>

        <div className={variant === "compact" ? "grid md:grid-cols-2 gap-4 max-w-4xl mx-auto" : "grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto"}>
          {(variant === "compact" ? testimonials.slice(0, 2) : testimonials).map((t) => (
            <article
              key={t.name}
              className="bg-card border border-border rounded-2xl p-5 flex flex-col hover:shadow-glow transition-shadow"
            >
              <div className="flex gap-0.5 mb-3" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-sm leading-relaxed text-foreground/90 flex-1 mb-4">
                "{t.text}"
              </blockquote>
              <footer className="border-t border-border pt-3">
                <div className="font-bold text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.service}</div>
                {t.approvedIn && (
                  <div className="text-xs font-semibold text-primary mt-1">✓ {t.approvedIn}</div>
                )}
              </footer>
            </article>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://www.google.com/search?q=Autoescola+APTOS+São+José+dos+Pinhais"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline font-semibold"
          >
            Ver todas as avaliações no Google →
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
