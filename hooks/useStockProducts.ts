import { Product } from "@/type/interFaces";
import { useMemo } from "react";

type ProductWithStock = Product & {
    outOfStock: boolean;
};

export function useStockProducts(initialProducts: Product[]) {
  const productsWithStock = useMemo(() => {
    return initialProducts.map((p, i) => {
      const seed = p.id + i;
      const randomValue = Math.sin(seed) * 10000 - Math.floor(Math.sin(seed) * 10000);
      return {
        ...p,
        outOfStock: randomValue < 0.25,
      };
    }) as ProductWithStock[];
  }, [initialProducts]);

  return productsWithStock;
}