import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  MessageCircle,
  Scale,
  BookOpen,
  Car,
  Smartphone,
  Building,
  ArrowRight
} from "lucide-react";

const Resolucao1020 = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Resolução CONTRAN 1020/2025 - O que Mudou na CNH",
    "description": "Guia completo sobre a Resolução CONTRAN 1020/2025 e as mudanças no processo de habilitação. Saiba o que é diretriz nacional e o que depende do DETRAN estadual.",
    "author": {
      "@type": "Organization",
      "name": "Autoescola APTOS"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Autoescola APTOS"
    }
  };

  const principaisMudancas = [
    {
      icon: Smartphone,
      title: "Aulas Práticas: Apenas 2 Horas",
      description: "A carga horária mínima de aulas práticas caiu de 20h para apenas 2h para primeira habilitação. As autoescolas do Paraná já estão autorizadas a oferecer o curso na nova modalidade."
    },
    {
      icon: BookOpen,
      title: "Teórico Sem Carga Horária Mínima",
      description: "Não há mais carga horária mínima obrigatória para o curso teórico. O candidato pode estudar pelo CFC presencial ou 100% online pelo aplicativo CNH do Brasil, no seu ritmo."
    },
    {
      icon: Scale,
      title: "Fim do Prazo de 12 Meses",
      description: "Não existe mais a obrigatoriedade de finalizar o processo de obtenção da CNH em 12 meses. Essa mudança já foi implementada no sistema do DETRAN-PR."
    }
  ];

  const continuaObrigatorio = [
    {
      title: "Exames Médico e Psicológico",
      description: "Obrigatórios para todos os candidatos. No PR, o valor atual é R$ 404 (teto nacional de R$ 180 em análise jurídica pela PGE-PR)."
    },
    {
      title: "Prova Teórica (60 min, 20/30 acertos)",
      description: "Duração aumentou de 50 para 60 minutos (120 min para candidatos com dislexia, TDAH ou TEA). Aprovação com 20 de 30 questões."
    },
    {
      title: "Mínimo de 2 Horas de Aulas Práticas",
      description: "A formação prática com instrutor credenciado é obrigatória, com mínimo reduzido para 2 horas. Recomendamos avaliar o preparo antes do teste."
    },
    {
      title: "Prova Prática de Direção",
      description: "O exame prático segue o procedimento anterior (incluindo baliza) até a publicação do novo Manual Brasileiro de Exames pela Senatran."
    },
    {
      title: "Biometria e Abertura no DETRAN-PR",
      description: "O início formal do processo é pelo agendamento no DETRAN-PR (site ou app Detran Inteligente), não pelo app CNH do Brasil."
    }
  ];

  return (
    <>
      <SEO
        title="Resolução CONTRAN 1020/2025 | O que Mudou na CNH | Autoescola APTOS"
        description="Entenda as mudanças da Resolução CONTRAN 1020/2025 para obtenção da CNH. Guia completo sobre o que é nacional e o que depende do DETRAN estadual."
        canonical="/resolucao-1020-2025"
        jsonLd={jsonLd}
      />
      
      <Navbar />
      
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-secondary/10 via-background to-primary/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            {/* Breadcrumbs */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                <li><Link to="/" className="hover:text-primary">Início</Link></li>
                <li>/</li>
                <li><Link to="/primeira-habilitacao" className="hover:text-primary">Primeira Habilitação</Link></li>
                <li>/</li>
                <li className="text-foreground font-medium">Resolução 1020/2025</li>
              </ol>
            </nav>

            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-8 h-8 text-secondary" />
                  <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold">
                    Atualização Normativa
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-6 leading-tight">
                  O que Mudou na CNH com a <span className="text-secondary">Resolução 1020/2025</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
                  Entenda as principais mudanças trazidas pela nova resolução do CONTRAN 
                  e o que permanece obrigatório no processo de habilitação.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Aviso Legal */}
        <section className="py-8 bg-accent/10 border-y border-accent/20">
          <div className="container mx-auto px-4">
            <div className="flex items-start gap-4 max-w-4xl mx-auto">
              <AlertCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Importante:</strong> A implementação das 
                novas regras pode variar conforme regulamentação do DETRAN de cada Estado. 
                Consulte sempre as normas específicas do seu DETRAN para informações 
                precisas sobre os requisitos locais.
              </p>
            </div>
          </div>
        </section>

        {/* Introdução */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-heading font-black mb-6">
                  Sobre a Resolução
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    A <strong className="text-foreground">Resolução CONTRAN 1020/2025</strong> foi publicada 
                    no Diário Oficial da União em 10 de dezembro de 2025, modernizando o processo de obtenção 
                    da CNH em todo o Brasil. No Paraná, o CETRAN (Conselho Estadual de Trânsito) publicou 
                    resolução específica para normatizar os novos fluxos no âmbito do DETRAN-PR.
                  </p>
                  <p>
                    As principais mudanças incluem: <strong className="text-foreground">redução da carga horária prática para 2 horas</strong>, 
                    fim da carga horária mínima teórica, possibilidade de estudo 100% online pelo app CNH do Brasil, 
                    fim do prazo de 12 meses para conclusão e processo digital. O tempo médio para obter a CNH 
                    caiu para <strong className="text-foreground">2 a 3 meses</strong>, dependendo da agenda do DETRAN e do ritmo do candidato.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Principais Mudanças */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-black mb-4">
                Principais <span className="text-primary">Mudanças</span>
              </h2>
              <p className="text-muted-foreground">
                Conheça as principais alterações trazidas pela nova resolução
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {principaisMudancas.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-8 h-full border-2 hover:border-primary/20 transition-colors">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                      <item.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-heading font-bold mb-4">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* O que continua obrigatório */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-black mb-4">
                O que <span className="text-secondary">Continua Obrigatório</span>
              </h2>
              <p className="text-muted-foreground">
                Apesar das mudanças, diversos requisitos permanecem inalterados
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-4">
                {continuaObrigatorio.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6 flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-heading font-bold mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Nacional vs Estadual */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-black mb-4">
                Diretriz Nacional x <span className="text-secondary">Situação no Paraná</span>
              </h2>
              <p className="text-muted-foreground">
                O que a resolução prevê nacionalmente e como está no DETRAN-PR
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="p-8 border-2 border-primary/20">
                <div className="flex items-center gap-3 mb-6">
                  <Scale className="w-8 h-8 text-primary" />
                  <h3 className="text-xl font-heading font-bold">Diretriz Nacional (Res. 1020/2025)</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">Aulas práticas mínimas de 2 horas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">Sem carga horária mínima teórica</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">Fim do prazo de 12 meses para conclusão</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">Prova teórica: 60 min, aprovação com 20/30 acertos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">Teto de R$ 180 para exames médico + psicológico</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">Primeiro reteste gratuito</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">CNH Digital gratuita após aprovação</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-8 border-2 border-secondary/20">
                <div className="flex items-center gap-3 mb-6">
                  <Building className="w-8 h-8 text-secondary" />
                  <h3 className="text-xl font-heading font-bold">Situação no Paraná (DETRAN-PR)</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">Exames médico/psicológico: R$ 404 (teto nacional em análise pela PGE-PR)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">Reteste gratuito: ainda não implementado (aguarda parecer jurídico)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">Questões do exame teórico em sincronização com o Banco Nacional</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">Teste prático segue procedimento anterior (baliza inclusa)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">CNH Digital gratuita em implementação (documento impresso ainda obrigatório)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">PPD emitida em ~10 dias úteis após aprovação</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* Links Relacionados */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-black mb-4">
                Explore Mais
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Link to="/formas-estudo-teorico">
                <Card className="p-6 h-full hover:shadow-medium hover:border-primary/20 transition-all group">
                  <BookOpen className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                    Formas de Estudo Teórico
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Conheça as opções para a formação teórica
                  </p>
                  <span className="text-primary text-sm font-medium flex items-center gap-1">
                    Saiba mais <ArrowRight className="w-4 h-4" />
                  </span>
                </Card>
              </Link>

              <Link to="/aulas-praticas-direcao">
                <Card className="p-6 h-full hover:shadow-medium hover:border-primary/20 transition-all group">
                  <Car className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                    Aulas Práticas
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Entenda como funcionam as aulas de direção
                  </p>
                  <span className="text-primary text-sm font-medium flex items-center gap-1">
                    Saiba mais <ArrowRight className="w-4 h-4" />
                  </span>
                </Card>
              </Link>

              <Link to="/por-que-autoescola-credenciada">
                <Card className="p-6 h-full hover:shadow-medium hover:border-primary/20 transition-all group">
                  <Building className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                    Por que CFC Credenciado
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Vantagens de escolher uma autoescola credenciada
                  </p>
                  <span className="text-primary text-sm font-medium flex items-center gap-1">
                    Saiba mais <ArrowRight className="w-4 h-4" />
                  </span>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-black mb-4">
                Dúvidas sobre as Novas Regras?
              </h2>
              <p className="text-lg mb-8 text-secondary-foreground/90">
                Nossa equipe está preparada para esclarecer suas dúvidas e orientar 
                você no processo de habilitação conforme a nova resolução.
              </p>
              <Button size="lg" variant="outline" className="bg-white text-secondary hover:bg-white/90 shadow-lg" asChild>
                <a
                  href="https://api.whatsapp.com/send?phone=5541991453627&text=Olá,%20gostaria%20de%20entender%20melhor%20as%20mudanças%20da%20Resolução%201020/2025"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Falar com Especialista
                </a>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
};

export default Resolucao1020;
