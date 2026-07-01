import { useState } from "react";
import { Link } from "react-router-dom";
import { faqData, faqCategories } from "@/data/faqData";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { HelpCircle, MessageCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredFAQ = activeCategory 
    ? faqData.filter(item => item.category === activeCategory)
    : faqData;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <>
      <SEO 
        title="Perguntas Frequentes CNH | Autoescola APTOS"
        description="Dúvidas sobre 1ª habilitação, renovação de CNH, mudança de categoria e reciclagem. FAQ da Autoescola APTOS em São José dos Pinhais."
        canonical="/perguntas-frequentes"
        jsonLd={faqJsonLd}
      />
      
      <main className="min-h-screen bg-background">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-28 pb-16 bg-gradient-to-br from-primary/10 via-background to-secondary/5">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Início</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Perguntas Frequentes</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 text-primary mb-4">
                <HelpCircle className="w-5 h-5" />
                <span className="font-medium">FAQ - Dúvidas Frequentes</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
                Perguntas Frequentes
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl mb-8">
                Encontre respostas para as principais dúvidas sobre habilitação, 
                renovação de CNH, mudança de categoria e nossos serviços.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="shadow-glow" asChild>
                  <a
                    href="https://api.whatsapp.com/send?phone=5541991453627&text=Olá,%20tenho%20uma%20dúvida%20sobre%20os%20serviços%20da%20autoescola"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Tire suas Dúvidas
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="https://api.whatsapp.com/send?phone=554133833627&amp;text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Autoescola%20APTOS." target="_blank" rel="noopener noreferrer" target="_blank" rel="noopener noreferrer">
                    <Phone className="w-5 h-5 mr-2" />
                    (41) 3383-3627
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-8">
              <Button
                variant={activeCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(null)}
              >
                Todas
              </Button>
              {faqCategories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* FAQ Accordion */}
            <div className="max-w-3xl">
              <Accordion type="single" collapsible className="space-y-4">
                {filteredFAQ.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                  >
                    <AccordionItem 
                      value={`item-${index}`}
                      className="bg-card border border-border rounded-lg px-6"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-4">
                        <div>
                          <span className="text-xs text-primary font-medium uppercase tracking-wide block mb-1">
                            {item.category}
                          </span>
                          <span className="font-medium text-foreground">
                            {item.question}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
              Não encontrou sua pergunta?
            </h2>
            <p className="text-primary-foreground/90 mb-8 max-w-xl mx-auto">
              Entre em contato conosco pelo WhatsApp ou telefone. 
              Nossa equipe está pronta para esclarecer todas as suas dúvidas.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="secondary" size="lg" asChild>
                <a
                  href="https://api.whatsapp.com/send?phone=5541991453627&text=Olá,%20tenho%20uma%20dúvida"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp
                </a>
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <a href="https://api.whatsapp.com/send?phone=554133833627&amp;text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Autoescola%20APTOS." target="_blank" rel="noopener noreferrer" target="_blank" rel="noopener noreferrer">
                  <Phone className="w-5 h-5 mr-2" />
                  Ligar Agora
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Neighborhoods Link */}
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              Atendemos Toda São José dos Pinhais
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Confira os bairros que atendemos e encontre informações específicas para sua região.
            </p>
            <Button variant="outline" asChild>
              <Link to="/bairros">
                Ver Todos os Bairros
              </Link>
            </Button>
          </div>
        </section>

        <Footer />
        <FloatingWhatsApp />
      </main>
    </>
  );
};

export default FAQ;
