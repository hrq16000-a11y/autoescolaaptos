import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TimelineCNH from "@/components/TimelineCNH";
import ProcessoHabilitacao from "@/components/ProcessoHabilitacao";
import PromoSection from "@/components/PromoSection";
import Services from "@/components/Services";
import Differentials from "@/components/Differentials";
import SocialProof from "@/components/SocialProof";
import GoogleReviews from "@/components/GoogleReviews";
import Testimonials from "@/components/Testimonials";
import HomeFAQ from "@/components/HomeFAQ";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SmartAssistant from "@/components/SmartAssistant";
import MobileStickyBar from "@/components/MobileStickyBar";
import RelatedLinks from "@/components/RelatedLinks";
import SEO from "@/components/SEO";
import { useScrollTracking } from "@/hooks/useScrollTracking";

const Index = () => {
  useScrollTracking();

  const homeJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://autoescolaaptos.com.br/#website",
        url: "https://autoescolaaptos.com.br/",
        name: "Autoescola APTOS",
        publisher: { "@id": "https://autoescolaaptos.com.br/#org" },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://autoescolaaptos.com.br/?s={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://autoescolaaptos.com.br/#org",
        name: "Autoescola APTOS",
        url: "https://autoescolaaptos.com.br/",
        logo: "https://autoescolaaptos.com.br/og-image.png",
        sameAs: [
          "https://www.instagram.com/autoescolaaptos",
          "https://www.facebook.com/autoescolaaptos",
        ],
      },
      {
        "@type": "DrivingSchool",
        "@id": "https://autoescolaaptos.com.br/#drivingschool",
        name: "Autoescola APTOS",
        telephone: "+554133833627",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: "São José dos Pinhais",
          addressRegion: "PR",
          addressCountry: "BR",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "320",
        },
        areaServed: { "@type": "City", name: "São José dos Pinhais" },
      },
    ],
  };

  const homeRelated = [
    {
      title: "Aulas em carro automático",
      href: "/carro-automatico",
      description: "Conheça a opção de carro automático nas aulas práticas da APTOS.",
    },
    {
      title: "Autoescola em São José dos Pinhais",
      href: "/autoescola-sao-jose-dos-pinhais",
      description: "Tudo sobre a APTOS na sua cidade.",
    },
    {
      title: "Primeira Habilitação",
      href: "/primeira-habilitacao",
      description: "Processo completo com as regras da Resolução 1020/2025.",
    },
    {
      title: "Aulas Práticas",
      href: "/aulas-praticas",
      description: "Carros novos com direção elétrica e instrutores pacientes.",
    },
    {
      title: "Inclusão de Categoria (A ou B)",
      href: "/inclusao-categoria",
      description: "Já tem CNH? Adicione a A ou a B.",
    },
    {
      title: "Curso de Reciclagem",
      href: "/reciclagem-cnh",
      description: "100% online (EAD), aprovado pelo DETRAN-PR.",
    },
    {
      title: "Reteste Prático",
      href: "/reteste-pratico",
      description: "Aulas focadas no que reprovou. Volte preparado.",
    },
    {
      title: "Simulado DETRAN-PR",
      href: "/simulado-detran-pr",
      description: "30 questões grátis no padrão da prova teórica.",
    },
    {
      title: "Perguntas Frequentes",
      href: "/perguntas-frequentes",
      description: "+80 dúvidas respondidas sobre CNH no Paraná.",
    },
  ];

  return (
    <main className="min-h-screen">
      <SEO
        title="Autoescola em São José dos Pinhais | APTOS — CNH, Aulas e Reciclagem"
        description="Autoescola APTOS em São José dos Pinhais: primeira habilitação, inclusão de categoria, reciclagem, reteste e aulas práticas. 4,9★ no Google e +5.000 alunos aprovados."
        canonical="/"
        jsonLd={homeJsonLd}
      />
      <Navbar />
      <Hero />

      <section
        aria-label="Novidade: aulas em carro automático"
        className="border-y border-primary/20 bg-primary/5"
      >
        <div className="container mx-auto flex flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-primary">
              Novidade APTOS
            </p>
            <p className="mt-1 text-lg font-heading font-bold text-foreground md:text-xl">
              Agora também com aulas práticas em carro automático.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Conheça a nova opção sem sair da estrutura completa da Autoescola APTOS.
            </p>
          </div>
          <Link
            to="/carro-automatico"
            data-component="HomeAutomaticoCallout"
            data-intent="internal"
            className="inline-flex min-h-[48px] shrink-0 items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-smooth transition-all hover:-translate-y-0.5 hover:shadow-glow"
          >
            Conhecer carro automático →
          </Link>
        </div>
      </section>

      <TimelineCNH />
      <ProcessoHabilitacao />
      <PromoSection />
      <Services />
      <Differentials />
      <TestimonialsCarousel />
      <SocialProof />
      <GoogleReviews />
      <Testimonials />
      <About />
      <HomeFAQ />
      <Contact />
      <RelatedLinks title="Explore a APTOS" links={homeRelated} />
      <Footer />
      <FloatingWhatsApp />
      <SmartAssistant />
      <MobileStickyBar />
    </main>
  );
};

export default Index;
