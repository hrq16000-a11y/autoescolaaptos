import { useParams, Link } from "react-router-dom";
import { getNeighborhoodBySlug, neighborhoods } from "@/data/neighborhoods";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { CheckCircle, MapPin, Phone, MessageCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import NotFound from "./NotFound";

const NeighborhoodPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const neighborhood = slug ? getNeighborhoodBySlug(slug) : undefined;

  if (!neighborhood) {
    return <NotFound />;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Autoescola APTOS - ${neighborhood.name}`,
    "description": neighborhood.description,
    "url": `https://autoescolaaptos.com.br/bairros/${neighborhood.slug}`,
    "telephone": "+554133833627",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "São José dos Pinhais",
      "addressRegion": "PR",
      "addressCountry": "BR",
      "streetAddress": neighborhood.name
    },
    "areaServed": {
      "@type": "Place",
      "name": `${neighborhood.name}, São José dos Pinhais`
    }
  };

  const services = [
    { name: "Primeira Habilitação", link: "/#servicos" },
    { name: "Renovação de CNH", link: "/#servicos" },
    { name: "Mudança de Categoria", link: "/#servicos" },
    { name: "Curso de Reciclagem", link: "/#servicos" }
  ];

  return (
    <>
      <SEO 
        title={`${neighborhood.title} | Autoescola APTOS`}
        description={neighborhood.metaDescription}
        canonical={`/bairros/${neighborhood.slug}`}
        jsonLd={jsonLd}
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
                  <BreadcrumbLink asChild>
                    <Link to="/bairros">Bairros</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{neighborhood.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 text-primary mb-4">
                <MapPin className="w-5 h-5" />
                <span className="font-medium">São José dos Pinhais - PR</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
                {neighborhood.title}
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl mb-8">
                {neighborhood.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="shadow-glow" asChild>
                  <a
                    href="https://api.whatsapp.com/send?phone=5541991453627&text=Olá,%20sou%20morador%20do%20bairro%20e%20gostaria%20de%20informações"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Fale Conosco
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="https://api.whatsapp.com/send?phone=554133833627href="tel:4133833627"text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Autoescola%20APTOS." target="_blank" rel="noopener noreferrer">
                    <Phone className="w-5 h-5 mr-2" />
                    (41) 3383-3627
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <Card>
                  <CardContent className="p-6 md:p-8">
                    <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                      Autoescola para moradores de {neighborhood.name}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {neighborhood.content}
                    </p>
                    
                    <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                      Nossos Diferenciais para {neighborhood.name}
                    </h3>
                    <ul className="space-y-3">
                      {neighborhood.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Services */}
                <Card>
                  <CardContent className="p-6 md:p-8">
                    <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                      Serviços Disponíveis em {neighborhood.name}
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {services.map((service, index) => (
                        <Link 
                          key={index}
                          to={service.link}
                          className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-primary/10 transition-colors group"
                        >
                          <span className="font-medium text-foreground">{service.name}</span>
                          <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* CTA Card */}
                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-heading font-semibold mb-3">
                      Agende sua Aula Experimental
                    </h3>
                    <p className="text-primary-foreground/90 mb-4">
                      Venha conhecer nossa estrutura e comece sua jornada para a habilitação.
                    </p>
                    <Button variant="secondary" className="w-full" asChild>
                      <a
                        href="https://api.whatsapp.com/send?phone=5541991453627&text=Olá,%20gostaria%20de%20agendar%20uma%20aula%20experimental"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Agendar Agora
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                {/* Nearby Areas */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                      Bairros Próximos
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {neighborhood.nearbyAreas.map((area, index) => {
                        const nearbyNeighborhood = neighborhoods.find(n => n.name === area);
                        return nearbyNeighborhood ? (
                          <Link
                            key={index}
                            to={`/bairros/${nearbyNeighborhood.slug}`}
                            className="px-3 py-1.5 bg-muted text-muted-foreground rounded-full text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            {area}
                          </Link>
                        ) : (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-muted text-muted-foreground rounded-full text-sm"
                          >
                            {area}
                          </span>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* All Neighborhoods */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                      Todos os Bairros
                    </h3>
                    <ul className="space-y-2">
                      {neighborhoods.map((n) => (
                        <li key={n.slug}>
                          <Link
                            to={`/bairros/${n.slug}`}
                            className={`text-sm hover:text-primary transition-colors ${
                              n.slug === slug ? "text-primary font-medium" : "text-muted-foreground"
                            }`}
                          >
                            Autoescola em {n.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Link */}
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              Dúvidas Frequentes sobre Autoescola
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Confira as perguntas mais comuns sobre habilitação, renovação de CNH e nossos serviços.
            </p>
            <Button asChild>
              <Link to="/perguntas-frequentes">
                Ver Perguntas Frequentes
                <ArrowRight className="w-4 h-4 ml-2" />
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

export default NeighborhoodPage;
