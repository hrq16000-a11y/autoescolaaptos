import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Phone, MessageCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const Obrigado = () => {
  useEffect(() => {
    // Dispara conversão do Google Ads na página de agradecimento
    if (window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-16491950534/obrigado_conversao",
        value: 15,
        currency: "BRL",
      });
    }

    // Evento para GTM/GA4
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "thank_you_page_view",
        conversion_type: "lead_completed",
        conversion_value: 15,
      });
    }
  }, []);

  const whatsappNumber = "5541988357907";
  const whatsappMessage = encodeURIComponent(
    "Olá! Acabei de entrar em contato pelo site e gostaria de mais informações."
  );

  return (
    <>
      <SEO
        title="Obrigado pelo Contato | Autoescola APTOS"
        description="Agradecemos seu contato! Nossa equipe entrará em contato em breve. Autoescola APTOS - São José dos Pinhais."
        canonical="https://autoescolaaptos.com.br/obrigado"
        noIndex={true}
      />
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            {/* Ícone de sucesso */}
            <div className="mb-8 animate-bounce">
              <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
            </div>

            {/* Título */}
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Obrigado pelo seu contato!
            </h1>

            {/* Mensagem */}
            <p className="text-xl text-muted-foreground mb-8">
              Recebemos sua solicitação e nossa equipe entrará em contato em breve.
              Você está a um passo de conquistar sua CNH!
            </p>

            {/* Card com próximos passos */}
            <div className="bg-card border border-border rounded-2xl p-8 mb-8 shadow-lg">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Próximos Passos
              </h2>
              <ul className="text-left text-muted-foreground space-y-3">
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shrink-0">
                    1
                  </span>
                  <span>Nossa equipe analisará sua solicitação</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shrink-0">
                    2
                  </span>
                  <span>Entraremos em contato em até 24 horas úteis</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shrink-0">
                    3
                  </span>
                  <span>Agendaremos sua visita para conhecer nossa estrutura</span>
                </li>
              </ul>
            </div>

            {/* Botões de ação */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                asChild
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Falar no WhatsApp
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
              >
                <a href="tel:+554133833627">
                  <Phone className="w-5 h-5 mr-2" />
                  Ligar Agora
                </a>
              </Button>
            </div>

            {/* Link para voltar */}
            <Link
              to="/"
              className="inline-flex items-center text-primary hover:underline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para a página inicial
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Obrigado;
