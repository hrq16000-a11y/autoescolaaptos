import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  CheckCircle2,
  XCircle,
  RefreshCw,
  Trophy,
  BookOpen,
  Clock,
  Target,
  ListChecks,
  MessageCircle,
} from "lucide-react";
import { simuladoQuestions } from "@/data/simuladoQuestions";

const TOTAL = simuladoQuestions.length;
const PASS = 20; // mínimo de acertos pelas regras do DETRAN-PR pós Resolução 1020/2025

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const faqs = [
  {
    q: "Como funciona o simulado do DETRAN PR?",
    a: "Nosso simulado tem 30 questões de múltipla escolha, idênticas em formato à prova oficial do DETRAN-PR. Você responde, recebe correção imediata, explicação de cada questão e o resultado final com base na nova regra: aprovação a partir de 20 acertos das 30 questões.",
  },
  {
    q: "Quantas questões tem a prova teórica do DETRAN PR?",
    a: "A prova teórica do DETRAN-PR tem 30 questões. Pela Resolução CONTRAN 1020/2025, são necessários 20 acertos (antes eram 21) e o tempo aumentou de 50 para 60 minutos (120 minutos para candidatos com dislexia, TDAH ou TEA).",
  },
  {
    q: "Como estudar para o simulado do DETRAN PR pelo celular?",
    a: "Basta abrir esta página pelo navegador do celular — o simulado é 100% responsivo. Você também pode usar o aplicativo CNH do Brasil para as aulas teóricas oficiais e voltar aqui para treinar com questões revisadas.",
  },
  {
    q: "O simulado é igual à prova oficial do DETRAN-PR?",
    a: "As questões seguem o mesmo padrão de Legislação, Direção Defensiva, Primeiros Socorros, Mecânica e Cidadania, mas o DETRAN-PR usa o Banco Nacional de Questões em sincronização. Treinar aqui te prepara para o estilo, vocabulário e raciocínio cobrados.",
  },
  {
    q: "O simulado é gratuito?",
    a: "Sim. O simulado é 100% grátis, sem cadastro e sem limite de tentativas. Quantas vezes você quiser refazer, é só clicar em 'Refazer simulado'.",
  },
  {
    q: "Quantas vezes posso refazer o simulado?",
    a: "Sem limite. Recomendamos refazer até atingir consistentemente 25 acertos ou mais — é a melhor forma de chegar tranquilo na prova oficial do DETRAN-PR.",
  },
  {
    q: "Quais matérias caem no simulado teórico do DETRAN PR?",
    a: "Legislação de Trânsito (CTB), Direção Defensiva, Primeiros Socorros, Mecânica Básica e Meio Ambiente e Cidadania. As mesmas áreas cobradas na prova oficial.",
  },
  {
    q: "Tirei menos de 20 acertos no simulado, e agora?",
    a: "Refaça lendo as explicações de cada questão errada. Quem refaz o simulado pelo menos 3 vezes e acerta 25+ tem altíssima chance de aprovação na primeira tentativa do DETRAN-PR.",
  },
];

const SimuladoDetranPr = () => {
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState(() => shuffle(simuladoQuestions));
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplain, setShowExplain] = useState(false);
  const [finished, setFinished] = useState(false);

  const correctCount = useMemo(
    () =>
      answers.reduce(
        (acc, a, i) => (a === questions[i].correctIndex ? acc + 1 : acc),
        0
      ),
    [answers, questions]
  );

  const handleStart = () => {
    setQuestions(shuffle(simuladoQuestions));
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
    setShowExplain(false);
    setFinished(false);
    setStarted(true);
    setTimeout(() => {
      document.getElementById("simulado-quiz")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const handleConfirm = () => {
    if (selected === null) return;
    setShowExplain(true);
  };

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);
    setShowExplain(false);
    if (current + 1 >= TOTAL) {
      setFinished(true);
      setTimeout(() => {
        document.getElementById("simulado-quiz")?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    } else {
      setCurrent(current + 1);
    }
  };

  const q = questions[current];
  const approved = correctCount >= PASS;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  };

  return (
    <>
      <SEO
        title="Simulado DETRAN PR 2026 Grátis | 30 Questões Atualizadas - APTOS"
        description="Simulado DETRAN PR grátis com 30 questões atualizadas pela Resolução 1020/2025. Treine para a prova teórica online, com gabarito e explicações. Sem cadastro."
        canonical="/simulado-detran-pr"
        jsonLd={jsonLd}
      />

      <main className="min-h-screen bg-background">
        <Navbar />

        {/* Hero */}
        <section className="pt-28 pb-12 bg-gradient-to-br from-primary/10 via-background to-secondary/5">
          <div className="container mx-auto px-4 max-w-4xl">
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild><Link to="/">Início</Link></BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Simulado DETRAN PR</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <Badge className="mb-4">Atualizado para a Resolução 1020/2025</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Simulado DETRAN PR 2026 — Grátis e Online
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Treine para a prova teórica do DETRAN-PR com <strong>30 questões atualizadas</strong>, gabarito imediato
              e explicação de cada resposta. Sem cadastro, sem limite e 100% gratuito.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              <div className="bg-card border rounded-lg p-3 text-center">
                <ListChecks className="w-5 h-5 mx-auto mb-1 text-primary" />
                <div className="text-sm font-semibold">30 questões</div>
              </div>
              <div className="bg-card border rounded-lg p-3 text-center">
                <Target className="w-5 h-5 mx-auto mb-1 text-primary" />
                <div className="text-sm font-semibold">20 para aprovar</div>
              </div>
              <div className="bg-card border rounded-lg p-3 text-center">
                <Clock className="w-5 h-5 mx-auto mb-1 text-primary" />
                <div className="text-sm font-semibold">Sem tempo limite</div>
              </div>
              <div className="bg-card border rounded-lg p-3 text-center">
                <BookOpen className="w-5 h-5 mx-auto mb-1 text-primary" />
                <div className="text-sm font-semibold">Com explicações</div>
              </div>
            </div>

            {!started && (
              <Button size="lg" className="shadow-glow" onClick={handleStart}>
                Iniciar Simulado Agora
              </Button>
            )}
          </div>
        </section>

        {/* Quiz */}
        <section id="simulado-quiz" className="py-12">
          <div className="container mx-auto px-4 max-w-3xl">
            {started && !finished && (
              <Card className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary">{q.category}</Badge>
                  <span className="text-sm text-muted-foreground">
                    Questão {current + 1} de {TOTAL}
                  </span>
                </div>
                <Progress value={((current) / TOTAL) * 100} className="mb-6" />

                <h2 className="text-xl md:text-2xl font-semibold mb-6">{q.question}</h2>

                <div className="space-y-3 mb-6">
                  {q.options.map((opt, idx) => {
                    const isSelected = selected === idx;
                    const isCorrect = idx === q.correctIndex;
                    const showState = showExplain;
                    return (
                      <button
                        key={idx}
                        onClick={() => !showExplain && setSelected(idx)}
                        disabled={showExplain}
                        className={`w-full text-left p-4 border-2 rounded-lg transition-all ${
                          showState && isCorrect
                            ? "border-green-500 bg-green-500/10"
                            : showState && isSelected && !isCorrect
                            ? "border-destructive bg-destructive/10"
                            : isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="font-bold text-primary">
                            {String.fromCharCode(65 + idx)})
                          </span>
                          <span className="flex-1">{opt}</span>
                          {showState && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                          {showState && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-destructive" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {showExplain && (
                  <div className="mb-6 p-4 bg-muted rounded-lg">
                    <div className="font-semibold mb-1">Explicação</div>
                    <p className="text-sm">{q.explanation}</p>
                  </div>
                )}

                <div className="flex gap-3">
                  {!showExplain ? (
                    <Button onClick={handleConfirm} disabled={selected === null} className="flex-1">
                      Confirmar resposta
                    </Button>
                  ) : (
                    <Button onClick={handleNext} className="flex-1">
                      {current + 1 >= TOTAL ? "Ver resultado" : "Próxima questão"}
                    </Button>
                  )}
                </div>
              </Card>
            )}

            {finished && (
              <Card className="p-8 text-center">
                <Trophy
                  className={`w-16 h-16 mx-auto mb-4 ${
                    approved ? "text-green-500" : "text-muted-foreground"
                  }`}
                />
                <h2 className="text-3xl font-bold mb-2">
                  {approved ? "Você seria aprovado! 🎉" : "Quase lá!"}
                </h2>
                <p className="text-lg mb-6">
                  Você acertou <strong>{correctCount} de {TOTAL}</strong> questões.
                  {approved
                    ? " Esse é o desempenho esperado para passar no DETRAN-PR."
                    : ` São necessários ${PASS} acertos. Refaça lendo as explicações.`}
                </p>
                <div className="flex flex-col md:flex-row gap-3 justify-center mb-8">
                  <Button onClick={handleStart} size="lg">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refazer Simulado
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a
                      href="https://api.whatsapp.com/send?phone=5541991453627&text=Olá,%20fiz%20o%20simulado%20e%20quero%20me%20matricular%20na%20APTOS"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Matricule-se na APTOS
                    </a>
                  </Button>
                </div>

                <div className="text-left bg-muted/50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-3">Próximos passos com a Autoescola APTOS</h3>
                  <ul className="space-y-2 text-sm">
                    <li>✅ Curso teórico completo com aulas online pelo CNH do Brasil</li>
                    <li>✅ Aulas práticas com instrutores credenciados pelo DETRAN-PR</li>
                    <li>✅ Acompanhamento do processo até a entrega da PPD</li>
                    <li>✅ Atendimento via WhatsApp (41) 99145-3627</li>
                  </ul>
                </div>
              </Card>
            )}
          </div>
        </section>

        {/* Conteúdo SEO */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 max-w-3xl prose prose-slate">
            <h2 className="text-3xl font-bold mb-4">Como passar na prova teórica do DETRAN-PR em 2026</h2>
            <p>
              A prova teórica do DETRAN-PR é a primeira grande etapa para conquistar a sua CNH. Com a entrada em vigor
              da <strong>Resolução CONTRAN 1020/2025</strong>, o exame ficou mais acessível: o tempo aumentou de 50
              para <strong>60 minutos</strong> (120 minutos para candidatos com dislexia, TDAH ou TEA), e o número
              mínimo de acertos caiu de 21 para <strong>20 questões de 30</strong>.
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-3">O que cai no simulado do DETRAN PR</h3>
            <p>As questões da prova teórica seguem cinco grandes áreas:</p>
            <ul>
              <li><strong>Legislação de Trânsito</strong> — Código de Trânsito Brasileiro (CTB), categorias da CNH, infrações e penalidades.</li>
              <li><strong>Direção Defensiva</strong> — distância de seguimento, ponto cego, condições adversas, prevenção de acidentes.</li>
              <li><strong>Primeiros Socorros</strong> — atendimento à vítima, números de emergência (SAMU 192, Bombeiros 193), hemorragias.</li>
              <li><strong>Mecânica Básica</strong> — sistema de freios, óleo, pneus, sinais do painel.</li>
              <li><strong>Meio Ambiente e Cidadania</strong> — direção econômica, descarte de óleo, convivência no trânsito.</li>
            </ul>

            <h3 className="text-2xl font-bold mt-8 mb-3">Como estudar para o simulado do DETRAN PR</h3>
            <ol>
              <li>Faça o simulado completo pelo menos <strong>3 vezes</strong> — sempre lendo as explicações das erradas.</li>
              <li>Use o aplicativo <strong>CNH do Brasil</strong> para o conteúdo oficial das aulas teóricas.</li>
              <li>Refaça este simulado pelo celular nos intervalos do dia — 5 minutos por vez já fazem diferença.</li>
              <li>Mire em <strong>25 acertos consistentes</strong> antes de marcar a prova oficial — isso reduz a chance de reprovação a praticamente zero.</li>
            </ol>

            <h3 className="text-2xl font-bold mt-8 mb-3">Reteste gratuito no DETRAN-PR</h3>
            <p>
              A Resolução 1020/2025 prevê <strong>gratuidade para o primeiro reteste</strong>. No Paraná, essa regra
              ainda aguarda parecer jurídico da PGE-PR para implementação. Mesmo assim, treinar com o simulado é a
              forma mais segura de evitar uma reprovação que custaria tempo e dinheiro.
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-3">Por que escolher a Autoescola APTOS</h3>
            <p>
              Somos uma autoescola credenciada pelo DETRAN-PR em <strong>São José dos Pinhais</strong>, com mais de 15
              anos formando condutores. Oferecemos curso teórico online, aulas práticas com instrutores experientes,
              veículos novos e acompanhamento de todo o processo — da inscrição até a entrega da PPD.
            </p>
            <div className="not-prose flex flex-wrap gap-3 mt-4">
              <Button asChild>
                <Link to="/primeira-habilitacao">Quero tirar minha CNH</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/resolucao-1020-2025">Entenda a Resolução 1020/2025</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold mb-6 text-center">Perguntas Frequentes</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-10 text-center">
              <p className="text-muted-foreground mb-4">Ainda tem dúvidas?</p>
              <Button size="lg" asChild>
                <a
                  href="https://api.whatsapp.com/send?phone=5541991453627&text=Olá,%20tenho%20dúvidas%20sobre%20o%20simulado%20do%20DETRAN-PR"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Fale conosco no WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
        <FloatingWhatsApp />
      </main>
    </>
  );
};

export default SimuladoDetranPr;
