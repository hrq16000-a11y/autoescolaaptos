import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProcessoHabilitacao from "@/components/ProcessoHabilitacao";
import PromoSection from "@/components/PromoSection";
import Services from "@/components/Services";
import Differentials from "@/components/Differentials";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import MobileStickyBar from "@/components/MobileStickyBar";
import { useScrollTracking } from "@/hooks/useScrollTracking";

const Index = () => {
  // Ativa rastreamento de scroll e seções
  useScrollTracking();

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ProcessoHabilitacao />
      <PromoSection />
      <Services />
      <Differentials />
      <Testimonials />
      <About />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
      <MobileStickyBar />
    </main>
  );
};

export default Index;
