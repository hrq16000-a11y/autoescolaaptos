import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
