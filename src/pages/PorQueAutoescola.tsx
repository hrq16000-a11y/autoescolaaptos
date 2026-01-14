import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Shield, 
  Users, 
  CheckCircle2, 
  MessageCircle,
  AlertCircle,
  Award,
  FileCheck,
  Clock,
  Car,
  BookOpen,
  Target,
  Headphones,
  ArrowRight,
  Building
} from "lucide-react";

const PorQueAutoescola = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Por que Escolher uma Autoescola Credenciada - Autoescola APTOS",
    "description": "Entenda as vantagens de escolher um Centro de Formação de Condutores (CFC) credenciado pelo DETRAN para tirar ou renovar sua CNH.",
    "author": {
      "@type": "Organization",
      "name": "Autoescola APTOS"
    }
  };

  const vantagens = [
    {
      icon: Shield,
      title: "Segurança Jurídica",
      description: "CFC credenciado pelo DETRAN garante que todo o processo está em conformidade com a legislação, protegendo você de irregularidades."
    },
    {
      icon: Users,
      title: "Instrutores Certificados",
      description: "Profissionais treinados e certificados pelo DETRAN, com metodologia de ensino comprovada e experiência em formar condutores."
    },
    {
      icon: FileCheck,
      title: "Processo Completo",
      description: "Acompanhamento em todas as etapas: documentação, exames médicos, curso teórico, aulas práticas e agendamento de provas."
    },
    {
      icon: Car,
      title: "Veículos Adequados",
      description: "Frota inspecionada e aprovada pelo DETRAN, com equipamentos de segurança e duplo comando para aprendizado seguro."
    },
    {
      icon: Target,
      title: "Maior Índice de Aprovação",
      description: "Candidatos que estudam em CFCs credenciados têm taxas de aprovação significativamente maiores nas provas do DETRAN."
    },
    {
      icon: Headphones,
      title: "Suporte Contínuo",
      description: "Atendimento personalizado para tirar dúvidas, reagendar aulas e resolver questões administrativas durante todo o processo."
    }
  ];

  const comparativo = [
    {
      aspecto: "Acompanhamento Profissional",
      cfc: "Instrutores certificados em todas as etapas",
      alternativo: "Pode não ter suporte especializado"
    },
    {
      aspecto: "Material Didático",
      cfc: "Aprovado pelo DETRAN e atualizado",
      alternativo: "Qualidade pode variar"
    },
    {
      aspecto: "Veículos para Prática",
      cfc: "Frota adequada com duplo comando",
      alternativo: "Quando autorizado, pode ser limitado"
    },
    {
      aspecto: "Suporte Administrativo",
      cfc: "Auxílio em documentação e agendamentos",
      alternativo: "Candidato deve resolver sozinho"
    },
    {
      aspecto: "Simulados e Preparação",
      cfc: "Simulados específicos para as provas",
      alternativo: "Preparação pode ser insuficiente"
    },
    {
      aspecto: "Resolução de Problemas",
      cfc: "Equipe dedicada a resolver pendências",
      alternativo: "Candidato lida diretamente com órgãos"
    }
  ];

  return (
    <>
      <SEO
        title="Por que Escolher uma Autoescola Credenciada | Autoescola APTOS"
        description="Descubra as vantagens de escolher um CFC credenciado pelo DETRAN. Acompanhamento completo, menor risco de reprovação e suporte especializado."
        canonical="/por-que-autoescola-credenciada"
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
                <li className="text-foreground font-medium">Por que Escolher um CFC</li>
              </ol>
            </nav>

            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                  <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                    CFC Credenciado
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-6 leading-tight">
                  Por que Escolher uma <span className="text-primary">Autoescola Credenciada</span>?
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
                  Entenda as vantagens de realizar sua formação em um Centro de Formação de 
                  Condutores (CFC) autorizado pelo DETRAN e como isso impacta seu sucesso.
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
                <strong className="text-foreground">Nota:</strong> Mesmo com as mudanças da 
                Resolução 1020/2025, os Centros de Formação de Condutores continuam sendo a 
                forma mais completa e segura de preparação para obtenção da CNH, oferecendo 
                estrutura e suporte que outras modalidades não proporcionam.
              </p>
            </div>
          </div>
        </section>

        {/* Vantagens */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-black mb-4">
                Vantagens de um <span className="text-primary">CFC Credenciado</span>
              </h2>
              <p className="text-muted-foreground">
                Por que a formação em autoescola credenciada faz diferença no seu processo de habilitação
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {vantagens.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-medium transition-shadow">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparativo */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-black mb-4">
                Comparativo: CFC vs Formação Alternativa
              </h2>
              <p className="text-muted-foreground">
                Entenda as diferenças entre a formação em CFC credenciado e outras modalidades
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              <Card className="overflow-hidden">
                <div className="grid grid-cols-3 bg-foreground text-background p-4 font-bold text-sm md:text-base">
                  <div>Aspecto</div>
                  <div className="text-center">CFC Credenciado</div>
                  <div className="text-center">Formação Alternativa*</div>
                </div>
                {comparativo.map((item, index) => (
                  <div 
                    key={index} 
                    className={`grid grid-cols-3 p-4 text-sm ${index % 2 === 0 ? 'bg-background' : 'bg-muted/50'}`}
                  >
                    <div className="font-medium">{item.aspecto}</div>
                    <div className="text-center text-muted-foreground flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="hidden md:inline">{item.cfc}</span>
                    </div>
                    <div className="text-center text-muted-foreground flex items-center justify-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      <span className="hidden md:inline">{item.alternativo}</span>
                    </div>
                  </div>
                ))}
              </Card>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                * Formação alternativa refere-se a modalidades como estudo por plataformas digitais 
                ou instrutores particulares, quando autorizados pelo DETRAN estadual.
              </p>
            </div>
          </div>
        </section>

        {/* Menor Risco de Reprovação */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <Award className="w-8 h-8 text-primary" />
                  <h2 className="text-3xl md:text-4xl font-heading font-black">
                    Menor Risco de Reprovação
                  </h2>
                </div>
                
                <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
                  <p>
                    Candidatos que realizam sua formação em CFCs credenciados apresentam 
                    índices de aprovação significativamente maiores nas provas do DETRAN. 
                    Isso ocorre por diversos fatores:
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <BookOpen className="w-8 h-8 text-primary mb-4" />
                    <h3 className="font-heading font-bold mb-2">Preparação Teórica</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        Instrutores que conhecem a prova
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        Simulados no formato oficial
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        Foco nos temas mais cobrados
                      </li>
                    </ul>
                  </Card>

                  <Card className="p-6">
                    <Car className="w-8 h-8 text-primary mb-4" />
                    <h3 className="font-heading font-bold mb-2">Preparação Prática</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        Treino nos percursos do exame
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        Conhecimento das manobras exigidas
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        Simulação completa do exame
                      </li>
                    </ul>
                  </Card>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Suporte Administrativo */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <FileCheck className="w-8 h-8 text-secondary" />
                  <h2 className="text-3xl md:text-4xl font-heading font-black">
                    Suporte Administrativo e Técnico
                  </h2>
                </div>
                
                <Card className="p-8">
                  <p className="text-muted-foreground mb-6">
                    Um dos grandes diferenciais de um CFC credenciado é o suporte completo 
                    durante todo o processo de habilitação. Na Autoescola APTOS, cuidamos de:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                        <div>
                          <strong className="text-foreground">Abertura do Processo</strong>
                          <p className="text-sm text-muted-foreground">Orientação sobre documentação e abertura do RENACH</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                        <div>
                          <strong className="text-foreground">Exames Médicos</strong>
                          <p className="text-sm text-muted-foreground">Indicação de clínicas credenciadas e acompanhamento</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                        <div>
                          <strong className="text-foreground">Agendamento de Provas</strong>
                          <p className="text-sm text-muted-foreground">Auxílio no agendamento das provas teórica e prática</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                        <div>
                          <strong className="text-foreground">Resolução de Pendências</strong>
                          <p className="text-sm text-muted-foreground">Suporte para resolver problemas com documentação</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                        <div>
                          <strong className="text-foreground">Acompanhamento Contínuo</strong>
                          <p className="text-sm text-muted-foreground">Equipe disponível para dúvidas a qualquer momento</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                        <div>
                          <strong className="text-foreground">Prazos e Validades</strong>
                          <p className="text-sm text-muted-foreground">Controle de prazos para evitar expiração do processo</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Sobre a Autoescola APTOS */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <Building className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-heading font-black mb-6">
                Autoescola APTOS: Seu CFC em São José dos Pinhais
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Com mais de 15 anos de experiência, a Autoescola APTOS é credenciada pelo DETRAN-PR 
                e referência em formação de condutores na região. Oferecemos estrutura completa, 
                instrutores qualificados e acompanhamento personalizado para sua jornada até a CNH.
              </p>
              
              <div className="grid md:grid-cols-4 gap-6 mb-12">
                <Card className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">15+</div>
                  <p className="text-sm text-muted-foreground">Anos de Experiência</p>
                </Card>
                <Card className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">93%</div>
                  <p className="text-sm text-muted-foreground">Aprovação 1ª Tentativa</p>
                </Card>
                <Card className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">5000+</div>
                  <p className="text-sm text-muted-foreground">Alunos Formados</p>
                </Card>
                <Card className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">A+B</div>
                  <p className="text-sm text-muted-foreground">Categorias Disponíveis</p>
                </Card>
              </div>
            </motion.div>
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
                Explore Mais
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Link to="/primeira-habilitacao">
                <Card className="p-6 h-full hover:shadow-medium hover:border-primary/20 transition-all group">
                  <Award className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                    Primeira Habilitação
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Visão completa do processo de primeira CNH
                  </p>
                  <span className="text-primary text-sm font-medium flex items-center gap-1">
                    Saiba mais <ArrowRight className="w-4 h-4" />
                  </span>
                </Card>
              </Link>

              <Link to="/resolucao-1020-2025">
                <Card className="p-6 h-full hover:shadow-medium hover:border-primary/20 transition-all group">
                  <FileCheck className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                    Resolução 1020/2025
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Entenda as mudanças na legislação
                  </p>
                  <span className="text-primary text-sm font-medium flex items-center gap-1">
                    Saiba mais <ArrowRight className="w-4 h-4" />
                  </span>
                </Card>
              </Link>

              <Link to="/perguntas-frequentes">
                <Card className="p-6 h-full hover:shadow-medium hover:border-primary/20 transition-all group">
                  <Clock className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                    Perguntas Frequentes
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Respostas para dúvidas comuns
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
                Inicie sua Formação com Quem Entende
              </h2>
              <p className="text-lg mb-8 text-primary-foreground/90">
                Fale com nossa equipe e descubra como podemos ajudar você a conquistar sua CNH 
                com segurança e preparo completo.
              </p>
              <Button size="lg" variant="secondary" className="shadow-lg" asChild>
                <a
                  href="https://api.whatsapp.com/send?phone=5541991453627&text=Olá,%20gostaria%20de%20conhecer%20melhor%20a%20Autoescola%20APTOS"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Conhecer a Autoescola APTOS
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

export default PorQueAutoescola;
