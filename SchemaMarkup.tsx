import { Product } from "@/type/interFaces";
import { useProducts } from "@/hooks/useProducts";
import { useMemo } from "react";
import Script from "next/script";

export default function SchemaMarkup() {
  const products = useProducts();

  const schema = useMemo(() => {
    const productSchemas = products.map((product: Product) => ({
      "@type": "Product",
      "name": product.title,
      "description": product.description,
      "image": product.image,
      "offers": {
        "@type": "Offer",
        "price": product.price.toString(),
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      }
    }));

    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "mettä muse",
      "url": "https://your-deployed-url.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://your-deployed-url.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Products",
        "itemListElement": productSchemas
      }
    };
  }, [products]);

  return (
    <Script
      id="schema-markup"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}