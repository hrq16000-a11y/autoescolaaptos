import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface RelatedLink {
  title: string;
  href: string;
  description: string;
}

interface RelatedLinksProps {
  title?: string;
  links: RelatedLink[];
}

/**
 * Bloco de malha interna de links — sugere páginas relacionadas para
 * distribuir autoridade e aumentar tempo no site.
 */
const RelatedLinks = ({ title = "Veja também", links }: RelatedLinksProps) => {
  if (!links?.length) return null;
  return (
    <section className="py-12 border-t border-border bg-muted/20">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-2xl font-heading font-black mb-6">{title}</h2>
        <nav aria-label="Conteúdo relacionado">
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  to={l.href}
                  className="group block bg-card border border-border rounded-xl p-4 hover:border-primary hover:shadow-glow transition-all h-full"
                >
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h3 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                      {l.title}
                    </h3>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{l.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default RelatedLinks;
