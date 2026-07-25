import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import {
  Accessibility,
  HeartHandshake,
  Stethoscope,
  Car,
  ShieldCheck,
  ClipboardList,
  Phone,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import MobileStickyBar from "@/components/MobileStickyBar";
import CTAButton from "@/components/CTAButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SITE = "https://autoescolaaptos.com.br";

const ETAPAS = [
  {
    icon: ClipboardList,
    title: "Abertura do processo com laudo",
    desc: "Você inicia com seu laudo médico atualizado. Cuidamos da documentação junto ao DETRAN-PR.",
  },
  {
    icon: Stethoscope,
    title: "Junta Médica Especial do DETRAN-PR",
    desc: "Avaliação por médicos peritos que definem categoria e código de adaptação veicular (se necessário).",
  },
  {
    icon: HeartHandshake,
    title: "Curso teórico acessível",
    desc: "100% online pelo app CNH do Brasil, no seu ritmo. Sem carga horária mínima obrigatória.",
  },
  {
    icon: Car,
    title: "Aulas práticas em veículo adaptado",
    desc: "Câmbio automático e adaptações conforme laudo. Instrutores especializados em condução PCD.",
  },
  {
    icon: ShieldCheck,
    title: "Prova prática e emissão da CNH Especial",
    desc: "Sua CNH sai com o código específico de adaptação — válida em todo o território nacional.",
  },
];

const FAQ = [
  {
    q: "Quem tem direito à Habilitação Especial (PCD)?",
    a: "Toda pessoa com deficiência física, auditiva, visual (monocular), motora ou com condições permanentes de saúde que exijam adaptação ou observação especial na condução. A definição final é feita pela Junta Médica Especial do DETRAN-PR.",
  },
  {
    q: "Preciso ter um carro adaptado para começar?",
    a: "Não. Aqui na Autoescola APTOS você faz as aulas práticas em veículo já adaptado, com câmbio automático e itens conforme o código do seu laudo. Comprar carro adaptado só depois da CNH pronta.",
  },
  {
    q: "Qual a diferença da CNH PCD para a comum?",
    a: "A CNH PCD traz um código específico (ex.: X, Y, Z, A) que informa a adaptação necessária no veículo. No mais, dá os mesmos direitos de condução da categoria obtida (normalmente B).",
  },
  {
    q: "Quanto tempo leva o processo PCD em São José dos Pinhais?",
    a: "Depende principalmente do agendamento da Junta Médica Especial. Em média o processo completo leva de 3 a 5 meses. Assim que sai o parecer, aceleramos suas aulas práticas.",
  },
  {
    q: "Existem descontos ou isenção de taxas para PCD?",
    a: "As taxas do DETRAN-PR seguem tabela normal, mas orientamos sobre isenção de IPVA, ICMS e IPI na compra futura do veículo, além de linhas específicas de financiamento acessível.",
  },
  {
    q: "Vocês atendem PCD em todos os bairros de São José dos Pinhais?",
    a: "Sim. Atendemos Centro, Afonso Pena, Cidade Jardim, Guatupê, Costeira, Borda do Campo, São Marcos e Rio Pequeno, com deslocamento facilitado nas aulas práticas.",
  },
];

const HabilitacaoPCD = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Habilitação Especial PCD em São José dos Pinhais",
        description:
          "CNH Especial para pessoas com deficiência (PCD) com veículos adaptados, câmbio automático e acompanhamento na Junta Médica Especial do DETRAN-PR.",
        provider: {
          "@type": "DrivingSchool",
          name: "Autoescola APTOS",
          address: {
            "@type": "PostalAddress",
            addressLocality: "São José dos Pinhais",
            addressRegion: "PR",
            addressCountry: "BR",
          },
        },
        areaServed: ["São José dos Pinhais"],
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Autoescola PCD em São José dos Pinhais | Habilitação Especial | APTOS</title>
        <meta
          name="description"
          content="Autoescola PCD em São José dos Pinhais: Habilitação Especial com veículos adaptados, câmbio automático e apoio na Junta Médica Especial do DETRAN-PR. Fale no WhatsApp."
        />
        <link rel="canonical" href={`${SITE}/pcd`} />
        <meta property="og:title" content="Autoescola PCD em São José dos Pinhais — Habilitação Especial" />
        <meta property="og:description" content="CNH Especial para pessoas com deficiência: veículos adaptados, câmbio automático e acompanhamento na Junta Médica Especial." />
        <meta property="og:url" content={`${SITE}/pcd`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Navbar />

      <main className="pt-24 pb-16">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="container mx-auto px-4 py-10 md:py-16 grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                <Accessibility className="w-4 h-4" aria-hidden /> Habilitação Especial · PCD
              </span>
              <h1 className="text-3xl md:text-5xl font-heading font-black leading-tight mb-4">
                Autoescola PCD em São José dos Pinhais
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Sua Habilitação Especial com <strong>veículos adaptados</strong>, câmbio automático
                e instrutores preparados para acolher e ensinar com paciência. Cuidamos de todo o
                processo com a <strong>Junta Médica Especial do DETRAN-PR</strong>.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <CTAButton
                  intent="whatsapp"
                  trackingSource="pcd_hero"
                  trackingLabel="falar_com_especialista_pcd"
                  message="Olá! Quero informações sobre a Habilitação PCD (Especial) na Autoescola APTOS."
                >
                  Falar com especialista PCD
                </CTAButton>
                <CTAButton
                  intent="telefone"
                  trackingSource="pcd_hero"
                  variant="outline"
                  showIcon={false}
                >
                  <Phone className="w-5 h-5 mr-2" aria-hidden /> WhatsApp (41) 3383-3627
                </CTAButton>
              </div>
              <ul className="mt-6 grid grid-cols-2 gap-2 text-sm">
                {[
                  "Veículos com câmbio automático",
                  "Instrutores capacitados",
                  "Apoio na Junta Médica",
                  "Atendimento humanizado",
                ].map((it) => (
                  <li key={it} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" aria-hidden /> {it}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/10 border border-border shadow-large flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-glow">
                    <Accessibility className="w-12 h-12" aria-hidden />
                  </div>
                  <p className="font-heading font-black text-2xl">Autonomia sobre 4 rodas</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Sua independência começa aqui.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section className="py-14 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl md:text-4xl font-heading font-black mb-3">
                Como funciona a Habilitação PCD
              </h2>
              <p className="text-muted-foreground">
                Cada etapa é acompanhada por nossa equipe. Você não passa por burocracia sozinho.
              </p>
            </div>
            <ol className="max-w-3xl mx-auto space-y-4">
              {ETAPAS.map((e, i) => {
                const Icon = e.icon;
                return (
                  <li
                    key={e.title}
                    className="flex gap-4 bg-card border border-border rounded-2xl p-5 shadow-smooth"
                  >
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-5 h-5 text-primary" aria-hidden />
                        <h3 className="font-bold">{e.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{e.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* VEÍCULOS ADAPTADOS */}
        <section className="py-14">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-heading font-black text-center mb-8">
              Veículos adaptados para você aprender com segurança
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { t: "Câmbio automático", d: "Menos esforço, mais foco no trânsito." },
                { t: "Acelerador manual (quando indicado)", d: "Adaptação conforme código do laudo." },
                { t: "Direção elétrica", d: "Manobras leves e precisas em baixa velocidade." },
              ].map((v) => (
                <div key={v.t} className="bg-card border border-border rounded-2xl p-5 text-center">
                  <Car className="w-8 h-8 text-primary mx-auto mb-2" aria-hidden />
                  <h3 className="font-bold mb-1">{v.t}</h3>
                  <p className="text-sm text-muted-foreground">{v.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 bg-muted/30">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-heading font-black text-center mb-8">
              Perguntas frequentes sobre CNH PCD
            </h2>
            <Accordion type="single" collapsible className="bg-card border border-border rounded-2xl divide-y">
              {FAQ.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`} className="border-none px-5">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-14">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-3xl p-8 md:p-10 text-center shadow-glow">
              <h2 className="text-2xl md:text-3xl font-heading font-black mb-3">
                Pronto para conquistar sua autonomia?
              </h2>
              <p className="opacity-90 mb-6">
                Fale agora com nossa equipe especializada em Habilitação PCD. Atendimento respeitoso,
                sem pressa e sem promessas vazias.
              </p>
              <CTAButton
                intent="whatsapp"
                trackingSource="pcd_cta_final"
                trackingLabel="pcd_final"
                message="Olá! Quero conversar com um especialista sobre a Habilitação PCD."
                variant="secondary"
              >
                Falar com um especialista PCD
              </CTAButton>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
      <MobileStickyBar />
    </div>
  );
};

export default HabilitacaoPCD;
