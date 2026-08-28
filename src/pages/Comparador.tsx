import { Check, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import MobileStickyBar from "@/components/MobileStickyBar";
import SEO from "@/components/SEO";
import CTAButton from "@/components/CTAButton";

type Coluna = {
  key: string;
  titulo: string;
  badge: string;
  tempo: string;
  idade: string;
  destaque?: boolean;
  beneficios: { label: string; ok: boolean }[];
};

const colunas: Coluna[] = [
  {
    key: "moto",
    titulo: "Categoria A",
    badge: "Moto",
    tempo: "2 a 3 meses",
    idade: "18 anos",
    beneficios: [
      { label: "Permite pilotar motos", ok: true },
      { label: "Permite dirigir carro", ok: false },
      { label: "Aulas práticas em moto escola", ok: true },
      { label: "Mais econômica", ok: true },
    ],
  },
  {
    key: "carro",
    titulo: "Categoria B",
    badge: "Carro",
    tempo: "2 a 4 meses",
    idade: "18 anos",
    beneficios: [
      { label: "Permite dirigir carro até 3.500kg", ok: true },
      { label: "Permite pilotar moto", ok: false },
      { label: "Aulas em carro novo manual", ok: true },
      { label: "Mais procurada do Brasil", ok: true },
    ],
  },
  {
    key: "ab",
    titulo: "Categoria AB",
    badge: "Combinada",
    destaque: true,
    tempo: "3 a 5 meses",
    idade: "18 anos",
    beneficios: [
      { label: "Carro + moto na mesma CNH", ok: true },
      { label: "Economia frente a tirar separado", ok: true },
      { label: "Processo único no Detran", ok: true },
      { label: "Indicada para quem quer liberdade total", ok: true },
    ],
  },
  {
    key: "inclusao",
    titulo: "Inclusão",
    badge: "Adicionar categoria",
    tempo: "30 a 60 dias",
    idade: "Já habilitado",
    beneficios: [
      { label: "Adiciona A ou B ao seu CNH atual", ok: true },
      { label: "Sem refazer exames médicos*", ok: true },
      { label: "Apenas aulas práticas e prova", ok: true },
      { label: "Para quem já tem CNH", ok: true },
    ],
  },
];

const Comparador = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Comparador de CNH: A, B, AB e Inclusão — Autoescola APTOS"
        description="Compare lado a lado as categorias A, B, AB e Inclusão de categoria. Tempo, requisitos e benefícios para decidir qual habilitação tirar em São José dos Pinhais."
        canonical="/comparador"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            buildComparisonSchema(
              colunas.map((c) => ({
                name: `${c.titulo} (${c.badge})`,
                description: `Tempo médio: ${c.tempo}. Requisito: ${c.idade}. ${c.beneficios
                  .filter((b) => b.ok)
                  .map((b) => b.label)
                  .join("; ")}.`,
              })),
              {
                name: "Comparativo de categorias de CNH — Autoescola APTOS",
                url: "https://autoescolaaptos.com.br/comparador",
              },
            ),
            buildSavingsSchema(),
          ],
        }}
      />
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Qual categoria é ideal para você?</h1>
            <p className="text-lg text-muted-foreground">
              Compare lado a lado e descubra em 1 minuto qual CNH faz mais sentido para a sua rotina.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {colunas.map((col) => (
              <article
                key={col.key}
                data-component="ComparadorColuna"
                data-intent={`compare_${col.key}`}
                className={`relative rounded-2xl border bg-card p-6 flex flex-col ${
                  col.destaque
                    ? "border-primary shadow-glow ring-2 ring-primary/30"
                    : "border-border shadow-sm"
                }`}
              >
                {col.destaque && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                    Mais escolhida
                  </span>
                )}
                <p className="text-sm font-semibold text-primary uppercase">{col.badge}</p>
                <h2 className="text-2xl font-bold mt-1 mb-4">{col.titulo}</h2>

                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                  <div className="bg-muted rounded-lg p-2">
                    <p className="text-muted-foreground text-xs">Tempo</p>
                    <p className="font-semibold">{col.tempo}</p>
                  </div>
                  <div className="bg-muted rounded-lg p-2">
                    <p className="text-muted-foreground text-xs">Idade</p>
                    <p className="font-semibold">{col.idade}</p>
                  </div>
                </div>

                <ul className="space-y-2 text-sm flex-1 mb-5">
                  {col.beneficios.map((b) => (
                    <li key={b.label} className="flex gap-2">
                      {b.ok ? (
                        <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      )}
                      <span className={b.ok ? "" : "text-muted-foreground line-through"}>{b.label}</span>
                    </li>
                  ))}
                </ul>

                <CTAButton
                  intent="funil"
                  size="default"
                  fullWidth
                  trackingSource={`comparador_${col.key}`}
                  trackingLabel={`escolhi_${col.key}`}
                >
                  Quero esta opção
                </CTAButton>
              </article>
            ))}
          </div>

          <p className="text-xs text-center text-muted-foreground mt-8">
            * Inclusão pode exigir reavaliação médica conforme caso. Confirme no atendimento.
          </p>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileStickyBar />
    </div>
  );
};

export default Comparador;
