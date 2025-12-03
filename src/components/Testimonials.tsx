import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";
import testimonial4 from "@/assets/testimonial-4.jpg";

const testimonials = [
  {
    id: 1,
    name: "Mariana Silva",
    photo: testimonial1,
    neighborhood: "Centro",
    service: "Primeira Habilitação",
    rating: 5,
    story: "Sempre tive muito medo de dirigir, mas os instrutores da APTOS foram extremamente pacientes comigo. Em 4 meses consegui minha CNH! Hoje dirijo com confiança e segurança. Recomendo demais!",
    date: "Aprovada em Outubro/2024"
  },
  {
    id: 2,
    name: "Rafael Santos",
    photo: testimonial2,
    neighborhood: "Afonso Pena",
    service: "Mudança de Categoria (A/B)",
    rating: 5,
    story: "Precisava adicionar a categoria A na minha CNH para trabalhar com entregas. A APTOS me ajudou com horários flexíveis e aulas práticas excelentes. Passei de primeira no DETRAN!",
    date: "Aprovado em Setembro/2024"
  },
  {
    id: 3,
    name: "Cláudia Ferreira",
    photo: testimonial3,
    neighborhood: "Cidade Jardim",
    service: "Renovação de CNH",
    rating: 5,
    story: "Fiquei anos sem dirigir e estava com receio de renovar. A equipe da APTOS foi super atenciosa, me ajudou com toda a documentação e fiz aulas de reciclagem que me devolveram a confiança no volante.",
    date: "Aprovada em Novembro/2024"
  },
  {
    id: 4,
    name: "Lucas Oliveira",
    photo: testimonial4,
    neighborhood: "Guatupê",
    service: "Primeira Habilitação",
    rating: 5,
    story: "Melhor autoescola de São José dos Pinhais! Instrutores super didáticos, simulados preparatórios e um suporte incrível. Consegui minha CNH em tempo recorde e já estou curtindo minha liberdade!",
    date: "Aprovado em Agosto/2024"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="depoimentos" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Histórias de Sucesso
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Conheça alguns dos nossos alunos aprovados e suas experiências na Autoescola APTOS
          </p>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-card hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="w-16 h-16 border-2 border-primary">
                      <AvatarImage src={testimonial.photo} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.neighborhood}</p>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>

                  <div className="relative flex-grow mb-4">
                    <Quote className="w-8 h-8 text-primary/20 absolute -top-2 -left-2" />
                    <p className="text-muted-foreground text-sm leading-relaxed pl-4">
                      {testimonial.story}
                    </p>
                  </div>

                  <div className="mt-auto pt-4 border-t border-border">
                    <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
                      {testimonial.service}
                    </span>
                    <p className="text-xs text-muted-foreground mt-2">{testimonial.date}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="w-20 h-20 border-2 border-primary">
                      <AvatarImage src={testimonials[currentIndex].photo} alt={testimonials[currentIndex].name} />
                      <AvatarFallback>{testimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-foreground">{testimonials[currentIndex].name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonials[currentIndex].neighborhood}</p>
                      <div className="flex gap-1 mt-1">
                        {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="relative mb-4">
                    <Quote className="w-10 h-10 text-primary/20 absolute -top-2 -left-2" />
                    <p className="text-muted-foreground leading-relaxed pl-6">
                      {testimonials[currentIndex].story}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full">
                      {testimonials[currentIndex].service}
                    </span>
                    <p className="text-sm text-muted-foreground mt-2">{testimonials[currentIndex].date}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Faça parte das nossas histórias de sucesso!
          </p>
          <Button asChild size="lg" className="font-semibold">
            <a href="#contato">Matricule-se Agora</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
