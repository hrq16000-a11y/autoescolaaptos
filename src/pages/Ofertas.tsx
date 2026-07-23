import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";

function formatBR(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function isValidBRMobile(v: string) {
  const d = v.replace(/\D/g, "");
  return d.length === 10 || d.length === 11;
}

export default function Ofertas() {
  const [telefone, setTelefone] = useState("");
  const [aceite, setAceite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const campaignSource = useMemo(() => {
    if (typeof window === "undefined") return null;
    const params = new URLSearchParams(window.location.search);
    return params.get("campanha") || params.get("src") || params.get("utm_campaign") || null;
  }, []);

  useEffect(() => {
    document.documentElement.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const valid = isValidBRMobile(telefone);
  const canSubmit = valid && aceite && !loading;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("marketing-optin", {
        body: { telefone, campaign_source: campaignSource },
      });
      if (fnError) throw fnError;
      const res = data as { success?: boolean; message?: string; duplicate?: boolean };
      if (res?.success) {
        setDone(true);
      } else {
        setError(res?.message || "Não foi possível concluir. Tente novamente.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao enviar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Programa de Ofertas Exclusivas | Autoescola APTOS</title>
        <meta
          name="description"
          content="Autorize o envio de campanhas promocionais exclusivas da Autoescola APTOS pelo WhatsApp. Participação gratuita e opcional."
        />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://autoescolaaptos.com.br/ofertas" />
      </Helmet>

      <main className="min-h-screen bg-background flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-2xl shadow-lg p-6 sm:p-8">
            {!done ? (
              <>
                <div className="text-center mb-6">
                  <div className="text-4xl mb-2" aria-hidden>🎁</div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                    Programa de Ofertas Exclusivas
                  </h1>
                </div>

                <p className="text-foreground/90 mb-3">
                  Receba campanhas promocionais exclusivas da <strong>Autoescola APTOS</strong>.
                </p>
                <p className="text-foreground/80 text-sm mb-4">
                  Quando houver uma promoção disponível para seu perfil, poderemos enviar uma mensagem pelo WhatsApp.
                  A participação é totalmente <strong>opcional e gratuita</strong>.
                </p>

                <ul className="text-sm text-foreground/80 space-y-1.5 mb-6 list-disc pl-5">
                  <li>Enviadas apenas para quem autorizar.</li>
                  <li>Possuem prazo de utilização.</li>
                  <li>Podem conter descontos, bônus ou benefícios exclusivos.</li>
                  <li>Quando informado na campanha, o benefício poderá ser utilizado apenas uma única vez pelo participante.</li>
                </ul>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="telefone" className="block text-sm font-medium text-foreground mb-1">
                      WhatsApp <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="telefone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel-national"
                      placeholder="(41) 99999-9999"
                      value={telefone}
                      onChange={(e) => setTelefone(formatBR(e.target.value))}
                      className="w-full h-12 px-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                    {telefone && !valid && (
                      <p className="text-xs text-destructive mt-1">
                        Informe DDD + número (10 ou 11 dígitos).
                      </p>
                    )}
                  </div>

                  <label className="flex items-start gap-3 text-sm text-foreground/90 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={aceite}
                      onChange={(e) => setAceite(e.target.checked)}
                      className="mt-0.5 h-5 w-5 accent-primary flex-shrink-0"
                    />
                    <span>
                      Autorizo a Autoescola APTOS a enviar campanhas promocionais pelo WhatsApp.
                    </span>
                  </label>

                  {error && (
                    <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md px-3 py-2">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="w-full h-12 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Enviando..." : "Quero participar"}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div className="text-5xl mb-3" aria-hidden>✅</div>
                <h1 className="text-2xl font-bold text-foreground mb-3">
                  Cadastro realizado com sucesso!
                </h1>
                <p className="text-foreground/90 mb-3">
                  Agora você poderá receber campanhas promocionais exclusivas da Autoescola APTOS
                  quando houver disponibilidade.
                </p>
                <p className="text-sm text-foreground/70 mb-2">
                  As promoções possuem regras próprias, prazo de utilização e poderão ser limitadas
                  a uma utilização por participante quando informado na campanha.
                </p>
                <p className="text-sm text-foreground/70">
                  Você poderá cancelar essa autorização a qualquer momento.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
