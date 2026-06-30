import { ClipboardList, Camera, Stethoscope, BookOpen, Car, ShieldCheck, CreditCard } from "lucide-react";
import CTAButton from "./CTAButton";

const STEPS = [
  {
    n: 1,
    icon: ClipboardList,
    title: "Matrícula",
    desc: "Você faz a matrícula presencial ou online — abrimos seu processo no DETRAN-PR.",
  },
  {
    n: 2,
    icon: Camera,
    title: "Foto e biometria",
    desc: "Coleta digital de dados, foto e assinatura no DETRAN.",
  },
  {
    n: 3,
    icon: Stethoscope,
    title: "Exames médico e psicotécnico",
    desc: "Realizados em clínicas credenciadas. Resultado entra direto no seu processo.",
  },
  {
    n: 4,
    icon: BookOpen,
    title: "Curso teórico",
    desc: "100% online pelo app CNH do Brasil, no seu ritmo, pelo celular.",
  },
  {
    n: 5,
    icon: Car,
    title: "Aulas práticas",
    desc: "Carros novos com direção elétrica. Aulas conforme seu desempenho.",
  },
  {
    n: 6,
    icon: ShieldCheck,
    title: "Prova prática",
    desc: "No DETRAN-PR. Nossos instrutores te preparam com simulado do circuito real.",
  },
  {
    n: 7,
    icon: CreditCard,
    title: "Sua CNH",
    desc: "Emissão da PPD em ~10 dias úteis. Você está liberado para dirigir!",
  },
];

const TimelineCNH = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full mb-3">
            Como funciona
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-black mb-3">
            Sua CNH em 7 passos simples
          </h2>
          <p className="text-muted-foreground">
            Do primeiro contato até a habilitação na mão — você acompanha cada etapa pelo WhatsApp.
          </p>
        </div>

        <ol className="relative max-w-3xl mx-auto" aria-label="Etapas para tirar a CNH">
          {/* vertical line desktop */}
          <div
            aria-hidden
            className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/40 to-transparent"
          />
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const isRight = i % 2 === 1;
            return (
              <li
                key={s.n}
                className={`relative pl-16 md:pl-0 mb-6 md:mb-10 md:grid md:grid-cols-2 md:gap-8 md:items-center ${
                  isRight ? "" : ""
                }`}
              >
                {/* Number bubble */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 w-12 h-12 rounded-full bg-primary text-primary-foreground font-heading font-black text-lg flex items-center justify-center shadow-lg ring-4 ring-background">
                  {s.n}
                </div>

                {/* Card */}
                <div
                  className={`bg-card border border-border rounded-2xl p-5 hover:shadow-glow transition-shadow ${
                    isRight ? "md:col-start-2" : "md:col-start-1 md:text-right md:items-end md:flex md:flex-col"
                  }`}
                >
                  <div className={`flex items-center gap-2 mb-2 ${isRight ? "" : "md:flex-row-reverse"}`}>
                    <Icon className="w-5 h-5 text-primary" />
                    <h3 className="font-heading font-black text-lg">{s.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="text-center mt-10">
          <CTAButton intent="funil" trackingSource="timeline_cnh">
            Quero começar meu processo
          </CTAButton>
        </div>
      </div>
    </section>
  );
};

export default TimelineCNH;
