import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Paintbrush,
  Hammer,
  Building2,
  Truck,
  Sparkles,
  TreeDeciduous,
  Users,
  Award,
  MapPin,
  ExternalLink,
} from "lucide-react";

const services = [
  {
    icon: Paintbrush,
    title: "Pintura",
    description: "Pintura residencial e comercial, texturização, grafiato e acabamentos especiais.",
  },
  {
    icon: Hammer,
    title: "Construção Civil",
    description: "Obras, reformas, ampliações e construções do zero com qualidade garantida.",
  },
  {
    icon: Building2,
    title: "Reformas",
    description: "Reformas completas de apartamentos, casas e espaços comerciais.",
  },
  {
    icon: Sparkles,
    title: "Limpeza Profissional",
    description: "Limpeza pós-obra, limpeza de vidros, fachadas e serviços de conservação.",
  },
  {
    icon: TreeDeciduous,
    title: "Jardinagem",
    description: "Paisagismo, manutenção de jardins, poda de árvores e plantio.",
  },
  {
    icon: Truck,
    title: "Mudanças",
    description: "Serviços de mudança residencial e comercial com cuidado e segurança.",
  },
];

const stats = [
  { value: "+500", label: "Projetos Realizados" },
  { value: "+50", label: "Profissionais" },
  { value: "98%", label: "Clientes Satisfeitos" },
  { value: "+10", label: "Anos de Mercado" },
];

const MestreDosServicos = () => {
  return (
    <>
      <SEO
        title="Mestre dos Serviços | Reformas, Construções e Serviços Gerais"
        description="Empresa especializada em reformas, construções, pintura e serviços gerais. Mais de 500 projetos realizados com qualidade e compromisso."
        canonical="https://autoescolaaptos.com.br/parceiros/mestre-dos-servicos"
      />
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-block px-4 py-2 bg-white/20 text-white rounded-full text-sm font-semibold mb-6">
                Parceiro Autoescola APTOS
              </span>
              <h1 className="text-4xl md:text-6xl font-heading font-black mb-6">
                Mestre dos <span className="text-accent">Serviços</span>
              </h1>
              <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8">
                Excelência em reformas, construções e serviços gerais para sua casa ou empresa
              </p>
              <Button size="lg" className="h-14 px-8 text-lg bg-white text-primary hover:bg-white/90" asChild>
                <a
                  href="https://mestredosservicos.com.br"
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

        {/* Stats Section */}
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-heading font-black text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
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
                Sobre a <span className="text-primary">Empresa</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                O Mestre dos Serviços é uma empresa consolidada no mercado de reformas e 
                construções. Com mais de 10 anos de experiência, oferecemos soluções 
                completas para projetos residenciais e comerciais, sempre com qualidade, 
                pontualidade e preço justo. Nossa equipe de profissionais qualificados 
                está pronta para transformar seu espaço.
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
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading font-bold text-lg mb-2">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Why Choose Us */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-black mb-6">
                Nossos <span className="text-primary">Diferenciais</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 text-center h-full bg-primary/5 border-primary/20">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-3">Equipe Qualificada</h3>
                  <p className="text-muted-foreground">
                    Profissionais experientes e treinados para entregar o melhor resultado.
                  </p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card className="p-8 text-center h-full bg-primary/5 border-primary/20">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-3">Garantia de Qualidade</h3>
                  <p className="text-muted-foreground">
                    Todos os serviços com garantia e acompanhamento pós-entrega.
                  </p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-8 text-center h-full bg-primary/5 border-primary/20">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapPin className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-3">Atendimento Regional</h3>
                  <p className="text-muted-foreground">
                    Atendemos toda a região de São José dos Pinhais e Curitiba.
                  </p>
                </Card>
              </motion.div>
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
              <Card className="p-8 md:p-12 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground border-0 text-center">
                <h2 className="text-3xl md:text-4xl font-heading font-black mb-4">
                  Solicite um Orçamento
                </h2>
                <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                  Entre em contato e transforme seu projeto em realidade com o Mestre dos Serviços.
                </p>
                <Button size="lg" className="h-14 px-8 text-lg bg-white text-primary hover:bg-white/90" asChild>
                  <a
                    href="https://mestredosservicos.com.br"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Solicitar Orçamento
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

export default MestreDosServicos;
