import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Share2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SEO from "@/components/SEO";
import { getPostBySlug, getRelatedPosts, blogCategories } from "@/data/blogData";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : null;
  const relatedPosts = slug ? getRelatedPosts(slug, 3) : [];

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    }
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "datePublished": post.publishedAt,
    "author": {
      "@type": "Organization",
      "name": "Autoescola APTOS"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Autoescola APTOS",
      "logo": {
        "@type": "ImageObject",
        "url": "https://autoescolaaptos.com.br/og-image.jpg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://autoescolaaptos.com.br/blog/${post.slug}`
    }
  };

  return (
    <>
      <SEO
        title={`${post.title} | Autoescola APTOS`}
        description={post.description}
        canonical={`/blog/${post.slug}`}
        type="article"
        jsonLd={articleJsonLd}
      />
      
      <Navbar />
      
      <main className="min-h-screen bg-background pt-24">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">
              Início
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/blog" className="hover:text-primary transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground truncate max-w-[200px]">
              {post.title}
            </span>
          </nav>
        </div>

        {/* Article Header */}
        <article>
          <header className="py-8 md:py-12 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto text-center"
              >
                <Badge variant="secondary" className="mb-4">
                  {blogCategories.find(c => c.id === post.category)?.name}
                </Badge>
                
                <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-6">
                  {post.title}
                </h1>
                
                <div className="flex items-center justify-center gap-6 text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {post.readTime} de leitura
                  </span>
                </div>
              </motion.div>
            </div>
          </header>

          {/* Article Content */}
          <div className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="prose prose-lg max-w-none
                    prose-headings:font-heading prose-headings:text-foreground
                    prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                    prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                    prose-p:text-muted-foreground prose-p:leading-relaxed
                    prose-li:text-muted-foreground
                    prose-strong:text-foreground
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-table:border prose-table:border-border
                    prose-th:bg-muted prose-th:p-3 prose-th:text-left
                    prose-td:p-3 prose-td:border-t prose-td:border-border"
                  dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
                />

                {/* Share and Navigation */}
                <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                  <Button variant="outline" asChild>
                    <Link to="/blog">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Voltar ao Blog
                    </Link>
                  </Button>
                  
                  <Button variant="secondary" onClick={handleShare}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartilhar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
                Artigos Relacionados
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    to={`/blog/${relatedPost.slug}`}
                    className="bg-card rounded-lg p-6 shadow-soft hover:shadow-medium transition-all group"
                  >
                    <Badge variant="outline" className="mb-3">
                      {blogCategories.find(c => c.id === relatedPost.category)?.name}
                    </Badge>
                    <h3 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {relatedPost.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
              Quer aprender mais na prática?
            </h2>
            <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
              Na Autoescola APTOS você aprende com os melhores instrutores 
              de São José dos Pinhais. Venha nos conhecer!
            </p>
            <Button size="lg" variant="secondary" asChild>
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

// Simple markdown to HTML converter
function formatContent(content: string): string {
  return content
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    .replace(/❌/g, '<span class="text-destructive">❌</span>')
    .replace(/⚠️/g, '<span class="text-warning">⚠️</span>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^\|(.+)\|$/gim, (match) => {
      const cells = match.split('|').filter(c => c.trim());
      if (cells.some(c => c.includes('---'))) return '';
      const tag = match.includes('---') ? 'th' : 'td';
      return `<tr>${cells.map(c => `<${tag}>${c.trim()}</${tag}>`).join('')}</tr>`;
    })
    .replace(/(<tr>.*<\/tr>)+/gs, '<table>$&</table>');
}

export default BlogPost;
