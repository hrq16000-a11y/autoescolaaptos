import { Link } from "react-router-dom";
import { neighborhoods } from "@/data/neighborhoods";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const NeighborhoodsIndex = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Bairros atendidos pela Autoescola APTOS",
    "description": "Lista de bairros em São José dos Pinhais atendidos pela Autoescola APTOS",
    "itemListElement": neighborhoods.map((n, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "LocalBusiness",
        "name": `Autoescola APTOS - ${n.name}`,
        "url": `https://autoescolaaptos.com.br/bairros/${n.slug}`
      }
    }))
  };

  return (
    <>
      <SEO 
        title="Autoescola em São José dos Pinhais - Todos os Bairros | APTOS"
        description="Autoescola APTOS atende todos os bairros de São José dos Pinhais. Centro, Afonso Pena, Cidade Jardim, Guatupê, Costeira e mais. Ligue: (41) 3383-3627"
        canonical="/bairros"
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
                  <BreadcrumbPage>Bairros</BreadcrumbPage>
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
                Autoescola em São José dos Pinhais
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl">
                A Autoescola APTOS atende todos os bairros de São José dos Pinhais. 
                Encontre a página do seu bairro e conheça nossos serviços de habilitação, 
                renovação de CNH e cursos.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Neighborhoods Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {neighborhoods.map((neighborhood, index) => (
                <motion.div
                  key={neighborhood.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link to={`/bairros/${neighborhood.slug}`}>
                    <Card className="h-full hover:shadow-medium transition-all hover:-translate-y-1 group">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-primary" />
                          </div>
                          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                        <h2 className="text-lg font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {neighborhood.name}
                        </h2>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {neighborhood.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
              Serviços Disponíveis em Todos os Bairros
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Independente do bairro onde você mora, oferecemos todos os serviços 
              de formação de condutores com a mesma qualidade e dedicação.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                "Primeira Habilitação",
                "Renovação de CNH",
                "Mudança de Categoria",
                "Curso de Reciclagem"
              ].map((service, index) => (
                <Link
                  key={index}
                  to="/#servicos"
                  className="p-4 bg-background rounded-lg hover:shadow-medium transition-all hover:-translate-y-1"
                >
                  <span className="font-medium text-foreground">{service}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Footer />
        <FloatingWhatsApp />
      </main>
    </>
  );
};

export default NeighborhoodsIndex;
