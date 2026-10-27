import { useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

type Optin = {
  id: string;
  telefone: string;
  created_at: string;
  campaign_source: string | null;
  lgpd_aceite: boolean;
};
type Page = { records: Optin[]; cursor: string | null; hasMore: boolean; message?: string };

const API = "https://autoescolaaptos-marketing-api-msolus.vercel.app/api/admin-marketing-optins";

function escapeCsv(value: unknown) {
  let text = value === null || value === undefined ? "" : String(value);
  // Proteção contra fórmulas executadas por leitores de planilhas.
  if (/^[=+\-@\t\r]/.test(text)) text = "'" + text;
  return '"' + text.replace(/"/g, '""') + '"';
}

function formatPhone(value: string) {
  if (/^\d{11}$/.test(value)) {
    return "(" + value.slice(0, 2) + ") " + value.slice(2, 7) + "-" + value.slice(7);
  }
  return value;
}

export default function AdminOptinVercel() {
  const [token, setToken] = useState("");
  const [authed, setAuthed] = useState(false);
  const [records, setRecords] = useState<Optin[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const rows = useMemo(() => {
    const q = filter.replace(/\D/g, "");
    const needle = filter.trim().toLocaleLowerCase("pt-BR");
    return records.filter(r => !needle || r.telefone.includes(q) && q !== "" ||
      (r.campaign_source || "").toLocaleLowerCase("pt-BR").includes(needle));
  }, [filter, records]);

  async function load(next = false) {
    if (loading || !token.trim()) return;
    setLoading(true);
    setError("");
    try {
      const url = API + "?limit=30" + (next && cursor ? "&cursor=" + encodeURIComponent(cursor) : "");
      const response = await fetch(url, {
        method: "GET",
        headers: { "X-Aptos-Admin-Token": token.trim() },
        cache: "no-store",
      });
      const result = await response.json() as Page;
      if (!response.ok) {
        if (response.status === 401) {
          setAuthed(false);
          setRecords([]);
        }
        throw new Error(result.message || "Falha ao consultar os cadastros.");
      }
      if (!Array.isArray(result.records)) throw new Error("Resposta administrativa inválida.");
      setRecords(existing => next ? [...existing, ...result.records] : result.records);
      setHasMore(result.hasMore === true && !!result.cursor);
      setCursor(result.cursor || null);
      setAuthed(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha na conexão.");
    } finally {
      setLoading(false);
    }
  }

  function exportCsv() {
    const columns = ["created_at", "telefone", "campaign_source", "lgpd_aceite"];
    const csv = [
      columns.join(","),
      ...rows.map(r => columns.map(c => escapeCsv(r[c as keyof Optin])).join(",")),
    ].join("\r\n");
    const blob = new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" });
    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "aptos-ofertas-vercel-pagina.csv";
    link.click();
    URL.revokeObjectURL(fileUrl);
  }

  function logout() {
    setToken("");
    setAuthed(false);
    setRecords([]);
    setCursor(null);
    setHasMore(false);
    setError("");
  }

  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <Helmet>
        <title>Admin — Cadastros de Ofertas Vercel | APTOS</title>
        <meta name="robots" content="noindex,nofollow,noarchive" />
      </Helmet>
      <div className="mx-auto max-w-4xl space-y-5">
        <Link to="/admin/ofertas" className="text-sm underline">Voltar ao painel legado</Link>
        <h1 className="text-2xl font-bold">Cadastros de Ofertas — Vercel</h1>
        <p className="text-sm text-muted-foreground">
          Consulta somente leitura dos novos participantes, armazenados na Vercel Blob privada.
          Não inclui os registros anteriores do Supabase. Nenhum token é gravado no navegador.
        </p>
        {!authed ? (
          <section className="max-w-lg rounded-xl border bg-card p-5 space-y-3">
            <label htmlFor="ofertasAdminToken" className="block font-medium text-sm">Credencial administrativa de ofertas</label>
            <input id="ofertasAdminToken" type="password" autoComplete="off" value={token}
              onChange={e => setToken(e.target.value)} placeholder="Credencial de acesso"
              className="w-full rounded-md border bg-background p-3" />
            <button onClick={() => void load()} disabled={loading || !token.trim()}
              className="rounded-md bg-primary text-primary-foreground px-5 py-3 disabled:opacity-50">
              {loading ? "Conectando..." : "Consultar cadastros"}
            </button>
          </section>
        ) : (
          <section className="space-y-4">
            <div className="flex flex-wrap gap-3 items-center">
              <button onClick={() => void load()} disabled={loading}
                className="rounded-md border px-4 py-2">Atualizar</button>
              <button onClick={exportCsv} disabled={rows.length === 0}
                className="rounded-md border px-4 py-2 disabled:opacity-50">Exportar CSV (registros carregados)</button>
              <button onClick={logout} className="rounded-md border px-4 py-2">Sair</button>
            </div>
            <label htmlFor="filterOptin" className="block text-sm">
              Filtrar telefone ou origem — apenas registros carregados
            </label>
            <input id="filterOptin" value={filter} onChange={e => setFilter(e.target.value)}
              placeholder="Pesquisar nesta lista" className="w-full rounded-md border bg-background p-3" />
            <p role="status" className="text-sm">{records.length} registro(s) carregado(s). {hasMore ? "Existem mais páginas." : "Última página alcançada."}</p>
            <div className="overflow-x-auto rounded-xl border">
              <table className="w-full text-sm">
                <thead className="bg-muted"><tr>
                  <th scope="col" className="p-3 text-left">Cadastro</th>
                  <th scope="col" className="p-3 text-left">WhatsApp</th>
                  <th scope="col" className="p-3 text-left">Origem</th>
                  <th scope="col" className="p-3 text-left">Consentimento</th>
                </tr></thead>
                <tbody>{rows.map(r => <tr key={r.id} className="border-t">
                  <td className="p-3">{new Date(r.created_at).toLocaleString("pt-BR")}</td>
                  <td className="p-3">{formatPhone(r.telefone)}</td>
                  <td className="p-3">{r.campaign_source || "Sem campanha"}</td>
                  <td className="p-3">{r.lgpd_aceite ? "Sim" : "Não informado"}</td>
                </tr>)}</tbody>
              </table>
              {rows.length === 0 && <p className="p-4 text-sm">Nenhum registro nesta visualização.</p>}
            </div>
            {hasMore && <button onClick={() => void load(true)} disabled={loading}
              className="rounded-md bg-primary px-5 py-3 text-primary-foreground disabled:opacity-50">
              {loading ? "Carregando..." : "Carregar mais 30"}
            </button>}
          </section>
        )}
        {error && <p role="alert" className="rounded-lg border border-destructive p-3 text-sm text-destructive">{error}</p>}
        <p className="text-xs text-muted-foreground">
          Este painel não envia ofertas nem mensagens de WhatsApp. A exportação contém apenas os itens carregados.
        </p>
      </div>
    </main>
  );
}
