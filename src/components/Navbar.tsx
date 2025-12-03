import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    { href: "#inicio", label: "Início" },
    { href: "#servicos", label: "Serviços" },
    { href: "#diferenciais", label: "Diferenciais" },
    { href: "/perguntas-frequentes", label: "FAQ", isRoute: true },
    { href: "/bairros", label: "Bairros", isRoute: true },
    { href: "#contato", label: "Contato" },
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
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center font-heading text-primary-foreground text-xl font-black shadow-glow">
              A
            </div>
            <div>
              <div className="font-heading text-xl font-black text-foreground">
                APTOS
              </div>
              <div className="text-xs text-muted-foreground font-medium">
                Centro de Formação
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
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
              <a href="tel:4133833627">
                <Phone className="w-4 h-4 mr-2" />
                (41) 3383-3627
              </a>
            </Button>
            <Button size="sm" className="shadow-glow" asChild>
              <a
                href="https://api.whatsapp.com/send?phone=5541991453627&text=Olá,%20gostaria%20de%20informações%20sobre%20a%20Autoescola%20APTOS"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </a>
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
                  <a href="tel:4133833627">
                    <Phone className="w-4 h-4 mr-2" />
                    (41) 3383-3627
                  </a>
                </Button>
                <Button className="w-full shadow-glow" asChild>
                  <a
                    href="https://api.whatsapp.com/send?phone=5541991453627&text=Olá,%20gostaria%20de%20informações%20sobre%20a%20Autoescola%20APTOS"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </a>
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
