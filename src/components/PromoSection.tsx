import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import promoAniversario from "@/assets/promo-aniversario.png";
import promoIndique from "@/assets/promo-indique-amigo.png";
import promoDiferenciais from "@/assets/promo-diferenciais.jpeg";
import cnhSuccess from "@/assets/cnh-success.jpg";
import classroom from "@/assets/classroom.jpg";
import instructorTeaching from "@/assets/instructor-teaching.jpg";
import { Button } from "@/components/ui/button";

const PromoSection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const promos = [
    {
      image: promoAniversario,
      alt: "Promoção de Aniversário - Autoescola APTOS",
      title: "Promoção de Aniversário",
      link: "/promocao-aniversario",
    },
    {
      image: promoIndique,
      alt: "Programa Indique e Ganhe - Autoescola APTOS",
      title: "Indique e Ganhe",
      link: "/promocao-indique-amigo",
    },
    {
      image: promoDiferenciais,
      alt: "Diferenciais Autoescola APTOS",
      title: "Nossos Diferenciais",
    },
    {
      image: cnhSuccess,
      alt: "Alunos aprovados - Autoescola APTOS",
      title: "Aprovação Garantida",
    },
    {
      image: classroom,
      alt: "Sala de aula moderna - Autoescola APTOS",
      title: "Estrutura Moderna",
    },
    {
      image: instructorTeaching,
      alt: "Instrutores qualificados - Autoescola APTOS",
      title: "Instrutores Experientes",
    },
  ];

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);
  
  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? promos.length - 1 : selectedImage - 1);
    }
  };
  
  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === promos.length - 1 ? 0 : selectedImage + 1);
    }
  };

  return (
    <section className="py-16 bg-muted" id="promocoes">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-black mb-4">
            Promoções e <span className="text-primary">Galeria</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Confira nossas promoções exclusivas e conheça nossa estrutura
          </p>
        </motion.div>

        {/* Main Featured Promos - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
          {promos.slice(0, 3).map((promo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-medium hover:shadow-strong transition-all duration-300">
                <img
                  src={promo.image}
                  alt={promo.alt}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white font-semibold p-4">{promo.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Secondary Gallery - 3 smaller columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {promos.slice(3).map((promo, index) => (
            <motion.div
              key={index + 3}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => openLightbox(index + 3)}
            >
              <div className="relative overflow-hidden rounded-xl shadow-soft hover:shadow-medium transition-all duration-300">
                <img
                  src={promo.image}
                  alt={promo.alt}
                  className="w-full h-40 md:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white text-sm font-medium p-3">{promo.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
            
            <motion.img
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={promos[selectedImage].image}
              alt={promos[selectedImage].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-center">
              <p className="font-semibold text-lg">{promos[selectedImage].title}</p>
              <p className="text-white/70 text-sm">{selectedImage + 1} / {promos.length}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PromoSection;
