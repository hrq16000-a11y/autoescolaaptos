import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle, CheckCircle, Star, Award, Users, Car, Bike, Clock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import MobileStickyBar from "@/components/MobileStickyBar";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { whatsappLink } from "@/lib/whatsapp";
import fachada from "@/assets/fachada-aptos.jpg";

const faqs = [
  {
    q: "Qual a melhor autoescola em São José dos Pinhais?",
    a: "A Autoescola APTOS é referência em São José dos Pinhais há mais de 15 anos, com 95% de aprovação no DETRAN-PR, frota nova, instrutores credenciados e atendimento humanizado. Estamos próximos ao DETRAN, com aulas práticas em carros novos e curso teórico 100% online pelo app CNH do Brasil.",
  },
  {
    q: "Quanto custa tirar a CNH em São José dos Pinhais?",
    a: "O valor varia conforme a categoria (A, B ou AB), forma de pagamento e taxas do DETRAN-PR. Solicite seu orçamento personalizado pelo nosso simulador — você recebe o valor exato pelo WhatsApp em minutos, sem compromisso.",
  },
  {
    q: "A Autoescola APTOS fica perto do DETRAN de São José dos Pinhais?",
    a: "Sim. Nossa sede fica em localização estratégica, próxima ao DETRAN/Ciretran de São José dos Pinhais, facilitando aulas práticas no circuito oficial e logística no dia das provas.",
  },
  {
    q: "Posso fazer o curso teórico online?",
    a: "Sim. Com a Resolução CONTRAN 1020/2025 o curso teórico é realizado pelo aplicativo oficial CNH do Brasil — você estuda no seu ritmo, de casa, pelo celular. A APTOS te orienta em todo o processo.",
  },
  {
    q: "Quanto tempo demora para tirar a CNH em São José dos Pinhais?",
    a: "Em média de 2 a 4 meses, dependendo da sua disponibilidade para aulas práticas e do agendamento dos exames no DETRAN-PR. Não há mais prazo máximo de 12 meses no Paraná.",
  },
  {
    q: "A APTOS atende quais bairros de São José dos Pinhais?",
    a: "Atendemos toda a cidade — Centro, Afonso Pena, Cidade Jardim, Guatupê, Costeira, São Marcos, Borda do Campo, Rio Pequeno e demais bairros, além da região metropolitana de Curitiba.",
  },
];

const AutoescolaSaoJoseDosPinhais = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Autoescola em São José dos Pinhais | CNH com Aprovação | APTOS"
        description="Autoescola APTOS em São José dos Pinhais: +15 anos, 95% de aprovação no DETRAN-PR, carros novos, curso online e próximo ao DETRAN. Solicite seu orçamento."
        canonical="/autoescola-sao-jose-dos-pinhais"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "DrivingSchool",
              "name": "Autoescola APTOS",
              "url": "https://autoescolaaptos.com.br/autoescola-sao-jose-dos-pinhais",
              "telephone": "+554133833627",
              "image": "https://autoescolaaptos.com.br/og-image.png",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "São José dos Pinhais",
                "addressRegion": "PR",
                "addressCountry": "BR",
              },
              "geo": { "@type": "GeoCoordinates", "latitude": -25.5304, "longitude": -49.2089 },
              "areaServed": "São José dos Pinhais e região metropolitana de Curitiba",
              "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "320" },
            },
            {
              "@type": "FAQPage",
              "mainEntity": faqs.map((f) => ({
                "@type": "Question",
                "name": f.q,
                "acceptedAnswer": { "@type": "Answer", "text": f.a },
              })),
            },
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://autoescolaaptos.com.br/" },
                { "@type": "ListItem", "position": 2, "name": "Autoescola em São José dos Pinhais", "item": "https://autoescolaaptos.com.br/autoescola-sao-jose-dos-pinhais" },
              ],
            },
          ],
        }}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" aria-hidden />
        <div className="container mx-auto px-4 relative">
          <nav className="text-xs text-muted-foreground mb-4" aria-label="breadcrumb">
            <Link to="/" className="hover:text-primary">Início</Link> <span className="mx-1">›</span>
            <span>Autoescola em São José dos Pinhais</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-bold mb-4">
                <MapPin className="w-3.5 h-3.5" />
                São José dos Pinhais · PR
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-heading font-black leading-tight mb-4"
              >
                Autoescola em <span className="text-primary">São José dos Pinhais</span> com aprovação garantida
              </motion.h1>
              <p className="text-lg text-muted-foreground mb-6">
                Há mais de 15 anos, a APTOS é a Centro de Formação de Condutores que mais aprova alunos
                no DETRAN-PR em São José dos Pinhais. Carros novos, curso online e atendimento humano —
                tudo perto do DETRAN.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {["🚗 Carros novos", "📍 Próximo ao DETRAN", "💻 Curso online", "⚡ Atendimento rápido", "⭐ 4,9 no Google"].map((t) => (
                  <span key={t} className="bg-card border border-border text-xs font-semibold px-3 py-1.5 rounded-full">{t}</span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="h-14 text-base shadow-glow" asChild>
                  <Link to="/orcamento">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Simular meu Orçamento
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 text-base" asChild>
                  <a href="https://api.whatsapp.com/send?phone=554133833627href="tel:+554133833627"text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Autoescola%20APTOS." target="_blank" rel="noopener noreferrer">
                    <Phone className="w-5 h-5 mr-2" />
                    (41) 3383-3627
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative">
              <img
                src={fachada}
                alt="Fachada da Autoescola APTOS em São José dos Pinhais"
                loading="eager"
                className="rounded-2xl shadow-large w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl p-4 shadow-large flex items-center gap-3">
                <Star className="w-8 h-8 fill-primary text-primary" />
                <div>
                  <div className="font-bold text-lg leading-none">4,9 / 5</div>
                  <div className="text-xs text-muted-foreground">320+ avaliações no Google</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Award, value: "+15 anos", label: "de mercado" },
            { icon: Users, value: "+5.000", label: "alunos formados" },
            { icon: CheckCircle, value: "95%", label: "de aprovação" },
            { icon: ShieldCheck, value: "DETRAN-PR", label: "credenciada" },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-xl p-5 text-center">
              <s.icon className="w-7 h-7 text-primary mx-auto mb-2" />
              <div className="text-2xl font-heading font-black">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Serviços */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-black text-center mb-3">
            CNH em São José dos Pinhais — todas as categorias
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Escolha o serviço ideal para o seu momento. Todos com orçamento sob medida em minutos.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: Bike, title: "Categoria A — Moto", desc: "Para conduzir motos e ciclomotores. Idade mínima 18 anos.", to: "/categoria-a" },
              { icon: Car, title: "Categoria B — Carro", desc: "Carros e utilitários de até 3.500 kg. Idade mínima 18 anos.", to: "/categoria-b" },
              { icon: Car, title: "Categoria AB — Moto + Carro", desc: "Tire as duas habilitações de uma só vez e economize.", to: "/categoria-ab" },
            ].map((s) => (
              <Link
                key={s.title}
                to={s.to}
                className="group bg-card border border-border rounded-2xl p-6 hover:border-primary hover:shadow-medium transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <s.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{s.desc}</p>
                <span className="text-primary text-sm font-semibold">Saber mais →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Por que APTOS */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-black text-center mb-10">
            Por que escolher a APTOS em São José dos Pinhais?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: MapPin, t: "Localização estratégica", d: "Próximo ao DETRAN-PR de São José dos Pinhais — menos tempo perdido em deslocamento." },
              { icon: Car, t: "Frota nova e segura", d: "Carros novos com direção elétrica, manutenção em dia e instrutores certificados." },
              { icon: Clock, t: "Atendimento rápido", d: "Resposta em até 10 minutos pelo WhatsApp e processo de matrícula simplificado." },
              { icon: CheckCircle, t: "95% de aprovação", d: "Metodologia comprovada, simulados e acompanhamento até o dia da prova." },
              { icon: Award, t: "+15 anos de mercado", d: "Tradição em São José dos Pinhais com milhares de alunos aprovados." },
              { icon: ShieldCheck, t: "100% credenciada DETRAN-PR", d: "Centro de Formação de Condutores oficial, com toda a segurança jurídica." },
            ].map((b) => (
              <div key={b.t} className="bg-card border border-border rounded-xl p-6">
                <b.icon className="w-7 h-7 text-primary mb-3" />
                <h3 className="font-bold mb-2">{b.t}</h3>
                <p className="text-sm text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processo */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-heading font-black text-center mb-10">
            Como tirar sua CNH em São José dos Pinhais — passo a passo
          </h2>
          <ol className="space-y-4">
            {[
              "Solicite seu orçamento — responda 3 perguntas e receba o valor exato no WhatsApp.",
              "Matrícula online, com documentação simplificada.",
              "Curso teórico pelo app oficial CNH do Brasil (no seu ritmo).",
              "Exame teórico no DETRAN-PR (60 minutos, 30 questões, aprovação com 20).",
              "Aulas práticas em carros novos com instrutor credenciado.",
              "Exame prático no DETRAN de São José dos Pinhais — e CNH liberada!",
            ].map((step, i) => (
              <li key={i} className="flex gap-4 bg-card border border-border rounded-xl p-5">
                <span className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <p className="pt-2 text-base">{step}</p>
              </li>
            ))}
          </ol>
          <div className="text-center mt-8">
            <Button size="lg" className="h-14 px-8 shadow-glow" asChild>
              <Link to="/orcamento">Quero começar agora</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-heading font-black text-center mb-10">
            Perguntas frequentes sobre autoescola em São José dos Pinhais
          </h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group bg-card border border-border rounded-xl p-5">
                <summary className="cursor-pointer font-bold flex justify-between items-center">
                  {f.q}
                  <span className="text-primary group-open:rotate-45 transition-transform text-2xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-heading font-black mb-4">
            Pronto para tirar sua CNH em São José dos Pinhais?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Responda 3 perguntas rápidas e receba seu orçamento personalizado no WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="h-14 px-8 shadow-glow" asChild>
              <Link to="/orcamento">
                <MessageCircle className="w-5 h-5 mr-2" />
                Simular meu Orçamento
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8" asChild>
              <a
                href={whatsappLink("Olá! Quero tirar dúvidas sobre a Autoescola APTOS em São José dos Pinhais.", "direto")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Tirar dúvidas
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
      <MobileStickyBar />
    </div>
  );
};

export default AutoescolaSaoJoseDosPinhais;
