import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Wrench,
  Home,
  Tv,
  Wind,
  Droplets,
  Zap,
  Shield,
  Clock,
  Star,
  Phone,
  ExternalLink,
} from "lucide-react";

const services = [
  {
    icon: Wind,
    title: "Ar Condicionado",
    description: "Instalação, manutenção e limpeza de ar condicionado split, janela e central.",
  },
  {
    icon: Droplets,
    title: "Encanador",
    description: "Consertos de vazamentos, instalação de torneiras, chuveiros e desentupimento.",
  },
  {
    icon: Zap,
    title: "Eletricista",
    description: "Instalações elétricas, troca de fiação, quadros de luz e reparos em geral.",
  },
  {
    icon: Tv,
    title: "Eletrônicos",
    description: "Conserto de TVs, computadores, notebooks e equipamentos eletrônicos.",
  },
  {
    icon: Home,
    title: "Reformas",
    description: "Pinturas, reparos em paredes, pisos e pequenas reformas residenciais.",
  },
  {
    icon: Wrench,
    title: "Manutenção Geral",
    description: "Montagem de móveis, instalação de cortinas, prateleiras e serviços diversos.",
  },
];

const benefits = [
  {
    icon: Shield,
    title: "Profissionais Verificados",
    description: "Todos os técnicos passam por verificação de antecedentes e qualificação.",
  },
  {
    icon: Clock,
    title: "Atendimento Rápido",
    description: "Técnicos disponíveis para atendimento no mesmo dia ou agendamento flexível.",
  },
  {
    icon: Star,
    title: "Garantia de Serviço",
    description: "Serviços com garantia e suporte pós-atendimento.",
  },
];

const PrecisoDeTecnico = () => {
  return (
    <>
      <SEO
        title="Preciso de um Técnico | Serviços Técnicos Residenciais e Comerciais"
        description="Encontre técnicos qualificados para ar condicionado, encanador, eletricista e mais. Profissionais verificados com atendimento rápido e garantia de serviço."
        canonical="https://autoescolaaptos.com.br/parceiros/preciso-de-um-tecnico"
      />
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground">
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
                Preciso de um <span className="text-primary">Técnico</span>
              </h1>
              <p className="text-xl md:text-2xl text-secondary-foreground/90 mb-8">
                Plataforma que conecta você aos melhores profissionais técnicos da sua região
              </p>
              <Button size="lg" className="h-14 px-8 text-lg" asChild>
                <a
                  href="https://precisodeumtecnico.com"
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
                Sobre a <span className="text-primary">Plataforma</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                O Preciso de um Técnico é uma plataforma digital que facilita a conexão entre 
                clientes que precisam de serviços técnicos e profissionais qualificados. 
                Com uma rede de técnicos verificados, garantimos qualidade, segurança e 
                praticidade para resolver qualquer problema na sua casa ou empresa.
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
                  <Card className="p-6 h-full hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                      <service.icon className="w-6 h-6 text-secondary" />
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
                Por que <span className="text-secondary">Escolher</span>
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
                  <Card className="p-8 text-center h-full bg-secondary/5 border-secondary/20">
                    <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                      <benefit.icon className="w-8 h-8 text-secondary-foreground" />
                    </div>
                    <h3 className="font-heading font-bold text-xl mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 md:p-12 bg-gradient-to-br from-secondary to-secondary/90 text-secondary-foreground border-0 text-center">
                <h2 className="text-3xl md:text-4xl font-heading font-black mb-4">
                  Precisa de um Técnico Agora?
                </h2>
                <p className="text-lg text-secondary-foreground/90 mb-8 max-w-2xl mx-auto">
                  Acesse a plataforma e encontre o profissional ideal para resolver seu problema.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="h-14 px-8 text-lg bg-white text-secondary hover:bg-white/90" asChild>
                    <a
                      href="https://precisodeumtecnico.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Acessar Plataforma
                    </a>
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default PrecisoDeTecnico;
