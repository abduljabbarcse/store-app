import { Product } from "@/type/interFaces";
import { use } from "react";

export function useProducts() {
  async function fetchProducts(): Promise<Product[]> {
    try {
      const response = await fetch("https://fakestoreapi.com/products", {
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Failed to fetch products");
      
      const products = await response.json();
      console.log(products.length)
      return products.map((p: Product, idx: number) => ({
        ...p,
        id: idx + 1
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }

  const products = use(fetchProducts());
  return products;
}