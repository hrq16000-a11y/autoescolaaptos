import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Bike, RefreshCw, CheckCircle2, ArrowLeft, MessageCircle, ShieldCheck, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { whatsappLink } from "@/lib/whatsapp";
import { useAnalytics } from "@/hooks/useAnalytics";

type Categoria = "Carro" | "Moto" | "Carro + Moto" | "Inclusão";
type Tipo = "Primeira Habilitação" | "Inclusão de Categoria" | "Renovação / Reciclagem";
type Experiencia = "Nunca dirigi" | "Pouca experiência" | "Já dirijo";
type Prazo = "Esta semana" | "Este mês" | "Próximo mês" | "Ainda pesquisando";

interface Respostas {
  categoria?: Categoria;
  tipo?: Tipo;
  experiencia?: Experiencia;
  prazo?: Prazo;
}

const Orcamento = () => {
  const { trackEvent } = useAnalytics();
  const [step, setStep] = useState(0);
  const [resp, setResp] = useState<Respostas>({});

  const totalSteps = 4;

  const next = (patch: Partial<Respostas>) => {
    const novo = { ...resp, ...patch };
    setResp(novo);
    trackEvent("funnel_step", { step: step + 1, ...patch });
    setStep((s) => s + 1);
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  const buildMessage = (r: Respostas) => {
    return (
      `Olá! Quero um orçamento personalizado da Autoescola APTOS.\n\n` +
      `• Categoria desejada: ${r.categoria}\n` +
      `• Tipo de processo: ${r.tipo}\n` +
      `• Experiência ao volante: ${r.experiencia}\n` +
      `• Quero iniciar: ${r.prazo}\n\n` +
      `Pode me enviar valores e formas de pagamento, por favor?`
    );
  };

  const finalUrl = whatsappLink(buildMessage(resp), "funil");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Solicitar Orçamento de CNH | Autoescola APTOS São José dos Pinhais"
        description="Receba em minutos um orçamento personalizado para tirar sua CNH (A, B ou AB) ou fazer inclusão de categoria na Autoescola APTOS. Responda 4 perguntas rápidas."
        canonicalUrl="https://autoescolaaptos.com.br/orcamento"
      />
      <Navbar />

      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4 text-sm font-semibold">
              <ShieldCheck className="w-4 h-4" />
              Atendimento humano em poucos minutos
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-black mb-3">
              Monte seu <span className="text-primary">orçamento</span> em 4 passos
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Responda rapidamente e enviamos pelo WhatsApp o valor exato para o seu caso, sem enrolação.
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-xs font-medium text-muted-foreground mb-2">
              <span>Etapa {Math.min(step + 1, totalSteps)} de {totalSteps}</span>
              <span>{Math.round((Math.min(step, totalSteps) / totalSteps) * 100)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${(Math.min(step, totalSteps) / totalSteps) * 100}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
            </div>
          </div>

          {/* Card */}
          <div className="bg-card border border-border rounded-2xl shadow-large p-6 md:p-10 min-h-[360px]">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <Step key="0" title="O que você quer tirar?">
                  <OptionGrid>
                    <Option icon={Car} label="Carro" onClick={() => next({ categoria: "Carro" })} />
                    <Option icon={Bike} label="Moto" onClick={() => next({ categoria: "Moto" })} />
                    <Option icon={Car} label="Carro + Moto" onClick={() => next({ categoria: "Carro + Moto" })} />
                    <Option icon={RefreshCw} label="Inclusão" onClick={() => next({ categoria: "Inclusão" })} />
                  </OptionGrid>
                </Step>
              )}

              {step === 1 && (
                <Step key="1" title="Qual é o seu caso?">
                  <OptionGrid cols={1}>
                    <Option label="Primeira Habilitação" onClick={() => next({ tipo: "Primeira Habilitação" })} />
                    <Option label="Inclusão de Categoria" onClick={() => next({ tipo: "Inclusão de Categoria" })} />
                    <Option label="Renovação / Reciclagem" onClick={() => next({ tipo: "Renovação / Reciclagem" })} />
                  </OptionGrid>
                </Step>
              )}

              {step === 2 && (
                <Step key="2" title="Você já dirigiu antes?">
                  <OptionGrid cols={1}>
                    <Option label="Nunca dirigi" onClick={() => next({ experiencia: "Nunca dirigi" })} />
                    <Option label="Pouca experiência" onClick={() => next({ experiencia: "Pouca experiência" })} />
                    <Option label="Já dirijo" onClick={() => next({ experiencia: "Já dirijo" })} />
                  </OptionGrid>
                </Step>
              )}

              {step === 3 && (
                <Step key="3" title="Quando pretende começar?">
                  <OptionGrid>
                    <Option label="Esta semana" onClick={() => next({ prazo: "Esta semana" })} />
                    <Option label="Este mês" onClick={() => next({ prazo: "Este mês" })} />
                    <Option label="Próximo mês" onClick={() => next({ prazo: "Próximo mês" })} />
                    <Option label="Ainda pesquisando" onClick={() => next({ prazo: "Ainda pesquisando" })} />
                  </OptionGrid>
                </Step>
              )}

              {step >= 4 && (
                <motion.div
                  key="final"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-6"
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-12 h-12 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-heading font-black mb-3">
                    Pronto! Seu orçamento está a um clique.
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Clique no botão abaixo e nossa equipe envia em instantes o valor exato para o seu perfil.
                  </p>

                  <div className="bg-muted/40 rounded-xl p-4 text-left mb-8 max-w-md mx-auto text-sm">
                    <div className="flex justify-between py-1"><span className="text-muted-foreground">Categoria</span><strong>{resp.categoria}</strong></div>
                    <div className="flex justify-between py-1"><span className="text-muted-foreground">Tipo</span><strong>{resp.tipo}</strong></div>
                    <div className="flex justify-between py-1"><span className="text-muted-foreground">Experiência</span><strong>{resp.experiencia}</strong></div>
                    <div className="flex justify-between py-1"><span className="text-muted-foreground">Início</span><strong>{resp.prazo}</strong></div>
                  </div>

                  <Button
                    size="lg"
                    className="text-lg h-14 px-8 shadow-glow"
                    asChild
                  >
                    <a
                      href={finalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent("funnel_complete", resp as Record<string, unknown>)}
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Receber meu orçamento agora
                    </a>
                  </Button>
                  <p className="text-xs text-muted-foreground mt-4">
                    Atendimento de segunda a sábado · Resposta em até 10 minutos no horário comercial.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {step > 0 && step < 4 && (
              <button
                onClick={back}
                className="mt-8 inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Voltar
              </button>
            )}
          </div>

          {/* Trust row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <TrustItem icon={Award} title="+15 anos" subtitle="formando condutores" />
            <TrustItem icon={CheckCircle2} title="95% aprovação" subtitle="em provas do DETRAN-PR" />
            <TrustItem icon={Clock} title="Sem enrolação" subtitle="orçamento direto no WhatsApp" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// --- Local UI helpers ---

const Step = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, x: 24 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -24 }}
    transition={{ duration: 0.25 }}
  >
    <h2 className="text-xl md:text-2xl font-heading font-bold mb-6 text-center">{title}</h2>
    {children}
  </motion.div>
);

const OptionGrid = ({ children, cols = 2 }: { children: React.ReactNode; cols?: 1 | 2 }) => (
  <div className={`grid gap-3 ${cols === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
    {children}
  </div>
);

const Option = ({
  icon: Icon,
  label,
  onClick,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="group flex items-center gap-3 p-5 rounded-xl border-2 border-border bg-background hover:border-primary hover:bg-primary/5 transition-all text-left"
  >
    {Icon && (
      <span className="w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
        <Icon className="w-5 h-5 text-primary" />
      </span>
    )}
    <span className="font-semibold text-base flex-1">{label}</span>
    <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
  </button>
);

const TrustItem = ({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
}) => (
  <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
    <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
      <Icon className="w-5 h-5 text-primary" />
    </span>
    <div>
      <div className="font-bold">{title}</div>
      <div className="text-xs text-muted-foreground">{subtitle}</div>
    </div>
  </div>
);

export default Orcamento;
