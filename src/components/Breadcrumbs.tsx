import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { Helmet } from "react-helmet";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
  className?: string;
}

const SITE_URL = "https://autoescolaaptos.com.br";

/**
 * Breadcrumbs acessíveis + JSON-LD BreadcrumbList automático.
 * Uso: <Breadcrumbs items={[{ label: "Serviços", href: "/servicos" }, { label: "Primeira Habilitação" }]} />
 */
const Breadcrumbs = ({ items, className }: Props) => {
  const fullTrail: BreadcrumbItem[] = [{ label: "Início", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: fullTrail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <nav
        aria-label="Navegação estrutural"
        className={className ?? "container mx-auto px-4 py-3"}
      >
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          {fullTrail.map((item, i) => {
            const isLast = i === fullTrail.length - 1;
            return (
              <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
                {i > 0 && (
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
                )}
                {isLast || !item.href ? (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className={isLast ? "text-foreground font-medium" : ""}
                  >
                    {i === 0 && <Home className="inline w-3.5 h-3.5 mr-1" aria-hidden="true" />}
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.href}
                    className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                  >
                    {i === 0 && <Home className="inline w-3.5 h-3.5 mr-1" aria-hidden="true" />}
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
