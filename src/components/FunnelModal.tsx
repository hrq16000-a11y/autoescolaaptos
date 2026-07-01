import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Bike, GitMerge, ArrowLeft, ArrowRight, CheckCircle2, MessageCircle, MapPin, Shield, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { whatsappLink } from "@/lib/whatsapp";
import { useAnalytics } from "@/hooks/useAnalytics";

interface FunnelModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  source?: string;
}

type Categoria = "A - Moto" | "B - Carro" | "A+B - Carro e Moto";
type Servico = "Primeira Habilitação" | "Inclusão de Categoria" | "Renovação" | "Reciclagem / Reteste";
type Carga = "5 aulas" | "10 aulas" | "15 aulas" | "20 aulas" | "Preciso de orientação";

interface Answers {
  categoria?: Categoria;
  servico?: Servico;
  carga?: Carga;
  nome?: string;
}

const TOTAL_STEPS = 6; // 0 welcome, 1 categoria, 2 servico, 3 carga, 4 resumo, 5 nome

const FunnelModal = ({ open, onOpenChange, source = "global" }: FunnelModalProps) => {
  const { trackEvent } = useAnalytics();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const reset = () => {
    setStep(0);
    setAnswers({});
  };

  const handleOpenChange = (v: boolean) => {
    onOpenChange(v);
    if (!v) setTimeout(reset, 300);
  };

  const advance = (patch: Partial<Answers>) => {
    const merged = { ...answers, ...patch };
    setAnswers(merged);
    trackEvent("funnel_step", { source, step: step + 1, ...patch });
    setStep((s) => Math.min(TOTAL_STEPS - 1, s + 1));
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  const message = useMemo(() => {
    const l: string[] = [
      `Olá! Meu nome é ${answers.nome || "(sem nome)"}. Fiz a simulação no site da Autoescola APTOS:`,
      ``,
      `• Categoria: ${answers.categoria || "-"}`,
      `• Serviço: ${answers.servico || "-"}`,
      `• Carga prática desejada: ${answers.carga || "-"}`,
      ``,
      `Pode me enviar os valores, formas de pagamento e próximos passos, por favor?`,
    ];
    return l.join("\n");
  }, [answers]);

  const finalUrl = whatsappLink(message, "funil");

  const submit = () => {
    const leadPayload = {
      source,
      categoria: answers.categoria,
      servico: answers.servico,
      carga: answers.carga,
      nome: answers.nome,
    };
    trackEvent("whatsapp_funil", leadPayload);

    // Padrão GA4 / Meta Pixel — plataformas reconhecem como conversão de Lead.
    if (typeof window !== "undefined") {
      const w = window as unknown as { dataLayer?: unknown[] };
      w.dataLayer?.push({
        event: "generate_lead",
        currency: "BRL",
        value: 0,
        lead_source: "funnel_modal",
        ...leadPayload,
      });
    }

    // Persist lead score signals
    import("@/lib/leadScore").then(({ addSignal }) => {
      addSignal({ type: "funnel_complete" });
    }).catch(() => {});
    window.open(finalUrl, "_blank", "noopener");
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg w-[calc(100vw-1.5rem)] p-0 gap-0 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Progress */}
        <div className="px-6 pt-6 pb-3 border-b bg-muted/30">
          <div className="flex items-center justify-between mb-2">
            <DialogTitle className="text-base font-bold">Simular meu orçamento</DialogTitle>
            <span className="text-xs text-muted-foreground font-medium">
              {Math.min(step + 1, TOTAL_STEPS)} / {TOTAL_STEPS}
            </span>
          </div>
          <DialogDescription className="sr-only">
            Funil de qualificação em {TOTAL_STEPS} etapas para receber orçamento personalizado pelo WhatsApp.
          </DialogDescription>
          <Progress value={((step + 1) / TOTAL_STEPS) * 100} className="h-1.5" />
        </div>

        {/* Steps */}
        <div className="p-6 overflow-y-auto flex-1">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <StepWrap key="s0">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Bem-vindo(a)! 👋</h2>
                  <p className="text-muted-foreground mb-6">
                    Vamos montar em <strong>30 segundos</strong> um orçamento sob medida para você.
                    Sem compromisso e sem cadastro.
                  </p>
                  <Button size="lg" className="w-full" onClick={() => advance({})}>
                    Começar simulação <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </StepWrap>
            )}

            {step === 1 && (
              <StepWrap key="s1" title="Qual categoria você quer?">
                <div className="grid gap-3">
                  <Choice icon={Bike} label="A - Moto" onClick={() => advance({ categoria: "A - Moto" })} />
                  <Choice icon={Car} label="B - Carro" onClick={() => advance({ categoria: "B - Carro" })} />
                  <Choice icon={GitMerge} label="A+B - Carro e Moto" onClick={() => advance({ categoria: "A+B - Carro e Moto" })} />
                </div>
              </StepWrap>
            )}

            {step === 2 && (
              <StepWrap key="s2" title="Qual serviço você precisa?">
                <div className="grid gap-3">
                  <Choice label="Primeira Habilitação" onClick={() => advance({ servico: "Primeira Habilitação" })} />
                  <Choice label="Inclusão de Categoria" onClick={() => advance({ servico: "Inclusão de Categoria" })} />
                  <Choice label="Renovação de CNH" onClick={() => advance({ servico: "Renovação" })} />
                  <Choice label="Reciclagem / Reteste" onClick={() => advance({ servico: "Reciclagem / Reteste" })} />
                </div>
              </StepWrap>
            )}

            {step === 3 && (
              <StepWrap key="s3" title="Quantas aulas práticas você quer?">
                <div className="grid gap-3">
                  <Choice label="5 aulas (obrigatório mínimo)" onClick={() => advance({ carga: "5 aulas" })} />
                  <Choice label="10 aulas (recomendado)" onClick={() => advance({ carga: "10 aulas" })} />
                  <Choice label="15 aulas" onClick={() => advance({ carga: "15 aulas" })} />
                  <Choice label="20 aulas (extensivo)" onClick={() => advance({ carga: "20 aulas" })} />
                  <Choice label="Preciso de orientação" onClick={() => advance({ carga: "Preciso de orientação" })} />
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Conforme Resolução 1020/2025: mínimo de 2h práticas; recomendamos 10+ para segurança e aprovação.
                </p>
              </StepWrap>
            )}

            {step === 4 && (
              <StepWrap key="s4" title="Resumo da sua simulação">
                <div className="rounded-xl border bg-muted/30 p-4 space-y-2 text-sm mb-4">
                  <Row label="Categoria" value={answers.categoria} />
                  <Row label="Serviço" value={answers.servico} />
                  <Row label="Carga prática" value={answers.carga} />
                </div>
                <div className="space-y-2 mb-6">
                  <Perk icon={MapPin} text="A apenas 4 quadras do DETRAN São José dos Pinhais" />
                  <Perk icon={Car} text="Frota com carros novos e ar-condicionado" />
                  <Perk icon={Shield} text="Instrutores credenciados DETRAN-PR" />
                  <Perk icon={CheckCircle2} text="95% de aprovação em provas práticas" />
                </div>
                <Button size="lg" className="w-full" onClick={() => setStep(5)}>
                  Continuar <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </StepWrap>
            )}

            {step === 5 && (
              <StepWrap key="s5" title="Como podemos te chamar?">
                <p className="text-sm text-muted-foreground mb-4">
                  Só o seu nome — enviaremos tudo direto no WhatsApp, sem formulários longos.
                </p>
                <Input
                  autoFocus
                  placeholder="Seu nome"
                  value={answers.nome || ""}
                  onChange={(e) => setAnswers({ ...answers, nome: e.target.value.slice(0, 60) })}
                  className="h-12 text-base mb-4"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (answers.nome || "").trim().length >= 2) submit();
                  }}
                />
                <Button
                  size="lg"
                  className="w-full"
                  disabled={!(answers.nome || "").trim() || (answers.nome || "").trim().length < 2}
                  onClick={submit}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Enviar para o WhatsApp
                </Button>
                <p className="text-[11px] text-muted-foreground mt-3 text-center">
                  Ao enviar, você concorda em receber contato via WhatsApp. Não enviamos spam.
                </p>
              </StepWrap>
            )}
          </AnimatePresence>
        </div>

        {/* Footer nav */}
        {step > 0 && step < 5 && (
          <div className="border-t px-6 py-3 bg-muted/20">
            <button
              onClick={back}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

const StepWrap = ({ children, title }: { children: React.ReactNode; title?: string }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.2 }}
  >
    {title && <h3 className="text-lg font-bold mb-4">{title}</h3>}
    {children}
  </motion.div>
);

const Choice = ({
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
    className="group flex items-center gap-3 p-4 rounded-xl border-2 border-border bg-background hover:border-primary hover:bg-primary/5 active:scale-[0.99] transition-all text-left w-full"
  >
    {Icon && (
      <span className="w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-primary" />
      </span>
    )}
    <span className="font-semibold text-sm sm:text-base flex-1">{label}</span>
    <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
  </button>
);

const Row = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex justify-between gap-4">
    <span className="text-muted-foreground">{label}</span>
    <strong className="text-right">{value || "-"}</strong>
  </div>
);

const Perk = ({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) => (
  <div className="flex items-start gap-2 text-sm">
    <Icon className="w-4 h-4 text-primary shrink-0 mt-0.5" />
    <span>{text}</span>
  </div>
);

export default FunnelModal;
