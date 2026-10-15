import { ExternalLink, MessageSquareQuote } from "lucide-react";
import { Button } from "@/components/ui/button";

const GOOGLE_REVIEWS_SEARCH =
  "https://www.google.com/search?q=Autoescola+APTOS+S%C3%A3o+Jos%C3%A9+dos+Pinhais";

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
        <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
          Consulte comentários e notas diretamente no Google e conheça opiniões
          publicadas sobre a APTOS em São José dos Pinhais.
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
