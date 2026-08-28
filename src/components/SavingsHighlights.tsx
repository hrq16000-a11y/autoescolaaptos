import { Link } from "react-router-dom";
import { Tag, ArrowRight } from "lucide-react";
import { savings } from "@/data/savingsData";
import { track } from "@/lib/analytics";

interface SavingsHighlightsProps {
  title?: string;
  subtitle?: string;
  /** Origem usada no tracking (ex.: "comparador"). */
  source?: string;
  className?: string;
}

/**
 * Bloco de "shopping-savings": destaca cupons, vantagens e economias ativas.
 * Puramente apresentacional — não altera fluxos existentes.
 */
const SavingsHighlights = ({
  title = "Vantagens e economias disponíveis",
  subtitle = "Aproveite as condições ativas da APTOS antes de fechar sua matrícula.",
  source = "generico",
  className = "",
}: SavingsHighlightsProps) => {
  return (
    <section
      aria-labelledby="savings-title"
      data-component="SavingsHighlights"
      className={`py-12 ${className}`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
            <Tag className="w-4 h-4" aria-hidden="true" />
            Economize
          </span>
          <h2 id="savings-title" className="text-2xl md:text-3xl font-bold mt-3">
            {title}
          </h2>
          <p className="text-muted-foreground mt-2">{subtitle}</p>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {savings.map((s) => {
            const card = (
              <>
                <span className="inline-block text-xs font-bold text-primary bg-primary/10 rounded-full px-2.5 py-1 mb-3">
                  {s.beneficio}
                </span>
                <h3 className="font-bold text-lg mb-1">{s.titulo}</h3>
                <p className="text-sm text-muted-foreground flex-1">{s.descricao}</p>
                {s.condicao && (
                  <p className="text-[11px] text-muted-foreground/80 mt-3">{s.condicao}</p>
                )}
                {s.url && (
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary mt-3">
                    Ver detalhes <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                )}
              </>
            );

            return (
              <li key={s.code} className="h-full">
                {s.url ? (
                  <Link
                    to={s.url}
                    onClick={() =>
                      track("savings_click", { savings_code: s.code, source })
                    }
                    className="h-full flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-primary min-h-[44px]"
                  >
                    {card}
                  </Link>
                ) : (
                  <div className="h-full flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm">
                    {card}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default SavingsHighlights;
