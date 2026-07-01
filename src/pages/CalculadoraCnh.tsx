import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Stethoscope,
  BookOpen,
  Car,
  ShieldCheck,
  CreditCard,
  Sun,
  Sunset,
  Moon,
  CalendarDays,
  Rocket,
  Timer,
  GraduationCap,
  Plus,
  
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import MobileStickyBar from "@/components/MobileStickyBar";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { track } from "@/lib/analytics";
import { addSignal } from "@/lib/leadScore";
import { useFunnelModal } from "@/hooks/useFunnelModal";
import { cn } from "@/lib/utils";

type Objetivo = "primeira" | "adicao";
type Disponibilidade = "manha" | "tarde" | "noite" | "sabados";
type Ritmo = "normal" | "intensivo";

const OBJETIVOS: { id: Objetivo; label: string; desc: string; icon: typeof GraduationCap }[] = [
  { id: "primeira", label: "1ª Habilitação", desc: "Ainda não tenho CNH", icon: GraduationCap },
  { id: "adicao", label: "Adição de categoria", desc: "Já tenho CNH, quero incluir A ou B", icon: Plus },
];

const DISPONIBILIDADES: { id: Disponibilidade; label: string; icon: typeof Sun }[] = [
  { id: "manha", label: "Manhã", icon: Sun },
  { id: "tarde", label: "Tarde", icon: Sunset },
  { id: "noite", label: "Noite", icon: Moon },
  { id: "sabados", label: "Sábados", icon: CalendarDays },
];

const RITMOS: { id: Ritmo; label: string; desc: string; icon: typeof Timer }[] = [
  { id: "normal", label: "Modo normal", desc: "No meu ritmo, sem pressão", icon: Timer },
  { id: "intensivo", label: "Modo intensivo", desc: "Quero minha CNH o quanto antes", icon: Rocket },
];

const CalculadoraCnh = () => {
  const [step, setStep] = useState(0);
  const [objetivo, setObjetivo] = useState<Objetivo | null>(null);
  const [disponibilidade, setDisponibilidade] = useState<Disponibilidade | null>(null);
  const [ritmo, setRitmo] = useState<Ritmo | null>(null);
  const funnel = useFunnelModal();

  const totalSteps = 4; // 0,1,2,3(resultado)
  const progress = ((step + 1) / totalSteps) * 100;

  const timeline = useMemo(() => {
    if (!objetivo || !ritmo) return [] as { icon: typeof Stethoscope; title: string; dur: string; desc: string }[];
    const mult = ritmo === "intensivo" ? 0.6 : 1;
    const dur = (min: number, max: number) => {
      const a = Math.max(1, Math.round(min * mult));
      const b = Math.max(a, Math.round(max * mult));
      return a === b ? `${a} sem.` : `${a}–${b} sem.`;
    };
    const base = [
      { icon: Stethoscope, title: "Exames médico e psicotécnico", dur: dur(1, 1), desc: "Clínica credenciada DETRAN-PR." },
      { icon: BookOpen, title: "Curso teórico (CNH do Brasil)", dur: dur(1, 3), desc: "100% online, no seu ritmo." },
      { icon: ShieldCheck, title: "Prova teórica no DETRAN", dur: dur(1, 2), desc: "Agendamento assim que você concluir." },
      { icon: Car, title: "Aulas práticas", dur: dur(2, 6), desc: "Carros novos com direção elétrica." },
      { icon: CreditCard, title: "Prova prática + emissão da CNH", dur: dur(2, 3), desc: "Você recebe a PPD em ~10 dias úteis." },
    ];
    if (objetivo === "adicao") {
      // remove teórico, encurta médico
      return [
        base[0],
        { icon: Car, title: "Aulas práticas na nova categoria", dur: dur(2, 5), desc: "Foco total na prática." },
        base[3] && base[4],
      ].filter(Boolean) as typeof base;
    }
    return base;
  }, [objetivo, ritmo]);

  const next = () => setStep((s) => Math.min(totalSteps - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const handleResult = () => {
    track("simulador_jornada_result", { objetivo, disponibilidade, ritmo });
    const svcMap: Record<Objetivo, "primeira" | "inclusao"> = {
      primeira: "primeira",
      adicao: "inclusao",
    };
    if (objetivo) addSignal({ type: "service", value: svcMap[objetivo] });
    if (ritmo === "intensivo") addSignal({ type: "urgency", value: "semana" });
  };

  const openFunnel = () => {
    handleResult();
    funnel.open(`simulador_jornada_${objetivo ?? "na"}_${ritmo ?? "na"}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Simulador de Jornada CNH — Autoescola APTOS em São José dos Pinhais"
        description="Descubra em 3 passos o caminho da sua CNH: exames, curso, aulas práticas e prova. Sem cadastro. Receba um orçamento personalizado no WhatsApp."
        canonical="/calculadora-cnh"
      />
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4">
              <Calculator className="w-8 h-8" aria-hidden />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-2">Simulador de Jornada CNH</h1>
            <p className="text-base md:text-lg text-muted-foreground">
              3 perguntas rápidas e mostramos sua linha do tempo até a habilitação.
            </p>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>Passo {Math.min(step + 1, totalSteps)} de {totalSteps}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} aria-label={`Progresso: ${Math.round(progress)}%`} />
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 md:p-8 shadow-md min-h-[420px] flex flex-col">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.section
                  key="step-0"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.25 }}
                  aria-labelledby="q1"
                >
                  <h2 id="q1" className="text-xl md:text-2xl font-bold mb-4">
                    1. O que você precisa hoje?
                  </h2>
                  <div className="grid gap-3">
                    {OBJETIVOS.map((o) => {
                      const Icon = o.icon;
                      const active = objetivo === o.id;
                      return (
                        <button
                          key={o.id}
                          onClick={() => setObjetivo(o.id)}
                          aria-pressed={active}
                          className={cn(
                            "flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all min-h-[64px]",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                            active
                              ? "border-primary bg-primary/5 shadow-glow"
                              : "border-border hover:border-primary/40"
                          )}
                        >
                          <div className={cn("w-11 h-11 rounded-lg flex items-center justify-center shrink-0", active ? "bg-primary text-primary-foreground" : "bg-muted text-primary")}>
                            <Icon className="w-5 h-5" aria-hidden />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold">{o.label}</p>
                            <p className="text-sm text-muted-foreground">{o.desc}</p>
                          </div>
                          {active && <CheckCircle2 className="w-5 h-5 text-primary" aria-hidden />}
                        </button>
                      );
                    })}
                  </div>
                </motion.section>
              )}

              {step === 1 && (
                <motion.section
                  key="step-1"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.25 }}
                  aria-labelledby="q2"
                >
                  <h2 id="q2" className="text-xl md:text-2xl font-bold mb-2">
                    2. Qual sua melhor disponibilidade?
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">Encaixamos suas aulas no turno que funciona pra você.</p>
                  <div className="grid grid-cols-2 gap-3">
                    {DISPONIBILIDADES.map((d) => {
                      const Icon = d.icon;
                      const active = disponibilidade === d.id;
                      return (
                        <button
                          key={d.id}
                          onClick={() => setDisponibilidade(d.id)}
                          aria-pressed={active}
                          className={cn(
                            "flex flex-col items-center justify-center gap-2 p-5 rounded-xl border-2 transition-all min-h-[110px]",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                            active ? "border-primary bg-primary/5 shadow-glow" : "border-border hover:border-primary/40"
                          )}
                        >
                          <Icon className={cn("w-7 h-7", active ? "text-primary" : "text-muted-foreground")} aria-hidden />
                          <span className="font-semibold">{d.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.section>
              )}

              {step === 2 && (
                <motion.section
                  key="step-2"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.25 }}
                  aria-labelledby="q3"
                >
                  <h2 id="q3" className="text-xl md:text-2xl font-bold mb-4">
                    3. Você tem pressa?
                  </h2>
                  <div className="grid gap-3">
                    {RITMOS.map((r) => {
                      const Icon = r.icon;
                      const active = ritmo === r.id;
                      return (
                        <button
                          key={r.id}
                          onClick={() => setRitmo(r.id)}
                          aria-pressed={active}
                          className={cn(
                            "flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all min-h-[64px]",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                            active ? "border-primary bg-primary/5 shadow-glow" : "border-border hover:border-primary/40"
                          )}
                        >
                          <div className={cn("w-11 h-11 rounded-lg flex items-center justify-center shrink-0", active ? "bg-primary text-primary-foreground" : "bg-muted text-primary")}>
                            <Icon className="w-5 h-5" aria-hidden />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold">{r.label}</p>
                            <p className="text-sm text-muted-foreground">{r.desc}</p>
                          </div>
                          {active && <CheckCircle2 className="w-5 h-5 text-primary" aria-hidden />}
                        </button>
                      );
                    })}
                  </div>
                </motion.section>
              )}

              {step === 3 && (
                <motion.section
                  key="step-3"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                  aria-labelledby="resultado"
                >
                  <div className="text-center mb-6">
                    <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
                      Sua jornada
                    </span>
                    <h2 id="resultado" className="text-2xl md:text-3xl font-bold">
                      Veja como seu caminho até a CNH deve fluir
                    </h2>
                    <p className="text-sm text-muted-foreground mt-2">
                      Estimativa com base no perfil que você marcou. Podemos acelerar mais no atendimento.
                    </p>
                  </div>

                  <ol className="relative pl-6 border-l-2 border-primary/30 space-y-5" aria-label="Etapas estimadas">
                    {timeline.map((step, i) => {
                      const Icon = step.icon;
                      return (
                        <motion.li
                          key={step.title}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="relative"
                        >
                          <span className="absolute -left-[34px] top-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center ring-4 ring-background shadow-md">
                            <Icon className="w-4 h-4" aria-hidden />
                          </span>
                          <div className="flex items-baseline justify-between gap-3">
                            <h3 className="font-bold">{step.title}</h3>
                            <span className="text-xs font-semibold text-primary shrink-0">{step.dur}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{step.desc}</p>
                        </motion.li>
                      );
                    })}
                  </ol>

                  <div className="mt-8 bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
                    <p className="text-sm text-muted-foreground mb-3">
                      Pronto para transformar essa jornada em um plano com valores reais?
                    </p>
                    <Button
                      size="lg"
                      onClick={openFunnel}
                      className="h-14 px-8 shadow-glow font-semibold w-full sm:w-auto focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      data-intent="funil"
                    >
                      Ver orçamento para este perfil
                      <ArrowRight className="w-5 h-5 ml-2" aria-hidden />
                    </Button>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>

            <div className="mt-auto pt-6 flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={back}
                disabled={step === 0}
                className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Voltar etapa"
              >
                <ArrowLeft className="w-4 h-4 mr-1" aria-hidden /> Voltar
              </Button>
              {step < 3 && (
                <Button
                  onClick={next}
                  disabled={
                    (step === 0 && !objetivo) ||
                    (step === 1 && !disponibilidade) ||
                    (step === 2 && !ritmo)
                  }
                  className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {step === 2 ? "Ver minha jornada" : "Próximo"}
                  <ArrowRight className="w-4 h-4 ml-1" aria-hidden />
                </Button>
              )}
            </div>
          </div>

          <p className="text-xs text-center text-muted-foreground mt-6">
            * Estimativas baseadas em prazos médios do DETRAN-PR e na Resolução CONTRAN 1020/2025.
          </p>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileStickyBar />
    </div>
  );
};

export default CalculadoraCnh;
