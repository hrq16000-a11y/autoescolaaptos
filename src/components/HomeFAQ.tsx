import { Helmet } from "react-helmet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import CTAButton from "@/components/CTAButton";

/**
 * Home FAQ — accordion + FAQPage JSON-LD (rich snippets no Google).
 * Perguntas alinhadas às maiores dúvidas de quem busca CNH em SJP.
 */
const HOME_FAQS = [
  {
    q: "Quanto tempo demora para tirar a 1ª Habilitação?",
    a: "Com a Resolução CONTRAN 1020/2025, o processo completo leva em média de 2 a 4 meses. O prazo depende da agenda do DETRAN-PR para os exames e do seu ritmo no curso teórico — que agora é livre, feito pelo aplicativo CNH do Brasil, sem carga horária mínima obrigatória.",
  },
  {
    q: "Posso parcelar o valor da CNH na APTOS?",
    a: "Sim. Trabalhamos com parcelamento no cartão de crédito e condições facilitadas para pagamento à vista. Fale com nosso time no WhatsApp e receba um orçamento personalizado em poucos minutos.",
  },
  {
    q: "Quais os documentos necessários para começar?",
    a: "RG (ou CNH, se já habilitado), CPF e comprovante de residência atualizado. A APTOS abre o processo diretamente no DETRAN-PR para você — não é necessário ir até o órgão nas primeiras etapas.",
  },
  {
    q: "Quantas aulas práticas são obrigatórias hoje?",
    a: "Pela Resolução 1020/2025, o mínimo é de apenas 2 horas de aulas práticas. Na prática, recomendamos entre 10 e 20 aulas para chegar totalmente preparado ao exame do DETRAN — o número exato depende da sua evolução.",
  },
  {
    q: "A APTOS atende alunos de Curitiba e da região metropolitana?",
    a: "Sim. Nossa sede fica em São José dos Pinhais, próxima ao DETRAN, e atendemos alunos de Curitiba, Pinhais, Piraquara e toda a Região Metropolitana. Muitos alunos escolhem a APTOS pela agilidade nos agendamentos e proximidade dos pátios de exame.",
  },
  {
    q: "Vocês fazem renovação, reciclagem e mudança de categoria?",
    a: "Sim. Oferecemos primeira habilitação, renovação de CNH, curso de reciclagem 100% online (para condutores suspensos), mudança e inclusão de categoria (A e B) e reteste prático para quem foi reprovado no exame.",
  },
  {
    q: "O curso teórico é online?",
    a: "Sim. Após a Resolução 1020/2025, o curso teórico é feito pelo aplicativo oficial CNH do Brasil, de forma 100% online e no seu ritmo. A APTOS orienta você em cada etapa e prepara para a prova teórica no DETRAN-PR.",
  },
  {
    q: "Como faço para começar agora?",
    a: "Clique no botão de WhatsApp, responda 3 perguntas rápidas (categoria, prazo e experiência) e receba um orçamento personalizado. Um dos nossos consultores retorna em minutos com os próximos passos.",
  },
];

const HomeFAQ = () => {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <section
      id="faq"
      className="py-16 md:py-24 bg-background"
      aria-labelledby="home-faq-title"
    >
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <HelpCircle className="w-4 h-4" aria-hidden />
            <span className="text-sm font-semibold">Perguntas Frequentes</span>
          </div>
          <h2
            id="home-faq-title"
            className="text-3xl md:text-5xl font-heading font-black mb-4 leading-tight"
          >
            Tire suas dúvidas sobre a{" "}
            <span className="text-primary">CNH em São José dos Pinhais</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground px-2">
            Reunimos as perguntas que mais recebemos no WhatsApp. Não encontrou
            a sua? Fale com nosso time agora mesmo.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {HOME_FAQS.map((item, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border border-border rounded-xl bg-card px-4 md:px-6 shadow-smooth"
              >
                <AccordionTrigger className="text-left text-base md:text-lg font-semibold py-5 hover:no-underline min-h-[44px]">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base text-muted-foreground leading-relaxed pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-10 text-center">
            <p className="text-muted-foreground mb-4">
              Ficou alguma dúvida? Vamos conversar.
            </p>
            <CTAButton
              intent="funil"
              trackingSource="home_faq"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Falar com a APTOS agora
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeFAQ;
