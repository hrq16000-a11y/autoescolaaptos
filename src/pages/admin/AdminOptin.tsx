import { Fragment, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, RefreshCw, Loader2, Download, Gift, TrendingUp, CloudUpload, RotateCw, Plug, History, ChevronDown, ChevronRight, Bell, Save, FileDown } from "lucide-react";

interface OptinRow {
  id: string;
  telefone: string;
  status: string;
  campaign_source: string | null;
  ultimo_template_enviado: string | null;
  quantidade_campanhas: number | null;
  origem_url: string | null;
  ip: string | null;
  user_agent: string | null;
  data_aceite: string | null;
  created_at: string;
  sheet_sync_status?: string | null;
  sheet_synced_at?: string | null;
  sheet_last_attempt_at?: string | null;
  sheet_attempts?: number | null;
  sheet_sync_error?: string | null;
  sheet_updated_range?: string | null;
}

interface SyncAttempt {
  id: number;
  optin_id: string;
  telefone: string;
  attempted_at: string;
  ok: boolean;
  http_status: number | null;
  error: string | null;
  updated_range: string | null;
  source: string | null;
}

interface Metrics {
  total: number;
  byStatus: Record<string, number>;
  byCampaign: Record<string, { optins: number; retorno: number; taxa: number }>;
  byTemplate: Record<string, number>;
  byDay: Record<string, number>;
  bySync?: Record<string, number>;
}

const FN_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-optin`;
const TOKEN_KEY = "aptos_admin_leads_token";

const defaultFrom = () => {
  const d = new Date();
  d.setDate(d.getDate() - 30);
  return d.toISOString().slice(0, 10);
};

const pct = (n: number) => `${(n * 100).toFixed(1)}%`;

const syncBadge = (s?: string | null) => {
  const v = s || "pending";
  const cls =
    v === "ok"
      ? "bg-green-100 text-green-800 border-green-300"
      : v === "error"
      ? "bg-red-100 text-red-800 border-red-300"
      : "bg-yellow-100 text-yellow-800 border-yellow-300";
  const label = v === "ok" ? "Sincronizado" : v === "error" ? "Erro" : "Pendente";
  return <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border ${cls}`}>{label}</span>;
};

const AdminOptin = () => {
  useEffect(() => window.scrollTo({ top: 0 }), []);
  const [tokenInput, setTokenInput] = useState("");
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const [rows, setRows] = useState<OptinRow[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [historyOpen, setHistoryOpen] = useState<Record<string, boolean>>({});
  const [historyData, setHistoryData] = useState<Record<string, SyncAttempt[]>>({});
  const [historyLoading, setHistoryLoading] = useState<Record<string, boolean>>({});
  const [config, setConfig] = useState<{ alert_queue_threshold: number; email_enabled: boolean; slack_enabled: boolean } | null>(null);
  const [configSaving, setConfigSaving] = useState(false);
  const [filters, setFilters] = useState({
    from: defaultFrom(),
    to: new Date().toISOString().slice(0, 10),
    status: "",
    campaign_source: "",
    sync_status: "",
    q: "",
  });

  const authed = !!token;

  const buildParams = (extra: Record<string, string>) => {
    const p = new URLSearchParams(extra);
    if (filters.from) p.set("from", filters.from);
    if (filters.to) p.set("to", `${filters.to}T23:59:59`);
    if (filters.status) p.set("status", filters.status);
    if (filters.campaign_source) p.set("campaign_source", filters.campaign_source);
    if (filters.sync_status) p.set("sync_status", filters.sync_status);
    return p;
  };

  const fetchAll = async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    setInfo(null);
    try {
      const [listRes, metRes] = await Promise.all([
        fetch(`${FN_URL}?${buildParams({ action: "list", limit: "2000", ...(filters.q ? { q: filters.q } : {}) })}`, {
          headers: { "x-admin-token": token },
        }),
        fetch(`${FN_URL}?${buildParams({ action: "metrics" })}`, {
          headers: { "x-admin-token": token },
        }),
      ]);
      const listJson = await listRes.json();
      const metJson = await metRes.json();
      if (!listRes.ok) throw new Error(listJson.message || "Falha ao carregar lista");
      if (!metRes.ok) throw new Error(metJson.message || "Falha ao carregar métricas");
      setRows(listJson.optins || []);
      setMetrics(metJson);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro desconhecido");
      if (String(e).includes("401")) {
        localStorage.removeItem(TOKEN_KEY);
        setToken("");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const callAction = async (action: "retry_sync" | "backfill", body: Record<string, unknown>) => {
    setSyncing(true);
    setError(null);
    setInfo(null);
    try {
      const res = await fetch(`${FN_URL}?action=${action}`, {
        method: "POST",
        headers: { "x-admin-token": token, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.message || j.error || "Falha");
      setInfo(
        `${action === "backfill" ? "Backfill" : "Reprocessamento"}: ${j.succeeded ?? 0} enviados, ${j.failed ?? 0} falharam${
          j.error ? ` — ${j.error}` : ""
        }.`
      );
      await fetchAll();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Falha ao sincronizar");
    } finally {
      setSyncing(false);
    }
  };

  const retryFiltered = () => callAction("retry_sync", {
    from: filters.from || undefined,
    to: filters.to ? `${filters.to}T23:59:59` : undefined,
    only_errors: true,
    limit: 500,
  });

  const retryByPhone = () => {
    const raw = window.prompt("Reprocessar por telefone(s). Separe por vírgula:");
    if (!raw) return;
    const telefones = raw.split(",").map((t) => t.trim()).filter(Boolean);
    if (!telefones.length) return;
    callAction("retry_sync", { telefones, limit: 500 });
  };

  const retryOne = (r: OptinRow) => callAction("retry_sync", { ids: [r.id] });

  const testConnection = async () => {
    setTestResult(null); setError(null); setInfo(null);
    try {
      const res = await fetch(`${FN_URL}?action=test_sheets`, { headers: { "x-admin-token": token } });
      const j = await res.json();
      if (res.ok) {
        const title = j?.body?.properties?.title || "Planilha";
        const tabs = (j?.body?.sheets || []).map((s: { properties: { title: string } }) => s.properties.title).join(", ");
        setTestResult(`✅ Conexão OK — "${title}" · Abas: ${tabs || "—"}`);
      } else {
        setTestResult(`❌ Falha [${j.status ?? res.status}] — ${JSON.stringify(j.body ?? j.error).slice(0, 200)}`);
      }
    } catch (e) {
      setTestResult(`❌ Erro: ${e instanceof Error ? e.message : String(e)}`);
    }
  };

  const toggleHistory = async (r: OptinRow) => {
    const open = !historyOpen[r.id];
    setHistoryOpen((h) => ({ ...h, [r.id]: open }));
    if (open && !historyData[r.id]) {
      setHistoryLoading((h) => ({ ...h, [r.id]: true }));
      try {
        const res = await fetch(`${FN_URL}?action=history&optin_id=${r.id}&limit=50`, {
          headers: { "x-admin-token": token },
        });
        const j = await res.json();
        setHistoryData((h) => ({ ...h, [r.id]: j.attempts || [] }));
      } catch (e) {
        setError(e instanceof Error ? e.message : "Falha ao carregar histórico");
      } finally {
        setHistoryLoading((h) => ({ ...h, [r.id]: false }));
      }
    }
  };

  const backfill = () => {
    if (!window.confirm("Enviar TODOS os opt-ins ainda não sincronizados para a planilha?")) return;
    callAction("backfill", { limit: 500 });
  };

  const exportCsv = () => {
    if (!rows.length) return;
    const headers = [
      "id",
      "created_at",
      "telefone",
      "status",
      "campaign_source",
      "ultimo_template_enviado",
      "quantidade_campanhas",
      "sheet_sync_status",
      "sheet_synced_at",
      "sheet_attempts",
      "sheet_sync_error",
      "origem_url",
      "ip",
      "user_agent",
      "data_aceite",
    ];
    const esc = (v: unknown) => {
      const s = v === null || v === undefined ? "" : String(v);
      return `"${s.replace(/"/g, '""')}"`;
    };
    const csv = [
      headers.join(","),
      ...rows.map((r) => headers.map((h) => esc((r as unknown as Record<string, unknown>)[h])).join(",")),
    ].join("\n");
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `marketing_optin_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const campaignOptions = useMemo(() => {
    const set = new Set<string>();
    rows.forEach((r) => r.campaign_source && set.add(r.campaign_source));
    if (metrics) Object.keys(metrics.byCampaign).forEach((c) => c !== "(sem campanha)" && set.add(c));
    return Array.from(set).sort();
  }, [rows, metrics]);

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <div className="w-full max-w-sm bg-card border border-border rounded-xl p-6">
          <h1 className="text-xl font-bold mb-2 flex items-center gap-2">
            <Gift className="w-5 h-5 text-primary" /> Admin — Ofertas Exclusivas
          </h1>
          <p className="text-sm text-muted-foreground mb-4">Informe o token de administrador.</p>
          <Input
            type="password"
            placeholder="Token"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            className="mb-3"
          />
          <Button
            className="w-full"
            onClick={() => {
              localStorage.setItem(TOKEN_KEY, tokenInput);
              setToken(tokenInput);
            }}
            disabled={!tokenInput}
          >
            Entrar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Admin — Programa de Ofertas Exclusivas</title>
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
                <Gift className="w-5 h-5 text-primary" /> Ofertas Exclusivas
              </h1>
              <p className="text-xs text-muted-foreground">
                {metrics ? `${metrics.total} opt-in(s) no período` : "—"}
              </p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={testConnection}>
              <Plug className="w-4 h-4 mr-2" /> Testar conexão
            </Button>
            <Button variant="outline" size="sm" onClick={exportCsv} disabled={!rows.length}>
              <Download className="w-4 h-4 mr-2" /> CSV (filtrado)
            </Button>
            <Button variant="outline" size="sm" onClick={retryByPhone} disabled={syncing}>
              <RotateCw className="w-4 h-4 mr-2" /> Reprocessar por telefone
            </Button>
            <Button variant="outline" size="sm" onClick={retryFiltered} disabled={syncing}>
              <RotateCw className="w-4 h-4 mr-2" /> Reprocessar erros (período)
            </Button>
            <Button variant="default" size="sm" onClick={backfill} disabled={syncing}>
              <CloudUpload className="w-4 h-4 mr-2" /> Backfill Sheets
            </Button>
            <Button variant="outline" size="sm" onClick={fetchAll} disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
              Atualizar
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Filtros */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
            <div>
              <label className="text-xs font-semibold text-muted-foreground">De</label>
              <Input type="date" value={filters.from} onChange={(e) => setFilters({ ...filters, from: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Até</label>
              <Input type="date" value={filters.to} onChange={(e) => setFilters({ ...filters, to: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Status</label>
              <Select
                value={filters.status || "all"}
                onValueChange={(v) => setFilters({ ...filters, status: v === "all" ? "" : v })}
              >
                <SelectTrigger><SelectValue placeholder="Todos" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="autorizado">Autorizado</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                  <SelectItem value="bloqueado">Bloqueado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Sincronização</label>
              <Select
                value={filters.sync_status || "all"}
                onValueChange={(v) => setFilters({ ...filters, sync_status: v === "all" ? "" : v })}
              >
                <SelectTrigger><SelectValue placeholder="Todos" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="ok">Sincronizados</SelectItem>
                  <SelectItem value="pending">Pendentes</SelectItem>
                  <SelectItem value="error">Com erro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Campanha</label>
              <Input
                list="campaign-list"
                placeholder="Ex.: julho2026"
                value={filters.campaign_source}
                onChange={(e) => setFilters({ ...filters, campaign_source: e.target.value })}
              />
              <datalist id="campaign-list">
                {campaignOptions.map((c) => <option key={c} value={c} />)}
              </datalist>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Telefone</label>
              <Input
                placeholder="dígitos"
                value={filters.q}
                onChange={(e) => setFilters({ ...filters, q: e.target.value })}
              />
            </div>
            <div className="flex items-end">
              <Button className="w-full" onClick={fetchAll}>Aplicar</Button>
            </div>
          </div>
        </div>

        {error && (
          <div role="alert" className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg">
            {error}
          </div>
        )}
        {info && (
          <div className="p-3 text-sm text-green-800 bg-green-100 border border-green-300 rounded-lg">
            {info}
          </div>
        )}
        {testResult && (
          <div className="p-3 text-sm bg-card border border-border rounded-lg font-mono whitespace-pre-wrap break-all">
            {testResult}
          </div>
        )}

        {metrics && (
          <>
            {/* Cards de status */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <MetricCard label="Total opt-ins" value={String(metrics.total)} highlight />
              <MetricCard label="Sincronizados" value={String(metrics.bySync?.ok || 0)} />
              <MetricCard label="Pendentes" value={String(metrics.bySync?.pending || 0)} />
              <MetricCard label="Com erro" value={String(metrics.bySync?.error || 0)} />
            </section>

            {/* Funil por campanha */}
            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="font-heading font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" /> Adesão por campanha
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-left text-muted-foreground border-b">
                    <tr>
                      <th className="py-2 pr-3">Campaign source</th>
                      <th className="py-2 pr-3 text-right">Opt-ins</th>
                      <th className="py-2 pr-3 text-right">Retornaram*</th>
                      <th className="py-2 pr-3 text-right">Taxa de retorno</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(metrics.byCampaign)
                      .sort((a, b) => b[1].optins - a[1].optins)
                      .map(([c, v]) => (
                        <tr key={c} className="border-b last:border-0">
                          <td className="py-2 pr-3">{c}</td>
                          <td className="py-2 pr-3 text-right tabular-nums">{v.optins}</td>
                          <td className="py-2 pr-3 text-right tabular-nums">{v.retorno}</td>
                          <td className="py-2 pr-3 text-right tabular-nums">{pct(v.taxa)}</td>
                        </tr>
                      ))}
                    {!Object.keys(metrics.byCampaign).length && (
                      <tr><td colSpan={4} className="py-4 text-center text-muted-foreground">Sem dados no período.</td></tr>
                    )}
                  </tbody>
                </table>
                <p className="text-[11px] text-muted-foreground mt-2">
                  * Contatos que já receberam ao menos uma campanha (quantidade_campanhas &gt; 0).
                </p>
              </div>
            </section>

            {/* Por template */}
            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="font-heading font-bold mb-4">Adesão por template</h2>
              {Object.keys(metrics.byTemplate).length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhum template registrado.</p>
              ) : (
                <ul className="space-y-2">
                  {Object.entries(metrics.byTemplate)
                    .sort((a, b) => b[1] - a[1])
                    .map(([t, v]) => (
                      <li key={t} className="flex justify-between text-sm border-b pb-1 last:border-0">
                        <span className="truncate mr-2">{t}</span>
                        <span className="tabular-nums text-muted-foreground">
                          {v} · {metrics.total ? pct(v / metrics.total) : "0%"}
                        </span>
                      </li>
                    ))}
                </ul>
              )}
            </section>
          </>
        )}

        {/* Lista */}
        <section className="bg-card border border-border rounded-xl p-4 overflow-x-auto">
          <h2 className="font-heading font-bold mb-3">Opt-ins ({rows.length})</h2>
          <table className="w-full text-xs min-w-[1100px]">
            <thead className="text-left text-muted-foreground border-b">
              <tr>
                <th className="py-2 pr-3">Data</th>
                <th className="py-2 pr-3">Telefone</th>
                <th className="py-2 pr-3">Status</th>
                <th className="py-2 pr-3">Sheets</th>
                <th className="py-2 pr-3">Tentativas</th>
                <th className="py-2 pr-3">Campanha</th>
                <th className="py-2 pr-3">Template</th>
                <th className="py-2 pr-3">Origem URL</th>
                <th className="py-2 pr-3">Erro</th>
                <th className="py-2 pr-3"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const open = !!historyOpen[r.id];
                const attempts = historyData[r.id] || [];
                return (
                  <Fragment key={r.id}>
                    <tr className="border-b last:border-0 align-top">
                      <td className="py-2 pr-3 whitespace-nowrap">{new Date(r.created_at).toLocaleString("pt-BR")}</td>
                      <td className="py-2 pr-3 font-mono">{r.telefone}</td>
                      <td className="py-2 pr-3">{r.status}</td>
                      <td className="py-2 pr-3">
                        {syncBadge(r.sheet_sync_status)}
                        {r.sheet_updated_range && (
                          <div className="text-[10px] text-muted-foreground mt-1 font-mono truncate max-w-[140px]" title={r.sheet_updated_range}>
                            {r.sheet_updated_range}
                          </div>
                        )}
                      </td>
                      <td className="py-2 pr-3 tabular-nums">{r.sheet_attempts ?? 0}</td>
                      <td className="py-2 pr-3">{r.campaign_source || "—"}</td>
                      <td className="py-2 pr-3">{r.ultimo_template_enviado || "—"}</td>
                      <td className="py-2 pr-3 max-w-[220px] truncate" title={r.origem_url || ""}>{r.origem_url || "—"}</td>
                      <td className="py-2 pr-3 max-w-[220px] truncate text-destructive" title={r.sheet_sync_error || ""}>{r.sheet_sync_error || "—"}</td>
                      <td className="py-2 pr-3 flex gap-1">
                        <Button size="sm" variant="ghost" onClick={() => toggleHistory(r)} title="Histórico de tentativas">
                          {open ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                          <History className="w-3.5 h-3.5 ml-1" />
                        </Button>
                        {r.sheet_sync_status !== "ok" && (
                          <Button size="sm" variant="outline" onClick={() => retryOne(r)} disabled={syncing}>
                            Reenviar
                          </Button>
                        )}
                      </td>
                    </tr>
                    {open && (
                      <tr className="bg-muted/30">
                        <td colSpan={10} className="p-3">
                          {historyLoading[r.id] ? (
                            <div className="text-muted-foreground text-xs flex items-center gap-2">
                              <Loader2 className="w-3 h-3 animate-spin" /> Carregando histórico…
                            </div>
                          ) : attempts.length === 0 ? (
                            <div className="text-xs text-muted-foreground">Sem tentativas registradas.</div>
                          ) : (
                            <table className="w-full text-[11px]">
                              <thead className="text-left text-muted-foreground border-b">
                                <tr>
                                  <th className="py-1 pr-2">Quando</th>
                                  <th className="py-1 pr-2">Origem</th>
                                  <th className="py-1 pr-2">Resultado</th>
                                  <th className="py-1 pr-2">HTTP</th>
                                  <th className="py-1 pr-2">Range</th>
                                  <th className="py-1 pr-2">Erro</th>
                                </tr>
                              </thead>
                              <tbody>
                                {attempts.map((a) => (
                                  <tr key={a.id} className="border-b last:border-0">
                                    <td className="py-1 pr-2 whitespace-nowrap">{new Date(a.attempted_at).toLocaleString("pt-BR")}</td>
                                    <td className="py-1 pr-2">{a.source || "—"}</td>
                                    <td className="py-1 pr-2">{a.ok ? "✅ ok" : "❌ erro"}</td>
                                    <td className="py-1 pr-2 tabular-nums">{a.http_status ?? "—"}</td>
                                    <td className="py-1 pr-2 font-mono">{a.updated_range || "—"}</td>
                                    <td className="py-1 pr-2 text-destructive max-w-[380px] truncate" title={a.error || ""}>{a.error || "—"}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          )}
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
              {!rows.length && (
                <tr><td colSpan={10} className="py-6 text-center text-muted-foreground">Sem registros.</td></tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

const MetricCard = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className={`rounded-xl border p-4 ${highlight ? "bg-primary/10 border-primary/40" : "bg-card border-border"}`}>
    <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</div>
    <div className="text-2xl font-black mt-1 tabular-nums">{value}</div>
  </div>
);

export default AdminOptin;
