import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

/** Same-origin relative path validator so `?next=` cannot be used as an open redirect. */
function safeNext(raw: string | null): string {
  if (!raw) return "/";
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/";
  return raw;
}

const Login = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = safeNext(params.get("next"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate(next, { replace: true });
    });
  }, [navigate, next]);

  const handleGoogle = async () => {
    setBusy(true);
    const redirect_uri = `${window.location.origin}${next}`;
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri });
    if (result.error) {
      toast.error("Falha no login com Google");
      setBusy(false);
      return;
    }
    if (result.redirected) return;
    navigate(next, { replace: true });
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}${next}` },
      });
      if (error) toast.error(error.message);
      else toast.success("Cadastro criado. Verifique seu e-mail se solicitado.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) toast.error(error.message);
      else navigate(next, { replace: true });
    }
    setBusy(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-sm bg-background border rounded-2xl shadow p-6 space-y-5">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold">Entrar na APTOS</h1>
          <p className="text-sm text-muted-foreground">
            Acesso restrito para painel e integrações
          </p>
        </div>

        <Button type="button" variant="outline" className="w-full" onClick={handleGoogle} disabled={busy}>
          Continuar com Google
        </Button>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex-1 h-px bg-border" /> ou <div className="flex-1 h-px bg-border" />
        </div>

        <form onSubmit={handleEmail} className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit" className="w-full" disabled={busy}>
            {mode === "signin" ? "Entrar" : "Criar conta"}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="w-full text-xs text-muted-foreground hover:text-primary"
        >
          {mode === "signin" ? "Não tem conta? Criar conta" : "Já tem conta? Entrar"}
        </button>
      </div>
    </main>
  );
};

export default Login;
