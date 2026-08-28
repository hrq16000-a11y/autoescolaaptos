import { useCallback, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

/**
 * Portão de autenticação para rotas administrativas client-side.
 * - Valida o token no servidor (edge function admin-leads) — nunca só no cliente.
 * - Guarda o token em sessionStorage (não persiste após fechar o navegador).
 * - Expira a sessão após inatividade (padrão: 30 minutos).
 */

const FN_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-leads`;
const TOKEN_KEY = "aptos_admin_session_token";
const LAST_ACTIVITY_KEY = "aptos_admin_last_activity";
const IDLE_MS = 30 * 60 * 1000;

const validateToken = async (token: string): Promise<boolean> => {
  try {
    const resp = await fetch(`${FN_URL}?limit=1`, {
      headers: { "x-admin-token": token },
    });
    return resp.ok;
  } catch {
    return false;
  }
};

interface AdminGateProps {
  title: string;
  children: React.ReactNode;
}

const AdminGate = ({ title, children }: AdminGateProps) => {
  const [token, setToken] = useState("");
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  const logout = useCallback((reason?: string) => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(LAST_ACTIVITY_KEY);
    setAuthed(false);
    setToken("");
    if (reason) setError(reason);
  }, []);

  // Restaura sessão existente (com checagem de inatividade + revalidação no servidor)
  useEffect(() => {
    const stored = sessionStorage.getItem(TOKEN_KEY);
    const last = Number(sessionStorage.getItem(LAST_ACTIVITY_KEY) || 0);
    if (!stored) {
      setChecking(false);
      return;
    }
    if (Date.now() - last > IDLE_MS) {
      logout("Sessão expirada por inatividade.");
      setChecking(false);
      return;
    }
    validateToken(stored).then((ok) => {
      if (ok) {
        setToken(stored);
        setAuthed(true);
        sessionStorage.setItem(LAST_ACTIVITY_KEY, String(Date.now()));
      } else {
        logout("Sessão inválida. Entre novamente.");
      }
      setChecking(false);
    });
  }, [logout]);

  // Controle de inatividade
  useEffect(() => {
    if (!authed) return;
    const touch = () => sessionStorage.setItem(LAST_ACTIVITY_KEY, String(Date.now()));
    const events = ["click", "keydown", "scroll", "mousemove", "touchstart"];
    events.forEach((e) => window.addEventListener(e, touch, { passive: true }));
    timerRef.current = window.setInterval(() => {
      const last = Number(sessionStorage.getItem(LAST_ACTIVITY_KEY) || 0);
      if (Date.now() - last > IDLE_MS) logout("Sessão expirada por inatividade.");
    }, 30_000);
    return () => {
      events.forEach((e) => window.removeEventListener(e, touch));
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [authed, logout]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setChecking(true);
    const ok = await validateToken(token);
    if (ok) {
      sessionStorage.setItem(TOKEN_KEY, token);
      sessionStorage.setItem(LAST_ACTIVITY_KEY, String(Date.now()));
      setAuthed(true);
    } else {
      setError("Token inválido.");
    }
    setChecking(false);
  };

  if (authed) {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => logout()}
          className="fixed bottom-4 right-4 z-50 text-xs px-3 py-2 rounded-lg border border-border bg-card shadow-md hover:bg-accent"
        >
          Sair da sessão
        </button>
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Helmet>
        <title>{title}</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <form
        onSubmit={submit}
        className="w-full max-w-sm bg-card border border-border rounded-2xl p-6 shadow-large"
      >
        <div className="flex items-center gap-2 mb-1">
          <Lock className="w-4 h-4 text-primary" />
          <h1 className="text-xl font-heading font-bold">Área restrita</h1>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Cole o token administrativo para acessar. A sessão expira após 30 minutos de inatividade.
        </p>
        <Input
          type="password"
          placeholder="Token administrativo"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
          autoFocus
          autoComplete="off"
        />
        <Button type="submit" className="w-full mt-4" disabled={checking || !token}>
          {checking ? "Verificando..." : "Entrar"}
        </Button>
        {error && <p className="text-sm text-destructive mt-3">{error}</p>}
      </form>
    </div>
  );
};

export default AdminGate;
