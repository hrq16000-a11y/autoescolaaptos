import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, RefreshCw, Loader2, TrendingUp } from "lucide-react";

interface Metrics {
  total: number;
  byStatus: Record<string, number>;
  byServico: Record<string, number>;
  byUtm: Record<string, number>;
  byDevice: Record<string, number>;
  byDay: Record<string, number>;
  rates: {
    contact_rate: number;
    book_rate: number;
    close_rate: number;
    win_rate: number;
    overall_win_rate: number;
  };
}

const FN_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-leads`;
const TOKEN_KEY = "aptos_admin_leads_token";

const STATUS_LABEL: Record<string, string> = {
  new: "Novo",
  contacted: "Contatado",
  booked: "Agendado",
  won: "Ganho",
  lost: "Perdido",
};
const STATUS_COLOR: Record<string, string> = {
  new: "bg-blue-500",
  contacted: "bg-amber-500",
  booked: "bg-purple-500",
  won: "bg-emerald-500",
  lost: "bg-rose-500",
};

const pct = (n: number) => `${(n * 100).toFixed(1)}%`;

const defaultFrom = () => {
  const d = new Date();
  d.setDate(d.getDate() - 30);
  return d.toISOString().slice(0, 10);
};

const AdminMetricas = () => {
  useEffect(() => window.scrollTo({ top: 0 }), []);
  const [token] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const [data, setData] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    from: defaultFrom(),
    to: new Date().toISOString().slice(0, 10),
    utm_source: "",
    device: "",
  });

  const fetchMetrics = async () => {
    if (!token) {
      setError("Faça login em /admin/leads primeiro.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ action: "metrics" });
      if (filters.from) params.set("from", filters.from);
      if (filters.to) params.set("to", `${filters.to}T23:59:59`);
      if (filters.utm_source) params.set("utm_source", filters.utm_source);
      if (filters.device) params.set("device", filters.device);
      const resp = await fetch(`${FN_URL}?${params}`, {
        headers: { "x-admin-token": token },
      });
      const j = await resp.json();
      if (!resp.ok) throw new Error(j.message || "Falha ao carregar métricas");
      setData(j);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const maxStatus = useMemo(() => {
    if (!data) return 0;
    return Math.max(...Object.values(data.byStatus), 1);
  }, [data]);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <div className="text-center">
          <p className="mb-4 text-muted-foreground">Você precisa entrar no painel de leads primeiro.</p>
          <Button asChild><Link to="/admin/leads">Ir para /admin/leads</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Admin — Métricas do Funil</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/leads"><ArrowLeft className="w-4 h-4 mr-1" /> Leads</Link>
            </Button>
            <div>
              <h1 className="text-xl font-heading font-bold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" /> Métricas do Funil
              </h1>
              <p className="text-xs text-muted-foreground">
                {data ? `${data.total} lead(s) no período` : "—"}
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={fetchMetrics} disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
            Atualizar
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Filtros */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <div>
              <label className="text-xs font-semibold text-muted-foreground">De</label>
              <Input type="date" value={filters.from} onChange={(e) => setFilters({ ...filters, from: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Até</label>
              <Input type="date" value={filters.to} onChange={(e) => setFilters({ ...filters, to: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">UTM source</label>
              <Input placeholder="google, meta…" value={filters.utm_source} onChange={(e) => setFilters({ ...filters, utm_source: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Device</label>
              <Select value={filters.device || "all"} onValueChange={(v) => setFilters({ ...filters, device: v === "all" ? "" : v })}>
                <SelectTrigger><SelectValue placeholder="Todos" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="mobile">Mobile</SelectItem>
                  <SelectItem value="tablet">Tablet</SelectItem>
                  <SelectItem value="desktop">Desktop</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full" onClick={fetchMetrics}>Aplicar</Button>
            </div>
          </div>
        </div>

        {error && (
          <div role="alert" className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg">
            {error}
          </div>
        )}

        {data && (
          <>
            {/* Funnel */}
            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="font-heading font-bold mb-4">Distribuição por status</h2>
              <div className="space-y-3">
                {(["new", "contacted", "booked", "won", "lost"] as const).map((s) => {
                  const count = data.byStatus[s] || 0;
                  const w = Math.max(4, (count / maxStatus) * 100);
                  return (
                    <div key={s}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-semibold">{STATUS_LABEL[s]}</span>
                        <span className="tabular-nums text-muted-foreground">
                          {count} · {data.total ? pct(count / data.total) : "0%"}
                        </span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full ${STATUS_COLOR[s]} transition-all`} style={{ width: `${w}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Taxas */}
            <section className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <RateCard label="Taxa de contato" hint="contatado+ / total" value={pct(data.rates.contact_rate)} />
              <RateCard label="Taxa de agendamento" hint="agendado+ / contatado+" value={pct(data.rates.book_rate)} />
              <RateCard label="Taxa de fechamento" hint="ganho+perdido / agendado+" value={pct(data.rates.close_rate)} />
              <RateCard label="Win rate" hint="ganho / fechados" value={pct(data.rates.win_rate)} />
              <RateCard label="Conversão geral" hint="ganho / total" value={pct(data.rates.overall_win_rate)} highlight />
            </section>

            {/* Breakdown lists */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <BreakdownCard title="Por serviço" data={data.byServico} total={data.total} />
              <BreakdownCard title="Por UTM source" data={data.byUtm} total={data.total} />
              <BreakdownCard title="Por device" data={data.byDevice} total={data.total} />
            </div>

            {/* Leads por dia */}
            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="font-heading font-bold mb-4">Leads por dia</h2>
              <DayChart data={data.byDay} />
            </section>
          </>
        )}
      </main>
    </div>
  );
};

const RateCard = ({ label, hint, value, highlight }: { label: string; hint: string; value: string; highlight?: boolean }) => (
  <div className={`rounded-xl border p-4 ${highlight ? "bg-primary/10 border-primary/40" : "bg-card border-border"}`}>
    <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</div>
    <div className="text-2xl font-black mt-1 tabular-nums">{value}</div>
    <div className="text-[10px] text-muted-foreground mt-1">{hint}</div>
  </div>
);

const BreakdownCard = ({ title, data, total }: { title: string; data: Record<string, number>; total: number }) => {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]).slice(0, 10);
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <h3 className="font-semibold mb-3">{title}</h3>
      {entries.length === 0 && <p className="text-sm text-muted-foreground">Sem dados.</p>}
      <ul className="space-y-2">
        {entries.map(([k, v]) => (
          <li key={k} className="flex justify-between text-sm">
            <span className="truncate mr-2">{k}</span>
            <span className="tabular-nums text-muted-foreground">
              {v} · {total ? `${((v / total) * 100).toFixed(1)}%` : "0%"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const DayChart = ({ data }: { data: Record<string, number> }) => {
  const days = Object.keys(data).sort();
  if (!days.length) return <p className="text-sm text-muted-foreground">Sem dados no período.</p>;
  const max = Math.max(...Object.values(data), 1);
  return (
    <div className="flex items-end gap-1 h-40 overflow-x-auto">
      {days.map((d) => {
        const v = data[d];
        const h = Math.max(6, (v / max) * 100);
        return (
          <div key={d} className="flex flex-col items-center min-w-[24px]" title={`${d}: ${v}`}>
            <div className="flex-1 flex items-end w-full">
              <div className="w-full bg-primary rounded-t transition-all" style={{ height: `${h}%` }} />
            </div>
            <div className="text-[9px] text-muted-foreground mt-1 rotate-45 origin-left whitespace-nowrap">
              {d.slice(5)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminMetricas;
