import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.jpeg";

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
    { href: "/blog", label: "Blog", isRoute: true },
    { href: "/bairros", label: "Bairros", isRoute: true },
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
          <Link to="/" className="flex items-center">
            <img 
              src={logo} 
              alt="Autoescola APTOS - Centro de Formação de Condutores" 
              className="h-10 md:h-12 w-auto object-contain"
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
            {/* Partner Links Dropdown */}
            <div className="relative group">
              <button className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1">
                Parceiros
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {partnerLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
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
              <div className="border-t border-border pt-4 mt-4">
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Parceiros</p>
                {partnerLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 text-foreground hover:text-primary transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
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
