import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, MessageCircle, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/whatsapp";

const WHATSAPP_URL = whatsappLink("Olá! Cheguei aqui por um link antigo e gostaria de falar com a APTOS.", "direto");

const suggestions = [
  { to: "/", label: "Página inicial" },
  { to: "/primeira-habilitacao", label: "Primeira habilitação" },
  { to: "/orcamento", label: "Simular orçamento" },
  { to: "/calculadora-cnh", label: "Calculadora de CNH" },
  { to: "/perguntas-frequentes", label: "Perguntas frequentes" },
  { to: "/autoescola-sao-jose-dos-pinhais", label: "Autoescola em São José dos Pinhais" },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.warn("404:", location.pathname);
    if (typeof window !== "undefined") {
      // Push GA/GTM event
      const w = window as unknown as { dataLayer?: unknown[] };
      if (w.dataLayer) {
        w.dataLayer.push({ event: "page_not_found", path: location.pathname });
      }
      // Persist to local diagnostic log (used by /diagnostico-seo)
      try {
        const KEY = "aptos_404_log";
        const raw = localStorage.getItem(KEY);
        const log: Array<{ path: string; ref: string; ts: number; count: number }> = raw ? JSON.parse(raw) : [];
        const path = location.pathname + location.search;
        const existing = log.find((e) => e.path === path);
        if (existing) {
          existing.count += 1;
          existing.ts = Date.now();
          existing.ref = document.referrer || existing.ref;
        } else {
          log.push({ path, ref: document.referrer || "(direto)", ts: Date.now(), count: 1 });
        }
        // Keep last 200 entries
        const trimmed = log.slice(-200);
        localStorage.setItem(KEY, JSON.stringify(trimmed));
      } catch {
        /* ignore storage errors */
      }
    }
  }, [location.pathname, location.search]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="Página não encontrada (404) — Autoescola APTOS"
        description="A página que você procura não existe ou foi movida. Encontre rapidamente o que precisa na Autoescola APTOS."
        canonical="https://autoescolaaptos.com.br/404"
        noIndex
      />
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 text-primary mb-6">
            <Search className="w-10 h-10" />
          </div>
          <p className="text-sm font-semibold text-primary mb-2">Erro 404</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Página não encontrada</h1>
          <p className="text-lg text-muted-foreground mb-8">
            O link que você acessou não existe mais ou foi movido. Escolha uma das opções abaixo ou fale conosco.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-10">
            <Button asChild size="lg">
              <Link to="/">
                <Home className="w-5 h-5 mr-2" /> Ir para a home
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp (41) 99145-3627
              </a>
            </Button>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 text-left">
            <p className="font-semibold mb-3">Sugestões populares</p>
            <ul className="grid sm:grid-cols-2 gap-2">
              {suggestions.map((s) => (
                <li key={s.to}>
                  <Link
                    to={s.to}
                    className="text-primary hover:underline text-sm"
                  >
                    → {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
