import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, GraduationCap, RefreshCw, Bike, MessageCircle } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: GraduationCap,
      title: "Primeira Habilitação",
      description: "Categoria A (moto) e B (carro) com aulas práticas e teóricas completas",
      features: [
        "Material didático incluso",
        "Aulas teóricas presenciais",
        "Aulas práticas com instrutores credenciados",
        "Simulado online preparatório",
      ],
      highlight: "Promoção Especial",
    },
    {
      icon: RefreshCw,
      title: "Renovação de CNH",
      description: "Processo rápido e simples para renovar sua carteira de motorista",
      features: [
        "Atendimento ágil",
        "Exame médico e psicotécnico",
        "Documentação completa",
        "Acompanhamento no Detran",
      ],
    },
    {
      icon: Car,
      title: "Mudança de Categoria",
      description: "Adicione novas categorias à sua habilitação com facilidade",
      features: [
        "De B para AB (adicionar moto)",
        "Outras mudanças de categoria",
        "Aulas específicas para nova categoria",
        "Suporte completo no processo",
      ],
    },
    {
      icon: Bike,
      title: "Curso de Reciclagem",
      description: "Para condutores que precisam reciclar pontos na CNH",
      features: [
        "Aulas teóricas atualizadas",
        "Conteúdo focado em segurança",
        "Horários flexíveis",
        "Certificado reconhecido pelo Detran",
      ],
    },
  ];

  return (
    <section id="servicos" className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Nossos Serviços
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-black mb-6">
            Tudo que Você Precisa para{" "}
            <span className="text-primary">Conquistar sua CNH</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Da primeira habilitação à renovação, oferecemos serviços completos
            com qualidade e compromisso com sua aprovação
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-8 h-full hover:shadow-large transition-all duration-300 border-2 hover:border-primary/20 relative overflow-hidden group">
                {service.highlight && (
                  <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold">
                    {service.highlight}
                  </div>
                )}
                
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>

                <h3 className="text-2xl font-heading font-bold mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                  <a
                    href={`https://api.whatsapp.com/send?phone=5541991453627&text=Olá,%20gostaria%20de%20informações%20sobre%20o%20serviço%20de%20${encodeURIComponent(service.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Solicitar Orçamento
                  </a>
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-lg mb-6 text-muted-foreground">
            Tem dúvidas sobre qual serviço é ideal para você?
          </p>
          <Button size="lg" className="shadow-glow" asChild>
            <a
              href="https://api.whatsapp.com/send?phone=5541991453627&text=Olá,%20preciso%20de%20ajuda%20para%20escolher%20o%20serviço%20ideal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Fale com um Consultor
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
