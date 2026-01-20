import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileCheck, 
  Monitor, 
  BookOpen, 
  Stethoscope, 
  Car, 
  Trophy,
  ArrowRight
} from "lucide-react";

const etapas = [
  {
    numero: 1,
    icon: FileCheck,
    titulo: "INÍCIO",
    descricao: "Abertura de processo na autoescola, foto e biometria"
  },
  {
    numero: 2,
    icon: Monitor,
    titulo: "PLATAFORMA",
    descricao: "Acessar plataforma CNH do Brasil para fazer teórico (ou CFC)"
  },
  {
    numero: 3,
    icon: BookOpen,
    titulo: "AULAS TEÓRICAS",
    descricao: "Concluir aulas teóricas pela plataforma"
  },
  {
    numero: 4,
    icon: Stethoscope,
    titulo: "EXAMES",
    descricao: "Agendamento exames médico e psicológico"
  },
  {
    numero: 5,
    icon: Car,
    titulo: "AULAS PRÁTICAS",
    descricao: "O aluno deve fazer obrigatoriamente 2 (duas) aulas práticas"
  },
  {
    numero: 6,
    icon: Trophy,
    titulo: "TESTE PRÁTICO",
    descricao: "Após conclusão das aulas práticas será agendado o teste prático - FIM"
  }
];

const ProcessoHabilitacao = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5" id="processo">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-bold mb-4 shadow-glow">
            NOVO PROCEDIMENTO
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black mb-4">
            1ª Habilitação <span className="text-primary">Simplificada</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Conforme Resolução CONTRAN 1020/2025 e regulamentação do DETRAN-PR
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
          {etapas.map((etapa, index) => (
            <motion.div
              key={etapa.numero}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 h-full relative overflow-hidden group hover:shadow-medium hover:border-primary/30 transition-all">
                {/* Número grande de fundo */}
                <div className="absolute -top-4 -right-4 text-8xl font-black text-primary/5 group-hover:text-primary/10 transition-colors">
                  {etapa.numero}
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center shadow-glow">
                      <etapa.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-black text-primary">{etapa.numero}</span>
                      <span className="text-2xl font-black text-muted-foreground">/</span>
                      <span className="text-lg font-bold text-muted-foreground">6</span>
                    </div>
                  </div>
                  
                  <h3 className="font-heading font-bold text-lg mb-2">{etapa.titulo}</h3>
                  <p className="text-muted-foreground text-sm">{etapa.descricao}</p>
                </div>

                {/* Linha conectora (apenas em telas grandes e não no último) */}
                {index < etapas.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-primary/20" />
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="shadow-glow" asChild>
              <a
                href="https://api.whatsapp.com/send?phone=5541991453627&text=Olá,%20gostaria%20de%20informações%20sobre%20o%20novo%20processo%20de%20primeira%20habilitação"
                target="_blank"
                rel="noopener noreferrer"
              >
                Iniciar Minha Habilitação
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/resolucao-1020-2025">
                Entenda a Nova Resolução
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessoHabilitacao;
