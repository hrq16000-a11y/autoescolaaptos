import { motion } from "framer-motion";
import promoJaneiro from "@/assets/promo-janeiro.jpeg";
import promoIndique from "@/assets/promo-indique.jpeg";
import promoDiferenciais from "@/assets/promo-diferenciais.jpeg";

const PromoSection = () => {
  const promos = [
    {
      image: promoJaneiro,
      alt: "Promoção de Janeiro - Autoescola APTOS",
    },
    {
      image: promoIndique,
      alt: "Programa Indique e Ganhe - Autoescola APTOS",
    },
    {
      image: promoDiferenciais,
      alt: "Diferenciais Autoescola APTOS",
    },
  ];

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
            Promoções <span className="text-primary">Especiais</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Aproveite nossas condições exclusivas para tirar sua CNH
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {promos.map((promo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-medium hover:shadow-strong transition-shadow">
                <img
                  src={promo.image}
                  alt={promo.alt}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
