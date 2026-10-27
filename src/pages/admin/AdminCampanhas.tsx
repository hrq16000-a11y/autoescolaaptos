import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowLeft, BarChart3, Copy, Loader2, MousePointerClick, RefreshCw, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface RecentLead {
  id: string;
  nome: string | null;
  servico: string | null;
  utm_campaign: string | null;
  origem: string | null;
  created_at: string;
  ai_summary: string | null;
  ai_reply: string | null;
  ai_status: string | null;
}

interface CampaignMetrics {
  campaign: string;
  label: string;
  views: number;
  whatsappClicks: number;
  leads: number;
  clickRate: number;
  byDevice: Record<string, number>;
  bySource: Record<string, number>;
}

const FN_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-leads`;
const TOKEN_KEY = "aptos_admin_leads_token";

const defaultFrom = () => {
  const date = new Date();
  date.setDate(date.getDate() - 30);
  return date.toISOString().slice(0, 10);
};

export default function AdminCampanhas() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const [authed, setAuthed] = useState(() => Boolean(localStorage.getItem(TOKEN_KEY)));
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(() => new Date().toISOString().slice(0, 10));
  const [campaigns, setCampaigns] = useState<CampaignMetrics[]>([]);
  const [recent, setRecent] = useState<RecentLead[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ action: "campaigns", from, to: `${to}T23:59:59` });
      const response = await fetch(`${FN_URL}?${params}`, { headers: { "x-admin-token": token } });
      const result = await response.json();
      if (response.status === 401) {
        localStorage.removeItem(TOKEN_KEY);
        setAuthed(false);
        throw new Error("Token inválido.");
      }
      if (!response.ok) throw new Error(result.message || "Falha ao carregar campanhas.");
      setCampaigns(result.campaigns || []);
      setRecent(result.recentLeads || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar campanhas.");
    } finally {
      setLoading(false);
    }
  }, [from, to, token]);

  const summarize = async (id: string) => {
    setBusyId(id);
    try {
      const response = await fetch(FN_URL, {
        method: "POST",
        headers: { "x-admin-token": token, "Content-Type": "application/json" },
        body: JSON.stringify({ action: "summarize", id }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Falha ao gerar resumo.");
      setRecent((list) => list.map((l) => (l.id === id ? { ...l, ai_summary: result.summary, ai_reply: result.reply, ai_status: "done" } : l)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao gerar resumo.");
    } finally {
      setBusyId(null);
    }
  };

  useEffect(() => {
    if (authed) void load();
  }, [authed, load]);

  if (!authed) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <Helmet><title>Admin — Campanhas</title><meta name="robots" content="noindex,nofollow" /></Helmet>
        <form
          className="w-full max-w-sm rounded-lg border border-border bg-card p-6 shadow-large"
          onSubmit={(event) => {
            event.preventDefault();
            localStorage.setItem(TOKEN_KEY, token);
            setAuthed(true);
          }}
        >
          <h1 className="text-xl font-heading font-bold">Campanhas</h1>
          <p className="mt-1 mb-4 text-sm text-muted-foreground">Use o mesmo acesso do painel de leads.</p>
          <Input type="password" value={token} onChange={(event) => setToken(event.target.value)} placeholder="Token administrativo" required />
          <Button type="submit" className="mt-4 w-full">Entrar</Button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Helmet><title>Admin — Campanhas</title><meta name="robots" content="noindex,nofollow" /></Helmet>
      <header className="sticky top-0 z-10 border-b border-border bg-card">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild><Link to="/admin"><ArrowLeft /> Admin</Link></Button>
            <div>
              <h1 className="font-heading text-xl font-bold">Campanhas</h1>
              <p className="text-xs text-muted-foreground">Visualizações, WhatsApp e leads reais.</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => void load()} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : <RefreshCw />} Atualizar
          </Button>
        </div>
      </header>

      <div className="container mx-auto space-y-6 px-4 py-6">
        <section className="grid gap-3 rounded-lg border border-border bg-card p-4 sm:grid-cols-3">
          <label className="text-xs font-semibold text-muted-foreground">De<Input className="mt-1" type="date" value={from} onChange={(event) => setFrom(event.target.value)} /></label>
          <label className="text-xs font-semibold text-muted-foreground">Até<Input className="mt-1" type="date" value={to} onChange={(event) => setTo(event.target.value)} /></label>
          <div className="flex items-end"><Button className="w-full" onClick={() => void load()}>Aplicar período</Button></div>
        </section>

        {error && <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}

        <section className="grid gap-4 lg:grid-cols-2">
          {campaigns.map((campaign) => (
            <article key={campaign.campaign} className="rounded-lg border border-border bg-card p-5 shadow-smooth">
              <div className="flex items-start justify-between gap-4">
                <div><h2 className="font-heading text-xl font-bold">{campaign.label}</h2><p className="text-xs text-muted-foreground">{campaign.campaign}</p></div>
                <BarChart3 className="text-primary" aria-hidden />
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Metric icon={BarChart3} label="Visualizações" value={campaign.views} />
                <Metric icon={MousePointerClick} label="WhatsApp" value={campaign.whatsappClicks} />
                <Metric icon={Users} label="Leads" value={campaign.leads} />
                <Metric icon={BarChart3} label="Taxa de clique" value={`${(campaign.clickRate * 100).toFixed(1)}%`} />
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Breakdown title="Por dispositivo" data={campaign.byDevice} />
                <Breakdown title="Por origem" data={campaign.bySource} />
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-lg border border-border bg-card p-5 shadow-smooth">
          <h2 className="mb-1 flex items-center gap-2 font-heading text-xl font-bold"><Sparkles className="text-primary" aria-hidden /> Novos leads — resumo e resposta sugerida</h2>
          <p className="mb-4 text-xs text-muted-foreground">Gerado automaticamente por IA a cada lead recebido. Revise antes de enviar.</p>
          {recent.length === 0 && <p className="text-sm text-muted-foreground">Nenhum lead no período.</p>}
          <ul className="space-y-3">
            {recent.map((lead) => (
              <li key={lead.id} className="rounded-md border border-border p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-bold">{lead.nome || "Sem nome"} <span className="text-xs font-normal text-muted-foreground">· {lead.servico || "—"} · {lead.utm_campaign || lead.origem || "direto"} · {new Date(lead.created_at).toLocaleString("pt-BR")}</span></p>
                  <Button size="sm" variant="outline" disabled={busyId === lead.id} onClick={() => void summarize(lead.id)}>
                    {busyId === lead.id ? <Loader2 className="animate-spin" /> : <Sparkles />} {lead.ai_summary ? "Gerar de novo" : "Gerar resumo"}
                  </Button>
                </div>
                {lead.ai_summary ? (
                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    <div><h3 className="text-xs font-bold uppercase text-muted-foreground">Resumo</h3><p className="text-sm">{lead.ai_summary}</p></div>
                    <div>
                      <h3 className="text-xs font-bold uppercase text-muted-foreground">Resposta sugerida</h3>
                      <p className="whitespace-pre-wrap text-sm">{lead.ai_reply || "—"}</p>
                      {lead.ai_reply && <Button size="sm" variant="ghost" className="mt-1" onClick={() => void navigator.clipboard.writeText(lead.ai_reply!)}><Copy /> Copiar</Button>}
                    </div>
                  </div>
                ) : (
                  <p className="mt-2 text-sm text-muted-foreground">{lead.ai_status === "error" ? "Não foi possível gerar o resumo. Tente novamente." : "Resumo ainda não gerado."}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

function Metric({ icon: Icon, label, value }: { icon: typeof BarChart3; label: string; value: number | string }) {
  return <div className="rounded-md bg-muted p-3"><Icon className="mb-2 text-primary" aria-hidden /><p className="text-2xl font-black tabular-nums">{value}</p><p className="text-xs text-muted-foreground">{label}</p></div>;
}

function Breakdown({ title, data }: { title: string; data: Record<string, number> }) {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]).slice(0, 5);
  return <div><h3 className="mb-2 text-sm font-bold">{title}</h3>{entries.length ? <ul className="space-y-1 text-sm">{entries.map(([key, value]) => <li key={key} className="flex justify-between gap-3"><span className="truncate text-muted-foreground">{key}</span><strong>{value}</strong></li>)}</ul> : <p className="text-sm text-muted-foreground">Sem dados.</p>}</div>;
}