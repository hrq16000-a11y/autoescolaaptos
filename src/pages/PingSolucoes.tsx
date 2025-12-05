import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Code,
  Smartphone,
  Search,
  BarChart3,
  Megaphone,
  Rocket,
  Shield,
  Headphones,
  ExternalLink,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Criação de Sites",
    description: "Sites institucionais, landing pages e e-commerces modernos e responsivos.",
  },
  {
    icon: Code,
    title: "Desenvolvimento Web",
    description: "Sistemas web personalizados, APIs e aplicações sob medida para seu negócio.",
  },
  {
    icon: Smartphone,
    title: "Aplicativos Mobile",
    description: "Apps para iOS e Android com design intuitivo e alta performance.",
  },
  {
    icon: Search,
    title: "SEO",
    description: "Otimização para mecanismos de busca e posicionamento orgânico no Google.",
  },
  {
    icon: Megaphone,
    title: "Marketing Digital",
    description: "Gestão de tráfego pago, redes sociais e campanhas de conversão.",
  },
  {
    icon: BarChart3,
    title: "Análise de Dados",
    description: "Dashboards, relatórios e insights para tomada de decisão baseada em dados.",
  },
];

const benefits = [
  {
    icon: Rocket,
    title: "Tecnologia de Ponta",
    description: "Utilizamos as tecnologias mais modernas do mercado para garantir performance e escalabilidade.",
  },
  {
    icon: Shield,
    title: "Segurança",
    description: "Implementamos as melhores práticas de segurança em todos os projetos.",
  },
  {
    icon: Headphones,
    title: "Suporte Dedicado",
    description: "Equipe de suporte disponível para atender suas demandas e dúvidas.",
  },
];

const technologies = [
  "React", "Next.js", "Node.js", "TypeScript", "Python", "AWS", "Google Cloud", "PostgreSQL"
];

const PingSolucoes = () => {
  return (
    <>
      <SEO
        title="Ping Soluções | Desenvolvimento Web, Apps e Marketing Digital"
        description="Empresa de tecnologia especializada em criação de sites, desenvolvimento de aplicativos, SEO e marketing digital. Soluções inovadoras para seu negócio."
        canonical="https://autoescolaaptos.com.br/parceiros/ping-solucoes"
      />
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-foreground to-foreground/90 text-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold mb-6">
                Parceiro Autoescola APTOS
              </span>
              <h1 className="text-4xl md:text-6xl font-heading font-black mb-6">
                Ping <span className="text-primary">Soluções</span>
              </h1>
              <p className="text-xl md:text-2xl text-background/90 mb-8">
                Transformando ideias em soluções digitais inovadoras
              </p>
              <Button size="lg" className="h-14 px-8 text-lg" asChild>
                <a
                  href="https://pingsolucoes.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Acessar Site
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Technologies Strip */}
        <section className="py-8 bg-primary">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {technologies.map((tech, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-primary-foreground font-semibold text-sm md:text-base"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-black mb-6">
                Sobre a <span className="text-primary">Ping Soluções</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                A Ping Soluções é uma empresa de tecnologia focada em criar soluções 
                digitais que impulsionam negócios. Combinamos expertise técnica com 
                criatividade para desenvolver sites, aplicativos e estratégias de 
                marketing digital que geram resultados reais. Nosso compromisso é 
                transformar a presença digital dos nossos clientes.
              </p>
            </motion.div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-medium transition-all duration-300 hover:-translate-y-1 group">
                    <div className="w-12 h-12 bg-foreground/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                      <service.icon className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="font-heading font-bold text-lg mb-2">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-black mb-6">
                Por que a <span className="text-primary">Ping Soluções</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-8 text-center h-full bg-foreground text-background border-0">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                      <benefit.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-heading font-bold text-xl mb-3">{benefit.title}</h3>
                    <p className="text-background/80">{benefit.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Highlight */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-black mb-6">
                Projetos em <span className="text-primary">Destaque</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A Autoescola APTOS é um dos projetos desenvolvidos pela Ping Soluções, 
                demonstrando nossa expertise em criar sites otimizados para conversão e SEO.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full">
                  <h3 className="font-heading font-bold text-xl mb-3">Autoescola APTOS</h3>
                  <p className="text-muted-foreground mb-4">
                    Site institucional otimizado para SEO e Google Ads, com foco em conversão 
                    e geração de leads qualificados.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">React</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">SEO</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Google Ads</span>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full">
                  <h3 className="font-heading font-bold text-xl mb-3">Preciso de um Técnico</h3>
                  <p className="text-muted-foreground mb-4">
                    Plataforma digital que conecta clientes a técnicos qualificados, 
                    com sistema de busca e agendamento.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Next.js</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Node.js</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">PostgreSQL</span>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 md:p-12 bg-gradient-to-br from-foreground to-foreground/90 text-background border-0 text-center">
                <h2 className="text-3xl md:text-4xl font-heading font-black mb-4">
                  Vamos Criar Algo Incrível?
                </h2>
                <p className="text-lg text-background/90 mb-8 max-w-2xl mx-auto">
                  Entre em contato com a Ping Soluções e transforme sua presença digital.
                </p>
                <Button size="lg" className="h-14 px-8 text-lg" asChild>
                  <a
                    href="https://pingsolucoes.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Falar com a Ping
                  </a>
                </Button>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default PingSolucoes;
