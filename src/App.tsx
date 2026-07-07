import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import { useEngagementTracking } from "./hooks/useEngagementTracking";
import { FunnelProvider } from "./hooks/useFunnelModal";
import { LEGACY_REDIRECTS } from "./lib/legacyRedirects";

// Lazy-load non-critical routes to keep the initial JS bundle small.
const FAQ = lazy(() => import("./pages/FAQ"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const NeighborhoodsIndex = lazy(() => import("./pages/NeighborhoodsIndex"));
const NeighborhoodPage = lazy(() => import("./pages/NeighborhoodPage"));
const Obrigado = lazy(() => import("./pages/Obrigado"));
const PrecisoDeTecnico = lazy(() => import("./pages/PrecisoDeTecnico"));
const MestreDosServicos = lazy(() => import("./pages/MestreDosServicos"));
const PingSolucoes = lazy(() => import("./pages/PingSolucoes"));
const PrimeiraHabilitacao = lazy(() => import("./pages/PrimeiraHabilitacao"));
const Resolucao1020 = lazy(() => import("./pages/Resolucao1020"));
const FormasEstudoTeorico = lazy(() => import("./pages/FormasEstudoTeorico"));
const AulasPraticasDirecao = lazy(() => import("./pages/AulasPraticasDirecao"));
const ExamesDetran = lazy(() => import("./pages/ExamesDetran"));
const PorQueAutoescola = lazy(() => import("./pages/PorQueAutoescola"));
const PromoAniversario = lazy(() => import("./pages/PromoAniversario"));
const PromoIndiqueAmigo = lazy(() => import("./pages/PromoIndiqueAmigo"));
const SimuladoDetranPr = lazy(() => import("./pages/SimuladoDetranPr"));
const Orcamento = lazy(() => import("./pages/Orcamento"));
const UmContato = lazy(() => import("./pages/UmContato"));
const AutoescolaSaoJoseDosPinhais = lazy(() => import("./pages/AutoescolaSaoJoseDosPinhais"));
const Categoria = lazy(() => import("./pages/Categoria"));
const Servico = lazy(() => import("./pages/Servico"));
const CalculadoraCnh = lazy(() => import("./pages/CalculadoraCnh"));
const Comparador = lazy(() => import("./pages/Comparador"));
const Aprovados = lazy(() => import("./pages/Aprovados"));
const DiagnosticoSeo = lazy(() => import("./pages/DiagnosticoSeo"));
const HabilitacaoPCD = lazy(() => import("./pages/HabilitacaoPCD"));
const GrowthDashboard = lazy(() => import("./pages/admin/GrowthDashboard"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div
      role="status"
      aria-label="Carregando"
      className="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin"
    />
  </div>
);

const AppRoutes = () => {
  useEngagementTracking();
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/perguntas-frequentes" element={<FAQ />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/bairros" element={<NeighborhoodsIndex />} />
        <Route path="/bairros/:slug" element={<NeighborhoodPage />} />
        <Route path="/obrigado" element={<Obrigado />} />
        <Route path="/parceiros/preciso-de-um-tecnico" element={<PrecisoDeTecnico />} />
        <Route path="/parceiros/mestre-dos-servicos" element={<MestreDosServicos />} />
        <Route path="/parceiros/ping-solucoes" element={<PingSolucoes />} />
        <Route path="/primeira-habilitacao" element={<PrimeiraHabilitacao />} />
        <Route path="/resolucao-1020-2025" element={<Resolucao1020 />} />
        <Route path="/formas-estudo-teorico" element={<FormasEstudoTeorico />} />
        <Route path="/aulas-praticas-direcao" element={<AulasPraticasDirecao />} />
        <Route path="/exames-detran" element={<ExamesDetran />} />
        <Route path="/por-que-autoescola-credenciada" element={<PorQueAutoescola />} />
        <Route path="/promocao-aniversario" element={<PromoAniversario />} />
        <Route path="/promocao-indique-amigo" element={<PromoIndiqueAmigo />} />
        <Route path="/simulado-detran-pr" element={<SimuladoDetranPr />} />
        <Route path="/orcamento" element={<Orcamento />} />
        <Route path="/autoescola-sao-jose-dos-pinhais" element={<AutoescolaSaoJoseDosPinhais />} />
        <Route path="/cnh-sao-jose-dos-pinhais" element={<AutoescolaSaoJoseDosPinhais />} />
        <Route path="/categoria-:slug" element={<Categoria />} />
        <Route path="/inclusao-categoria" element={<Servico />} />
        <Route path="/reciclagem-cnh" element={<Servico />} />
        <Route path="/reteste-pratico" element={<Servico />} />
        <Route path="/aulas-praticas" element={<Servico />} />
        <Route path="/mudanca-de-categoria" element={<Navigate to="/inclusao-categoria" replace />} />
        <Route path="/calculadora-cnh" element={<CalculadoraCnh />} />
        <Route path="/comparador" element={<Comparador />} />
        <Route path="/aprovados" element={<Aprovados />} />
        <Route path="/diagnostico-seo" element={<DiagnosticoSeo />} />
        <Route path="/pcd" element={<HabilitacaoPCD />} />
        <Route path="/habilitacao-pcd" element={<Navigate to="/pcd" replace />} />
        <Route path="/autoescola-pcd" element={<Navigate to="/pcd" replace />} />
        <Route path="/admin/growth" element={<GrowthDashboard />} />
        {/* Legacy URL redirects — mapa central em src/lib/legacyRedirects.ts */}
        {LEGACY_REDIRECTS.map((r) => (
          <Route key={r.from} path={r.from} element={<Navigate to={r.to} replace />} />
        ))}
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <FunnelProvider>
            <AppRoutes />
          </FunnelProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
