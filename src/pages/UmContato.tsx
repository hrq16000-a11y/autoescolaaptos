import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
  Clock,
  Award,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { whatsappLink } from "@/lib/whatsapp";
import { useAnalytics } from "@/hooks/useAnalytics";
import { supabase } from "@/integrations/supabase/client";

type Experiencia = "Nunca dirigi" | "Pouca experiência" | "Já dirijo";
type ConheceProcedimento = "Sim" | "Não";
type Servico =
  | "Primeira Habilitação A"
  | "Primeira Habilitação B"
  | "Primeira Habilitação A+B"
  | "Inclusão de Categoria"
  | "Renovação"
  | "Reciclagem"
  | "Outro";
type Prazo =
  | "Hoje"
  | "Esta semana"
  | "Este mês"
  | "Nos próximos meses"
  | "Apenas pesquisando";

interface Respostas {
  experiencia?: Experiencia;
  conhece?: ConheceProcedimento;
  servico?: Servico;
  prazo?: Prazo;
  nome?: string;
  lgpd?: boolean;
}

const TOTAL_STEPS = 3;

const UmContato = () => {
  const { trackEvent } = useAnalytics();
  const [step, setStep] = useState(0);
  const [resp, setResp] = useState<Respostas>({});
  const [submitting, setSubmitting] = useState(false);

  const next = (patch: Partial<Respostas>, jump = 1) => {
    const merged = { ...resp, ...patch };
    setResp(merged);
    trackEvent("triagem_step", { step: step + 1, ...patch });
    setStep((s) => s + jump);
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  const buildMessage = (r: Respostas) => {
    return (
      `Olá! Concluí a triagem no site da Autoescola APTOS. Segue meu resumo:\n\n` +
      `👤 Nome: ${r.nome || "(não informado)"}\n` +
      `🚗 Experiência: ${r.experiencia || "-"}\n` +
      `📋 Conhece o novo procedimento da CNH? ${r.conhece || "-"}\n` +
      `🎯 Serviço: ${r.servico || "-"}\n` +
      `📅 Pretende iniciar: ${r.prazo || "-"}\n\n` +
      `Pode me passar valores, formas de pagamento e os próximos passos, por favor?`
    );
  };

  const finalUrl = useMemo(() => whatsappLink(buildMessage(resp), "funil"), [resp]);
  const progress = Math.min(step, TOTAL_STEPS) / TOTAL_STEPS;

  const canFinish =
    !!resp.experiencia &&
    !!resp.conhece &&
    !!resp.servico &&
    !!resp.prazo &&
    !!resp.lgpd;

  const finalize = async () => {
    if (!canFinish || submitting) return;
    setSubmitting(true);

    const payload = {
      nome: resp.nome ?? null,
      experiencia: resp.experiencia ?? null,
      conhece_procedimento: resp.conhece ?? null,
      servico: resp.servico ?? null,
      prazo: resp.prazo ?? null,
      lgpd_aceite: !!resp.lgpd,
      origem: "1contato",
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
      referrer: typeof document !== "undefined" ? document.referrer : null,
    };

    // Best-effort persistence for future CRM/Sheets integration.
    // Falha silenciosa: nunca bloquear o envio do WhatsApp.
    try {
      // @ts-expect-error - tabela opcional, criada quando o backend for provisionado
      await supabase.from("triagem_leads").insert(payload);
    } catch {
      /* noop */
    }

    try {
      const w = window as unknown as { dataLayer?: unknown[] };
      w.dataLayer?.push({
        event: "generate_lead",
        currency: "BRL",
        value: 0,
        lead_source: "1contato_triagem",
        ...payload,
      });
    } catch {
      /* noop */
    }

    trackEvent("triagem_complete", payload as Record<string, unknown>);

    try {
      const { addSignal } = await import("@/lib/leadScore");
      addSignal({ type: "funnel_complete" });
    } catch {
      /* noop */
    }

    window.open(finalUrl, "_blank", "noopener");
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Triagem Rápida — Fale com a Autoescola APTOS | 1º Contato"
        description="Responda 3 perguntas rápidas e receba um atendimento personalizado da Autoescola APTOS em São José dos Pinhais. Triagem em segundos, direto no WhatsApp."
        canonical="/1contato"
      />
      <Navbar />

      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4 text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              Triagem rápida em menos de 60 segundos
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-black mb-3">
              Vamos entender <span className="text-primary">seu caso</span> em 3 passos
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Responda rapidamente e nossa equipe já entra em contato pelo WhatsApp com
              a solução ideal para você — sem enrolação e sem repetir informações.
            </p>
          </div>

          <div className="mb-8" role="progressbar" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100}>
            <div className="flex justify-between text-xs font-medium text-muted-foreground mb-2">
              <span>Etapa {Math.min(step + 1, TOTAL_STEPS)} de {TOTAL_STEPS}</span>
              <span>{Math.round(progress * 100)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress * 100}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl shadow-large p-6 md:p-10 min-h-[360px]">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <Step key="0" title="Você já possui experiência dirigindo?">
                  <OptionGrid cols={1}>
                    <Option label="Nunca dirigi" onClick={() => next({ experiencia: "Nunca dirigi" })} />
                    <Option label="Pouca experiência" onClick={() => next({ experiencia: "Pouca experiência" })} />
                    <Option label="Já dirijo" onClick={() => next({ experiencia: "Já dirijo" })} />
                  </OptionGrid>
                </Step>
              )}

              {step === 1 && (
                <Step key="1" title="Você já conhece o novo procedimento da CNH?">
                  <div className="space-y-6">
                    <OptionGrid>
                      <Option
                        label="Sim, já conheço"
                        onClick={() => setResp({ ...resp, conhece: "Sim" })}
                        selected={resp.conhece === "Sim"}
                      />
                      <Option
                        label="Não, gostaria de saber"
                        onClick={() => setResp({ ...resp, conhece: "Não" })}
                        selected={resp.conhece === "Não"}
                      />
                    </OptionGrid>

                    <div className="pt-2">
                      <h3 className="text-base md:text-lg font-heading font-bold mb-3 text-center">
                        Qual serviço procura?
                      </h3>
                      <OptionGrid>
                        <Option label="Primeira Habilitação A" onClick={() => setResp({ ...resp, servico: "Primeira Habilitação A" })} selected={resp.servico === "Primeira Habilitação A"} />
                        <Option label="Primeira Habilitação B" onClick={() => setResp({ ...resp, servico: "Primeira Habilitação B" })} selected={resp.servico === "Primeira Habilitação B"} />
                        <Option label="Primeira Habilitação A+B" onClick={() => setResp({ ...resp, servico: "Primeira Habilitação A+B" })} selected={resp.servico === "Primeira Habilitação A+B"} />
                        <Option label="Inclusão de Categoria" onClick={() => setResp({ ...resp, servico: "Inclusão de Categoria" })} selected={resp.servico === "Inclusão de Categoria"} />
                        <Option label="Renovação" onClick={() => setResp({ ...resp, servico: "Renovação" })} selected={resp.servico === "Renovação"} />
                        <Option label="Reciclagem" onClick={() => setResp({ ...resp, servico: "Reciclagem" })} selected={resp.servico === "Reciclagem"} />
                        <Option label="Outro" onClick={() => setResp({ ...resp, servico: "Outro" })} selected={resp.servico === "Outro"} />
                      </OptionGrid>
                    </div>

                    <Button
                      size="lg"
                      className="w-full"
                      disabled={!resp.conhece || !resp.servico}
                      onClick={() => {
                        trackEvent("triagem_step", { step: 2, conhece: resp.conhece, servico: resp.servico });
                        setStep(2);
                      }}
                    >
                      Continuar
                    </Button>
                  </div>
                </Step>
              )}

              {step === 2 && (
                <Step key="2" title="Quando pretende iniciar?">
                  <OptionGrid cols={1}>
                    <Option label="Hoje" onClick={() => next({ prazo: "Hoje" })} />
                    <Option label="Esta semana" onClick={() => next({ prazo: "Esta semana" })} />
                    <Option label="Este mês" onClick={() => next({ prazo: "Este mês" })} />
                    <Option label="Nos próximos meses" onClick={() => next({ prazo: "Nos próximos meses" })} />
                    <Option label="Apenas pesquisando" onClick={() => next({ prazo: "Apenas pesquisando" })} />
                  </OptionGrid>
                </Step>
              )}

              {step >= 3 && (
                <motion.div
                  key="final"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-2"
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-12 h-12 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-heading font-black mb-3">
                    Quase lá! Confirme seus dados
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Ao finalizar, abriremos o WhatsApp da nossa central de triagem com
                    seu resumo já preenchido. Sem retrabalho.
                  </p>

                  <div className="bg-muted/40 rounded-xl p-4 text-left mb-6 max-w-md mx-auto text-sm">
                    <Row label="Experiência" value={resp.experiencia} />
                    <Row label="Conhece o novo procedimento" value={resp.conhece} />
                    <Row label="Serviço" value={resp.servico} />
                    <Row label="Início" value={resp.prazo} />
                  </div>

                  <div className="max-w-md mx-auto mb-6 text-left">
                    <label htmlFor="nome-triagem" className="block text-sm font-semibold mb-2">
                      Seu nome <span className="text-muted-foreground font-normal">(opcional, agiliza o atendimento)</span>
                    </label>
                    <input
                      id="nome-triagem"
                      type="text"
                      value={resp.nome || ""}
                      onChange={(e) => setResp({ ...resp, nome: e.target.value.slice(0, 80) })}
                      placeholder="Ex.: Ana Souza"
                      className="w-full h-12 px-4 rounded-lg border-2 border-border bg-background focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="max-w-md mx-auto mb-6 text-left">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <Checkbox
                        checked={!!resp.lgpd}
                        onCheckedChange={(v) => setResp({ ...resp, lgpd: v === true })}
                        className="mt-1"
                        aria-label="Autorização LGPD"
                      />
                      <span className="text-xs text-muted-foreground leading-relaxed">
                        Autorizo a Autoescola Aptos a utilizar meus dados para contato
                        referente ao orçamento solicitado, envio de informações
                        relacionadas aos serviços da empresa e acompanhamento da minha
                        solicitação, conforme a <strong>Lei Geral de Proteção de Dados
                        (LGPD)</strong>.
                      </span>
                    </label>
                  </div>

                  <Button
                    size="lg"
                    className="text-lg h-14 px-8 shadow-glow w-full max-w-md"
                    disabled={!canFinish || submitting}
                    onClick={finalize}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {submitting ? "Enviando…" : "Finalizar Triagem"}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-4">
                    Atendimento humano de segunda a sábado · Resposta em minutos no horário comercial.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {step > 0 && step < 3 && (
              <button
                onClick={back}
                className="mt-8 inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                aria-label="Voltar etapa"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Voltar
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <TrustItem icon={Award} title="+15 anos" subtitle="formando condutores" />
            <TrustItem icon={CheckCircle2} title="95% aprovação" subtitle="em provas do DETRAN-PR" />
            <TrustItem icon={ShieldCheck} title="Dados protegidos" subtitle="conforme a LGPD" />
          </div>

          <div className="mt-8 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
            <Clock className="w-3 h-3" />
            Levamos menos de 60 segundos para direcionar seu atendimento
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

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
  label,
  onClick,
  selected = false,
}: {
  label: string;
  onClick: () => void;
  selected?: boolean;
}) => (
  <button
    onClick={onClick}
    aria-pressed={selected}
    className={`group flex items-center gap-3 p-5 rounded-xl border-2 transition-all text-left ${
      selected
        ? "border-primary bg-primary/10"
        : "border-border bg-background hover:border-primary hover:bg-primary/5"
    }`}
  >
    <span className="font-semibold text-base flex-1">{label}</span>
    <span className={`text-primary transition-opacity ${selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
      {selected ? "✓" : "→"}
    </span>
  </button>
);

const Row = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex justify-between gap-4 py-1">
    <span className="text-muted-foreground">{label}</span>
    <strong className="text-right">{value || "-"}</strong>
  </div>
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

export default UmContato;
