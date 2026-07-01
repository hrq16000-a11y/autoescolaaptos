import { Link, useParams, Navigate } from "react-router-dom";
import { Car, Bike, CheckCircle, MessageCircle, Phone, Clock, ShieldCheck, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import MobileStickyBar from "@/components/MobileStickyBar";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { whatsappLink } from "@/lib/whatsapp";

type Slug = "a" | "b" | "ab";

interface CategoriaData {
  slug: Slug;
  letra: string;
  nome: string;
  icon: typeof Car;
  hero: string;
  subtitle: string;
  veiculos: string;
  idadeMin: string;
  beneficios: string[];
  passos: string[];
  faqs: { q: string; a: string }[];
}

const CATEGORIAS: Record<Slug, CategoriaData> = {
  a: {
    slug: "a",
    letra: "A",
    nome: "Categoria A — Moto",
    icon: Bike,
    hero: "CNH Categoria A em São José dos Pinhais",
    subtitle: "Habilitação para motos, scooters e ciclomotores acima de 50 cilindradas. Curso completo na APTOS, com aprovação acima da média do DETRAN-PR.",
    veiculos: "Motos, motonetas, scooters e ciclomotores acima de 50 cilindradas.",
    idadeMin: "18 anos completos",
    beneficios: [
      "Aulas práticas em pista exclusiva, com equipamento de segurança",
      "Simulado real do circuito do DETRAN-PR",
      "Instrutores experientes em duas rodas",
      "Curso teórico online pelo app CNH do Brasil",
    ],
    passos: [
      "Solicite seu orçamento da Categoria A pelo nosso simulador",
      "Matrícula e exames médico e psicotécnico",
      "Curso teórico online (app CNH do Brasil)",
      "Exame teórico no DETRAN-PR",
      "Aulas práticas de moto com instrutor credenciado",
      "Exame prático e liberação da sua CNH A",
    ],
    faqs: [
      { q: "Qual a idade mínima para tirar CNH Categoria A?", a: "18 anos completos, conforme o Código de Trânsito Brasileiro." },
      { q: "Posso tirar A e B juntas?", a: "Sim! Optar pela Categoria AB sai mais barato do que tirar A e B separadas. Solicite o orçamento da AB no nosso simulador." },
      { q: "Quanto custa a CNH A na APTOS?", a: "O valor depende de taxas do DETRAN-PR e da forma de pagamento. Responda 3 perguntas no nosso simulador e receba o valor exato no WhatsApp." },
    ],
  },
  b: {
    slug: "b",
    letra: "B",
    nome: "Categoria B — Carro",
    icon: Car,
    hero: "CNH Categoria B em São José dos Pinhais",
    subtitle: "Habilitação para carros, utilitários e veículos de passeio até 3.500 kg. Aulas práticas em carros novos com direção elétrica.",
    veiculos: "Carros, SUVs, utilitários e veículos de passeio de até 3.500 kg e até 8 passageiros.",
    idadeMin: "18 anos completos",
    beneficios: [
      "Aulas em carros novos com direção elétrica",
      "Instrutores credenciados pelo DETRAN-PR",
      "Treino de baliza no padrão atual do exame",
      "Curso teórico 100% online pelo app CNH do Brasil",
    ],
    passos: [
      "Solicite seu orçamento da Categoria B pelo nosso simulador",
      "Matrícula e exames médico e psicotécnico",
      "Curso teórico online (app CNH do Brasil)",
      "Exame teórico no DETRAN-PR (30 questões, aprovação com 20)",
      "Aulas práticas em carro novo com instrutor",
      "Exame prático e liberação da sua CNH B",
    ],
    faqs: [
      { q: "Quanto tempo leva para tirar a CNH B?", a: "Em média 2 a 4 meses, dependendo da sua disponibilidade. No Paraná não existe mais prazo máximo de 12 meses." },
      { q: "Quantas aulas práticas são obrigatórias?", a: "Com a Resolução CONTRAN 1020/2025, são exigidas no mínimo 2 horas de aula prática — mas a APTOS recomenda mais horas conforme o seu desempenho para garantir aprovação." },
      { q: "Posso fazer a teórica de casa?", a: "Sim. O curso teórico é feito pelo aplicativo oficial CNH do Brasil, no seu celular, no seu ritmo." },
    ],
  },
  ab: {
    slug: "ab",
    letra: "AB",
    nome: "Categoria AB — Moto + Carro",
    icon: Car,
    hero: "CNH Categoria AB em São José dos Pinhais",
    subtitle: "Tire de uma vez só sua habilitação para moto e carro — mais econômico, mais rápido e com a mesma qualidade APTOS.",
    veiculos: "Motos (Categoria A) + carros e utilitários até 3.500 kg (Categoria B), em um único processo.",
    idadeMin: "18 anos completos",
    beneficios: [
      "Economia em relação a tirar A e B separadas",
      "Único curso teórico para as duas categorias",
      "Aulas práticas com moto e carro",
      "Liberdade total: dirija qualquer veículo leve",
    ],
    passos: [
      "Solicite seu orçamento da Categoria AB pelo nosso simulador",
      "Matrícula única para as duas categorias",
      "Curso teórico online (vale para A e B)",
      "Exame teórico no DETRAN-PR",
      "Aulas práticas de moto e de carro",
      "Exames práticos das duas categorias e liberação da CNH AB",
    ],
    faqs: [
      { q: "Vale a pena tirar AB de uma vez?", a: "Sim. Você paga uma única matrícula, faz um único curso teórico e economiza centenas de reais em relação a tirar A e depois B." },
      { q: "Os exames práticos são juntos?", a: "Não. Cada categoria tem seu exame prático específico no DETRAN-PR, mas o processo é todo coordenado pela APTOS." },
      { q: "Posso começar pela moto e depois o carro?", a: "Sim, definimos a melhor sequência junto com você na matrícula." },
    ],
  },
};

const Categoria = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? CATEGORIAS[slug as Slug] : undefined;

  if (!data) return <Navigate to="/" replace />;
  const Icon = data.icon;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${data.hero} | Autoescola APTOS`}
        description={`${data.subtitle.slice(0, 155)}`}
        canonical={`/categoria-${data.slug}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              "name": data.nome,
              "provider": { "@type": "DrivingSchool", "name": "Autoescola APTOS" },
              "areaServed": "São José dos Pinhais, PR",
              "description": data.subtitle,
            },
            {
              "@type": "FAQPage",
              "mainEntity": data.faqs.map((f) => ({
                "@type": "Question",
                "name": f.q,
                "acceptedAnswer": { "@type": "Answer", "text": f.a },
              })),
            },
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://autoescolaaptos.com.br/" },
                { "@type": "ListItem", "position": 2, "name": "Autoescola SJP", "item": "https://autoescolaaptos.com.br/autoescola-sao-jose-dos-pinhais" },
                { "@type": "ListItem", "position": 3, "name": data.nome, "item": `https://autoescolaaptos.com.br/categoria-${data.slug}` },
              ],
            },
          ],
        }}
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-12 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <nav className="text-xs text-muted-foreground mb-4" aria-label="breadcrumb">
            <Link to="/" className="hover:text-primary">Início</Link> <span className="mx-1">›</span>
            <Link to="/autoescola-sao-jose-dos-pinhais" className="hover:text-primary">Autoescola SJP</Link> <span className="mx-1">›</span>
            <span>{data.nome}</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-xs font-bold mb-4">
            <Icon className="w-3.5 h-3.5" />
            CNH {data.letra}
          </div>

          <h1 className="text-4xl md:text-5xl font-heading font-black mb-4 leading-tight">{data.hero}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-6">{data.subtitle}</p>

          <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mb-8">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-xs text-muted-foreground font-semibold uppercase">Veículos permitidos</div>
              <div className="text-sm font-medium mt-1">{data.veiculos}</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-xs text-muted-foreground font-semibold uppercase">Idade mínima</div>
              <div className="text-sm font-medium mt-1">{data.idadeMin}</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="h-14 px-8 shadow-glow" asChild>
              <Link to="/orcamento">
                <MessageCircle className="w-5 h-5 mr-2" />
                Quero saber valores
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8" asChild>
              <a href="https://api.whatsapp.com/send?phone=554133833627&amp;text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Autoescola%20APTOS." target="_blank" rel="noopener noreferrer" target="_blank" rel="noopener noreferrer">
                <Phone className="w-5 h-5 mr-2" />
                (41) 3383-3627
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-heading font-black mb-8">Por que tirar a {data.nome} na APTOS</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {data.beneficios.map((b) => (
              <div key={b} className="flex gap-3 bg-card border border-border rounded-xl p-5">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                <p>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Passo a passo */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-heading font-black mb-8 text-center">Passo a passo da {data.nome}</h2>
          <ol className="space-y-3">
            {data.passos.map((p, i) => (
              <li key={i} className="flex gap-4 bg-card border border-border rounded-xl p-5">
                <span className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                <p className="pt-2">{p}</p>
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

      {/* FAQ */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-heading font-black text-center mb-8">Perguntas frequentes — {data.nome}</h2>
          <div className="space-y-3">
            {data.faqs.map((f) => (
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

      {/* CTA */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl font-heading font-black mb-4">Pronto para começar a {data.nome}?</h2>
          <p className="text-muted-foreground mb-8">Responda 3 perguntas e receba seu orçamento personalizado em minutos.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="h-14 px-8 shadow-glow" asChild>
              <Link to="/orcamento">
                <MessageCircle className="w-5 h-5 mr-2" />
                Simular meu Orçamento
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8" asChild>
              <a
                href={whatsappLink(`Olá! Quero tirar dúvidas sobre a ${data.nome} na Autoescola APTOS.`, "direto")}
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

export default Categoria;
