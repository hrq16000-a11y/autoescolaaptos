import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  GraduationCap, 
  BookOpen, 
  Car, 
  FileCheck, 
  MessageCircle, 
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Shield,
  Clock,
  Users,
  Award
} from "lucide-react";

const PrimeiraHabilitacao = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "Primeira Habilitação - Autoescola APTOS",
        "description": "Serviço completo de primeira habilitação categorias A e B em Curitiba e São José dos Pinhais, conforme Resolução CONTRAN 1020/2025.",
        "provider": {
          "@type": "DrivingSchool",
          "name": "Autoescola APTOS",
          "address": { "@type": "PostalAddress", "addressLocality": "São José dos Pinhais", "addressRegion": "PR", "addressCountry": "BR" }
        },
        "areaServed": ["Curitiba", "São José dos Pinhais"]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "Quanto custa tirar a primeira habilitação em Curitiba?", "acceptedAnswer": { "@type": "Answer", "text": "O valor varia conforme a categoria (A, B ou AB) e inclui taxas do DETRAN-PR (exames médico e psicológico R$ 404), aulas práticas e materiais. Fale no WhatsApp (41) 99145-3627 para o orçamento atualizado." } },
          { "@type": "Question", "name": "Quanto tempo leva para tirar a CNH com a Resolução 1020/2025?", "acceptedAnswer": { "@type": "Answer", "text": "Depende do seu ritmo: o teórico é 100% online pelo app CNH do Brasil, sem carga horária mínima, e a prática exige apenas 2 horas obrigatórias. Não há mais prazo de 12 meses para concluir." } },
          { "@type": "Question", "name": "Preciso fazer aulas presenciais?", "acceptedAnswer": { "@type": "Answer", "text": "O curso teórico pode ser 100% online pelo app CNH do Brasil. As 2 horas de prática são obrigatoriamente presenciais com instrutor credenciado." } },
          { "@type": "Question", "name": "Qual a idade mínima para tirar CNH?", "acceptedAnswer": { "@type": "Answer", "text": "18 anos completos, saber ler e escrever e possuir CPF." } }
        ]
      }
    ]
  };

  const etapas = [
    {
      icon: FileCheck,
      title: "Abertura do Processo",
      description: "Procure uma autoescola ou use o app CNH do Brasil. Agende biometria no DETRAN-PR pelo site ou app Detran Inteligente"
    },
    {
      icon: BookOpen,
      title: "Formação Teórica",
      description: "Sem carga horária mínima! Estude pelo CFC presencial ou 100% online pelo app CNH do Brasil, no seu ritmo"
    },
    {
      icon: GraduationCap,
      title: "Prova Teórica",
      description: "60 minutos de prova (120 min para dislexia/TDAH/TEA), 30 questões com aprovação em 20 acertos"
    },
    {
      icon: Car,
      title: "Aulas Práticas (mín. 2h)",
      description: "Apenas 2 horas obrigatórias pela Res. 1020/2025. Recomendamos avaliar se está preparado antes do teste"
    },
    {
      icon: Award,
      title: "Prova Prática",
      description: "Exame de direção no DETRAN. Sem prazo de 12 meses para concluir — vá no seu ritmo!"
    }
  ];

  const diferenciais = [
    {
      icon: Shield,
      title: "CFC Credenciado",
      description: "Centro de Formação de Condutores autorizado pelo DETRAN-PR"
    },
    {
      icon: Users,
      title: "Instrutores Qualificados",
      description: "Equipe com anos de experiência e certificação atualizada"
    },
    {
      icon: Clock,
      title: "Horários Flexíveis",
      description: "Aulas em horários que se adaptam à sua rotina"
    },
    {
      icon: Car,
      title: "Veículos Novos",
      description: "Frota moderna e adaptada para aprendizado seguro"
    }
  ];

  return (
    <>
      <SEO
        title="Primeira Habilitação em Curitiba | CNH Categoria A e B | APTOS"
        description="Primeira habilitação em Curitiba e São José dos Pinhais pela Res. 1020/2025: teórico 100% online no app CNH do Brasil, só 2h de prática obrigatória, sem prazo de 12 meses."
        canonical="/primeira-habilitacao"
        jsonLd={jsonLd}
      />
      
      <Navbar />
      
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            {/* Breadcrumbs */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                <li><Link to="/" className="hover:text-primary">Início</Link></li>
                <li>/</li>
                <li className="text-foreground font-medium">Primeira Habilitação</li>
              </ol>
            </nav>

            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                  CNH Categoria A e B
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-6 leading-tight">
                  Primeira Habilitação
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
                  Conquiste sua CNH com segurança e preparo completo. Nossa formação segue 
                  rigorosamente as diretrizes da <strong>Resolução CONTRAN 1020/2025</strong> e 
                  as normas do DETRAN-PR.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="shadow-glow" asChild>
                    <a
                      href="https://api.whatsapp.com/send?phone=5541991453627&text=Olá,%20gostaria%20de%20informações%20sobre%20Primeira%20Habilitação"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Fale com um Consultor
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/resolucao-1020-2025">
                      Entenda as Mudanças
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Aviso Legal */}
        <section className="py-8 bg-secondary/10 border-y border-secondary/20">
          <div className="container mx-auto px-4">
            <div className="flex items-start gap-4 max-w-4xl mx-auto">
              <AlertCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Aviso Importante:</strong> As regras para 
                obtenção da CNH podem variar conforme regulamentação do DETRAN do seu Estado. 
                A Autoescola APTOS é um Centro de Formação de Condutores (CFC) credenciado 
                pelo DETRAN-PR, seguindo todas as diretrizes da Resolução CONTRAN 1020/2025 
                e do Código de Trânsito Brasileiro.
              </p>
            </div>
          </div>
        </section>

        {/* O que mudou - Resumo */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-black mb-4">
                Resolução CONTRAN 1020/2025
              </h2>
              <p className="text-muted-foreground">
                A nova resolução trouxe atualizações importantes para o processo de habilitação. 
                Conheça o que mudou e o que permanece obrigatório.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* O que mudou */}
              <Card className="p-8 border-2 border-primary/20">
                <h3 className="text-xl font-heading font-bold mb-6 flex items-center gap-2 text-primary">
                  <CheckCircle2 className="w-6 h-6" />
                  O Que Mudou
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Aulas práticas reduzidas para 2 horas mínimas</strong> (antes eram 20h obrigatórias)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Sem carga horária mínima teórica:</strong> estude no seu ritmo, presencial ou 100% online pelo app CNH do Brasil
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Fim do prazo de 12 meses:</strong> não existe mais obrigatoriedade de finalizar o processo em prazo determinado
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Processo digital:</strong> abertura e acompanhamento pelo aplicativo CNH do Brasil ou pela autoescola
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Prova teórica atualizada:</strong> 60 min de duração, aprovação com 20/30 acertos
                    </span>
                  </li>
                </ul>
              </Card>

              {/* O que continua obrigatório */}
              <Card className="p-8 border-2 border-secondary/20">
                <h3 className="text-xl font-heading font-bold mb-6 flex items-center gap-2 text-secondary">
                  <AlertCircle className="w-6 h-6" />
                  Continua Obrigatório
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Exames médico e psicológico</strong> (R$ 404 no PR, teto nacional de R$ 180 em análise jurídica)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Aprovação nas provas teórica e prática</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Mínimo de 2 horas de aulas práticas</strong> com instrutor credenciado
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Biometria e abertura formal no DETRAN-PR</strong> (agendamento obrigatório)
                    </span>
                  </li>
                </ul>
              </Card>
            </div>

            <div className="text-center mt-8">
              <Button variant="link" asChild>
                <Link to="/resolucao-1020-2025" className="text-primary">
                  Saiba mais sobre a Resolução 1020/2025 →
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Fluxo Visual Comparativo */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-black mb-4">
                Compare as <span className="text-primary">Modalidades</span>
              </h2>
              <p className="text-muted-foreground">
                Conforme regulamentação do DETRAN, existem diferentes caminhos para a formação teórica
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Formação com CFC */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full border-2 border-primary/30 bg-primary/5">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-primary">Formação Completa CFC</h3>
                      <span className="text-sm text-muted-foreground">Recomendado</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 text-xs text-primary-foreground font-bold">1</div>
                      <span className="text-sm">Abertura de processo na autoescola</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 text-xs text-primary-foreground font-bold">2</div>
                      <span className="text-sm">Curso teórico presencial no CFC</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 text-xs text-primary-foreground font-bold">3</div>
                      <span className="text-sm">Exames médico e psicológico</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 text-xs text-primary-foreground font-bold">4</div>
                      <span className="text-sm">Prova teórica DETRAN</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 text-xs text-primary-foreground font-bold">5</div>
                      <span className="text-sm">Aulas práticas com instrutor</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 text-xs text-primary-foreground font-bold">6</div>
                      <span className="text-sm">Prova prática DETRAN</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-primary/20">
                    <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                      <CheckCircle2 className="w-5 h-5" />
                      Vantagens
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Acompanhamento completo</li>
                      <li>• Maior taxa de aprovação</li>
                      <li>• Suporte administrativo</li>
                      <li>• Instrutores certificados</li>
                    </ul>
                  </div>
                </Card>
              </motion.div>

              {/* Formação Híbrida */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full border-2 border-secondary/30 bg-secondary/5">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-secondary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-secondary">Formação Híbrida</h3>
                      <span className="text-sm text-muted-foreground">Quando autorizado pelo DETRAN</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 text-xs text-secondary-foreground font-bold">1</div>
                      <span className="text-sm">Abertura de processo na autoescola</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 text-xs text-secondary-foreground font-bold">2</div>
                      <span className="text-sm">Curso teórico via plataforma CNH Brasil</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 text-xs text-secondary-foreground font-bold">3</div>
                      <span className="text-sm">Exames médico e psicológico</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 text-xs text-secondary-foreground font-bold">4</div>
                      <span className="text-sm">Prova teórica DETRAN</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 text-xs text-secondary-foreground font-bold">5</div>
                      <span className="text-sm">Aulas práticas obrigatórias (mínimo 2)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 text-xs text-secondary-foreground font-bold">6</div>
                      <span className="text-sm">Prova prática DETRAN</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-secondary/20">
                    <div className="flex items-center gap-2 text-secondary font-semibold mb-2">
                      <AlertCircle className="w-5 h-5" />
                      Considerações
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Requer mais autodisciplina</li>
                      <li>• Sujeito a regulamentação estadual</li>
                      <li>• Menor suporte presencial</li>
                      <li>• Aulas práticas ainda obrigatórias</li>
                    </ul>
                  </div>
                </Card>
              </motion.div>
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground mb-4">
                Em ambos os casos, a <strong>Autoescola APTOS</strong> oferece suporte completo para abertura de processo, 
                aulas práticas e acompanhamento até a aprovação.
              </p>
              <Button asChild>
                <Link to="/formas-estudo-teorico">
                  Conheça as Formas de Estudo Teórico
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Etapas do Processo */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-black mb-4">
                Etapas para sua <span className="text-primary">Primeira CNH</span>
              </h2>
              <p className="text-muted-foreground">
                Acompanhamos você em cada fase do processo de habilitação
              </p>
            </motion.div>

            <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
              {etapas.map((etapa, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="relative">
                    <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <etapa.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="font-heading font-bold mb-2">{etapa.title}</h3>
                  <p className="text-sm text-muted-foreground">{etapa.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-black mb-4">
                Por que escolher a <span className="text-primary">Autoescola APTOS</span>?
              </h2>
              <p className="text-muted-foreground">
                Formação completa, segura e com acompanhamento personalizado
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {diferenciais.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full text-center hover:shadow-medium transition-shadow">
                    <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Links para outras páginas */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-black mb-4">
                Saiba Mais
              </h2>
              <p className="text-muted-foreground">
                Explore mais informações sobre cada etapa do processo
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <Link to="/formas-estudo-teorico">
                <Card className="p-6 h-full hover:shadow-medium hover:border-primary/20 transition-all group">
                  <BookOpen className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                    Formas de Estudo Teórico
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Conheça as opções disponíveis para o curso teórico
                  </p>
                </Card>
              </Link>

              <Link to="/aulas-praticas-direcao">
                <Card className="p-6 h-full hover:shadow-medium hover:border-primary/20 transition-all group">
                  <Car className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                    Aulas Práticas
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Saiba como funcionam as aulas de direção veicular
                  </p>
                </Card>
              </Link>

              <Link to="/exames-detran">
                <Card className="p-6 h-full hover:shadow-medium hover:border-primary/20 transition-all group">
                  <GraduationCap className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                    Exames do DETRAN
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Entenda as provas teórica e prática
                  </p>
                </Card>
              </Link>

              <Link to="/por-que-autoescola-credenciada">
                <Card className="p-6 h-full hover:shadow-medium hover:border-primary/20 transition-all group">
                  <Shield className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                    Por que Escolher um CFC
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Vantagens de uma autoescola credenciada
                  </p>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-black mb-4">
                Pronto para Tirar sua CNH?
              </h2>
              <p className="text-lg mb-8 text-primary-foreground/90">
                Fale com nossa equipe e inicie sua jornada rumo à habilitação com 
                segurança e preparo completo.
              </p>
              <Button size="lg" variant="secondary" className="shadow-lg" asChild>
                <a
                  href="https://api.whatsapp.com/send?phone=5541991453627&text=Olá,%20gostaria%20de%20informações%20sobre%20Primeira%20Habilitação"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Falar com Consultor
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

export default PrimeiraHabilitacao;
