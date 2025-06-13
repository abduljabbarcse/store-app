import React from "react";
import "../../public/styles/main.css";
import { useProducts } from "@/hooks/useProducts";
import ProductCatalog from "./Products";

type DiscoverProductsProps = {
  title?: string;
  subtitle?: string;
};

const DiscoverProducts: React.FC<DiscoverProductsProps> = ({
  title = "DISCOVER OUR PRODUCTS",
  subtitle = "Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus scelerisque. Dolor integer scelerisque nibh amet mi ut elementum dolor.",
}) => {
  const products = useProducts();
  return (
    <main className="main-content">
      <div className="main-container">
        <header className="main-header">
          <h1 className="main-title font-sora">{title}</h1>
          {subtitle && <p className="main-subtitle font-sora">{subtitle}</p>}
        </header>
        <ProductCatalog initialProducts={products} />
      </div>
    </main>
  );
};

export default DiscoverProducts;
