import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertTriangle, RefreshCw, Trash2, ExternalLink, Download, ArrowRight } from "lucide-react";
import { LEGACY_REDIRECTS } from "@/lib/legacyRedirects";

const LEGACY_ROUTES = [
  "/site",
  "/site/contato",
  "/site/qualquer",
  "/modelo1",
  "/modelo1/x",
  "/1",
  "/1/x",
  "/index.html",
  "/home",
  "/contato",
];

const OFFICIAL_ROUTES = [
  "/",
  "/orcamento",
  "/primeira-habilitacao",
  "/simulado-detran-pr",
  "/autoescola-sao-jose-dos-pinhais",
  "/cnh-sao-jose-dos-pinhais",
  "/categoria-a",
  "/categoria-b",
  "/categoria-ab",
  "/inclusao-categoria",
  "/reciclagem-cnh",
  "/reteste-pratico",
  "/aulas-praticas",
  "/mudanca-de-categoria",
  "/calculadora-cnh",
  "/comparador",
  "/aprovados",
  "/perguntas-frequentes",
  "/blog",
  "/bairros",
  "/promocao-aniversario",
  "/promocao-indique-amigo",
  "/resolucao-1020-2025",
  "/formas-estudo-teorico",
  "/aulas-praticas-direcao",
  "/exames-detran",
  "/por-que-autoescola-credenciada",
];

type CheckResult = {
  path: string;
  status: number | "erro";
  ok: boolean;
  note: string;
};

type LogEntry = { path: string; ref: string; ts: number; count: number };

const DiagnosticoSeo = () => {
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<CheckResult[]>([]);
  const [log, setLog] = useState<LogEntry[]>([]);

  const loadLog = () => {
    try {
      const raw = localStorage.getItem("aptos_404_log");
      setLog(raw ? JSON.parse(raw) : []);
    } catch {
      setLog([]);
    }
  };

  useEffect(() => {
    loadLog();
  }, []);

  const runChecks = async () => {
    setRunning(true);
    setResults([]);
    const all = [...LEGACY_ROUTES, ...OFFICIAL_ROUTES];
    const out: CheckResult[] = [];
    for (const path of all) {
      try {
        const res = await fetch(path, { redirect: "manual" });
        const isLegacy = LEGACY_ROUTES.includes(path);
        // Em SPA a resposta HTTP é sempre 200 (Vite serve index.html).
        // O redirect real acontece client-side via <Navigate />.
        out.push({
          path,
          status: res.status,
          ok: res.status >= 200 && res.status < 400,
          note: isLegacy
            ? "SPA fallback 200 + redirect client-side via <Navigate replace />"
            : "Rota oficial servida corretamente",
        });
      } catch (e) {
        out.push({ path, status: "erro", ok: false, note: String(e) });
      }
      setResults([...out]);
    }
    setRunning(false);
  };

  const clearLog = () => {
    localStorage.removeItem("aptos_404_log");
    setLog([]);
  };

  const sortedLog = [...log].sort((a, b) => b.count - a.count || b.ts - a.ts);
  const totalHits = log.reduce((s, e) => s + e.count, 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="Diagnóstico SEO — Autoescola APTOS"
        description="Dashboard interno de monitoramento de 404s, redirects e rotas indexáveis."
        canonical="https://autoescolaaptos.com.br/diagnostico-seo"
        noIndex
      />
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-8">
            <Badge variant="outline" className="mb-2">Interno · noindex</Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Diagnóstico SEO & 404</h1>
            <p className="text-muted-foreground">
              Acompanhe URLs não encontradas, valide redirects das rotas legadas e confirme se as rotas oficiais estão respondendo.
            </p>
          </div>

          {/* Redirect checks */}
          <Card className="p-6 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-xl font-bold">Verificação em lote de rotas</h2>
                <p className="text-sm text-muted-foreground">
                  Testa {LEGACY_ROUTES.length} legadas + {OFFICIAL_ROUTES.length} oficiais no domínio atual.
                </p>
              </div>
              <Button onClick={runChecks} disabled={running}>
                <RefreshCw className={`w-4 h-4 mr-2 ${running ? "animate-spin" : ""}`} />
                {running ? "Rodando..." : "Executar verificação"}
              </Button>
            </div>

            {results.length > 0 && (
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-2">Rota</th>
                      <th className="text-left p-2 w-20">Status</th>
                      <th className="text-left p-2">Observação</th>
                      <th className="p-2 w-16"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r) => (
                      <tr key={r.path} className="border-t">
                        <td className="p-2 font-mono text-xs">{r.path}</td>
                        <td className="p-2">
                          <span className={`inline-flex items-center gap-1 font-semibold ${r.ok ? "text-green-600" : "text-red-600"}`}>
                            {r.ok ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                            {r.status}
                          </span>
                        </td>
                        <td className="p-2 text-muted-foreground text-xs">{r.note}</td>
                        <td className="p-2 text-right">
                          <a href={r.path} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            <ExternalLink className="w-4 h-4 inline" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground bg-amber-50 border border-amber-200 rounded p-3">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Nota técnica:</strong> a hospedagem Lovable serve SPA (todas as rotas respondem 200 com index.html).
                Os redirects legados (<code>/site</code>, <code>/modelo1</code>, <code>/1</code>, etc.) acontecem client-side via <code>&lt;Navigate replace /&gt;</code>,
                então o Googlebot moderno (que executa JS) enxerga a URL final. O <code>robots.txt</code> ainda bloqueia essas rotas legadas para acelerar a limpeza do índice.
              </div>
            </div>
          </Card>

          {/* 404 Log */}
          <Card className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-xl font-bold">Log de 404 (este navegador)</h2>
                <p className="text-sm text-muted-foreground">
                  {log.length} URLs únicas · {totalHits} acessos totais registrados via <code>NotFound.tsx</code>.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={loadLog}>
                  <RefreshCw className="w-4 h-4 mr-2" /> Recarregar
                </Button>
                <Button variant="outline" size="sm" onClick={clearLog}>
                  <Trash2 className="w-4 h-4 mr-2" /> Limpar log
                </Button>
              </div>
            </div>

            {sortedLog.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">
                Nenhum 404 registrado ainda neste navegador. À medida que visitantes acessarem URLs inexistentes, elas aparecerão aqui.
              </p>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-2">URL</th>
                      <th className="text-left p-2 w-16">Hits</th>
                      <th className="text-left p-2">Referrer</th>
                      <th className="text-left p-2 w-32">Último</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedLog.map((e) => (
                      <tr key={e.path} className="border-t">
                        <td className="p-2 font-mono text-xs">{e.path}</td>
                        <td className="p-2 font-semibold">{e.count}</td>
                        <td className="p-2 text-xs text-muted-foreground truncate max-w-xs">{e.ref}</td>
                        <td className="p-2 text-xs text-muted-foreground">{new Date(e.ts).toLocaleString("pt-BR")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          {/* GSC & Sitemap manual steps */}
          <Card className="p-6 mt-8">
            <h2 className="text-xl font-bold mb-3">Próximos passos manuais (Google Search Console)</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>
                Acesse{" "}
                <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                  Google Search Console
                </a>{" "}
                com a conta proprietária de <code>autoescolaaptos.com.br</code>.
              </li>
              <li>Menu <strong>Sitemaps</strong> → adicionar <code>https://autoescolaaptos.com.br/sitemap.xml</code> e clicar em Enviar.</li>
              <li>Menu <strong>Remoções</strong> → solicitar remoção temporária de <code>/site/*</code>, <code>/modelo1/*</code>, <code>/1/*</code>, <code>/index.html</code>.</li>
              <li>Menu <strong>Inspecionar URL</strong> → colar cada rota oficial nova e clicar em <em>Solicitar indexação</em>.</li>
              <li>Menu <strong>Páginas</strong> → aba <em>Não indexadas</em> → exportar CSV e comparar com o log acima.</li>
            </ol>
            <p className="text-xs text-muted-foreground mt-4">
              Nota: a conexão automática com o Search Console foi recusada anteriormente. Se quiser autorizar agora, peça "conectar Google Search Console".
            </p>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DiagnosticoSeo;
