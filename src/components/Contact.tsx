import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Clock,
  MessageCircle,
  Facebook,
  Instagram,
} from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { whatsappLink } from "@/lib/whatsapp";

const Contact = () => {
  const { trackWhatsAppClick } = useAnalytics();

  const contactInfo = [
    {
      icon: MapPin,
      title: "Endereço",
      content: "Rua Passos de Oliveira, 810",
      subtitle: "São José dos Pinhais - PR",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp de triagem",
      content: "(41) 3383-3627",
      subtitle: "Orçamento e informações",
      link: whatsappLink("Olá! Vim pelo site da Autoescola APTOS e gostaria de um orçamento.", "funil"),
      external: true,
    },
    {
      icon: MessageCircle,
      title: "WhatsApp direto",
      content: "(41) 99145-3627",
      subtitle: "Fale agora com a equipe",
      link: whatsappLink("Olá! Vim pelo site da Autoescola APTOS.", "direto"),
      external: true,
    },
    {
      icon: Clock,
      title: "Horário de Atendimento",
      content: "Segunda a Sexta",
      subtitle: "Das 9h às 18h",
    },
  ];

  return (
    <section id="contato" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Fale Conosco
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-black mb-6">
            Estamos Prontos para{" "}
            <span className="text-primary">Atender Você no WhatsApp</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Tire suas dúvidas, faça sua matrícula ou agende uma visita — tudo pelo WhatsApp, sem burocracia.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-5xl mx-auto">
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-5 h-full hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading font-bold mb-1 text-sm">{item.title}</h3>
                {item.link ? (
                  <a
                    href={item.link}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    onClick={() => trackWhatsAppClick("contact_card")}
                    className="text-foreground hover:text-primary transition-colors font-medium block text-sm"
                  >
                    {item.content}
                  </a>
                ) : (
                  <p className="text-foreground font-medium text-sm">{item.content}</p>
                )}
                {item.subtitle && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.subtitle}
                  </p>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="p-8 md:p-12 bg-gradient-to-br from-secondary to-secondary/90 text-secondary-foreground border-0">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-3xl md:text-4xl font-heading font-black mb-4">
                Fale Conosco Agora pelo WhatsApp
              </h3>
              <p className="text-lg mb-8 text-secondary-foreground/90">
                Atendimento rápido e personalizado. Escolha o número mais adequado abaixo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-secondary hover:bg-white/90 shadow-lg text-lg h-14 px-8"
                  asChild
                >
                  <a
                    href={whatsappLink("Olá! Vim pelo site da Autoescola APTOS.", "direto")}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick("contact_section_direto")}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp direto (41) 99145-3627
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-secondary-foreground/10 backdrop-blur-sm border-white/30 text-white hover:bg-secondary-foreground/20 text-lg h-14 px-8"
                  asChild
                >
                  <a
                    href={whatsappLink("Olá! Gostaria de um orçamento pela Autoescola APTOS.", "funil")}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick("contact_section_funil")}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp triagem (41) 3383-3627
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Card className="overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3603.6156821891655!2d-49.20826542377697!3d-25.534560138093815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce3e4b8e3d3e3%3A0x3e3e3e3e3e3e3e3e!2sRua%20Passos%20de%20Oliveira%2C%20810%20-%20S%C3%A3o%20Jos%C3%A9%20dos%20Pinhais%2C%20PR!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização da Autoescola APTOS em São José dos Pinhais"
            />
          </Card>
        </motion.div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-4">Siga-nos nas redes sociais</p>
          <div className="flex justify-center space-x-4">
            <a
              href="https://www.facebook.com/cfcAutoescolaAPTOS/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Facebook da Autoescola APTOS"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/autoescola_aptos/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Instagram da Autoescola APTOS"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
