import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";


const APTOS_WHATSAPP = "554133833627";

function whatsappOptinUrl(telefone: string, confirmado: boolean, jaParticipa = false) {
  const mensagem = [
    "Olá, equipe da Autoescola APTOS! 👋🚗",
    jaParticipa
      ? "Já participo do Programa de Ofertas Exclusivas e quero continuar em contato! 🎁"
      : confirmado
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


/** Atribuição declarada por UTMs ou indícios do navegador; não equivale à identidade do visitante. */
function origemDaVisita() {
  if (typeof window === "undefined") return { campaignSource: null, template: null, origemUrl: null };
  const url = new URL(window.location.href);
  const params = url.searchParams;
  const tag = (key: string) => (params.get(key) || "").trim().slice(0, 80);
  let referencia: URL | null = null;
  try { if (document.referrer) referencia = new URL(document.referrer); } catch { /* Referência indisponível */ }
  const host = (referencia?.hostname || "").toLowerCase();
  const source = (tag("utm_source") || tag("src") || "").toLowerCase();
  const channel = source ||
    (/^(l\\.|m\\.|www\\.)?instagram\\.com$/.test(host) || host === "ig.me" || params.has("igshid") ? "instagram" :
    /(^|\\.)facebook\\.com$/.test(host) || host === "fb.me" ? "facebook" :
    params.has("fbclid") ? "meta (Facebook/Instagram)" :
    params.has("gclid") || params.has("gbraid") || params.has("wbraid") ? "google ads" :
    /(^|\\.)google\\./.test(host) ? "google orgânico" :
    /(^|\\.)wa\\.me$/.test(host) || /(^|\\.)whatsapp\\.com$/.test(host) ? "whatsapp" :
    referencia ? "referência externa" : "direto / não identificado");
  const campaign = tag("utm_campaign") || tag("campanha");
  const medium = tag("utm_medium");
  const sourceLabel = [channel, medium && `meio: ${medium}`, campaign && `campanha: ${campaign}`]
    .filter(Boolean).join(" | ").slice(0, 120);
  // Não gravar identificadores únicos de clique, telefones ou outros parâmetros sensíveis.
  const origem = new URL(url.pathname, url.origin);
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "campanha", "src"]) {
    if (tag(key)) origem.searchParams.set(key, tag(key));
  }
  if (referencia && /^https?:$/.test(referencia.protocol)) {
    // URL interna identifica a página clicada; de sites externos preservamos somente o domínio.
    const valor = referencia.origin === url.origin
      ? referencia.origin + referencia.pathname : referencia.origin;
    origem.searchParams.set("referencia", valor.slice(0, 200));
  }
  return {
    campaignSource: sourceLabel || null,
    template: tag("template") || tag("tpl") || null,
    origemUrl: origem.toString().slice(0, 500),
  };
}

export default function Ofertas({ preview = false }: { preview?: boolean } = {}) {
  const [telefone, setTelefone] = useState("");
  const [aceite, setAceite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFallback, setShowFallback] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);

  const { campaignSource, template, origemUrl } = useMemo(origemDaVisita, []);

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
    setAlreadyRegistered(false);
    try {
      if (preview) throw new Error("Preview: cadastro desativado");
      // A função original permanece como única fonte do cadastro e da integração
      // Google Sheets. verify_jwt=false nessa função pública de opt-in.
      // Uma requisição simples (text/plain, sem Authorization/apikey) dispensa
      // o preflight CORS que podia falhar no navegador antes do POST.
      const endpoint = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/marketing-optin`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body: JSON.stringify({
          telefone,
          campaign_source: campaignSource,
          ultimo_template_enviado: template,
          origem_url: origemUrl,
          lgpd_aceite: true,
        }),
      });
      const res = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(
          typeof res?.message === "string" && res.message.trim()
            ? res.message
            : "Não foi possível confirmar o cadastro. Tente novamente."
        );
      }
      if (res?.success === true && typeof res.id === "string" && res.id.trim().length > 0) {
        setDone(true);
        // O cadastro é salvo antes de abrir o WhatsApp. O envio da mensagem exige
        // que o participante confirme "Enviar" no aplicativo.
        window.location.assign(whatsappOptinUrl(telefone, true));
      } else if (res?.duplicate === true) {
        // Cadastro já existente: não houve falha nem nova gravação.
        setAlreadyRegistered(true);
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
                <p className="text-xs text-foreground/70 mb-4">
                  Com sua autorização, registramos também a origem da visita (como campanha, página
                  de referência ou acesso direto), quando disponível, para avaliar nossas divulgações.
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
                      onChange={(e) => {
                        setTelefone(formatBR(e.target.value));
                        setError(null);
                        setShowFallback(false);
                        setAlreadyRegistered(false);
                      }}
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

                  {(error || alreadyRegistered) && (
                    <div
                      role={alreadyRegistered ? "status" : "alert"}
                      className={alreadyRegistered
                        ? "text-sm text-foreground bg-muted/70 border border-border rounded-md px-3 py-3 space-y-3"
                        : "text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md px-3 py-3 space-y-3"}
                    >
                      {alreadyRegistered ? (
                        <p><strong>Você já participa!</strong> Este número já está cadastrado no Programa de Ofertas Exclusivas. Nenhum novo cadastro foi criado.</p>
                      ) : (
                        <>
                          <p>{error}</p>
                          {showFallback && <p>O cadastro ainda não foi confirmado. Você pode falar com a equipe pelo WhatsApp, mas isso não substitui a inscrição na planilha.</p>}
                        </>
                      )}
                      {showFallback && aceite && valid && (
                        <a
                          href={whatsappOptinUrl(telefone, false, alreadyRegistered)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-11 items-center rounded-lg bg-[#25D366] px-4 py-2 font-semibold text-white"
                        >
                          {alreadyRegistered ? "Continuar pelo WhatsApp" : "Solicitar participação pelo WhatsApp"}
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
