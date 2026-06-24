import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Car, 
  Users, 
  Shield, 
  Clock, 
  CheckCircle2, 
  MessageCircle,
  AlertCircle,
  Award,
  Settings,
  MapPin,
  ArrowRight,
  Bike
} from "lucide-react";

const AulasPraticasDirecao = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Aulas Práticas de Direção - Autoescola APTOS",
    "description": "Aulas práticas de direção veicular com instrutores credenciados pelo DETRAN-PR. Veículos novos e adaptados para aprendizado seguro.",
    "provider": {
      "@type": "DrivingSchool",
      "name": "Autoescola APTOS"
    }
  };

  const diferenciais = [
    {
      icon: Users,
      title: "Instrutores Credenciados",
      description: "Profissionais com certificação do DETRAN e anos de experiência em formação de condutores"
    },
    {
      icon: Car,
      title: "Veículos Novos e Seguros",
      description: "Frota moderna com duplo comando, garantindo segurança total durante as aulas"
    },
    {
      icon: Clock,
      title: "Horários Flexíveis",
      description: "Aulas em diversos horários para se adaptar à sua rotina de trabalho ou estudo"
    },
    {
      icon: MapPin,
      title: "Conhecimento Local",
      description: "Nossos instrutores conhecem as rotas e particularidades do exame prático do DETRAN-PR"
    }
  ];

  const etapasAulas = [
    {
      numero: 1,
      titulo: "Familiarização",
      descricao: "Conhecimento do veículo, comandos, postura correta e exercícios em ambiente controlado"
    },
    {
      numero: 2,
      titulo: "Manobras Básicas",
      descricao: "Baliza, conversões, ladeiras e manobras essenciais para o dia a dia"
    },
    {
      numero: 3,
      titulo: "Trânsito Real",
      descricao: "Prática em vias públicas com diferentes níveis de complexidade"
    },
    {
      numero: 4,
      titulo: "Simulação do Exame",
      descricao: "Treinamento específico nos percursos e situações do exame prático"
    }
  ];

  return (
    <>
      <SEO
        title="Aulas Práticas de Direção | Autoescola APTOS"
        description="Aulas práticas de direção com instrutores credenciados pelo DETRAN-PR. Veículos novos, horários flexíveis e metodologia focada na sua aprovação."
        canonical="/aulas-praticas-direcao"
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
                <li className="text-foreground font-medium">Aulas Práticas</li>
              </ol>
            </nav>

            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Car className="w-8 h-8 text-primary" />
                  <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                    Formação Prática
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-6 leading-tight">
                  Aulas Práticas de <span className="text-primary">Direção</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
                  Aprenda a dirigir com segurança e confiança. Nossos instrutores credenciados 
                  preparam você para o exame prático e para o trânsito real.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="shadow-glow" asChild>
                    <a
                      href="https://api.whatsapp.com/send?phone=5541991453627&text=Olá,%20gostaria%20de%20agendar%20aulas%20práticas%20de%20direção"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Agendar Aulas
                    </a>
                  </Button>
                </div>
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
                <strong className="text-foreground">Importante:</strong> As aulas práticas de direção 
                veicular devem ser realizadas com instrutor devidamente credenciado pelo DETRAN. 
                A Autoescola APTOS é um CFC autorizado pelo DETRAN-PR, seguindo todas as normas 
                vigentes e a Resolução CONTRAN 1020/2025.
              </p>
            </div>
          </div>
        </section>

        {/* Sobre as Aulas */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-heading font-black mb-6">
                  O Papel da <span className="text-primary">Autoescola</span> nas Aulas Práticas
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    As aulas práticas de direção são uma etapa fundamental na formação de condutores. 
                    Na <strong className="text-foreground">Autoescola APTOS</strong>, oferecemos uma 
                    formação prática completa, com veículos adequados e instrutores experientes que 
                    conhecem as particularidades do exame do DETRAN-PR.
                  </p>
                  <p>
                    Nossos veículos são equipados com <strong className="text-foreground">duplo comando</strong>, 
                    permitindo que o instrutor assuma o controle do veículo a qualquer momento, 
                    garantindo total segurança durante o aprendizado.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-black mb-4">
                Nossos <span className="text-primary">Diferenciais</span>
              </h2>
              <p className="text-muted-foreground">
                Por que escolher a Autoescola APTOS para suas aulas práticas
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {diferenciais.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full text-center hover:shadow-medium transition-shadow">
                    <div className="w-14 h-14 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <item.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-heading font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Etapas das Aulas */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-black mb-4">
                Metodologia de <span className="text-primary">Ensino</span>
              </h2>
              <p className="text-muted-foreground">
                Nossa metodologia é progressiva, levando você do básico ao avançado com segurança
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {etapasAulas.map((etapa, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6 flex items-start gap-6">
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                        {etapa.numero}
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-xl mb-2">{etapa.titulo}</h3>
                        <p className="text-muted-foreground">{etapa.descricao}</p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Categorias */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-black mb-4">
                Categorias <span className="text-primary">Disponíveis</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="p-8 border-2 hover:border-primary/20 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Car className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading font-bold">Categoria B</h3>
                    <p className="text-muted-foreground">Automóvel</p>
                  </div>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Veículos com câmbio manual e automático
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Carros novos com duplo comando
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Aulas conforme carga horária do DETRAN
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <a
                    href="https://api.whatsapp.com/send?phone=5541991453627&text=Olá,%20gostaria%20de%20informações%20sobre%20aulas%20práticas%20categoria%20B"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Saber Mais
                  </a>
                </Button>
              </Card>

              <Card className="p-8 border-2 hover:border-primary/20 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Bike className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading font-bold">Categoria A</h3>
                    <p className="text-muted-foreground">Motocicleta</p>
                  </div>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Motos adequadas para aprendizado
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Equipamentos de segurança inclusos
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Treino em pista e trânsito
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <a
                    href="https://api.whatsapp.com/send?phone=5541991453627&text=Olá,%20gostaria%20de%20informações%20sobre%20aulas%20práticas%20categoria%20A"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Saber Mais
                  </a>
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* Segurança */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-secondary/10 rounded-2xl p-8 md:p-12"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-8 h-8 text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-heading font-black mb-4">
                      Segurança em Primeiro Lugar
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Na Autoescola APTOS, a segurança é prioridade. Nossos veículos são 
                      regularmente inspecionados, nossos instrutores são certificados e 
                      seguimos rigorosamente todas as normas do DETRAN e do CONTRAN.
                    </p>
                    <ul className="grid md:grid-cols-2 gap-4">
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-secondary" />
                        Veículos com seguro completo
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-secondary" />
                        Instrutores treinados em primeiros socorros
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-secondary" />
                        Duplo comando em todos os veículos
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-secondary" />
                        Manutenção preventiva regular
                      </li>
                    </ul>
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
                Próximos Passos
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Link to="/exames-detran">
                <Card className="p-6 h-full hover:shadow-medium hover:border-primary/20 transition-all group">
                  <Award className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                    Exames do DETRAN
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Entenda como funciona a prova prática de direção
                  </p>
                  <span className="text-primary text-sm font-medium flex items-center gap-1">
                    Saiba mais <ArrowRight className="w-4 h-4" />
                  </span>
                </Card>
              </Link>

              <Link to="/por-que-autoescola-credenciada">
                <Card className="p-6 h-full hover:shadow-medium hover:border-primary/20 transition-all group">
                  <Shield className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                    Por que CFC Credenciado
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Vantagens de uma autoescola credenciada
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
                Agende suas Aulas Práticas
              </h2>
              <p className="text-lg mb-8 text-primary-foreground/90">
                Converse com nossa equipe e encontre os melhores horários para suas aulas.
              </p>
              <Button size="lg" variant="secondary" className="shadow-lg" asChild>
                <a
                  href="https://api.whatsapp.com/send?phone=5541991453627&text=Olá,%20gostaria%20de%20agendar%20aulas%20práticas"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Agendar pelo WhatsApp
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

export default AulasPraticasDirecao;
