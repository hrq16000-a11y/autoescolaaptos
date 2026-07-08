import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Filter, Search, LogOut, Loader2, ExternalLink, Download, BarChart3 } from "lucide-react";

interface Lead {
  id: string;
  created_at: string;
  nome: string | null;
  telefone: string | null;
  email: string | null;
  servico: string | null;
  categoria: string | null;
  experiencia: string | null;
  prazo: string | null;
  status_funil: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  device: string | null;
  ip: string | null;
  tempo_gasto_segundos: number | null;
}

const STATUS_LABEL: Record<string, string> = {
  new: "Novo",
  contacted: "Contatado",
  booked: "Agendado",
  won: "Ganho",
  lost: "Perdido",
};
const STATUS_COLOR: Record<string, string> = {
  new: "bg-blue-500/15 text-blue-700 border-blue-300",
  contacted: "bg-amber-500/15 text-amber-700 border-amber-300",
  booked: "bg-purple-500/15 text-purple-700 border-purple-300",
  won: "bg-emerald-500/15 text-emerald-700 border-emerald-300",
  lost: "bg-rose-500/15 text-rose-700 border-rose-300",
};

const FN_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-leads`;
const TOKEN_KEY = "aptos_admin_leads_token";

const AdminLeads = () => {
  useEffect(() => window.scrollTo({ top: 0 }), []);
  const [token, setToken] = useState<string>(() => localStorage.getItem(TOKEN_KEY) || "");
  const [authed, setAuthed] = useState<boolean>(!!token);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    status_funil: "",
    utm_source: "",
    device: "",
    ip: "",
    min_tempo: "",
    q: "",
  });

  const fetchLeads = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters.status_funil) params.set("status_funil", filters.status_funil);
      if (filters.utm_source) params.set("utm_source", filters.utm_source);
      if (filters.device) params.set("device", filters.device);
      if (filters.ip) params.set("ip", filters.ip);
      if (filters.min_tempo) params.set("min_tempo", filters.min_tempo);
      params.set("limit", "500");
      const resp = await fetch(`${FN_URL}?${params}`, {
        headers: { "x-admin-token": token },
      });
      if (resp.status === 401) {
        setError("Token inválido.");
        setAuthed(false);
        localStorage.removeItem(TOKEN_KEY);
        return;
      }
      const j = await resp.json();
      if (!resp.ok) throw new Error(j.message || "Falha ao carregar leads");
      setLeads(j.leads || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authed) fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed]);

  const filtered = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    if (!q) return leads;
    return leads.filter((l) =>
      [l.nome, l.telefone, l.email, l.servico, l.utm_campaign].some((v) =>
        (v || "").toLowerCase().includes(q),
      ),
    );
  }, [leads, filters.q]);

  const stats = useMemo(() => {
    const acc: Record<string, number> = { new: 0, contacted: 0, booked: 0, won: 0, lost: 0 };
    leads.forEach((l) => {
      acc[l.status_funil] = (acc[l.status_funil] || 0) + 1;
    });
    return acc;
  }, [leads]);

  const updateStatus = async (id: string, status: string) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status_funil: status } : l)));
    try {
      const resp = await fetch(FN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-token": token },
        body: JSON.stringify({ id, status_funil: status }),
      });
      if (!resp.ok) throw new Error("Falha ao atualizar");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao atualizar");
      fetchLeads();
    }
  };

  const exportCsv = () => {
    if (!filtered.length) return;
    const cols: (keyof Lead)[] = [
      "created_at", "nome", "telefone", "email", "servico", "categoria",
      "experiencia", "prazo", "status_funil", "utm_source", "utm_medium",
      "utm_campaign", "device", "ip", "tempo_gasto_segundos",
    ];
    const esc = (v: unknown) => {
      const s = v === null || v === undefined ? "" : String(v);
      return `"${s.replace(/"/g, '""')}"`;
    };
    const header = cols.join(",");
    const rows = filtered.map((l) => cols.map((c) => esc(l[c])).join(","));
    const csv = "\uFEFF" + [header, ...rows].join("\n"); // BOM p/ Excel PT-BR
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-triagem-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <Helmet>
          <title>Admin — Leads da Triagem</title>
          <meta name="robots" content="noindex,nofollow" />
        </Helmet>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            localStorage.setItem(TOKEN_KEY, token);
            setAuthed(true);
          }}
          className="w-full max-w-sm bg-card border border-border rounded-2xl p-6 shadow-large"
        >
          <h1 className="text-xl font-heading font-bold mb-1">Painel de Leads</h1>
          <p className="text-sm text-muted-foreground mb-4">
            Cole o token administrativo para acessar.
          </p>
          <Input
            type="password"
            placeholder="Token administrativo"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
            autoFocus
          />
          <Button type="submit" className="w-full mt-4">
            Entrar
          </Button>
          {error && <p className="text-sm text-destructive mt-3">{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Admin — Leads da Triagem</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-heading font-bold">Leads da Triagem</h1>
            <p className="text-xs text-muted-foreground">
              {leads.length} lead(s) carregados · {filtered.length} após busca
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={fetchLeads} disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
              Atualizar
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                localStorage.removeItem(TOKEN_KEY);
                setToken("");
                setAuthed(false);
              }}
            >
              <LogOut className="w-4 h-4 mr-2" /> Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Cards de status */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {(["new", "contacted", "booked", "won", "lost"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilters({ ...filters, status_funil: filters.status_funil === s ? "" : s })}
              className={`text-left p-4 rounded-xl border transition-all ${
                filters.status_funil === s ? "border-primary shadow-md" : "border-border"
              } ${STATUS_COLOR[s]}`}
            >
              <div className="text-xs font-semibold uppercase tracking-wide opacity-80">
                {STATUS_LABEL[s]}
              </div>
              <div className="text-2xl font-black mt-1">{stats[s] || 0}</div>
            </button>
          ))}
        </div>

        {/* Filtros */}
        <div className="bg-card border border-border rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-primary" />
            <h2 className="font-semibold">Filtros</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
            <div className="md:col-span-2 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Nome, telefone, e-mail, serviço…"
                value={filters.q}
                onChange={(e) => setFilters({ ...filters, q: e.target.value })}
                className="pl-9"
              />
            </div>
            <Input
              placeholder="UTM source"
              value={filters.utm_source}
              onChange={(e) => setFilters({ ...filters, utm_source: e.target.value })}
            />
            <Select
              value={filters.device || "all"}
              onValueChange={(v) => setFilters({ ...filters, device: v === "all" ? "" : v })}
            >
              <SelectTrigger><SelectValue placeholder="Device" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos devices</SelectItem>
                <SelectItem value="mobile">Mobile</SelectItem>
                <SelectItem value="tablet">Tablet</SelectItem>
                <SelectItem value="desktop">Desktop</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="IP"
              value={filters.ip}
              onChange={(e) => setFilters({ ...filters, ip: e.target.value })}
            />
            <Input
              type="number"
              min={0}
              placeholder="Tempo mín. (s)"
              value={filters.min_tempo}
              onChange={(e) => setFilters({ ...filters, min_tempo: e.target.value })}
            />
          </div>
          <div className="flex gap-2 mt-3">
            <Button size="sm" onClick={fetchLeads}>Aplicar</Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setFilters({ status_funil: "", utm_source: "", device: "", ip: "", min_tempo: "", q: "" })}
            >
              Limpar
            </Button>
          </div>
        </div>

        {error && (
          <div role="alert" className="p-3 mb-4 text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg">
            {error}
          </div>
        )}

        {/* Tabela */}
        <div className="bg-card border border-border rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-3 font-semibold">Quando</th>
                <th className="p-3 font-semibold">Lead</th>
                <th className="p-3 font-semibold">Serviço</th>
                <th className="p-3 font-semibold">UTM / Device</th>
                <th className="p-3 font-semibold">Tempo</th>
                <th className="p-3 font-semibold">Status Funil</th>
                <th className="p-3 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && !loading && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-muted-foreground">
                    Nenhum lead encontrado.
                  </td>
                </tr>
              )}
              {filtered.map((l) => (
                <tr key={l.id} className="border-t border-border hover:bg-muted/20">
                  <td className="p-3 whitespace-nowrap text-xs text-muted-foreground">
                    {new Date(l.created_at).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}
                  </td>
                  <td className="p-3">
                    <div className="font-semibold">{l.nome || "—"}</div>
                    <div className="text-xs text-muted-foreground">{l.telefone}</div>
                    {l.email && <div className="text-xs text-muted-foreground">{l.email}</div>}
                  </td>
                  <td className="p-3">
                    <div>{l.servico || "—"}</div>
                    {l.categoria && <div className="text-xs text-muted-foreground">Cat. {l.categoria}</div>}
                    {l.prazo && <Badge variant="outline" className="mt-1 text-xs">{l.prazo}</Badge>}
                  </td>
                  <td className="p-3 text-xs">
                    <div>{l.utm_source || "direto"}{l.utm_campaign ? ` · ${l.utm_campaign}` : ""}</div>
                    <div className="text-muted-foreground">{l.device || "—"} · {l.ip || "—"}</div>
                  </td>
                  <td className="p-3 text-xs">{l.tempo_gasto_segundos ?? "—"}s</td>
                  <td className="p-3">
                    <Select value={l.status_funil} onValueChange={(v) => updateStatus(l.id, v)}>
                      <SelectTrigger className={`h-8 text-xs border ${STATUS_COLOR[l.status_funil] || ""}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(STATUS_LABEL).map(([v, lbl]) => (
                          <SelectItem key={v} value={v}>{lbl}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="p-3">
                    {l.telefone && (
                      <a
                        href={`https://wa.me/55${l.telefone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        WhatsApp <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminLeads;
