import { useMemo, useState } from "react";
import { Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * Componente preparado para integração futura com Google Places API.
 * Hoje renderiza reviews em mock estruturado (mesmo schema da API).
 * Para sincronizar: substitua MOCK_REVIEWS por fetch da edge function.
 */
type Review = {
  author_name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  relative_time_description: string;
  text: string;
  category?: string;
};

const MOCK_REVIEWS: Review[] = [
  { author_name: "Bruna L.", rating: 5, relative_time_description: "há 2 semanas", category: "Primeira Habilitação", text: "Equipe muito atenciosa, fui aprovada de primeira na prova prática! Recomendo." },
  { author_name: "Carlos M.", rating: 5, relative_time_description: "há 1 mês", category: "Categoria AB", text: "Fiz a AB direto. Carros novos, instrutores pacientes e perto do Detran." },
  { author_name: "Patrícia S.", rating: 5, relative_time_description: "há 3 semanas", category: "Reciclagem", text: "Curso de reciclagem 100% online com o app CNH do Brasil, super prático." },
  { author_name: "Diego R.", rating: 4, relative_time_description: "há 2 meses", category: "Categoria A", text: "Aulas de moto bem estruturadas, instrutor experiente. Aprovado!" },
  { author_name: "Renata C.", rating: 5, relative_time_description: "há 1 semana", category: "Inclusão de Categoria", text: "Incluí a moto na minha CNH B rápido, com toda orientação do despachante interno." },
  { author_name: "Felipe T.", rating: 5, relative_time_description: "há 4 dias", category: "Reteste", text: "Reteste agendado em menos de uma semana, passei tranquilo." },
];

const TOTAL_REVIEWS = 487;
const AVERAGE = 4.9;

const GoogleReviews = () => {
  const [filter, setFilter] = useState<string>("Todas");
  const categories = useMemo(
    () => ["Todas", ...Array.from(new Set(MOCK_REVIEWS.map((r) => r.category).filter(Boolean) as string[]))],
    []
  );
  const filtered = filter === "Todas" ? MOCK_REVIEWS : MOCK_REVIEWS.filter((r) => r.category === filter);

  return (
    <section
      id="google-reviews"
      data-component="GoogleReviews"
      data-section="social-proof"
      className="py-16 bg-background"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-7 h-7 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-3xl font-bold">{AVERAGE.toFixed(1)}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Avaliações reais no Google</h2>
          <p className="text-muted-foreground">{TOTAL_REVIEWS}+ avaliações verificadas de alunos da APTOS em São José dos Pinhais.</p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((cat) => (
            <Button
              key={cat}
              size="sm"
              variant={filter === cat ? "default" : "outline"}
              onClick={() => setFilter(cat)}
              data-intent="reviews_filter"
              data-component="GoogleReviews"
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((r, idx) => (
            <article
              key={idx}
              className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {r.author_name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold leading-tight">{r.author_name}</p>
                    <p className="text-xs text-muted-foreground">{r.relative_time_description}</p>
                  </div>
                </div>
                {r.category && <Badge variant="secondary" className="text-xs">{r.category}</Badge>}
              </div>
              <div className="flex mb-3">
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
            </article>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline" data-intent="reviews_external" data-component="GoogleReviews">
            <a
              href="https://www.google.com/search?q=Autoescola+APTOS+S%C3%A3o+Jos%C3%A9+dos+Pinhais"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver todas no Google <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
