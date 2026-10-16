import { ExternalLink, MessageSquareQuote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const GOOGLE_REVIEWS_SEARCH =
  "https://www.google.com/maps/search/?api=1&query=Autoescola%20Aptos%20Sao%20Jose%20dos%20Pinhais&query_place_id=ChIJbXhF6g763JQR9TTJ4hS7wwM";

/**
 * Sem integração de avaliações verificada, não exibir depoimentos,
 * estrelas ou contagens fictícias como se fossem do Google.
 */
const GoogleReviews = () => (
  <section
    id="google-reviews"
    data-component="GoogleReviews"
    data-section="social-proof"
    aria-labelledby="aptos-google-reviews-title"
    className="py-16 bg-background"
  >
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card px-6 py-10 text-center shadow-sm md:px-12 md:py-14">
        <MessageSquareQuote className="mx-auto mb-4 h-10 w-10 text-primary" aria-hidden="true" />
        <h2
          id="aptos-google-reviews-title"
          className="mb-3 font-heading text-3xl font-black text-foreground md:text-4xl"
        >
          Conheça as avaliações da Autoescola APTOS
        </h2>
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2" aria-label="Avaliação de 4,8 em 5 e 794 avaliações na consulta de 16 de outubro de 2026">
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
          <strong className="text-xl text-foreground">4,8/5</strong>
          <span className="text-sm text-muted-foreground">794 avaliações no Google</span>
        </div>
        <p className="mx-auto mb-3 max-w-2xl text-muted-foreground">
          Consulte os comentários diretamente no Perfil da Empresa no Google.
        </p>
        <p className="mb-8 text-xs text-muted-foreground">
          Dados consultados em 16/10/2026. Nota e quantidade podem mudar.
        </p>
        <Button asChild size="lg" data-intent="reviews_external" data-component="GoogleReviews">
          <a href={GOOGLE_REVIEWS_SEARCH} target="_blank" rel="noopener noreferrer">
            Consultar avaliações no Google
            <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
          </a>
        </Button>
      </div>
    </div>
  </section>
);

export default GoogleReviews;
