import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, GraduationCap, RefreshCw, Bike, MessageCircle, ArrowRight } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Link } from "react-router-dom";
import { whatsappLink } from "@/lib/whatsapp";

const Services = () => {
  const { trackServiceRequest, trackWhatsAppClick, trackConsultorClick } = useAnalytics();
  
  const serviceDetails: Record<string, string> = {
    "Inclusão de Categoria (A ou B)": "/inclusao-categoria",
    "Curso de Reciclagem 100% Online": "/reciclagem-cnh",
    "Reteste Prático": "/reteste-pratico",
  };

  const services = [
    {
      icon: GraduationCap,
      title: "Primeira Habilitação",
      description: "Categoria A (moto) e B (carro), com opções manual e automática nas aulas práticas",
      features: [
        "Material didático incluso",
        "Curso teórico online (app CNH do Brasil)",
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
        "Acompanhamento no DETRAN-PR",
      ],
    },
    {
      icon: Car,
      title: "Inclusão de Categoria (A ou B)",
      description: "Adicione a categoria A (moto) ou B (carro) à sua CNH atual",
      features: [
        "De B para AB (adicionar moto)",
        "De A para AB (adicionar carro)",
        "Aulas específicas para a nova categoria",
        "Suporte completo no processo",
      ],
    },
    {
      icon: Bike,
      title: "Curso de Reciclagem 100% Online",
      description: "Para condutores suspensos que precisam voltar a dirigir",
      features: [
        "EAD aprovado pelo DETRAN-PR",
        "30 horas no seu ritmo",
        "Certificado enviado ao DETRAN",
        "Suporte por WhatsApp",
      ],
    },
    {
      icon: RefreshCw,
      title: "Reteste Prático",
      description: "Aulas focadas no que você reprovou para voltar ao exame preparado",
      features: [
        "Diagnóstico da causa da reprovação",
        "Treino no circuito real do DETRAN-PR",
        "Carro no padrão exato do exame",
        "Acompanhamento no dia do reteste",
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
                  {service.title === "Primeira Habilitação" ? (
                    <Link
                      to="/orcamento"
                      onClick={() => trackServiceRequest(service.title)}
                      data-component="HomePrimeiraHabilitacaoFunil"
                      data-intent="orcamento"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Fazer orçamento em 3 passos
                    </Link>
                  ) : (
                    <a
                      href={whatsappLink("Olá! Gostaria de informações sobre o serviço de " + service.title + " na Autoescola APTOS.", "direto")}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        trackServiceRequest(service.title);
                        trackWhatsAppClick("services", service.title);
                      }}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Solicitar Orçamento
                    </a>
                  )}
                </Button>
                {serviceDetails[service.title] && (
                  <Link
                    to={serviceDetails[service.title]}
                    className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md text-sm font-semibold text-primary underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    data-component="HomeServiceDetails"
                    data-intent="informacoes"
                  >
                    Conhecer este serviço <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
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
          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button size="lg" variant="outline" className="min-h-12" asChild>
              <Link to="/comparador" data-component="HomeDuvidasComparador" data-intent="informacoes">
                <ArrowRight className="mr-2 h-5 w-5" aria-hidden="true" />
                Comparar categorias A, B e AB
              </Link>
            </Button>
          <Button size="lg" className="shadow-glow min-h-12" asChild>
            <a
              href={whatsappLink("Olá! Preciso de ajuda para escolher o serviço ideal da Autoescola APTOS.", "direto")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackConsultorClick()}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Fale com um Consultor
            </a>
          </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
