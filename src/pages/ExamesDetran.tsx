import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  GraduationCap, 
  FileText, 
  Car, 
  CheckCircle2, 
  XCircle,
  MessageCircle,
  AlertCircle,
  Clock,
  Target,
  RefreshCw,
  ArrowRight,
  BookOpen
} from "lucide-react";

const ExamesDetran = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Exames do DETRAN - Prova Teórica e Prática para CNH",
    "description": "Guia completo sobre os exames do DETRAN: prova teórica padronizada e prova prática de direção. Saiba como se preparar e o que esperar.",
    "author": {
      "@type": "Organization",
      "name": "Autoescola APTOS"
    }
  };

  const topicosProvaTeórica = [
    { tema: "Legislação de Trânsito", questoes: "18 questões" },
    { tema: "Direção Defensiva", questoes: "4 questões" },
    { tema: "Primeiros Socorros", questoes: "3 questões" },
    { tema: "Meio Ambiente", questoes: "3 questões" },
    { tema: "Mecânica Básica", questoes: "2 questões" }
  ];

  const criteriosProvaPratica = [
    {
      categoria: "Faltas Eliminatórias",
      descricao: "Causam reprovação imediata",
      exemplos: [
        "Desobedecer sinalização de parada",
        "Avançar sobre meio-fio",
        "Não usar o cinto de segurança",
        "Perder controle do veículo"
      ],
      cor: "destructive"
    },
    {
      categoria: "Faltas Graves",
      descricao: "3 pontos negativos cada",
      exemplos: [
        "Não observar trânsito em mudança de faixa",
        "Desrespeitar faixa de pedestres",
        "Ultrapassar limite de velocidade"
      ],
      cor: "amber"
    },
    {
      categoria: "Faltas Médias",
      descricao: "2 pontos negativos cada",
      exemplos: [
        "Executar conversão incorretamente",
        "Usar incorretamente os retrovisores",
        "Parar distante da guia (baliza)"
      ],
      cor: "yellow"
    },
    {
      categoria: "Faltas Leves",
      descricao: "1 ponto negativo cada",
      exemplos: [
        "Manejo irregular do câmbio",
        "Posicionamento incorreto no volante",
        "Movimentos bruscos desnecessários"
      ],
      cor: "blue"
    }
  ];

  return (
    <>
      <SEO
        title="Exames do DETRAN | Prova Teórica e Prática | Autoescola APTOS"
        description="Tudo sobre os exames do DETRAN para CNH: prova teórica padronizada nacionalmente e prova prática de direção. Prepare-se com a Autoescola APTOS."
        canonical="/exames-detran"
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
                <li className="text-foreground font-medium">Exames do DETRAN</li>
              </ol>
            </nav>

            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <GraduationCap className="w-8 h-8 text-primary" />
                  <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                    Avaliações Oficiais
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-6 leading-tight">
                  Exames do <span className="text-primary">DETRAN</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
                  Entenda como funcionam as provas teórica e prática para obtenção da CNH, 
                  seguindo os critérios padronizados pela Resolução CONTRAN 1020/2025.
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
                <strong className="text-foreground">Informação:</strong> Os exames seguem as 
                diretrizes nacionais do CONTRAN. Procedimentos específicos, como agendamento 
                e local das provas, são definidos pelo DETRAN de cada Estado.
              </p>
            </div>
          </div>
        </section>

        {/* Prova Teórica */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                    <FileText className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-heading font-black">
                      Prova Teórica
                    </h2>
                    <p className="text-muted-foreground">Exame de Legislação de Trânsito</p>
                  </div>
                </div>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Informações da Prova */}
                <Card className="p-8">
                  <h3 className="text-xl font-heading font-bold mb-6">Sobre o Exame</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <Target className="w-5 h-5 text-primary" />
                      <span><strong>30 questões</strong> de múltipla escolha</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span>Aprovação com <strong>mínimo de 70%</strong> (21 acertos)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <span>Tempo máximo: <strong>60 minutos</strong></span>
                    </div>
                  </div>

                  <h4 className="font-heading font-bold mb-4">Distribuição das Questões</h4>
                  <div className="space-y-3">
                    {topicosProvaTeórica.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                        <span className="text-muted-foreground">{item.tema}</span>
                        <span className="font-semibold">{item.questoes}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Dicas de Preparação */}
                <Card className="p-8 bg-primary/5 border-primary/20">
                  <h3 className="text-xl font-heading font-bold mb-6">Como se Preparar</h3>
                  
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <strong className="text-foreground">Estude o material do curso teórico</strong>
                        <p className="text-sm text-muted-foreground">O conteúdo do curso cobre todos os temas da prova</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <strong className="text-foreground">Pratique com simulados</strong>
                        <p className="text-sm text-muted-foreground">Nossos simulados seguem o formato da prova oficial</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <strong className="text-foreground">Tire dúvidas com os instrutores</strong>
                        <p className="text-sm text-muted-foreground">Aproveite o suporte da autoescola</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <strong className="text-foreground">Foque em sinalização</strong>
                        <p className="text-sm text-muted-foreground">É o tema com maior número de questões</p>
                      </div>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Prova Prática */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Car className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-heading font-black">
                      Prova Prática
                    </h2>
                    <p className="text-muted-foreground">Exame de Direção Veicular</p>
                  </div>
                </div>
              </motion.div>

              {/* Informações Gerais */}
              <Card className="p-8 mb-8">
                <h3 className="text-xl font-heading font-bold mb-6">Sobre o Exame</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold mb-4">O que é avaliado</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Domínio do veículo (partida, câmbio, direção)
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Percurso em vias públicas
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Manobras (baliza, conversões, ladeira)
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Observância das regras de trânsito
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-4">Critérios de Aprovação</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-destructive" />
                        Nenhuma falta eliminatória
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Máximo de 3 pontos negativos
                      </li>
                      <li className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        Tempo definido pelo examinador
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

              {/* Tipos de Faltas */}
              <h3 className="text-xl font-heading font-bold mb-6">Sistema de Pontuação</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {criteriosProvaPratica.map((criterio, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6 h-full">
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${
                        criterio.cor === 'destructive' ? 'bg-destructive/10 text-destructive' :
                        criterio.cor === 'amber' ? 'bg-amber-500/10 text-amber-600' :
                        criterio.cor === 'yellow' ? 'bg-yellow-500/10 text-yellow-600' :
                        'bg-blue-500/10 text-blue-600'
                      }`}>
                        {criterio.categoria}
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{criterio.descricao}</p>
                      <ul className="space-y-2">
                        {criterio.exemplos.map((exemplo, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="w-1 h-1 rounded-full bg-current mt-2 flex-shrink-0" />
                            {exemplo}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Retestes */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <RefreshCw className="w-8 h-8 text-secondary" />
                  <h2 className="text-3xl md:text-4xl font-heading font-black">
                    Retestes
                  </h2>
                </div>
                
                <Card className="p-8">
                  <div className="prose prose-lg max-w-none text-muted-foreground">
                    <p>
                      Caso não seja aprovado em algum dos exames, você pode realizar nova tentativa 
                      após o prazo estipulado pelo DETRAN. Conforme as normas vigentes:
                    </p>
                    <ul className="space-y-3 mt-4">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                        <span>O processo de habilitação tem validade de 12 meses a partir da abertura</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                        <span>Não há limite de tentativas dentro do prazo de validade</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                        <span>O intervalo entre tentativas é definido pelo DETRAN estadual</span>
                      </li>
                    </ul>
                  </div>
                </Card>
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
                Prepare-se Melhor
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Link to="/formas-estudo-teorico">
                <Card className="p-6 h-full hover:shadow-medium hover:border-primary/20 transition-all group">
                  <BookOpen className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                    Formas de Estudo Teórico
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Conheça as opções de formação teórica
                  </p>
                  <span className="text-primary text-sm font-medium flex items-center gap-1">
                    Saiba mais <ArrowRight className="w-4 h-4" />
                  </span>
                </Card>
              </Link>

              <Link to="/aulas-praticas-direcao">
                <Card className="p-6 h-full hover:shadow-medium hover:border-primary/20 transition-all group">
                  <Car className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                    Aulas Práticas
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Prepare-se para a prova prática
                  </p>
                  <span className="text-primary text-sm font-medium flex items-center gap-1">
                    Saiba mais <ArrowRight className="w-4 h-4" />
                  </span>
                </Card>
              </Link>

              <Link to="/primeira-habilitacao">
                <Card className="p-6 h-full hover:shadow-medium hover:border-primary/20 transition-all group">
                  <GraduationCap className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                    Primeira Habilitação
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Visão completa do processo
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
                Tire suas Dúvidas sobre os Exames
              </h2>
              <p className="text-lg mb-8 text-primary-foreground/90">
                Nossa equipe está pronta para esclarecer todas as suas dúvidas 
                sobre as provas do DETRAN.
              </p>
              <Button size="lg" variant="secondary" className="shadow-lg" asChild>
                <a
                  href="https://api.whatsapp.com/send?phone=5541991453627&text=Olá,%20gostaria%20de%20informações%20sobre%20os%20exames%20do%20DETRAN"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Falar com Especialista
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

export default ExamesDetran;
