import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const neighborhoods = [
    { slug: "centro", name: "Centro" },
    { slug: "afonso-pena", name: "Afonso Pena" },
    { slug: "cidade-jardim", name: "Cidade Jardim" },
    { slug: "guatupe", name: "Guatupê" },
    { slug: "costeira", name: "Costeira" },
    { slug: "sao-marcos", name: "São Marcos" },
  ];

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <img 
                src={logo} 
                alt="Autoescola APTOS - Centro de Formação de Condutores" 
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-background/70 mb-4 max-w-md">
              Mais de 15 anos de experiência formando condutores qualificados em
              São José dos Pinhais. Sua jornada rumo à CNH começa aqui!
            </p>
            <a
              href="https://api.whatsapp.com/send?phone=5541991453627&text=Olá,%20gostaria%20de%20informações%20sobre%20a%20Autoescola%20APTOS"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Fale Conosco</span>
            </a>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-heading font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-background/70 hover:text-primary transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/#servicos" className="text-background/70 hover:text-primary transition-colors">
                  Serviços
                </Link>
              </li>
              <li>
                <Link to="/perguntas-frequentes" className="text-background/70 hover:text-primary transition-colors">
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-background/70 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/bairros" className="text-background/70 hover:text-primary transition-colors">
                  Bairros Atendidos
                </Link>
              </li>
              <li>
                <Link to="/#contato" className="text-background/70 hover:text-primary transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Bairros */}
          <div>
            <h3 className="font-heading font-bold mb-4">Bairros</h3>
            <ul className="space-y-2">
              {neighborhoods.map((n) => (
                <li key={n.slug}>
                  <Link
                    to={`/bairros/${n.slug}`}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {n.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/bairros"
                  className="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                >
                  Ver todos →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-heading font-bold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-background/70 text-sm">
                  Rua Passos de Oliveira, 810
                  <br />
                  São José dos Pinhais - PR
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <div className="text-background/70 text-sm">
                  <a
                    href="tel:4133833627"
                    className="hover:text-primary transition-colors block"
                  >
                    (41) 3383-3627
                  </a>
                  <a
                    href="tel:41991453627"
                    className="hover:text-primary transition-colors block"
                  >
                    (41) 99145-3627
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:contato@autoescolaaptos.com.br"
                  className="text-background/70 text-sm hover:text-primary transition-colors"
                >
                  contato@autoescolaaptos.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-background/60 text-sm text-center md:text-left">
              © {currentYear} Autoescola APTOS. Todos os direitos reservados.
            </p>
            <p className="text-background/60 text-sm text-center md:text-right">
              Credenciada pelo Detran PR | CNPJ: 00.000.000/0001-00
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
