import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Bike, CheckCircle2, Clock3, MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { readCampaignUtms } from "@/lib/campaignTracking";

const PATH = "/inclusao-categoria-a";
const CAMPAIGN = "inclusao_categoria_a_moto";
const SITE = "https://autoescolaaptos.com.br";
type Moto = "pcx" | "fan160";

const motocicletas = [
  {
    key: "pcx" as const,
    nome: "Honda PCX",
    tipo: "Automática",
    titulo: "Praticidade para aprender",
    descricao: "Uma opção sem troca manual de marchas, com uma experiência de pilotagem mais simples para quem prefere moto automática.",
    imagem: "/campanhas/categoria-a/pcx-aptos-real.webp",
    alt: "Foto real da Honda PCX automática da Autoescola APTOS, na rua em São José dos Pinhais",
  },
  {
    key: "fan160" as const,
    nome: "Honda Fan 160",
    tipo: "Manual",
    titulo: "Aprenda com câmbio manual",
    descricao: "Opção para quem deseja praticar na motocicleta manual e desenvolver controle de embreagem, marchas e frenagem.",
    imagem: "/campanhas/categoria-a/fan160-aptos-real.webp",
    alt: "Foto da Honda Fan 160 azul manual informada pela Autoescola APTOS",
  },
];

const faq = [
  {
    pergunta: "Quem pode fazer a inclusão de categoria A?",
    resposta: "A inclusão da categoria A é destinada a quem já possui CNH e deseja habilitação para motocicletas. A equipe da APTOS confirma os requisitos e etapas do seu processo antes da contratação.",
  },
  {
    pergunta: "Posso escolher entre moto automática e manual?",
    resposta: "A APTOS apresenta as opções Honda PCX automática e Honda Fan 160 manual para o treinamento. A aplicação de cada moto no exame, a disponibilidade e as condições do seu processo são confirmadas pela equipe conforme as regras vigentes do DETRAN-PR.",
  },
  {
    pergunta: "O valor de R$ 750 inclui as taxas do DETRAN?",
    resposta: "Não. A campanha informa R$ 750 à vista pelo plano da autoescola, mais taxas do DETRAN-PR não inclusas, estimadas em média em R$ 399. Taxas oficiais podem variar e devem ser consultadas no momento do processo.",
  },
  {
    pergunta: "Como recebo atendimento para garantir minha vaga?",
    resposta: "Escolha a moto de seu interesse e preencha a triagem rápida. A solicitação é registrada antes do encaminhamento ao WhatsApp, onde a equipe confirma agenda, condições e documentos.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": SITE + PATH + "#service",
      name: "Inclusão de categoria A (moto) — manual ou automática",
      serviceType: "Inclusão de habilitação para motocicleta",
      url: SITE + PATH,
      description: "Inclusão da categoria A com opção de Honda PCX automática ou Honda Fan 160 manual em São José dos Pinhais.",
      provider: { "@id": SITE + "/#drivingschool" },
      areaServed: { "@type": "City", name: "São José dos Pinhais" },
      offers: {
        "@type": "Offer",
        price: "750.00",
        priceCurrency: "BRL",
        description: "Preço à vista do plano da autoescola. Taxas do DETRAN não inclusas (estimativa média R$ 399); condições e agenda sujeitas à confirmação.",
        url: SITE + PATH,
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: SITE + "/" },
        { "@type": "ListItem", position: 2, name: "Inclusão de categoria", item: SITE + "/inclusao-categoria" },
        { "@type": "ListItem", position: 3, name: "Categoria A — moto", item: SITE + PATH },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.map(({ pergunta, resposta }) => ({
        "@type": "Question",
        name: pergunta,
        acceptedAnswer: { "@type": "Answer", text: resposta },
      })),
    },
  ],
};

function getTriagemLink(moto: Moto, utms: ReturnType<typeof readCampaignUtms>) {
  const qs = new URLSearchParams();
  // Atribuição deve preservar a origem real do clique no anúncio; nunca inventar Instagram ou Google.
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const) {
    const value = utms[key];
    if (value) qs.set(key, value.slice(0, 100));
  }
  if (!qs.has("utm_campaign")) qs.set("utm_campaign", CAMPAIGN);
  qs.set("origem", CAMPAIGN);
  qs.set("moto", moto);
  return "/1contato?" + qs.toString();
}

const InclusaoCategoriaA = () => {
  const [moto, setMoto] = useState<Moto>("pcx");
  const utms = useMemo(() => readCampaignUtms(), []);

  useEffect(() => {
    track("campaign_view", { campaign: CAMPAIGN, page_path: PATH, ...utms });
  }, [utms]);

  const triagem = getTriagemLink(moto, utms);

  const goToFunnel = (source: string) => {
    track("campaign_triage_open", { campaign: CAMPAIGN, source, moto_interesse: moto, ...utms });
  };

  return (
    <>
      <SEO
        title="Inclusão de Categoria A Moto por R$ 750 à vista | APTOS SJP"
        description="Inclua categoria A com opção de Honda PCX automática ou Honda Fan 160 manual na Autoescola APTOS em São José dos Pinhais. R$ 750 à vista. Taxas do DETRAN à parte, média de R$ 399."
        canonical={PATH}
        image="/og-image.png"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main className="min-h-screen bg-background pt-20 text-foreground">
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-zinc-950 via-zinc-900 to-red-950 text-white">
          <div className="absolute -right-24 top-0 h-72 w-72 rounded-full bg-red-500/20 blur-3xl" aria-hidden />
          <div className="container relative mx-auto px-4 pb-12 pt-8 md:pb-20 md:pt-12">
            <nav aria-label="Você está aqui" className="mb-8 text-xs text-zinc-300">
              <Link to="/" className="hover:text-white">Início</Link>
              <span aria-hidden className="px-2">/</span>
              <Link to="/inclusao-categoria" className="hover:text-white">Inclusão de categoria</Link>
              <span aria-hidden className="px-2">/</span>
              <span className="text-white">Categoria A</span>
            </nav>

            <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-red-400/50 bg-red-500/20 px-3 py-2 text-xs font-bold uppercase tracking-widest text-red-100">
                  <Bike aria-hidden className="h-4 w-4" /> Campanha APTOS · São José dos Pinhais
                </p>
                <h1 className="mt-5 max-w-2xl text-4xl font-black leading-[1.08] sm:text-5xl lg:text-6xl">
                  Inclusão de <span className="text-yellow-300">categoria A</span> com moto manual ou automática
                </h1>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-200 md:text-lg">
                  Já tem CNH e quer adicionar a categoria de moto? Escolha a opção que prefere e converse com a equipe da Autoescola APTOS.
                </p>
                <div className="mt-7 rounded-2xl border border-yellow-300/60 bg-zinc-950/75 p-5 shadow-xl sm:p-6">
                  <p className="text-sm font-semibold uppercase tracking-widest text-zinc-200">Plano de inclusão · valor à vista</p>
                  <p className="mt-1 text-5xl font-black tracking-tight text-yellow-300 sm:text-6xl">R$ 750<span className="text-3xl sm:text-4xl">,00</span></p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-100">
                    <strong>Taxas do DETRAN não inclusas.</strong> Estimativa média de R$ 399,00, sujeita aos valores oficiais vigentes.
                  </p>
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="min-h-14 bg-red-600 px-7 text-base font-bold text-white hover:bg-red-700">
                    <Link to={triagem} onClick={() => goToFunnel("hero")} data-intent="triagem">
                      <MessageCircle aria-hidden className="mr-2 h-5 w-5" /> Quero minha categoria A
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="min-h-14 border-white/60 bg-transparent text-white hover:bg-white/10 hover:text-white">
                    <a href="#escolher-moto">Escolher minha moto <ArrowRight aria-hidden className="ml-2 h-4 w-4" /></a>
                  </Button>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {motocicletas.map((item) => (
                  <button type="button" key={item.key} onClick={() => {
                      setMoto(item.key);
                      track("campaign_vehicle_select", { campaign: CAMPAIGN, moto_interesse: item.key });
                    }}
                    aria-pressed={moto === item.key}
                    className={`overflow-hidden rounded-2xl border-2 bg-zinc-900 text-left shadow-xl transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-300 ${moto === item.key ? "border-yellow-300" : "border-zinc-700 hover:border-red-400"}`}>
                    <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-white">
                      <img src={item.imagem} alt={item.alt} className="h-full w-full object-contain" loading="eager" decoding="async" />
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-bold uppercase tracking-widest text-yellow-300">{item.tipo}</p>
                      <p className="mt-1 text-lg font-black text-white">{item.nome}</p>
                      <p className="mt-2 text-xs text-zinc-300">{moto === item.key ? "Selecionada para sua triagem" : "Toque para selecionar"}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="escolher-moto" aria-labelledby="motos-titulo" className="scroll-mt-24 py-14 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-primary">Escolha a moto para seu treinamento</p>
              <h2 id="motos-titulo" className="mt-3 text-3xl font-black md:text-4xl">Manual ou automática: qual você prefere?</h2>
              <p className="mt-3 text-muted-foreground">As fotos abaixo são dos veículos informados pela APTOS. A equipe confirma disponibilidade e condições aplicáveis ao seu processo.</p>
            </div>
            <div className="mx-auto mt-9 grid max-w-5xl gap-5 md:grid-cols-2">
              {motocicletas.map(item => (
                <article key={item.key} className={`overflow-hidden rounded-3xl border-2 bg-card shadow-sm transition ${moto === item.key ? "border-primary" : "border-border"}`}>
                  <img src={item.imagem} alt={item.alt} className="aspect-[16/10] w-full bg-white object-contain" loading="lazy" decoding="async" />
                  <div className="p-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">{item.tipo}</span>
                    <h3 className="mt-2 text-2xl font-black">{item.nome}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.descricao}</p>
                    <Button asChild className="mt-5 min-h-12 w-full font-bold">
                      <Link to={getTriagemLink(item.key, utms)} onClick={() => {
                          setMoto(item.key);
                          track("campaign_triage_open", { source: "vehicle_card", campaign: CAMPAIGN, moto_interesse: item.key, ...utms });
                        }}>
                        Quero a {item.tipo.toLowerCase()} <ArrowRight aria-hidden className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-muted/40 py-14">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-black md:text-4xl">O que considerar antes de começar?</h2>
              <p className="mt-3 text-muted-foreground">Condições claras para você iniciar com tranquilidade.</p>
            </div>
            <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-3">
              {[
                { icon: ShieldCheck, title: "Treinamento com orientação", text: "A equipe esclarece o plano e acompanha as etapas da inclusão de categoria." },
                { icon: Clock3, title: "Horários e disponibilidade", text: "O agendamento da moto e do treinamento depende da agenda e das regras aplicáveis." },
                { icon: MapPin, title: "Atendimento em SJP", text: "Autoescola APTOS em São José dos Pinhais, no Paraná." },
              ].map((item) => (
                <article className="rounded-2xl border border-border bg-card p-6" key={item.title}>
                  <item.icon className="h-7 w-7 text-primary" aria-hidden />
                  <h3 className="mt-3 text-lg font-black">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </article>
              ))}
            </div>
            <div className="mx-auto mt-6 max-w-5xl rounded-xl border border-amber-400/40 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950 dark:bg-amber-950/20 dark:text-amber-100">
              <strong>Valores e regras:</strong> R$ 750,00 à vista pelo plano divulgado. Taxas do DETRAN-PR não inclusas (média estimada de R$ 399). A aplicação da moto automática no exame deve ser confirmada com a equipe conforme o processo e as regras atuais.
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20" aria-labelledby="faq-moto">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 id="faq-moto" className="text-center text-3xl font-black md:text-4xl">Dúvidas frequentes</h2>
            <div className="mt-8 space-y-3">
              {faq.map(({ pergunta, resposta }) => (
                <details key={pergunta} className="group rounded-2xl border border-border bg-card p-5">
                  <summary className="cursor-pointer font-bold marker:text-primary">{pergunta}</summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{resposta}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-zinc-950 py-14 text-white">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <p className="text-xs font-black uppercase tracking-widest text-yellow-300">Autoescola APTOS</p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">Pronto para adicionar a categoria A?</h2>
            <p className="mt-3 text-zinc-200">Escolha a moto e faça sua triagem rápida. Você receberá atendimento pelo WhatsApp após o registro da solicitação.</p>
            <Button asChild size="lg" className="mt-6 min-h-14 w-full bg-red-600 px-8 text-base font-bold text-white hover:bg-red-700 sm:w-auto">
              <Link to={triagem} onClick={() => goToFunnel("footer")}>
                <MessageCircle aria-hidden className="mr-2 h-5 w-5" /> Quero saber mais
              </Link>
            </Button>
            <p className="mt-4 text-xs text-zinc-400">Sem pagamento on-line nesta página. A equipe confirma os detalhes antes da contratação.</p>
            <Link to="/carro-automatico" className="mt-7 inline-block text-sm font-semibold text-zinc-300 underline decoration-zinc-600 underline-offset-4 hover:text-white">
              Conheça também nossas aulas de carro automático
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default InclusaoCategoriaA;
