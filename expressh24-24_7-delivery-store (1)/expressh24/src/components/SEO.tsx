import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = "ExpressH24 Dakar — Supermarché & Livraison Express 24H/24 7J/7",
  description = "Livraison ultra-rapide en 15 à 20 minutes à Dakar. Boissons, produits laitiers, épicerie, bébé, hygiène, snacks et tabac livrés jour et nuit.",
  keywords = "ExpressH24, livraison dakar, supermarché dakar 24h, courses dakar, wave sénégal, orange money, almadies, plateau, mermoz",
  image = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
  url = "https://expressh24.sn",
  type = "website"
}) => {
  useEffect(() => {
    // Update Document Title
    document.title = title;

    // Helper to update meta tag
    const updateMeta = (nameAttr: string, nameValue: string, content: string) => {
      let element = document.querySelector(`meta[${nameAttr}="${nameValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(nameAttr, nameValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('name', 'description', description);
    updateMeta('name', 'keywords', keywords);
    updateMeta('property', 'og:title', title);
    updateMeta('property', 'og:description', description);
    updateMeta('property', 'og:image', image);
    updateMeta('property', 'og:type', type);
    updateMeta('property', 'og:url', url);
    updateMeta('name', 'twitter:card', 'summary_large_image');
    updateMeta('name', 'twitter:title', title);
    updateMeta('name', 'twitter:description', description);

    // Inject Schema.org JSON-LD
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "ExpressH24 Dakar",
      "image": image,
      "@id": url,
      "url": url,
      "telephone": "+221776481420",
      "priceRange": "500 - 50000 XOF",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Avenue Cheikh Anta Diop",
        "addressLocality": "Dakar",
        "addressRegion": "Dakar",
        "postalCode": "10000",
        "addressCountry": "SN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 14.6937,
        "longitude": -17.4441
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      },
      "sameAs": [
        "https://facebook.com/expressh24dakar",
        "https://instagram.com/expressh24_dakar"
      ]
    };

    let scriptTag = document.getElementById('jsonld-schema') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'jsonld-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(schemaData);
  }, [title, description, keywords, image, url, type]);

  return null;
};
