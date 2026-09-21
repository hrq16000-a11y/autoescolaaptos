import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CalendarClock,
  Car,
  CheckCircle2,
  GraduationCap,
  MapPin,
  MessageCircle,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RelatedLinks from "@/components/RelatedLinks";
import SocialProof from "@/components/SocialProof";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { trackWhatsAppClick } from "@/lib/events";
import { whatsappLink } from "@/lib/whatsapp";
import { recordCampaignEvent, readCampaignUtms } from "@/lib/campaignTracking";
import carroAptos from "@/assets/carro-aptos.webp";

const CAMPAIGN_MESSAGE =
  "Olá! Vim pelo anúncio do Polo automático da Autoescola APTOS e gostaria de saber mais sobre as aulas.";

const diferenciaisCarro = [
  {
    icon: Car,
    titulo: "Câmbio automático",
    texto: "Aulas práticas em veículo de câmbio automático, sem pedal de embreagem e sem troca manual de marchas.",
  },
  {
    icon: GraduationCap,
    titulo: "Instrutores credenciados",
    texto: "Acompanhamento de instrutores credenciados ao DETRAN-PR durante as aulas.",
  },
  {
    icon: CalendarClock,
    titulo: "Agenda flexível",
    texto: "Aulas nos períodos manhã, tarde e noite, conforme disponibilidade da agenda.",
  },
];

const porQueAptos = [
  "Autoescola credenciada ao DETRAN-PR",
  "Frota nova, com direção elétrica",
  "Aulas práticas com instrutores credenciados",
  "Acompanhamento de cada etapa do processo pelo WhatsApp",
  "Atendimento em São José dos Pinhais, a 4 quadras do DETRAN",
  "Aulas avulsas e preparação para reteste prático",
];

const caminhos = [
  {
    icon: BookOpen,
    titulo: "Primeira habilitação",
    texto: "Conheça o processo completo e confirme com a equipe como a opção de carro automático se aplica ao seu caso.",
    href: "/primeira-habilitacao",
    cta: "Ver primeira habilitação",
  },
  {
    icon: Car,
    titulo: "Aulas práticas",
    texto: "Veja como funcionam as aulas, horários, preparação e as opções de veículo disponíveis na APTOS.",
    href: "/aulas-praticas-direcao",
    cta: "Ver aulas práticas",
  },
  {
    icon: RefreshCw,
    titulo: "Reteste prático",
    texto: "Se o foco é se preparar para um reteste, consulte o serviço e confirme com a equipe o veículo aplicável ao seu processo.",
    href: "/reteste-pratico",
    cta: "Ver reteste prático",
  },
];

const campaignFaq = [
  {
    question: "A APTOS oferece carro manual e automático?",
    answer:
      "Sim. A APTOS oferece opções de carro manual e automático nas aulas práticas. A equipe orienta qual alternativa atende ao seu objetivo e às regras aplicáveis ao seu processo.",
  },
  {
    question: "Posso fazer aulas em carro automático mesmo já sendo habilitado?",
    answer:
      "A APTOS também atende aulas avulsas. Fale com a equipe pelo WhatsApp para explicar seu objetivo e confirmar agenda e disponibilidade.",
  },
  {
    question: "Onde ficam as aulas da APTOS?",
    answer:
      "A Autoescola APTOS atende em São José dos Pinhais, PR, e fica a 4 quadras do DETRAN.",
  },
  {
    question: "Como saber se o carro automático se aplica ao meu processo?",
    answer:
      "As regras podem variar conforme o tipo e a etapa do processo. A equipe da APTOS orienta seu caso antes do agendamento e confirma a opção de veículo adequada ao seu processo.",
  },
];

const relatedLinks = [
  {
    title: "Aulas práticas de direção",
    href: "/aulas-praticas-direcao",
    description: "Entenda a metodologia, horários e preparação para as aulas práticas.",
  },
  {
    title: "Primeira habilitação",
    href: "/primeira-habilitacao",
    description: "Veja as etapas do processo para conquistar a primeira CNH.",
  },
  {
    title: "Autoescola em São José dos Pinhais",
    href: "/autoescola-sao-jose-dos-pinhais",
    description: "Conheça a APTOS, localização e serviços disponíveis na cidade.",
  },
  {
    title: "Simular orçamento",
    href: "/orcamento",
    description: "Informe o que você precisa e avance para um atendimento mais direcionado.",
  },
];

const CarroAutomatico = () => {
  const utm = useMemo(() => {
    if (typeof window === "undefined") return {};
    return readCampaignUtms();
  }, []);

  useEffect(() => {
    track("campaign_view", {
      page_path: "/carro-automatico",
      campaign: "polo_automatico",
      ...utm,
    });
    recordCampaignEvent("polo_automatico", "view", "landing");
  }, [utm]);

  const waHref = whatsappLink(CAMPAIGN_MESSAGE, "direto");

  const handleWhats = (source: string) => {
    trackWhatsAppClick({
      source,
      kind: "direto",
      service: "aulas_carro_automatico",
    });
    track("campaign_whatsapp_click", {
      source,
      campaign: "polo_automatico",
      ...utm,
    });
    recordCampaignEvent("polo_automatico", "whatsapp_click", source);
  };

  const WhatsCTA = ({
    source,
    label = "Falar no WhatsApp",
    className = "",
  }: {
    source: string;
    label?: string;
    className?: string;
  }) => (
    <Button
      asChild
      size="lg"
      className={
        "min-h-[54px] px-7 text-base font-bold hover:-translate-y-0.5 hover:shadow-glow active:translate-y-0 " +
        className
      }
    >
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleWhats(source)}
        data-component="CarroAutomaticoCTA"
        data-intent="whatsapp"
      >
        <MessageCircle className="w-5 h-5" aria-hidden />
        {label}
      </a>
    </Button>
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DrivingSchool",
        "@id": "https://autoescolaaptos.com.br/#drivingschool",
        name: "Autoescola APTOS",
        url: "https://autoescolaaptos.com.br/",
        telephone: "+5541991453627",
        address: {
          "@type": "PostalAddress",
          addressLocality: "São José dos Pinhais",
          addressRegion: "PR",
          addressCountry: "BR",
        },
      },
      {
        "@type": "Service",
        name: "Aulas práticas em carro automático",
        url: "https://autoescolaaptos.com.br/carro-automatico",
        areaServed: {
          "@type": "City",
          name: "São José dos Pinhais",
        },
        provider: {
          "@id": "https://autoescolaaptos.com.br/#drivingschool",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Início",
            item: "https://autoescolaaptos.com.br/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Aulas práticas",
            item: "https://autoescolaaptos.com.br/aulas-praticas-direcao",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Carro automático",
            item: "https://autoescolaaptos.com.br/carro-automatico",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: campaignFaq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <SEO
        title="Aulas de direção em carro automático | Autoescola APTOS SJP"
        description="Aulas práticas em carro automático na Autoescola APTOS, em São José dos Pinhais. Conheça a opção automática, tire dúvidas e fale com a equipe pelo WhatsApp."
        canonical="/carro-automatico"
        image="/og-image.png"
        jsonLd={jsonLd}
      />

      <Navbar />

      <main className="min-h-screen bg-background pt-20">
        <section className="campaign-automatico relative overflow-hidden border-b border-border bg-background text-foreground">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.18),transparent_38%)]"
          />
          <div className="relative container mx-auto px-4 py-10 md:py-16 lg:py-20">
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/" className="hover:text-primary transition-colors">
                    Início
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link
                    to="/aulas-praticas-direcao"
                    className="hover:text-primary transition-colors"
                  >
                    Aulas práticas
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="font-medium text-foreground">Carro automático</li>
              </ol>
            </nav>

            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                  <Car className="h-4 w-4" aria-hidden />
                  Aulas práticas · Autoescola APTOS
                </div>

                <h1 className="mt-5 max-w-3xl text-4xl font-heading font-black leading-[1.05] md:text-5xl lg:text-6xl">
                  Aprenda a dirigir em{" "}
                  <span className="text-primary">carro automático</span>
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  A opção de carro automático faz parte das aulas práticas da APTOS.
                  Você continua dentro da estrutura completa da autoescola, com
                  orientação da equipe, instrutores credenciados e atendimento em São
                  José dos Pinhais.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <WhatsCTA source="hero" />
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="min-h-[54px] border-border bg-card/70 hover:bg-card"
                  >
                    <Link to="/aulas-praticas-direcao">
                      Ver todas as aulas práticas
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </Button>
                </div>

                <ul className="mt-7 grid gap-3 text-sm sm:grid-cols-2">
                  {[
                    "Opções de carro manual e automático",
                    "Instrutores credenciados pelo DETRAN-PR",
                    "Atendimento em São José dos Pinhais",
                    "WhatsApp oficial da Autoescola APTOS",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative">
                <div className="absolute -inset-3 rounded-[2rem] bg-primary/10 blur-2xl" aria-hidden />
                <figure className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
                  <img
                    src={carroAptos}
                    alt="Veículo da Autoescola APTOS usado nas aulas práticas em São José dos Pinhais"
                    className="aspect-[4/3] w-full object-cover"
                    loading="eager"
                    decoding="async"
                    {...({ fetchpriority: "high" } as Record<string, string>)}
                  />
                  <figcaption className="border-t border-border bg-card px-5 py-4 text-sm text-muted-foreground">
                    Frota APTOS para aulas práticas. Consulte a equipe para confirmar
                    agenda e disponibilidade do veículo automático.
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="experiencia-automatico" className="py-14 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
                Carro automático na APTOS
              </p>
              <h2
                id="experiencia-automatico"
                className="mt-3 text-3xl font-heading font-black md:text-4xl"
              >
                Uma opção a mais dentro das suas aulas práticas
              </h2>
              <p className="mt-4 text-muted-foreground">
                O carro automático faz parte das opções de aulas práticas da Autoescola
                APTOS. Você pode conhecer esta modalidade aqui e continuar pelas páginas
                de primeira habilitação, aulas práticas, reteste ou orçamento conforme o
                que precisar.
              </p>
            </div>

            <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">
              {diferenciaisCarro.map(({ icon: Icon, titulo, texto }) => (
                <article
                  key={titulo}
                  className="rounded-2xl border border-border bg-card p-6 shadow-smooth transition-all hover:-translate-y-1 hover:shadow-medium"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" aria-hidden />
                  </div>
                  <h3 className="mt-5 text-xl font-heading font-bold">{titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {texto}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-9 text-center">
              <WhatsCTA source="secao_carro" label="Consultar aulas no automático" />
            </div>
          </div>
        </section>

        <section
          aria-labelledby="caminhos"
          className="border-y border-border bg-muted/50 py-14 md:py-20"
        >
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
                Continue pelo site
              </p>
              <h2 id="caminhos" className="mt-3 text-3xl font-heading font-black md:text-4xl">
                Encontre o caminho certo para o seu objetivo
              </h2>
              <p className="mt-4 text-muted-foreground">
                Se você ainda está decidindo qual etapa precisa, use os atalhos abaixo.
                Eles levam para as páginas principais da APTOS, sem criar um fluxo
                paralelo.
              </p>
            </div>

            <div className="mx-auto mt-10 grid max-w-6xl gap-5 lg:grid-cols-3">
              {caminhos.map(({ icon: Icon, titulo, texto, href, cta }) => (
                <article
                  key={titulo}
                  className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-smooth"
                >
                  <Icon className="h-7 w-7 text-primary" aria-hidden />
                  <h3 className="mt-4 text-xl font-heading font-bold">{titulo}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {texto}
                  </p>
                  <Link
                    to={href}
                    className="mt-5 inline-flex items-center gap-2 font-bold text-primary hover:underline"
                  >
                    {cta}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="porque-aptos" className="py-14 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="text-center">
                <h2
                  id="porque-aptos"
                  className="text-3xl font-heading font-black md:text-4xl"
                >
                  Por que fazer suas aulas na <span className="text-primary">APTOS</span>?
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Os pontos abaixo já fazem parte da comunicação e da estrutura atual da
                  autoescola.
                </p>
              </div>

              <ul className="mt-10 grid gap-4 sm:grid-cols-2">
                {porQueAptos.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
                  >
                    <ShieldCheck
                      className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                      aria-hidden
                    />
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section aria-labelledby="localizacao" className="pb-14 md:pb-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border bg-foreground text-background">
              <div className="grid gap-8 p-7 md:grid-cols-[1fr_auto] md:items-center md:p-10">
                <div>
                  <div className="flex items-center gap-2 text-primary">
                    <MapPin className="h-5 w-5" aria-hidden />
                    <span className="text-sm font-bold uppercase tracking-[0.14em]">
                      São José dos Pinhais · PR
                    </span>
                  </div>
                  <h2 id="localizacao" className="mt-3 text-2xl font-heading font-black md:text-3xl">
                    Autoescola APTOS, a 4 quadras do DETRAN
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-background/70">
                    Veja a página institucional da APTOS para conhecer localização,
                    serviços e outras informações antes de falar com a equipe.
                  </p>
                </div>
                <Button asChild variant="secondary" size="lg">
                  <Link to="/autoescola-sao-jose-dos-pinhais">
                    Conhecer a APTOS
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <SocialProof variant="compact" />

        <section aria-labelledby="faq-automatico" className="py-14 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <div className="text-center">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
                  Dúvidas frequentes
                </p>
                <h2
                  id="faq-automatico"
                  className="mt-3 text-3xl font-heading font-black md:text-4xl"
                >
                  Antes de agendar suas aulas
                </h2>
              </div>

              <div className="mt-8 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
                {campaignFaq.map((item) => (
                  <details key={item.question} className="group p-5 open:bg-muted/30">
                    <summary className="cursor-pointer list-none font-bold marker:hidden">
                      <span className="flex items-center justify-between gap-4">
                        {item.question}
                        <span
                          aria-hidden
                          className="text-xl text-primary transition-transform group-open:rotate-45"
                        >
                          +
                        </span>
                      </span>
                    </summary>
                    <p className="mt-3 pr-8 text-sm leading-relaxed text-muted-foreground">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <RelatedLinks title="Continue navegando pela APTOS" links={relatedLinks} />

        <section className="border-t border-border bg-primary py-14 text-primary-foreground md:py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-3xl font-heading font-black md:text-4xl">
                Quer saber se o carro automático atende ao que você precisa?
              </h2>
              <p className="mt-4 text-primary-foreground/80">
                Fale com a equipe da APTOS. A conversa já identifica que você veio pela
                página do carro automático.
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <WhatsCTA
                  source="cta_final"
                  className="bg-background text-foreground hover:bg-background/90"
                />
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="min-h-[54px] border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <Link to="/orcamento">
                    Simular orçamento
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <div aria-hidden className="h-20 bg-foreground md:hidden" />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
        <WhatsCTA source="sticky_mobile" className="w-full" />
      </div>
    </>
  );
};

export default CarroAutomatico;
