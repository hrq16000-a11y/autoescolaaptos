import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";

const MARKETING_OPTIN_API_URL = "https://autoescolaaptos-marketing-api-msolus.vercel.app/api/marketing-optin";
const APTOS_WHATSAPP = "554133833627";

function whatsappOptinUrl(telefone: string, confirmado: boolean) {
  const mensagem = [
    "Olá, equipe da Autoescola APTOS! 👋🚗",
    confirmado
      ? "Acabei de confirmar minha participação no Programa de Ofertas Exclusivas! 🎁"
      : "Quero participar do Programa de Ofertas Exclusivas! 🎁",
    "",
    "✅ Autorizo receber novidades, campanhas e condições especiais da APTOS por WhatsApp.",
    `📱 Meu número: ${telefone}.`,
    "Quando surgirem oportunidades para minha habilitação, podem me avisar por aqui?",
    "Obrigado(a)! 😊",
  ].join("\n");
  return `https://api.whatsapp.com/send?phone=${APTOS_WHATSAPP}&text=${encodeURIComponent(mensagem)}`;
}


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

export default function Ofertas({ preview = false }: { preview?: boolean } = {}) {
  const [telefone, setTelefone] = useState("");
  const [aceite, setAceite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFallback, setShowFallback] = useState(false);

  const { campaignSource, template, origemUrl } = useMemo(() => {
    if (typeof window === "undefined") return { campaignSource: null, template: null, origemUrl: null };
    const params = new URLSearchParams(window.location.search);
    return {
      campaignSource:
        params.get("campanha") || params.get("src") || params.get("utm_campaign") || null,
      template: params.get("template") || params.get("tpl") || null,
      origemUrl: window.location.href,
    };
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
    setShowFallback(false);
    try {
      if (preview) throw new Error("Preview: cadastro desativado");
      const response = await fetch(MARKETING_OPTIN_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          telefone,
          campaign_source: campaignSource,
          ultimo_template_enviado: template,
          origem_url: origemUrl,
          lgpd_aceite: true,
        }),
      });
      const res = await response.json().catch(() => ({})) as {
        success?: boolean;
        id?: unknown;
        message?: string;
        duplicate?: boolean;
      };
      if (!response.ok) {
        throw new Error(res?.message || "Não foi possível confirmar o cadastro. Tente novamente.");
      }
      if (res?.success === true && typeof res.id === "string" && res.id.trim().length > 0) {
        setDone(true);
        // O cadastro é salvo antes de abrir o WhatsApp. O envio da mensagem exige
        // que o participante confirme "Enviar" no aplicativo.
        window.location.assign(whatsappOptinUrl(telefone, true));
      } else if (res?.duplicate === true) {
        // O cadastro existente não é sobrescrito: a pessoa pode continuar no WhatsApp.
        setError("Este número já está participando. Você pode continuar pelo WhatsApp sem fazer outro cadastro.");
        setShowFallback(true);
      } else {
        setError("Não foi possível confirmar o cadastro. Tente novamente.");
        setShowFallback(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível concluir o cadastro. Tente novamente.");
      setShowFallback(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {!preview && <Helmet>
        <title>Programa de Ofertas Exclusivas | Autoescola APTOS</title>
        <meta
          name="description"
          content="Autorize o envio de campanhas promocionais exclusivas da Autoescola APTOS pelo WhatsApp. Participação gratuita e opcional."
        />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://autoescolaaptos.com.br/ofertas" />
      </Helmet>}

      <main className="min-h-screen bg-background flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          {preview && <p role="status" className="mb-4 rounded-lg bg-muted p-3 text-sm">Pré-produção: nenhum cadastro é enviado ou registrado.</p>}
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

                <p className="text-sm text-foreground/80 mb-4">
                  Após confirmar o cadastro, abriremos o WhatsApp com uma mensagem pronta. Você só precisa tocar em Enviar.
                </p>
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
                    <div role="alert" className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md px-3 py-3 space-y-3">
                      <p>{error}</p>
                      {showFallback && <p>Não foi possível confirmar seu cadastro automático. Você pode entrar em contato pelo WhatsApp para solicitar a participação.</p>}
                      {showFallback && aceite && valid && (
                        <a
                          href={whatsappOptinUrl(telefone, false)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-11 items-center rounded-lg bg-[#25D366] px-4 py-2 font-semibold text-white"
                        >
                          Continuar pelo WhatsApp
                        </a>
                      )}
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
                <p className="text-foreground/90 mb-4">
                  Agora você poderá receber campanhas promocionais exclusivas da Autoescola APTOS
                  quando houver disponibilidade.
                </p>

                <a
                  href={whatsappOptinUrl(telefone, true)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full h-14 rounded-lg bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-lg shadow-lg transition mb-4 gap-2"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M20.52 3.48A11.94 11.94 0 0012.05 0C5.5 0 .18 5.32.18 11.87c0 2.09.55 4.13 1.6 5.93L0 24l6.36-1.67a11.86 11.86 0 005.69 1.45h.01c6.55 0 11.87-5.32 11.87-11.87 0-3.17-1.24-6.15-3.41-8.43zM12.06 21.5h-.01a9.6 9.6 0 01-4.9-1.34l-.35-.21-3.77.99 1.01-3.67-.23-.38a9.6 9.6 0 01-1.48-5.11c0-5.31 4.32-9.63 9.63-9.63 2.57 0 4.98 1 6.8 2.82a9.55 9.55 0 012.82 6.8c0 5.31-4.32 9.63-9.63 9.63z"/></svg>
                  Quero participar das promoções!
                </a>

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
