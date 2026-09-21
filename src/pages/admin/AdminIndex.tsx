import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const links = [
  { to: "/admin/leads", title: "Leads da Triagem", desc: "Lista completa de leads /1contato com filtros e exportação CSV." },
  { to: "/admin/metricas", title: "Métricas do Funil", desc: "Conversão por etapa, UTMs e desempenho da triagem." },
  { to: "/admin/ofertas", title: "Programa de Ofertas", desc: "Opt-ins do /ofertas, sincronização com Google Sheets, retry e backfill." },
  { to: "/admin/growth", title: "Growth Dashboard", desc: "Visão consolidada de crescimento e KPIs." },
  { to: "/admin/campanhas", title: "Campanhas", desc: "Visualizações, cliques no WhatsApp e leads separados por campanha." },
];

export default function AdminIndex() {
  return (
    <>
      <Helmet>
        <title>Admin | Autoescola APTOS</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <main className="min-h-screen bg-background px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-black mb-2">Painel Admin</h1>
          <p className="text-muted-foreground mb-6">
            Acesso restrito. Cada painel pede o <strong>ADMIN_LEADS_TOKEN</strong> configurado no backend
            (guardado como secret). Não há login por usuário/senha — o token é solicitado no topo de cada tela.
          </p>
          <div className="grid gap-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="block border border-border rounded-xl p-5 bg-card hover:border-primary hover:shadow-md transition"
              >
                <h2 className="text-lg font-bold text-foreground">{l.title}</h2>
                <p className="text-sm text-muted-foreground">{l.desc}</p>
                <span className="text-primary text-sm font-semibold mt-2 inline-block">Abrir →</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
