import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Star, ShieldCheck, Clock, Award, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import { track, trackConversion } from "@/lib/analytics";
import { whatsappLink, DEFAULT_MESSAGES } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/events";
import heroImage from "@/assets/hero-image.webp";
import { recordCampaignEvent, readCampaignUtms } from "@/lib/campaignTracking";

/**
 * Landing page de campanha (tráfego pago) — /campanha
 * Objetivo único: levar o clique final para /ofertas (opt-in) ou WhatsApp.
 * Mobile-first, CTA acima da dobra, sinais de confiança fortes.
 */

const beneficios = [
  { icon: Award, titulo: "Autoescola credenciada DETRAN-PR", texto: "Processo 100% dentro da Resolução CONTRAN 1020/2025." },
  { icon: Clock, titulo: "CNH em até 2 a 4 meses", texto: "Turmas frequentes e agenda flexível para aulas práticas." },
  { icon: ShieldCheck, titulo: "Sem pegadinha no orçamento", texto: "Você recebe os valores e condições por escrito, sem taxa surpresa." },
  { icon: Star, titulo: "Nota 4,9 no Google", texto: "Centenas de alunos aprovados em São José dos Pinhais." },
];

const depoimentos = [
  { nome: "Camila R.", texto: "Tirei minha CNH B na APTOS e passei de primeira. Atendimento excelente do início ao fim." },
  { nome: "Diego M.", texto: "Fiz a inclusão da categoria A. Agenda flexível, instrutores muito pacientes." },
  { nome: "Jéssica P.", texto: "Melhor custo-benefício de São José dos Pinhais. Recomendo demais." },
];

const planos = [
  { nome: "Primeira Habilitação", desc: "Categoria A, B ou AB com acompanhamento completo até a aprovação.", destaque: true },
  { nome: "Inclusão de Categoria", desc: "Já tem CNH? Inclua a moto ou o carro com aulas objetivas." },
  { nome: "Aulas Práticas / Reteste", desc: "Reforço de direção e preparação para reteste prático." },
];

const Campanha = () => {
  useEffect(() => {
    const utms = readCampaignUtms();
    track("campaign_view", { page_path: "/campanha", campaign: "campanha_geral", ...utms });
    recordCampaignEvent("campanha_geral", "view", "landing");
  }, []);

  const goOfertas = (source: string) => {
    trackConversion("campaign_cta_click", { source, destination: "/ofertas" });
  };

  return (
    <>
      <SEO
        title="CNH em São José dos Pinhais | Autoescola APTOS Credenciada"
        description="Tire sua CNH na Autoescola APTOS em São José dos Pinhais: primeira habilitação, inclusão de categoria e aulas práticas. Nota 4,9 no Google. Fale agora e receba condições exclusivas."
        canonical="/campanha"
      />

      <main className="min-h-screen bg-background">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <img
            src={heroImage}
            alt="Aluno da Autoescola APTOS durante aula prática em São José dos Pinhais"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            {...({ fetchpriority: "high" } as Record<string, string>)}
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/70" />
          <div className="relative container mx-auto px-4 py-14 md:py-24 max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1.5 text-xs font-bold uppercase tracking-wide">
              <Star className="w-4 h-4" aria-hidden /> Nota 4,9 no Google
            </span>
            <h1 className="mt-4 text-3xl md:text-5xl font-bold leading-tight">
              Sua CNH em São José dos Pinhais com quem aprova de verdade
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Autoescola credenciada ao DETRAN-PR. Condições exclusivas para quem chega
              hoje: cadastre seu WhatsApp e receba a oferta do mês.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link
                to="/ofertas"
                onClick={() => goOfertas("hero")}
                className="inline-flex items-center justify-center gap-2 min-h-[56px] px-7 rounded-xl bg-primary text-primary-foreground font-bold text-base shadow-glow hover:opacity-95 active:scale-[0.98] transition"
              >
                Quero minha oferta exclusiva <ArrowRight className="w-5 h-5" aria-hidden />
              </Link>
              <a
                href={whatsappLink(DEFAULT_MESSAGES.funil, "funil")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackWhatsAppClick({ source: "campanha_hero", kind: "funil" });
                  recordCampaignEvent("campanha_geral", "whatsapp_click", "hero");
                }}
                className="inline-flex items-center justify-center gap-2 min-h-[56px] px-7 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-base transition"
              >
                Falar com a APTOS
              </a>
            </div>

            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              {["Credenciada DETRAN-PR", "Aulas manhã, tarde e noite", "Atendimento humano"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-primary" aria-hidden /> {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* BENEFÍCIOS */}
        <section aria-labelledby="beneficios" className="py-14 border-t border-border">
          <div className="container mx-auto px-4">
            <h2 id="beneficios" className="text-2xl md:text-3xl font-bold text-center">
              Por que escolher a Autoescola APTOS
            </h2>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {beneficios.map(({ icon: Icon, titulo, texto }) => (
                <article key={titulo} className="rounded-xl border border-border bg-card p-5">
                  <Icon className="w-6 h-6 text-primary" aria-hidden />
                  <h3 className="mt-3 font-bold">{titulo}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{texto}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PLANOS */}
        <section aria-labelledby="planos" className="py-14 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 id="planos" className="text-2xl md:text-3xl font-bold text-center">
              Escolha o seu serviço
            </h2>
            <p className="text-center text-muted-foreground mt-2">
              Valores e condições confirmados no atendimento, sem taxa surpresa.
            </p>
            <div className="mt-8 grid md:grid-cols-3 gap-4">
              {planos.map((p) => (
                <article
                  key={p.nome}
                  className={`rounded-xl border bg-card p-6 flex flex-col ${
                    p.destaque ? "border-primary shadow-glow" : "border-border"
                  }`}
                >
                  {p.destaque && (
                    <span className="self-start text-[11px] font-bold uppercase tracking-wide bg-primary text-primary-foreground rounded-full px-2.5 py-1">
                      Mais procurado
                    </span>
                  )}
                  <h3 className="mt-3 text-lg font-bold">{p.nome}</h3>
                  <p className="mt-2 text-sm text-muted-foreground flex-1">{p.desc}</p>
                  <Link
                    to="/ofertas"
                    onClick={() => goOfertas(`plano_${p.nome}`)}
                    className="mt-5 inline-flex items-center justify-center min-h-[48px] rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:opacity-95 transition"
                  >
                    Receber condições
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* DEPOIMENTOS */}
        <section aria-labelledby="depoimentos" className="py-14">
          <div className="container mx-auto px-4">
            <h2 id="depoimentos" className="text-2xl md:text-3xl font-bold text-center">
              Quem já passou por aqui
            </h2>
            <div className="mt-8 grid md:grid-cols-3 gap-4">
              {depoimentos.map((d) => (
                <figure key={d.nome} className="rounded-xl border border-border bg-card p-5">
                  <div className="flex gap-0.5 text-primary" aria-label="5 estrelas">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" aria-hidden />
                    ))}
                  </div>
                  <blockquote className="mt-3 text-sm text-foreground/90">“{d.texto}”</blockquote>
                  <figcaption className="mt-3 text-xs font-semibold text-muted-foreground">{d.nome}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-16 bg-primary/5 border-t border-border">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold">
              Pronto para começar sua CNH ainda este mês?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Cadastre seu WhatsApp e receba as condições exclusivas da campanha.
              Leva menos de 30 segundos e não tem compromisso.
            </p>
            <Link
              to="/ofertas"
              onClick={() => goOfertas("cta_final")}
              className="mt-7 inline-flex items-center justify-center gap-2 min-h-[56px] px-8 rounded-xl bg-primary text-primary-foreground font-bold shadow-glow hover:opacity-95 transition"
            >
              Quero minha oferta exclusiva <ArrowRight className="w-5 h-5" aria-hidden />
            </Link>
            <p className="mt-4 text-xs text-muted-foreground">
              Seus dados são usados apenas para contato sobre a CNH. Você pode cancelar quando quiser.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Campanha;
