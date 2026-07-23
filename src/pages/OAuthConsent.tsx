import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

// Local typed wrapper for the beta supabase.auth.oauth namespace.
type OAuthDetails = {
  client?: { name?: string; client_uri?: string; redirect_uris?: string[] };
  scope?: string;
  redirect_url?: string;
  redirect_to?: string;
};
type OAuthResp = { data: OAuthDetails | null; error: { message: string } | null };
const oauth = (supabase.auth as unknown as {
  oauth: {
    getAuthorizationDetails: (id: string) => Promise<OAuthResp>;
    approveAuthorization: (id: string) => Promise<OAuthResp>;
    denyAuthorization: (id: string) => Promise<OAuthResp>;
  };
}).oauth;

const OAuthConsent = () => {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<OAuthDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) return setError("Missing authorization_id");
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/login?next=" + encodeURIComponent(next);
        return;
      }
      setUserEmail(sess.session.user.email ?? null);
      const { data, error } = await oauth.getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) return setError(error.message);
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => { active = false; };
  }, [authorizationId]);

  async function decide(approve: boolean) {
    setBusy(true);
    const { data, error } = approve
      ? await oauth.approveAuthorization(authorizationId)
      : await oauth.denyAuthorization(authorizationId);
    if (error) { setBusy(false); return setError(error.message); }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) { setBusy(false); return setError("Servidor de autorização não retornou redirect."); }
    window.location.href = target;
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-background border rounded-2xl p-6 shadow">
          <h1 className="text-lg font-semibold mb-2">Não foi possível carregar a autorização</h1>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </main>
    );
  }
  if (!details) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground text-sm">Carregando…</div>
      </main>
    );
  }

  const clientName = details.client?.name ?? "esse aplicativo";
  const scopes = (details.scope ?? "").split(/\s+/).filter(Boolean);

  return (
    <main className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="max-w-md w-full bg-background border rounded-2xl shadow p-6 space-y-5">
        <div>
          <h1 className="text-xl font-bold">Conectar {clientName} à Autoescola APTOS</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {clientName} vai poder usar as ferramentas deste app agindo como você.
          </p>
        </div>

        {userEmail && (
          <div className="text-xs text-muted-foreground">
            Conta conectada: <span className="font-medium text-foreground">{userEmail}</span>
          </div>
        )}

        <div className="rounded-lg border p-3 text-sm space-y-1">
          <p className="font-medium">O que será permitido</p>
          <ul className="list-disc pl-5 text-muted-foreground space-y-0.5">
            <li>Compartilhar seu perfil básico e e-mail</li>
            <li>Chamar as ferramentas deste app enquanto você estiver conectado</li>
            {scopes
              .filter((s) => !["openid", "email", "profile"].includes(s))
              .map((s) => (
                <li key={s}>Permissão adicional: <code className="text-xs">{s}</code></li>
              ))}
          </ul>
          <p className="text-xs text-muted-foreground pt-1">
            As políticas do app continuam decidindo o que cada ferramenta pode ler ou alterar.
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" disabled={busy} onClick={() => decide(false)}>
            Cancelar
          </Button>
          <Button className="flex-1" disabled={busy} onClick={() => decide(true)}>
            Aprovar
          </Button>
        </div>
      </div>
    </main>
  );
};

export default OAuthConsent;
