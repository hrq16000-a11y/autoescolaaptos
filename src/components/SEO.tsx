import { Helmet } from "react-helmet";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: string;
  image?: string;
  jsonLd?: object;
  noIndex?: boolean;
}

const SEO = ({ 
  title, 
  description, 
  canonical, 
  type = "website",
  image = "/og-image.png",
  jsonLd,
  noIndex = false
}: SEOProps) => {
  const siteUrl = "https://autoescolaaptos.com.br";
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;
  
  const defaultJsonLd = {
    "@context": "https://schema.org",
    "@type": "DrivingSchool",
    "name": "Autoescola APTOS",
    "description": "Centro de Formação de Condutores em São José dos Pinhais. Primeira habilitação, renovação de CNH, mudança de categoria e curso de reciclagem.",
    "url": siteUrl,
    "telephone": "+554133833627",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "São José dos Pinhais",
      "addressRegion": "PR",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -25.5304,
      "longitude": -49.2089
    },
    "openingHours": "Mo-Fr 08:00-18:00, Sa 08:00-12:00",
    "priceRange": "$$",
    "areaServed": [
      "São José dos Pinhais",
      "Centro",
      "Afonso Pena",
      "Cidade Jardim",
      "Guatupê",
      "Costeira",
      "São Marcos",
      "Borda do Campo",
      "Rio Pequeno"
    ],
    "sameAs": [
      "https://www.instagram.com/autoescolaaptos",
      "https://www.facebook.com/autoescolaaptos"
    ]
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      <meta property="og:site_name" content="Autoescola APTOS" />
      <meta property="og:locale" content="pt_BR" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />
      
      {/* Additional SEO */}
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      <meta name="googlebot" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      <meta name="geo.region" content="BR-PR" />
      <meta name="geo.placename" content="São José dos Pinhais" />
      
      {/* JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd || defaultJsonLd)}
      </script>
    </Helmet>
  );
};

export default SEO;
