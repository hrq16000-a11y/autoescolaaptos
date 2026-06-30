import { Link, useLocation, Navigate } from "react-router-dom";
import { CheckCircle, Award, Clock, ShieldCheck, MapPin, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import MobileStickyBar from "@/components/MobileStickyBar";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CTAButton from "@/components/CTAButton";
import SocialProof from "@/components/SocialProof";
import RelatedLinks from "@/components/RelatedLinks";
import { SERVICOS } from "@/data/servicosData";

const Servico = () => {
  const location = useLocation();
  const slug = location.pathname.replace(/^\//, "");
  const data = slug ? SERVICOS[slug] : undefined;
  if (!data) return <Navigate to="/" replace />;

  const Icon = data.icon;
  const url = `https://autoescolaaptos.com.br/${data.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: data.serviceType,
        serviceType: data.serviceType,
        description: data.metaDescription,
        provider: {
          "@type": "DrivingSchool",
          name: "Autoescola APTOS",
          telephone: "+554133833627",
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
        },
        areaServed: { "@type": "City", name: "São José dos Pinhais" },
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          priceCurrency: "BRL",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: data.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: "https://autoescolaaptos.com.br/" },
          { "@type": "ListItem", position: 2, name: "Autoescola SJP", item: "https://autoescolaaptos.com.br/autoescola-sao-jose-dos-pinhais" },
          { "@type": "ListItem", position: 3, name: data.badge, item: url },
        ],
      },
    ],
  };

  const relatedLinks = Object.values(SERVICOS)
    .filter((s) => s.slug !== data.slug)
    .slice(0, 3)
    .map((s) => ({
      title: s.h1,
      href: `/${s.slug}`,
      description: s.heroSubtitle.slice(0, 100) + "...",
    }))
    .concat([
      {
        title: "Autoescola em São José dos Pinhais",
        href: "/autoescola-sao-jose-dos-pinhais",
        description: "Nossa página principal com tudo sobre a APTOS em SJP.",
      },
      {
        title: "Simulado DETRAN-PR",
        href: "/simulado-detran-pr",
        description: "Teste seus conhecimentos com nosso simulado gratuito de 30 questões.",
      },
      {
        title: "Perguntas Frequentes",
        href: "/perguntas-frequentes",
        description: "Dúvidas sobre processo, taxas, prazos e DETRAN-PR.",
      },
    ]);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={data.metaTitle}
        description={data.metaDescription}
        canonical={`/${data.slug}`}
        jsonLd={jsonLd}
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-12 bg-gradient-to-br from-primary/10 via-background to-secondary/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <nav className="text-xs text-muted-foreground mb-4" aria-label="breadcrumb">
            <Link to="/" className="hover:text-primary">Início</Link>
            <span className="mx-1">›</span>
            <Link to="/autoescola-sao-jose-dos-pinhais" className="hover:text-primary">Autoescola SJP</Link>
            <span className="mx-1">›</span>
            <span className="text-foreground">{data.badge}</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-xs font-bold mb-4">
            <Icon className="w-3.5 h-3.5" />
            {data.badge}
          </div>

          <h1 className="text-4xl md:text-5xl font-heading font-black mb-4 leading-tight">
            {data.h1}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-6">{data.heroSubtitle}</p>

          <div className="grid sm:grid-cols-3 gap-3 max-w-3xl mb-8">
            <div className="bg-card border border-border rounded-lg p-4 flex gap-3 items-start">
              <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs text-muted-foreground font-semibold uppercase">Para quem é</div>
                <div className="text-sm font-medium mt-1">{data.publicoAlvo.slice(0, 60)}...</div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 flex gap-3 items-start">
              <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs text-muted-foreground font-semibold uppercase">Duração</div>
                <div className="text-sm font-medium mt-1">{data.duracao}</div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 flex gap-3 items-start">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs text-muted-foreground font-semibold uppercase">Onde</div>
                <div className="text-sm font-medium mt-1">São José dos Pinhais — PR</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <CTAButton intent="funil" trackingSource={`servico_${data.slug}_hero`}>
              {data.ctaPrincipal}
            </CTAButton>
            <CTAButton intent="telefone" variant="outline" trackingSource={`servico_${data.slug}_hero`}>
              (41) 3383-3627
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Por que */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-heading font-black mb-4">Por que escolher este serviço</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{data.porQue}</p>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-heading font-black mb-8">
            Como a APTOS entrega {data.badge.toLowerCase()}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {data.beneficios.map((b) => (
              <article key={b.title} className="bg-card border border-border rounded-xl p-5 hover:border-primary transition-colors">
                <div className="flex gap-3 mb-2">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                  <h3 className="font-heading font-black text-lg">{b.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-9">{b.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Passo a passo */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-heading font-black mb-8 text-center">
            Passo a passo: {data.badge}
          </h2>
          <ol className="space-y-3">
            {data.passos.map((p, i) => (
              <li key={i} className="flex gap-4 bg-card border border-border rounded-xl p-5">
                <span className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold mb-1">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="text-center mt-8">
            <CTAButton intent="funil" trackingSource={`servico_${data.slug}_passos`}>
              {data.ctaPrincipal}
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Pré-requisitos & Diferenciais */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 max-w-5xl">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-2xl font-heading font-black mb-4">Pré-requisitos</h2>
            <ul className="space-y-2">
              {data.preRequisitos.map((r) => (
                <li key={r} className="flex gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-2xl font-heading font-black mb-4">Diferenciais APTOS</h2>
            <ul className="space-y-2">
              {data.diferenciais.map((d) => (
                <li key={d} className="flex gap-2 text-sm">
                  <Award className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-12">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
          {[
            { icon: Award, t: "+15 anos", s: "no mercado" },
            { icon: CheckCircle, t: "95%", s: "aprovação" },
            { icon: ShieldCheck, t: "DETRAN-PR", s: "credenciada" },
            { icon: Clock, t: "Rápido", s: "atendimento humano" },
          ].map((x) => (
            <div key={x.s} className="text-center bg-card border border-border rounded-xl p-4">
              <x.icon className="w-7 h-7 text-primary mx-auto mb-1" />
              <div className="font-heading font-black">{x.t}</div>
              <div className="text-xs text-muted-foreground">{x.s}</div>
            </div>
          ))}
        </div>
      </section>

      <SocialProof variant="compact" />

      {/* FAQ */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-heading font-black text-center mb-8">
            Perguntas frequentes — {data.badge}
          </h2>
          <div className="space-y-3">
            {data.faqs.map((f) => (
              <details key={f.q} className="group bg-card border border-border rounded-xl p-5">
                <summary className="cursor-pointer font-bold flex justify-between items-center gap-3">
                  <span>{f.q}</span>
                  <span className="text-primary group-open:rotate-45 transition-transform text-2xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl font-heading font-black mb-4">Pronto para começar?</h2>
          <p className="text-muted-foreground mb-8">
            Responda 3 perguntas e receba seu orçamento personalizado em minutos no WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <CTAButton intent="funil" trackingSource={`servico_${data.slug}_cta_final`}>
              {data.ctaPrincipal}
            </CTAButton>
            <CTAButton
              intent="whatsapp"
              variant="outline"
              trackingSource={`servico_${data.slug}_cta_final`}
              message={`Olá! Tenho dúvidas sobre ${data.badge} na Autoescola APTOS.`}
            >
              {data.ctaSecundario}
            </CTAButton>
          </div>
        </div>
      </section>

      <RelatedLinks links={relatedLinks} />

      <Footer />
      <FloatingWhatsApp />
      <MobileStickyBar />
    </div>
  );
};

export default Servico;
