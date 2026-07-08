import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import {
  ArrowLeft,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
  Clock,
  Award,
  Sparkles,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { whatsappLink } from "@/lib/whatsapp";
import { track, trackConversion } from "@/lib/analytics";
import { supabase } from "@/integrations/supabase/client";

type Experiencia = "Tenho experiência com carro" | "Tenho experiência com moto" | "Começaria do zero";
type ConheceProcedimento = "Sim, conheço o procedimento" | "Não, é minha primeira vez";
type Servico =
  | "Primeira Habilitação"
  | "Renovação de CNH"
  | "Mudança / Inclusão de Categoria"
  | "Curso de Reciclagem (Suspensos)"
  | "Reteste Prático";
type Categoria = "A (moto)" | "B (carro)" | "A+B (moto e carro)";
type Prazo = "Hoje" | "Esta semana" | "Este mês" | "Nos próximos meses" | "Apenas pesquisando";

interface Respostas {
  experiencia?: Experiencia;
  conhece?: ConheceProcedimento;
  servico?: Servico;
  categoria?: Categoria;
  prazo?: Prazo;
  nome?: string;
  telefone?: string;
  email?: string;
  lgpd?: boolean;
  aceita_whats?: boolean;
  aceita_email?: boolean;
  honeypot?: string; // anti-spam
}

const TOTAL_STEPS = 3;

// ---------- helpers ----------

function maskPhone(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function isValidPhone(v?: string) {
  if (!v) return false;
  const d = v.replace(/\D/g, "");
  return d.length === 10 || d.length === 11;
}

function isValidEmail(v?: string) {
  if (!v) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
}

function detectDevice(): string {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent;
  if (/iPad|Tablet/i.test(ua)) return "tablet";
  if (/Mobi|Android|iPhone/i.test(ua)) return "mobile";
  return "desktop";
}

function readUtms() {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get("utm_source") || undefined,
    utm_medium: p.get("utm_medium") || undefined,
    utm_campaign: p.get("utm_campaign") || undefined,
    utm_term: p.get("utm_term") || undefined,
    utm_content: p.get("utm_content") || undefined,
  };
}

// ---------- component ----------

const STORAGE_KEY = "aptos:1contato:draft:v1";

const UmContato = () => {
  const [step, setStep] = useState(0);
  const [resp, setResp] = useState<Respostas>({ lgpd: true, aceita_whats: true });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [restored, setRestored] = useState(false);
  const startedAt = useRef<number>(Date.now());
  const viewedRef = useRef(false);

  // Refs para auto-scroll dentro da etapa 1
  const cardRef = useRef<HTMLDivElement | null>(null);
  const servicoRef = useRef<HTMLDivElement | null>(null);
  const categoriaRef = useRef<HTMLDivElement | null>(null);
  const nextStepBtnRef = useRef<HTMLButtonElement | null>(null);

  // Autoscroll suave + foco no primeiro elemento interativo do bloco alvo
  const scrollTo = (el: HTMLElement | null, opts?: { focus?: boolean }) => {
    if (!el) return;
    setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      if (opts?.focus !== false) {
        const focusable = el.querySelector<HTMLElement>(
          'input, textarea, select, button, [tabindex]:not([tabindex="-1"])'
        );
        // preventScroll evita "pulo" — o scrollIntoView já cuida disso
        focusable?.focus?.({ preventScroll: true });
      }
    }, 180);
  };

  // Restaura rascunho do localStorage antes de qualquer render de conteúdo
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as { resp?: Respostas; step?: number; ts?: number };
        // ignora rascunho > 7 dias
        if (saved.ts && Date.now() - saved.ts < 7 * 24 * 3600 * 1000) {
          if (saved.resp) setResp((prev) => ({ ...prev, ...saved.resp }));
          if (typeof saved.step === "number" && saved.step >= 0 && saved.step < TOTAL_STEPS) {
            setStep(saved.step);
            setRestored(true);
          }
        }
      }
    } catch { /* noop */ }
  }, []);

  // Persiste rascunho a cada mudança relevante (não persiste após envio)
  useEffect(() => {
    if (done) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ resp, step, ts: Date.now() })
      );
    } catch { /* noop */ }
  }, [resp, step, done]);

  // Limpa rascunho ao concluir
  useEffect(() => {
    if (done) {
      try { localStorage.removeItem(STORAGE_KEY); } catch { /* noop */ }
    }
  }, [done]);

  // Foco sempre no topo ao entrar na página + autoscroll suave até o card em mobile
  useEffect(() => {
    if (viewedRef.current) return;
    viewedRef.current = true;
    startedAt.current = Date.now();
    window.scrollTo({ top: 0, behavior: "auto" });
    track("ViewContent", { content_name: "1contato_triagem", page_path: "/1contato" });
    track("StartTriagem", { funnel: "1contato" });

    // Em mobile, rola suavemente até a primeira pergunta após um pequeno delay
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 500);
    }
  }, []);

  // Track cada mudança de etapa + foco suave no topo do card
  useEffect(() => {
    if (step === 0) return;
    track(`Step${step}`, { funnel: "1contato", step });
    setTimeout(() => {
      cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, [step]);

  // Auto-avanço da etapa 1 quando todas as respostas obrigatórias estiverem prontas
  useEffect(() => {
    if (step !== 1) return;
    const needsCat =
      resp.servico === "Primeira Habilitação" ||
      resp.servico === "Mudança / Inclusão de Categoria";
    const ready = !!resp.conhece && !!resp.servico && (!needsCat || !!resp.categoria);
    if (ready) {
      const t = setTimeout(() => setStep(2), 420);
      return () => clearTimeout(t);
    }
  }, [step, resp.conhece, resp.servico, resp.categoria]);


  const validateStep = (s: number): boolean => {
    const e: Record<string, string> = {};
    if (s === 0 && !resp.experiencia) e.experiencia = "Escolha uma opção para continuar.";
    if (s === 1) {
      if (!resp.conhece) e.conhece = "Selecione uma opção.";
      if (!resp.servico) e.servico = "Escolha o serviço desejado.";
      if (
        resp.servico === "Primeira Habilitação" ||
        resp.servico === "Mudança / Inclusão de Categoria"
      ) {
        if (!resp.categoria) e.categoria = "Escolha a categoria desejada.";
      }
    }
    if (s === 2 && !resp.prazo) e.prazo = "Selecione quando pretende iniciar.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setErrors({});
    setStep((s) => s + 1);
  };

  const goBack = () => {
    setErrors({});
    setStep((s) => Math.max(0, s - 1));
  };

  const buildMessage = (r: Respostas) => {
    const servicoLinha = r.categoria ? `${r.servico} — Categoria ${r.categoria}` : r.servico;
    return (
      `Olá! 😊\n\n` +
      `Acabei de concluir a triagem no site da Autoescola APTOS. Segue meu resumo:\n\n` +
      `• Nome: ${r.nome}\n` +
      `• WhatsApp: ${r.telefone}\n` +
      (r.email ? `• Email: ${r.email}\n` : "") +
      `• Serviço: ${servicoLinha}\n` +
      `• Experiência: ${r.experiencia}\n` +
      `• Conhece o novo procedimento da CNH: ${r.conhece}\n` +
      `• Pretendo iniciar: ${r.prazo}\n\n` +
      `Gostaria de receber meu orçamento e os próximos passos, por favor.`
    );
  };

  const finalUrl = useMemo(() => whatsappLink(buildMessage(resp), "funil"), [resp]);

  const canFinish =
    !!resp.experiencia &&
    !!resp.conhece &&
    !!resp.servico &&
    !!resp.prazo &&
    !!resp.nome &&
    resp.nome.trim().length >= 5 &&
    isValidPhone(resp.telefone) &&
    !!resp.lgpd;

  const validateFinal = (): boolean => {
    const e: Record<string, string> = {};
    if (!resp.nome || resp.nome.trim().length < 5)
      e.nome = "Informe seu nome completo (mínimo 5 caracteres).";
    if (!isValidPhone(resp.telefone))
      e.telefone = "Informe um WhatsApp válido com DDD.";
    if (resp.email && !isValidEmail(resp.email))
      e.email = "E-mail inválido.";
    if (!resp.lgpd) e.lgpd = "É preciso aceitar os termos da LGPD.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const finalize = async () => {
    if (submitting) return;
    if (!validateFinal()) return;
    // honeypot: bots costumam preencher qualquer input
    if (resp.honeypot && resp.honeypot.length > 0) {
      // finge sucesso, não envia
      setDone(true);
      return;
    }
    setSubmitting(true);
    setSubmitError(null);

    const utms = readUtms();
    const tempo = Math.round((Date.now() - startedAt.current) / 1000);

    const payload = {
      nome: resp.nome ?? null,
      telefone: resp.telefone ?? null,
      email: resp.email ?? null,
      experiencia: resp.experiencia ?? null,
      conhece_procedimento: resp.conhece ?? null,
      servico: resp.servico ?? null,
      categoria: resp.categoria ?? null,
      prazo: resp.prazo ?? null,
      aceita_whats: resp.aceita_whats ?? true,
      aceita_email: resp.aceita_email ?? false,
      lgpd_aceite: !!resp.lgpd,
      origem: "1contato",
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
      referrer: typeof document !== "undefined" ? document.referrer || null : null,
      device: detectDevice(),
      tempo_gasto_segundos: tempo,
      honeypot: resp.honeypot ?? "",
      ...utms,
    };

    // Envia via edge function (aplica honeypot + rate-limit por IP + webhook opcional).
    // Fallback silencioso para insert direto se a função ainda não estiver publicada.
    try {
      const { error } = await supabase.functions.invoke("submit-triagem", { body: payload });
      if (error) throw error;
    } catch (err) {
      // Fallback best-effort — nunca bloquear o handoff do WhatsApp por falha de rede.
      const msg = String((err as { message?: string })?.message || "");
      if (msg.includes("429") || msg.toLowerCase().includes("rate")) {
        setSubmitError("Muitas tentativas em pouco tempo. Aguarde um instante e tente novamente.");
        setSubmitting(false);
        return;
      }
      try {
        await supabase.from("triagem_leads").insert(payload as never);
      } catch {
        /* silent */
      }
    }

    // Analytics — Lead event + custom
    trackConversion("Lead", {
      lead_source: "1contato_triagem",
      servico: payload.servico,
      categoria: payload.categoria,
      prazo: payload.prazo,
      tempo_gasto_segundos: tempo,
      value: 10,
      currency: "BRL",
    });
    track("triagem_complete", payload as unknown as Record<string, unknown>);

    try {
      const { addSignal } = await import("@/lib/leadScore");
      addSignal({ type: "funnel_complete" });
    } catch {
      /* noop */
    }

    setSubmitting(false);
    setDone(true);

    // Redireciona imediatamente ao WhatsApp — sem clique extra.
    trackConversion("WhatsAppClick", {
      source: "1contato_auto_redirect",
      servico: payload.servico,
    });
    window.location.href = whatsappLink(buildMessage(resp), "funil");
  };

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(buildMessage(resp));
      setCopied(true);
      track("copy_whatsapp_message", { source: "1contato_success" });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setSubmitError("Não foi possível copiar. Selecione a mensagem manualmente.");
    }
  };


  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Triagem Rápida CNH — Autoescola APTOS",
    description:
      "Formulário de triagem em 3 passos para primeira habilitação, renovação, mudança de categoria, reciclagem e reteste na Autoescola APTOS em São José dos Pinhais.",
    url: "https://autoescolaaptos.com.br/1contato",
    inLanguage: "pt-BR",
    isPartOf: {
      "@type": "WebSite",
      name: "Autoescola APTOS",
      url: "https://autoescolaaptos.com.br",
    },
    mainEntity: {
      "@type": "Service",
      name: "Triagem e orçamento de CNH",
      provider: {
        "@type": "DrivingSchool",
        name: "Autoescola APTOS",
        telephone: "+554133833627",
        areaServed: "São José dos Pinhais, PR",
      },
    },
  };

  const progressPct = done ? 100 : Math.round((step / TOTAL_STEPS) * 100);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Triagem CNH em 60s | Autoescola APTOS São José dos Pinhais"
        description="Responda 3 perguntas rápidas e receba seu orçamento de CNH direto no WhatsApp. Primeira habilitação, renovação, mudança de categoria, reciclagem e reteste na Autoescola APTOS."
        canonical="/1contato"
        jsonLd={jsonLd}
      />
      <Helmet>
        <meta name="keywords" content="triagem CNH, autoescola São José dos Pinhais, orçamento CNH, primeira habilitação, renovação CNH, reciclagem CNH suspensos" />
        <meta property="og:image" content="https://autoescolaaptos.com.br/og-1contato.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Triagem CNH em 60 segundos — Autoescola APTOS" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://autoescolaaptos.com.br/1contato" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://autoescolaaptos.com.br/og-1contato.jpg" />
      </Helmet>
      <Navbar />

      <main id="main" className="flex-1 pt-20 md:pt-24 pb-10">
        <div className="container mx-auto px-3 sm:px-4 max-w-3xl">
          {/* HERO — compacto para mobile */}
          <div className="text-center mb-4 md:mb-6">
            <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full mb-2 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              Triagem em menos de 60s
            </div>
            <h1 className="text-2xl md:text-4xl font-heading font-black mb-1.5 leading-tight">
              Vamos entender <span className="text-primary">seu caso</span> em 3 passos
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
              Responda 3 perguntas rápidas e fale com um consultor no WhatsApp.
            </p>
            <p className="mt-2 text-[11px] md:text-xs text-muted-foreground max-w-md mx-auto leading-snug">
              <ShieldCheck className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5 text-primary" aria-hidden="true" />
              Esse processo é para sua segurança e nossa autorização de contato com você,
              de acordo com as leis de proteção de dados (LGPD).
            </p>
          </div>

          {/* PROGRESS — enxuto */}
          {!done && (
            <div
              className="mb-4 md:mb-6"
              role="progressbar"
              aria-valuenow={progressPct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Etapa ${Math.min(step + 1, TOTAL_STEPS)} de ${TOTAL_STEPS}`}
            >
              <div className="flex justify-between text-[11px] font-medium text-muted-foreground mb-1.5">
                <span>Etapa {Math.min(step + 1, TOTAL_STEPS)} de {TOTAL_STEPS}</span>
                <span>{progressPct}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                />
              </div>
            </div>
          )}

          {/* CARD — padding menor no mobile */}
          <div id="triagem-card" className="bg-card border border-border rounded-2xl shadow-large p-4 sm:p-6 md:p-8 min-h-[300px]">
            <AnimatePresence mode="wait">
              {!done && step === 0 && (
                <Step key="0" title="Você já dirige?">
                  <OptionGrid cols={1}>
                    {(
                      [
                        "Tenho experiência com carro",
                        "Tenho experiência com moto",
                        "Começaria do zero",
                      ] as Experiencia[]
                    ).map((e) => (
                      <Option
                        key={e}
                        label={e}
                        selected={resp.experiencia === e}
                        onClick={() => {
                          setResp({ ...resp, experiencia: e });
                          setErrors({});
                          track("triagem_select", { step: 0, field: "experiencia", value: e });
                          // auto-advance
                          setTimeout(() => setStep(1), 220);
                        }}
                      />
                    ))}
                  </OptionGrid>
                  <FieldError message={errors.experiencia} />
                </Step>
              )}

              {!done && step === 1 && (
                <Step key="1" title="Qual é o seu caso?">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm md:text-base font-heading font-bold mb-2">
                        Já conhece o novo procedimento da CNH?
                      </h3>
                      <OptionGrid>
                        {(
                          [
                            "Sim, conheço o procedimento",
                            "Não, é minha primeira vez",
                          ] as ConheceProcedimento[]
                        ).map((c) => (
                          <Option
                            key={c}
                            label={c}
                            selected={resp.conhece === c}
                            onClick={() => {
                              setResp({ ...resp, conhece: c });
                              track("triagem_select", { step: 1, field: "conhece", value: c });
                              scrollTo(servicoRef.current);
                            }}
                          />
                        ))}
                      </OptionGrid>
                      <FieldError message={errors.conhece} />
                    </div>

                    <div ref={servicoRef}>
                      <h3 className="text-sm md:text-base font-heading font-bold mb-2">
                        Qual serviço você procura?
                      </h3>
                      <OptionGrid>
                        {(
                          [
                            "Primeira Habilitação",
                            "Renovação de CNH",
                            "Mudança / Inclusão de Categoria",
                            "Curso de Reciclagem (Suspensos)",
                            "Reteste Prático",
                          ] as Servico[]
                        ).map((s) => (
                          <Option
                            key={s}
                            label={s}
                            selected={resp.servico === s}
                            onClick={() => {
                              const needsCat =
                                s === "Primeira Habilitação" || s === "Mudança / Inclusão de Categoria";
                              setResp({ ...resp, servico: s, categoria: needsCat ? resp.categoria : undefined });
                              track("triagem_select", { step: 1, field: "servico", value: s });
                              // Se precisa categoria, foca nela; senão o useEffect avança sozinho
                              if (needsCat) scrollTo(categoriaRef.current);
                            }}
                          />
                        ))}
                      </OptionGrid>
                      <FieldError message={errors.servico} />
                    </div>

                    {(resp.servico === "Primeira Habilitação" ||
                      resp.servico === "Mudança / Inclusão de Categoria") && (
                      <div ref={categoriaRef}>
                        <h3 className="text-sm md:text-base font-heading font-bold mb-2">
                          Qual categoria?
                        </h3>
                        <OptionGrid>
                          {(["A (moto)", "B (carro)", "A+B (moto e carro)"] as Categoria[]).map((c) => (
                            <Option
                              key={c}
                              label={c}
                              selected={resp.categoria === c}
                              onClick={() => {
                                setResp({ ...resp, categoria: c });
                                track("triagem_select", { step: 1, field: "categoria", value: c });
                                // useEffect faz auto-avanço
                              }}
                            />
                          ))}
                        </OptionGrid>
                        <FieldError message={errors.categoria} />
                      </div>
                    )}
                  </div>
                </Step>
              )}

              {!done && step === 2 && (
                <Step key="2" title="Quando pretende iniciar?">
                  <OptionGrid cols={1}>
                    {(["Hoje", "Esta semana", "Este mês", "Nos próximos meses", "Apenas pesquisando"] as Prazo[]).map(
                      (p) => (
                        <Option
                          key={p}
                          label={p}
                          selected={resp.prazo === p}
                          onClick={() => {
                            setResp({ ...resp, prazo: p });
                            track("triagem_select", { step: 2, field: "prazo", value: p });
                            setTimeout(() => setStep(3), 220);
                          }}
                        />
                      ),
                    )}
                  </OptionGrid>
                  <FieldError message={errors.prazo} />
                </Step>
              )}


              {!done && step >= 3 && (
                <motion.div
                  key="final"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-2"
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-12 h-12 text-primary" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-heading font-black mb-3">
                    Quase lá! Confirme seus dados
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Confira o resumo abaixo e complete seus dados. Ao finalizar, você abre o
                    WhatsApp da nossa central com tudo pronto.
                  </p>

                  {/* Visual summary */}
                  <div className="bg-muted/40 rounded-xl p-4 text-left mb-6 max-w-md mx-auto text-sm space-y-2">
                    <SummaryRow ok label={resp.servico} />
                    {resp.categoria && <SummaryRow ok label={`Categoria ${resp.categoria}`} />}
                    <SummaryRow ok label={resp.experiencia} />
                    <SummaryRow ok label={resp.conhece} />
                    <SummaryRow ok label={`Início: ${resp.prazo}`} />
                  </div>

                  <div className="max-w-md mx-auto mb-4 text-left">
                    <label htmlFor="nome-triagem" className="block text-sm font-semibold mb-2">
                      Nome completo *
                    </label>
                    <input
                      id="nome-triagem"
                      type="text"
                      value={resp.nome || ""}
                      onChange={(e) => setResp({ ...resp, nome: e.target.value.slice(0, 100) })}
                      placeholder="Ex.: João Silva"
                      required
                      minLength={5}
                      autoComplete="name"
                      aria-invalid={!!errors.nome}
                      aria-describedby={errors.nome ? "err-nome" : undefined}
                      className="w-full h-12 px-4 rounded-lg border-2 border-border bg-background focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 transition-colors"
                    />
                    <FieldError id="err-nome" message={errors.nome} />
                  </div>

                  <div className="max-w-md mx-auto mb-4 text-left">
                    <label htmlFor="tel-triagem" className="block text-sm font-semibold mb-2">
                      WhatsApp (com DDD) *
                    </label>
                    <input
                      id="tel-triagem"
                      type="tel"
                      inputMode="tel"
                      value={resp.telefone || ""}
                      onChange={(e) => setResp({ ...resp, telefone: maskPhone(e.target.value) })}
                      placeholder="(41) 99999-9999"
                      required
                      autoComplete="tel"
                      aria-invalid={!!errors.telefone}
                      aria-describedby={errors.telefone ? "err-tel" : undefined}
                      className="w-full h-12 px-4 rounded-lg border-2 border-border bg-background focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 transition-colors"
                    />
                    <FieldError id="err-tel" message={errors.telefone} />
                  </div>

                  <div className="max-w-md mx-auto mb-6 text-left">
                    <label htmlFor="email-triagem" className="block text-sm font-semibold mb-2">
                      E-mail <span className="text-muted-foreground font-normal">(opcional)</span>
                    </label>
                    <input
                      id="email-triagem"
                      type="email"
                      value={resp.email || ""}
                      onChange={(e) => setResp({ ...resp, email: e.target.value.slice(0, 150) })}
                      placeholder="seu@email.com"
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "err-email" : undefined}
                      className="w-full h-12 px-4 rounded-lg border-2 border-border bg-background focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 transition-colors"
                    />
                    <FieldError id="err-email" message={errors.email} />
                  </div>

                  <div className="max-w-md mx-auto mb-6 text-left rounded-lg border border-amber-300/60 bg-amber-50 dark:bg-amber-900/20 p-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <Checkbox
                        checked={!!resp.lgpd}
                        onCheckedChange={(v) => {
                          const val = v === true;
                          setResp({ ...resp, lgpd: val });
                          if (val) track("lgpd_accept", { funnel: "1contato" });
                        }}
                        className="mt-1"
                        aria-label="Autorização LGPD"
                        aria-invalid={!!errors.lgpd}
                      />
                      <span className="text-xs text-foreground/90 leading-relaxed">
                        Autorizo a <strong>Autoescola APTOS</strong> a utilizar meus dados
                        para contato, envio do orçamento e informações relacionadas aos
                        serviços, conforme a <strong>LGPD</strong>. Meus dados jamais serão
                        compartilhados com terceiros.
                      </span>
                    </label>
                    <FieldError message={errors.lgpd} />
                  </div>

                  {/* Honeypot: campo invisível — bots preenchem, humanos não */}
                  <div aria-hidden="true" className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden">
                    <label htmlFor="hp-website">Website</label>
                    <input
                      id="hp-website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={resp.honeypot || ""}
                      onChange={(e) => setResp({ ...resp, honeypot: e.target.value })}
                    />
                  </div>

                  {submitError && (
                    <div role="alert" className="max-w-md mx-auto mb-4 text-sm text-destructive flex items-center justify-center gap-1.5">
                      <AlertCircle className="w-4 h-4" aria-hidden="true" />
                      {submitError}
                    </div>
                  )}

                  <Button
                    size="lg"
                    className="text-lg h-14 px-8 shadow-glow w-full max-w-md"
                    disabled={!canFinish || submitting}
                    onClick={finalize}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" aria-hidden="true" />
                    {submitting ? "Enviando…" : "Finalizar Triagem"}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-4">
                    Atendimento humano de segunda a sábado · Resposta em minutos no horário comercial.
                  </p>
                </motion.div>
              )}

              {done && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-4"
                >
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle2 className="w-14 h-14 text-emerald-600" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-heading font-black mb-3">
                    Triagem concluída! 🎉
                  </h2>
                  <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                    Recebemos suas informações. Agora um consultor da <strong>Autoescola APTOS</strong>{" "}
                    vai analisar sua necessidade. Clique abaixo para continuar pelo WhatsApp
                    com o seu resumo já preenchido.
                  </p>

                  <div className="bg-muted/40 rounded-xl p-4 text-left mb-6 max-w-md mx-auto text-sm space-y-2">
                    <SummaryRow ok label={resp.servico} />
                    {resp.categoria && <SummaryRow ok label={`Categoria ${resp.categoria}`} />}
                    <SummaryRow ok label={resp.experiencia} />
                    <SummaryRow ok label={`Início: ${resp.prazo}`} />
                  </div>

                  <div className="flex flex-col gap-3 max-w-md mx-auto">
                    <Button
                      size="lg"
                      className="text-lg h-14 px-8 shadow-glow w-full bg-emerald-600 hover:bg-emerald-700"
                      asChild
                    >
                      <a
                        href={finalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackConversion("WhatsAppClick", {
                            source: "1contato_success",
                            servico: resp.servico,
                          })
                        }
                      >
                        <MessageCircle className="w-5 h-5 mr-2" aria-hidden="true" />
                        Continuar atendimento no WhatsApp
                      </a>
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="w-full"
                      onClick={copyMessage}
                      aria-live="polite"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 mr-2" aria-hidden="true" />
                          Mensagem copiada!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" aria-hidden="true" />
                          Copiar mensagem antes de enviar
                        </>
                      )}
                    </Button>
                  </div>

                  {submitError && (
                    <div role="alert" className="mt-4 text-sm text-destructive flex items-center justify-center gap-1.5">
                      <AlertCircle className="w-4 h-4" aria-hidden="true" />
                      {submitError}
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground mt-4">
                    Você será redirecionado ao WhatsApp da nossa central de triagem.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {!done && step > 0 && step < TOTAL_STEPS && (
              <button
                onClick={goBack}
                className="mt-8 inline-flex items-center text-sm text-muted-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded transition-colors"
                aria-label="Voltar para a etapa anterior"
              >
                <ArrowLeft className="w-4 h-4 mr-1" aria-hidden="true" />
                Voltar
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <TrustItem icon={Award} title="+15 anos" subtitle="formando condutores" />
            <TrustItem icon={CheckCircle2} title="95% aprovação" subtitle="em provas do DETRAN-PR" />
            <TrustItem icon={ShieldCheck} title="Dados protegidos" subtitle="conforme a LGPD" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// ---------- subcomponents ----------

const Step = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, x: 24 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -24 }}
    transition={{ duration: 0.25 }}
  >
    <h2 className="text-lg md:text-xl font-heading font-bold mb-4 text-center">{title}</h2>
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
    type="button"
    onClick={onClick}
    aria-pressed={selected}
    className={`group flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
      selected
        ? "border-primary bg-primary/10"
        : "border-border bg-background hover:border-primary hover:bg-primary/5"
    }`}
  >
    <span className="font-semibold text-sm md:text-base flex-1 leading-tight">{label}</span>
    <span
      className={`text-primary transition-opacity ${
        selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      }`}
      aria-hidden="true"
    >
      {selected ? "✓" : "→"}
    </span>
  </button>
);

const FieldError = ({ id, message }: { id?: string; message?: string }) =>
  message ? (
    <p
      id={id}
      role="alert"
      className="mt-2 text-sm text-destructive flex items-center gap-1.5"
    >
      <AlertCircle className="w-4 h-4" aria-hidden="true" />
      {message}
    </p>
  ) : null;

const SummaryRow = ({ ok, label }: { ok?: boolean; label?: string }) =>
  label ? (
    <div className="flex items-center gap-2">
      <CheckCircle2 className={`w-4 h-4 ${ok ? "text-emerald-600" : "text-muted-foreground"}`} />
      <span>{label}</span>
    </div>
  ) : null;

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
