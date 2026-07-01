import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NeighborhoodsIndex from "./pages/NeighborhoodsIndex";
import NeighborhoodPage from "./pages/NeighborhoodPage";
import Obrigado from "./pages/Obrigado";
import PrecisoDeTecnico from "./pages/PrecisoDeTecnico";
import MestreDosServicos from "./pages/MestreDosServicos";
import PingSolucoes from "./pages/PingSolucoes";
import PrimeiraHabilitacao from "./pages/PrimeiraHabilitacao";
import Resolucao1020 from "./pages/Resolucao1020";
import FormasEstudoTeorico from "./pages/FormasEstudoTeorico";
import AulasPraticasDirecao from "./pages/AulasPraticasDirecao";
import ExamesDetran from "./pages/ExamesDetran";
import PorQueAutoescola from "./pages/PorQueAutoescola";
import PromoAniversario from "./pages/PromoAniversario";
import PromoIndiqueAmigo from "./pages/PromoIndiqueAmigo";
import SimuladoDetranPr from "./pages/SimuladoDetranPr";
import Orcamento from "./pages/Orcamento";
import AutoescolaSaoJoseDosPinhais from "./pages/AutoescolaSaoJoseDosPinhais";
import Categoria from "./pages/Categoria";
import Servico from "./pages/Servico";
import CalculadoraCnh from "./pages/CalculadoraCnh";
import Comparador from "./pages/Comparador";
import Aprovados from "./pages/Aprovados";
import NotFound from "./pages/NotFound";
import { useEngagementTracking } from "./hooks/useEngagementTracking";

const queryClient = new QueryClient();

const AppRoutes = () => {
  useEngagementTracking();
  return (
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
      <Route path="/mudanca-de-categoria" element={<Servico />} />
      <Route path="/calculadora-cnh" element={<CalculadoraCnh />} />
      <Route path="/comparador" element={<Comparador />} />
      <Route path="/aprovados" element={<Aprovados />} />
      {/* Legacy URL redirects (301-equivalent via replace) — evita 404 em URLs indexadas por versões antigas do site */}
      <Route path="/site" element={<Navigate to="/" replace />} />
      <Route path="/site/*" element={<Navigate to="/" replace />} />
      <Route path="/site/contato" element={<Navigate to="/#contato" replace />} />
      <Route path="/modelo1" element={<Navigate to="/" replace />} />
      <Route path="/modelo1/*" element={<Navigate to="/" replace />} />
      <Route path="/1" element={<Navigate to="/" replace />} />
      <Route path="/1/*" element={<Navigate to="/" replace />} />
      <Route path="/index.html" element={<Navigate to="/" replace />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/contato" element={<Navigate to="/#contato" replace />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
