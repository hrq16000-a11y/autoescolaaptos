import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { whatsappLink } from "@/lib/whatsapp";
import logo from "@/assets/logo-aptos-2026-v2.webp";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/autoescola-sao-jose-dos-pinhais", label: "São José dos Pinhais", isRoute: true },
    { href: "/primeira-habilitacao", label: "Primeira Habilitação", isRoute: true },
    { href: "/simulado-detran-pr", label: "Simulado DETRAN", isRoute: true },
    { href: "/perguntas-frequentes", label: "FAQ", isRoute: true },
    { href: "/blog", label: "Blog", isRoute: true },
    { href: "#contato", label: "Contato" },
  ];

  const partnerLinks = [
    { href: "/preciso-de-tecnico", label: "Preciso de Técnico" },
    { href: "/mestre-dos-servicos", label: "Mestre dos Serviços" },
    { href: "/ping-solucoes", label: "Ping Soluções" },
  ];

  const handleNavClick = (href: string, isRoute?: boolean) => {
    if (isRoute) return;
    if (location.pathname !== "/") {
      window.location.href = "/" + href;
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-medium"
          : "bg-background/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex shrink-0 items-center"
            aria-label="Autoescola APTOS - Início"
          >
            <img
              src={logo}
              alt="Autoescola APTOS - Centro de Formação de Condutores"
              className="h-12 w-auto max-w-[150px] object-contain md:h-14 md:max-w-[190px] lg:h-16 lg:max-w-[220px]"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={location.pathname === "/" ? link.href : "/" + link.href}
                  onClick={() => handleNavClick(link.href, link.isRoute)}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              )
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button variant="outline" size="sm" asChild>
              <a
                href={whatsappLink("Olá! Vim pelo site da Autoescola APTOS.", "funil")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                (41) 3383-3627
              </a>
            </Button>
            <Button size="sm" className="shadow-glow" asChild>
              <Link to="/orcamento">
                <MessageCircle className="w-4 h-4 mr-2" />
                Solicitar Orçamento
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-t border-border"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                link.isRoute ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 text-foreground hover:text-primary transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={location.pathname === "/" ? link.href : "/" + link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 text-foreground hover:text-primary transition-colors font-medium"
                  >
                    {link.label}
                  </a>
                )
              ))}
              <div className="pt-4 space-y-3">
                <Button variant="outline" className="w-full" asChild>
                  <a
                    href={whatsappLink("Olá! Vim pelo site da Autoescola APTOS.", "funil")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    (41) 3383-3627
                  </a>
                </Button>
                <Button className="w-full shadow-glow" asChild>
                  <Link to="/orcamento" onClick={() => setIsMobileMenuOpen(false)}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Solicitar Orçamento
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
