import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ArrowLeft, TrendingUp, Users, Target, Clock, MousePointerClick, AlertTriangle, Gauge, FileSearch } from "lucide-react";
import { readVitals, rateVital, type VitalSample } from "@/lib/webVitals";
import { readEventLog } from "@/lib/analytics";
import { getLeadProfile, classifyLead } from "@/lib/leadScore";
import AdminGate from "@/components/admin/AdminGate";

/**
 * Dashboard interno de Growth — /admin/growth
 * Lê dados locais (localStorage) + prepara UI para consumir GA4/BigQuery futuramente.
 * noindex — jamais deve aparecer em resultados de busca.
 */

interface StoredEvent {
  ts: number;
  event: string;
  path?: string;
  [k: string]: unknown;
}

interface MetricCardProps {
  title: string;
  value: string | number;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
}

const MetricCard = ({ title, value, hint, icon: Icon }: MetricCardProps) => (
  <div className="rounded-xl border border-border bg-card p-5">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide">{title}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
        {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
      </div>
      <Icon className="w-5 h-5 text-primary" />
    </div>
  </div>
);

const readEvents = (): StoredEvent[] => {
  if (typeof window === "undefined") return [];
  try {
    const dl = (window as unknown as { dataLayer?: StoredEvent[] }).dataLayer ?? [];
    return dl.filter((e) => e && typeof e === "object" && "event" in e);
  } catch {
    return [];
  }
};

const read404s = (): { path: string; ts: number }[] => {
  try {
    const raw = localStorage.getItem("aptos_404_log_v1");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const read = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

interface AuditSummary {
  errors: number;
  warnings: number;
  sitemapUrls: number;
  pagesChecked: number;
  pagesOk: number;
}

interface AuditReport {
  generatedAt: string;
  summary: AuditSummary;
  previous: { generatedAt: string; summary: AuditSummary } | null;
  issues: { severity: string; area: string; message: string }[];
}

const GrowthDashboard = () => {
  const [events, setEvents] = useState<StoredEvent[]>([]);
  const [refreshTick, setRefreshTick] = useState(0);
  const [vitals, setVitals] = useState<VitalSample[]>([]);
  const [audit, setAudit] = useState<AuditReport | null>(null);

  useEffect(() => {
    setEvents(readEvents());
    setVitals(readVitals());
  }, [refreshTick]);

  useEffect(() => {
    let alive = true;
    fetch("/seo-audit.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => alive && setAudit(d))
      .catch(() => alive && setAudit(null));
    return () => {
      alive = false;
    };
  }, [refreshTick]);

  const savingsByRoute = useMemo(() => {
    const log = readEventLog().filter((e) => e.event === "savings_click");
    const grouped = log.reduce<Record<string, number>>((acc, e) => {
      const key = `${e.path} · ${String(e.payload.savings_code ?? "—")}`;
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {});
    return Object.entries(grouped).sort((a, b) => b[1] - a[1]).slice(0, 12);
  }, [refreshTick]);

  const stats = useMemo(() => {
    const pageviews = events.filter((e) => e.event === "page_view");
    const whatsappClicks = events.filter((e) =>
      String(e.event).startsWith("whatsapp_")
    ).length;
    const funnelStarts = events.filter((e) => e.event === "funnel_start").length;
    const leads = events.filter((e) => e.event === "generate_lead").length;
    const smartQueries = events.filter((e) => e.event === "smart_assistant_query").length;
    const handoffs = events.filter((e) => e.event === "smart_assistant_handoff").length;

    const paths = pageviews
      .map((e) => String(e.page_path ?? ""))
      .filter(Boolean);
    const topPages = Object.entries(
      paths.reduce<Record<string, number>>((acc, p) => {
        acc[p] = (acc[p] ?? 0) + 1;
        return acc;
      }, {})
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);

    const intents = events
      .filter((e) => e.event === "smart_assistant_query")
      .map((e) => String(e.intent ?? "outro"));
    const topIntents = Object.entries(
      intents.reduce<Record<string, number>>((acc, i) => {
        acc[i] = (acc[i] ?? 0) + 1;
        return acc;
      }, {})
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);

    const conversionRate =
      pageviews.length > 0
        ? ((leads + whatsappClicks) / pageviews.length) * 100
        : 0;

    return {
      pageviews: pageviews.length,
      whatsappClicks,
      funnelStarts,
      leads,
      smartQueries,
      handoffs,
      topPages,
      topIntents,
      conversionRate,
    };
  }, [events]);

  const profile = getLeadProfile();
  const notFound = read404s();
  const exposures = read<Record<string, string>>("aptos_ab_exposures_v1", {});

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Growth Dashboard | APTOS Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar
            </Link>
            <h1 className="text-lg font-bold">Growth Dashboard</h1>
            <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
              interno · sessão local
            </span>
          </div>
          <button
            type="button"
            onClick={() => setRefreshTick((t) => t + 1)}
            className="text-sm px-3 py-1.5 rounded border border-input hover:bg-accent"
          >
            Atualizar
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-8">
        <p className="text-sm text-muted-foreground">
          Este painel lê eventos capturados no <code>dataLayer</code> e{" "}
          <code>localStorage</code> da sessão atual do navegador. Para métricas
          agregadas de todos os visitantes, o consumo do Google Analytics 4 (BigQuery)
          será conectado em uma próxima fase — a estrutura de eventos já está
          normalizada e pronta.
        </p>

        {/* KPIs */}
        <section aria-labelledby="kpi-heading">
          <h2 id="kpi-heading" className="text-sm font-semibold text-muted-foreground uppercase mb-3">
            Sessão atual (client-side)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <MetricCard title="Pageviews" value={stats.pageviews} icon={Users} />
            <MetricCard title="WhatsApp clicks" value={stats.whatsappClicks} icon={MousePointerClick} />
            <MetricCard title="Funil iniciado" value={stats.funnelStarts} icon={Target} />
            <MetricCard title="Leads gerados" value={stats.leads} icon={TrendingUp} />
            <MetricCard title="Perguntas ao IA" value={stats.smartQueries} icon={Clock} />
            <MetricCard title="Handoff → WhatsApp" value={stats.handoffs} icon={MousePointerClick} />
            <MetricCard
              title="Taxa conversão"
              value={`${stats.conversionRate.toFixed(1)}%`}
              hint="(leads + wpp) / pageviews"
              icon={TrendingUp}
            />
            <MetricCard
              title="Lead score"
              value={profile.score}
              hint={classifyLead(profile.score)}
              icon={Target}
            />
          </div>
        </section>

        {/* Top pages */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold mb-3">Páginas mais vistas</h3>
            {stats.topPages.length === 0 ? (
              <p className="text-sm text-muted-foreground">Sem dados nesta sessão.</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {stats.topPages.map(([path, count]) => (
                  <li key={path} className="flex justify-between border-b border-border pb-1.5 last:border-0">
                    <span className="truncate mr-2">{path}</span>
                    <span className="font-mono text-muted-foreground">{count}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold mb-3">Intenções detectadas (IA)</h3>
            {stats.topIntents.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nenhuma pergunta ainda. Teste o assistente flutuante.
              </p>
            ) : (
              <ul className="space-y-2 text-sm">
                {stats.topIntents.map(([intent, count]) => (
                  <li key={intent} className="flex justify-between border-b border-border pb-1.5 last:border-0">
                    <span className="font-medium">{intent}</span>
                    <span className="font-mono text-muted-foreground">{count}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Experiments */}
        <section className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold mb-3">Experimentos ativos (esta sessão)</h3>
          {Object.keys(exposures).length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nenhum experimento executado nesta sessão.
            </p>
          ) : (
            <ul className="space-y-1 text-sm">
              {Object.entries(exposures).map(([exp, variant]) => (
                <li key={exp} className="flex justify-between">
                  <span className="font-mono">{exp}</span>
                  <span className="font-semibold text-primary">{variant}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Core Web Vitals */}
        <section aria-labelledby="cwv-heading" className="rounded-xl border border-border bg-card p-5">
          <h2 id="cwv-heading" className="font-semibold mb-3 flex items-center gap-2">
            <Gauge className="w-4 h-4 text-primary" /> Core Web Vitals (medidos no navegador)
          </h2>
          {vitals.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nenhuma amostra ainda. Navegue pelo site e volte aqui — as métricas são
              coletadas ao sair de cada página.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {(["LCP", "INP", "CLS"] as const).map((metric) => {
                const rows = vitals.filter((v) => v.metric === metric);
                const avg = rows.length
                  ? rows.reduce((a, v) => a + v.value, 0) / rows.length
                  : 0;
                const rating = rateVital(metric, avg);
                const color =
                  rating === "bom" ? "text-green-600" : rating === "regular" ? "text-yellow-600" : "text-destructive";
                return (
                  <div key={metric} className="rounded-lg border border-border p-4">
                    <p className="text-xs uppercase text-muted-foreground">{metric}</p>
                    <p className={`text-2xl font-bold ${color}`}>
                      {rows.length === 0 ? "—" : metric === "CLS" ? avg.toFixed(3) : `${Math.round(avg)} ms`}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {rows.length} amostra(s) · {rating}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Savings clicks por rota */}
        <section className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold mb-3">Cliques em savings/cashback por rota</h3>
          {savingsByRoute.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum clique registrado ainda.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {savingsByRoute.map(([key, count]) => (
                <li key={key} className="flex justify-between border-b border-border pb-1.5 last:border-0">
                  <span className="font-mono truncate mr-2">{key}</span>
                  <span className="font-mono text-muted-foreground">{count}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Auditoria SEO Antes/Depois */}
        <section className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <FileSearch className="w-4 h-4 text-primary" /> Auditoria de SEO (build)
          </h3>
          {!audit ? (
            <p className="text-sm text-muted-foreground">
              Relatório indisponível. Rode <code>npm run seo:audit</code> (executa também no prebuild).
            </p>
          ) : (
            <div className="space-y-4 text-sm">
              <p className="text-xs text-muted-foreground">
                Gerado em {new Date(audit.generatedAt).toLocaleString("pt-BR")}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[
                  ["Erros", audit.summary.errors, audit.previous?.summary.errors],
                  ["Avisos", audit.summary.warnings, audit.previous?.summary.warnings],
                  ["URLs sitemap", audit.summary.sitemapUrls, audit.previous?.summary.sitemapUrls],
                  ["Páginas OK", audit.summary.pagesOk, audit.previous?.summary.pagesOk],
                  ["Páginas totais", audit.summary.pagesChecked, audit.previous?.summary.pagesChecked],
                ].map(([label, now, before]) => (
                  <div key={String(label)} className="rounded-lg border border-border p-3">
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-xl font-bold">{String(now)}</p>
                    <p className="text-[11px] text-muted-foreground">
                      antes: {before === undefined || before === null ? "—" : String(before)}
                    </p>
                  </div>
                ))}
              </div>
              {audit.issues.length > 0 && (
                <ul className="space-y-1 max-h-64 overflow-y-auto">
                  {audit.issues.map((i, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span
                        className={`text-[10px] uppercase font-bold px-1.5 rounded ${
                          i.severity === "error"
                            ? "bg-destructive/10 text-destructive"
                            : "bg-yellow-500/10 text-yellow-700"
                        }`}
                      >
                        {i.severity}
                      </span>
                      <span className="text-muted-foreground">
                        <strong className="text-foreground">{i.area}</strong> — {i.message}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </section>

        {/* 404s */}
        <section className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive" /> Rotas 404 registradas
          </h3>
          {notFound.length === 0 ? (
            <p className="text-sm text-muted-foreground">Sem 404 registrados 🎉</p>
          ) : (
            <ul className="space-y-1 text-sm max-h-64 overflow-y-auto">
              {notFound.slice(-20).reverse().map((n, i) => (
                <li key={`${n.path}-${i}`} className="flex justify-between border-b border-border pb-1 last:border-0">
                  <span className="font-mono truncate mr-2">{n.path}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(n.ts).toLocaleString("pt-BR")}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

    </div>
  );
};

const GuardedGrowthDashboard = () => (
  <AdminGate title="Growth Dashboard | APTOS Admin">
    <GrowthDashboard />
  </AdminGate>
);

export default GuardedGrowthDashboard;
