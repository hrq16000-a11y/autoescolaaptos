import { useState } from "react";
import { Trophy, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import MobileStickyBar from "@/components/MobileStickyBar";
import SEO from "@/components/SEO";
import CTAButton from "@/components/CTAButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/**
 * Grid de aprovados — pronto para integração com backend.
 * Substitua APROVADOS por fetch da edge function quando os dados reais existirem.
 */
type Aprovado = {
  nome: string;
  categoria: "A" | "B" | "AB" | "D";
  data: string;
  depoimento: string;
  inicial: string;
};

const APROVADOS: Aprovado[] = [
  { nome: "Bruna L.", categoria: "B", data: "Jun/2026", inicial: "B", depoimento: "Aprovada de primeira! Instrutores muito atenciosos." },
  { nome: "Carlos M.", categoria: "AB", data: "Jun/2026", inicial: "C", depoimento: "Tirei carro e moto direto, valeu cada centavo." },
  { nome: "Diego R.", categoria: "A", data: "Mai/2026", inicial: "D", depoimento: "Moto na primeira tentativa." },
  { nome: "Patrícia S.", categoria: "B", data: "Mai/2026", inicial: "P", depoimento: "Curso online flexível, perfeito para minha rotina." },
  { nome: "Renata C.", categoria: "D", data: "Abr/2026", inicial: "R", depoimento: "Mudança de categoria rápida com apoio do despachante." },
  { nome: "Felipe T.", categoria: "B", data: "Abr/2026", inicial: "F", depoimento: "Reteste e aprovação em uma semana." },
  { nome: "Mariana A.", categoria: "AB", data: "Mar/2026", inicial: "M", depoimento: "Atendimento 10. Tudo explicado passo a passo." },
  { nome: "Lucas P.", categoria: "B", data: "Mar/2026", inicial: "L", depoimento: "Carros novos, instrutores top." },
];

const CATS: ("Todas" | "A" | "B" | "AB" | "D")[] = ["Todas", "A", "B", "AB", "D"];

const corCategoria: Record<string, string> = {
  A: "bg-orange-500/15 text-orange-600",
  B: "bg-blue-500/15 text-blue-600",
  AB: "bg-primary/15 text-primary",
  D: "bg-green-500/15 text-green-600",
};

const Aprovados = () => {
  const [filtro, setFiltro] = useState<(typeof CATS)[number]>("Todas");
  const lista = filtro === "Todas" ? APROVADOS : APROVADOS.filter((a) => a.categoria === filtro);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Aprovados na Autoescola APTOS — São José dos Pinhais"
        description="Conheça os alunos aprovados na Autoescola APTOS em São José dos Pinhais. Centenas de novos motoristas formados todo ano. Seja o próximo aprovado."
        canonical="https://autoescolaaptos.com.br/aprovados"
      />
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4">
              <Trophy className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Nossos Aprovados</h1>
            <p className="text-lg text-muted-foreground">
              Histórias reais de quem conquistou a CNH com a Autoescola APTOS. Seja o próximo.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {CATS.map((c) => (
              <Button
                key={c}
                size="sm"
                variant={filtro === c ? "default" : "outline"}
                onClick={() => setFiltro(c)}
                data-intent="filter_aprovados"
              >
                {c === "Todas" ? "Todas" : `Categoria ${c}`}
              </Button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {lista.map((a, idx) => (
              <article
                key={idx}
                className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                    {a.inicial}
                  </div>
                  <div>
                    <p className="font-semibold leading-tight">{a.nome}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {a.data}
                    </p>
                  </div>
                </div>
                <Badge className={`w-fit mb-3 ${corCategoria[a.categoria]}`}>Categoria {a.categoria}</Badge>
                <p className="text-sm text-muted-foreground leading-relaxed">"{a.depoimento}"</p>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <CTAButton intent="funil" trackingSource="aprovados_cta">
              Quero ser o próximo aprovado
            </CTAButton>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileStickyBar />
    </div>
  );
};

export default Aprovados;
