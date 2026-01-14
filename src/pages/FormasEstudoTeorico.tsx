import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  BookOpen, 
  Users, 
  Smartphone, 
  CheckCircle2, 
  XCircle,
  MessageCircle,
  AlertCircle,
  Building,
  Clock,
  GraduationCap,
  ArrowRight
} from "lucide-react";

const FormasEstudoTeorico = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Formas de Estudo Teórico para CNH - Autoescola APTOS",
    "description": "Conheça as diferentes formas de realizar o curso teórico para CNH: presencial em CFC, plataformas digitais oficiais e modelos híbridos.",
    "author": {
      "@type": "Organization",
      "name": "Autoescola APTOS"
    }
  };

  const formasEstudo = [
    {
      icon: Building,
      title: "Curso Teórico em CFC",
      subtitle: "Presencial na Autoescola",
      description: "O curso teórico presencial é a forma tradicional e mais completa de formação. Realizado no Centro de Formação de Condutores, oferece interação direta com instrutores qualificados.",
      vantagens: [
        "Interação direta com instrutores para esclarecer dúvidas",
        "Ambiente focado no aprendizado sem distrações",
        "Material didático atualizado e aprovado pelo DETRAN",
        "Simulados presenciais com acompanhamento",
        "Maior retenção de conhecimento comprovada"
      ],
      consideracoes: [
        "Requer deslocamento até a autoescola",
        "Horários fixos de aula"
      ],
      destaque: true
    },
    {
      icon: Smartphone,
      title: "Plataformas Digitais Oficiais",
      subtitle: "Quando autorizadas pelo DETRAN",
      description: "A Resolução 1020/2025 permite o uso de plataformas digitais oficiais para o estudo teórico, quando autorizadas pelo DETRAN do Estado. Um exemplo é o app CNH do Brasil.",
      vantagens: [
        "Flexibilidade de horário para estudar",
        "Possibilidade de estudar de casa",
        "Ritmo de aprendizado personalizado"
      ],
      consideracoes: [
        "Depende de autorização do DETRAN estadual",
        "Exige autodisciplina para manter o ritmo de estudos",
        "Sem interação presencial para tirar dúvidas",
        "Nem todos os Estados habilitaram esta modalidade"
      ],
      destaque: false
    },
    {
      icon: Users,
      title: "Formação Híbrida",
      subtitle: "Quando disponível pelo DETRAN",
      description: "Alguns Estados podem oferecer modelos híbridos que combinam aulas presenciais com conteúdo digital, aproveitando o melhor de cada modalidade.",
      vantagens: [
        "Combina flexibilidade com acompanhamento",
        "Parte do conteúdo pode ser estudada remotamente",
        "Mantém momentos de interação presencial"
      ],
      consideracoes: [
        "Disponibilidade varia por Estado",
        "Modelo ainda em implementação em muitas regiões",
        "Consulte o DETRAN local sobre disponibilidade"
      ],
      destaque: false
    }
  ];

  const conteudoCurso = [
    { titulo: "Legislação de Trânsito", horas: "45h" },
    { titulo: "Direção Defensiva", horas: "15h" },
    { titulo: "Primeiros Socorros", horas: "15h" },
    { titulo: "Meio Ambiente e Cidadania", horas: "10h" },
    { titulo: "Mecânica Básica", horas: "10h" }
  ];

  return (
    <>
      <SEO
        title="Formas de Estudo Teórico para CNH | Autoescola APTOS"
        description="Conheça as opções de curso teórico para CNH: presencial em CFC, plataformas digitais e modelos híbridos. Entenda qual é a melhor opção para você."
        canonical="/formas-estudo-teorico"
        jsonLd={jsonLd}
      />
      
      <Navbar />
      
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            {/* Breadcrumbs */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                <li><Link to="/" className="hover:text-primary">Início</Link></li>
                <li>/</li>
                <li><Link to="/primeira-habilitacao" className="hover:text-primary">Primeira Habilitação</Link></li>
                <li>/</li>
                <li className="text-foreground font-medium">Formas de Estudo Teórico</li>
              </ol>
            </nav>

            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-8 h-8 text-primary" />
                  <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                    Formação Teórica
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-6 leading-tight">
                  Formas de <span className="text-primary">Estudo Teórico</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
                  Conheça as diferentes modalidades disponíveis para realizar o curso teórico 
                  obrigatório para obtenção da CNH, conforme a Resolução 1020/2025.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Aviso Legal */}
        <section className="py-8 bg-secondary/10 border-y border-secondary/20">
          <div className="container mx-auto px-4">
            <div className="flex items-start gap-4 max-w-4xl mx-auto">
              <AlertCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Atenção:</strong> A disponibilidade de cada 
                modalidade de estudo teórico depende da regulamentação do DETRAN do seu Estado. 
                Consulte as normas específicas do DETRAN-PR ou do DETRAN do seu Estado para 
                informações atualizadas.
              </p>
            </div>
          </div>
        </section>

        {/* Formas de Estudo */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="space-y-12 max-w-5xl mx-auto">
              {formasEstudo.map((forma, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`p-8 ${forma.destaque ? 'border-2 border-primary/30 shadow-medium' : ''}`}>
                    {forma.destaque && (
                      <div className="inline-block px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-bold mb-4">
                        RECOMENDADO
                      </div>
                    )}
                    
                    <div className="flex flex-col lg:flex-row gap-8">
                      <div className="lg:w-1/3">
                        <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                          <forma.icon className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-2xl font-heading font-bold mb-2">{forma.title}</h2>
                        <p className="text-sm text-muted-foreground mb-4">{forma.subtitle}</p>
                        <p className="text-muted-foreground">{forma.description}</p>
                      </div>

                      <div className="lg:w-2/3 grid md:grid-cols-2 gap-6">
                        {/* Vantagens */}
                        <div>
                          <h3 className="font-heading font-bold mb-4 flex items-center gap-2 text-green-600">
                            <CheckCircle2 className="w-5 h-5" />
                            Vantagens
                          </h3>
                          <ul className="space-y-2">
                            {forma.vantagens.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Considerações */}
                        <div>
                          <h3 className="font-heading font-bold mb-4 flex items-center gap-2 text-amber-600">
                            <AlertCircle className="w-5 h-5" />
                            Considerações
                          </h3>
                          <ul className="space-y-2">
                            {forma.consideracoes.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Conteúdo do Curso */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-black mb-4">
                Conteúdo do <span className="text-primary">Curso Teórico</span>
              </h2>
              <p className="text-muted-foreground">
                O curso teórico aborda todos os conhecimentos essenciais para uma condução segura
              </p>
            </motion.div>

            <div className="grid md:grid-cols-5 gap-6 max-w-5xl mx-auto">
              {conteudoCurso.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 text-center h-full">
                    <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-heading font-bold mb-2 text-sm">{item.titulo}</h3>
                    <p className="text-2xl font-bold text-primary">{item.horas}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            <p className="text-center text-sm text-muted-foreground mt-8 max-w-2xl mx-auto">
              * A carga horária e conteúdo programático seguem as diretrizes do CONTRAN e podem 
              ter especificidades conforme regulamentação do DETRAN estadual.
            </p>
          </div>
        </section>

        {/* Por que CFC Presencial */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-heading font-black mb-6">
                  Por que o <span className="text-primary">Acompanhamento Presencial</span> Faz Diferença?
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    Embora a Resolução 1020/2025 tenha ampliado as possibilidades de estudo teórico, 
                    o acompanhamento presencial em um CFC credenciado continua sendo a forma mais 
                    completa e eficiente de preparação para a prova teórica do DETRAN.
                  </p>
                  <p>
                    Na <strong className="text-foreground">Autoescola APTOS</strong>, nossos 
                    instrutores têm anos de experiência e conhecem profundamente as questões e 
                    situações que mais aparecem nas provas. Além disso, o ambiente de sala de aula 
                    proporciona discussões enriquecedoras que vão além do conteúdo do material.
                  </p>
                </div>

                <div className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/20">
                  <h3 className="font-heading font-bold mb-4">Índice de Aprovação na Primeira Tentativa</h3>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold text-primary">93%</div>
                    <p className="text-muted-foreground">
                      dos nossos alunos são aprovados na prova teórica na primeira tentativa, 
                      graças ao método de ensino focado e ao acompanhamento personalizado.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Links Relacionados */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-black mb-4">
                Continue Explorando
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Link to="/exames-detran">
                <Card className="p-6 h-full hover:shadow-medium hover:border-primary/20 transition-all group">
                  <GraduationCap className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                    Exames do DETRAN
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Saiba como funcionam as provas teórica e prática
                  </p>
                  <span className="text-primary text-sm font-medium flex items-center gap-1">
                    Saiba mais <ArrowRight className="w-4 h-4" />
                  </span>
                </Card>
              </Link>

              <Link to="/aulas-praticas-direcao">
                <Card className="p-6 h-full hover:shadow-medium hover:border-primary/20 transition-all group">
                  <Users className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                    Aulas Práticas
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Conheça nossa metodologia de ensino prático
                  </p>
                  <span className="text-primary text-sm font-medium flex items-center gap-1">
                    Saiba mais <ArrowRight className="w-4 h-4" />
                  </span>
                </Card>
              </Link>

              <Link to="/primeira-habilitacao">
                <Card className="p-6 h-full hover:shadow-medium hover:border-primary/20 transition-all group">
                  <BookOpen className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                    Primeira Habilitação
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Visão geral do processo de primeira CNH
                  </p>
                  <span className="text-primary text-sm font-medium flex items-center gap-1">
                    Saiba mais <ArrowRight className="w-4 h-4" />
                  </span>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-black mb-4">
                Comece seu Curso Teórico Conosco
              </h2>
              <p className="text-lg mb-8 text-primary-foreground/90">
                Oferecemos horários flexíveis e metodologia comprovada para sua aprovação.
              </p>
              <Button size="lg" variant="secondary" className="shadow-lg" asChild>
                <a
                  href="https://api.whatsapp.com/send?phone=5541991453627&text=Olá,%20gostaria%20de%20informações%20sobre%20o%20curso%20teórico"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Falar sobre Curso Teórico
                </a>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
};

export default FormasEstudoTeorico;
