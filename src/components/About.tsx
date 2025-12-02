import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import instructorImage from "@/assets/instructor-teaching.jpg";
import classroomImage from "@/assets/classroom.jpg";

const About = () => {
  const values = [
    "Comprometimento com a excelência",
    "Instrutores qualificados e pacientes",
    "Foco na segurança e formação completa",
    "Atendimento personalizado",
    "Estrutura moderna e confortável",
  ];

  return (
    <section id="sobre" className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              Sobre a APTOS
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-black mb-6">
              Mais de 15 Anos Formando{" "}
              <span className="text-primary">Condutores de Qualidade</span>
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground mb-8">
              <p>
                A <strong className="text-foreground">Autoescola APTOS</strong> é referência
                em São José dos Pinhais desde 2008. Com mais de 15 anos de
                experiência, formamos milhares de condutores qualificados,
                sempre priorizando a segurança no trânsito e a excelência no
                ensino.
              </p>
              <p>
                Nossa equipe é formada por profissionais altamente capacitados e
                credenciados pelo Detran do Paraná. Combinamos tradição com
                inovação, oferecendo métodos de ensino atualizados e uma
                estrutura moderna para garantir a melhor experiência aos nossos
                alunos.
              </p>
              <p>
                <strong className="text-foreground">Nossa missão</strong> é formar
                condutores cada vez melhores para um trânsito mais seguro,
                sempre com ética, compromisso e responsabilidade social.
              </p>
            </div>

            <ul className="space-y-3">
              {values.map((value, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-medium">{value}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Images Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            <Card className="overflow-hidden col-span-2">
              <img
                src={instructorImage}
                alt="Instrutor da Autoescola APTOS ensinando aluno em aula prática de direção"
                className="w-full h-80 object-cover"
              />
            </Card>
            <Card className="overflow-hidden">
              <img
                src={classroomImage}
                alt="Sala de aula teórica da Autoescola APTOS com alunos estudando"
                className="w-full h-64 object-cover"
              />
            </Card>
            <Card className="overflow-hidden bg-gradient-to-br from-primary to-primary/80 p-8 flex flex-col justify-center items-center text-center text-primary-foreground">
              <div className="text-5xl font-heading font-black mb-2">
                +5000
              </div>
              <div className="text-sm font-semibold uppercase tracking-wide">
                Alunos Aprovados
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Credenciais */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="inline-block px-8 py-6 bg-secondary/10 border-secondary/20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-secondary" />
              </div>
              <div className="text-left">
                <div className="font-heading font-bold text-lg">
                  Credenciada pelo Detran PR
                </div>
                <div className="text-sm text-muted-foreground">
                  Todos os nossos processos seguem rigorosamente as normas do Detran
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
