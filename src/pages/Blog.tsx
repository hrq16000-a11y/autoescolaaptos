import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SEO from "@/components/SEO";
import { blogPosts, blogCategories } from "@/data/blogData";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog Autoescola APTOS",
    "description": "Dicas de direção, legislação de trânsito e preparação para provas do DETRAN",
    "url": "https://autoescolaaptos.com.br/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Autoescola APTOS",
      "logo": {
        "@type": "ImageObject",
        "url": "https://autoescolaaptos.com.br/og-image.jpg"
      }
    }
  };

  return (
    <>
      <SEO
        title="Blog | Autoescola APTOS - Dicas de Direção e Legislação"
        description="Artigos sobre direção defensiva, dicas para provas do DETRAN, legislação de trânsito e muito mais. Aprenda com especialistas em São José dos Pinhais."
        canonical="/blog"
        jsonLd={blogJsonLd}
      />
      
      <Navbar />
      
      <main className="min-h-screen bg-background pt-24">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="font-heading text-4xl md:text-5xl font-black text-foreground mb-4">
                Blog da <span className="text-primary">Autoescola APTOS</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Dicas, informações e tudo que você precisa saber sobre direção, 
                legislação de trânsito e como conquistar sua CNH.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar artigos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center">
                {blogCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Nenhum artigo encontrado para sua busca.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 group"
                  >
                    <Link to={`/blog/${post.slug}`}>
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors" />
                        <div className="absolute bottom-4 left-4">
                          <Badge variant="secondary" className="bg-background/90">
                            {blogCategories.find(c => c.id === post.category)?.name}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(post.publishedAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </span>
                        </div>
                        
                        <h2 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                        
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                          {post.description}
                        </p>
                        
                        <span className="inline-flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                          Ler mais <ArrowRight className="w-4 h-4 ml-1" />
                        </span>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
              Pronto para tirar sua CNH?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Na Autoescola APTOS em São José dos Pinhais, você aprende na prática 
              tudo que lê em nosso blog. Venha nos conhecer!
            </p>
            <Button size="lg" asChild>
              <a
                href="https://api.whatsapp.com/send?phone=5541991453627&text=Olá,%20vim%20pelo%20blog%20e%20gostaria%20de%20informações%20sobre%20a%20Autoescola%20APTOS"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fale Conosco no WhatsApp
              </a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
};

export default Blog;
