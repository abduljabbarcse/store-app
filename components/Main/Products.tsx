"use client";

import React, { useEffect } from "react";
import { ProductCatalogProps, ProductWithStock } from "@/type/interFaces";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
  setFiltersVisible,
  setSortBy,
  toggleWishlistItem,
} from "@/lib/slices/productCatalogSlice";
import { useStockProducts } from "@/hooks/useStockProducts";
import ProductsHeader from "./ProductsHeader";
import useFilterAndSortProducts from "@/hooks/useFilterAndSortProducts ";
import ProductFilters from "./ProductFilters";
import "../../public/styles/main.css";
import { NoProductsFound } from "./NoProductsFound";
import ProductCard from "./ProductCard";

export default function ProductCatalog({
  initialProducts,
}: ProductCatalogProps) {
  const { sortBy, filterOptions, wishlist, filtersVisible } = useAppSelector(
    (state) => state.productCatalog
  );

  const dispatch = useAppDispatch();

  const productsWithStock = useStockProducts(initialProducts);

  useEffect(() => {
    function handleResize() {
      dispatch(setFiltersVisible(window.innerWidth > 900));
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  const filteredAndSortedProducts = useFilterAndSortProducts({
    initialProducts,
    sortBy,
    filterOptions,
  });

  return (
    <>
      <ProductsHeader
        productsCount={filteredAndSortedProducts.length}
        sortBy={sortBy}
        filtersVisible={filtersVisible}
        onSortChange={(opt) => dispatch(setSortBy(opt))}
        onToggleFilters={() => dispatch(setFiltersVisible(!filtersVisible))}
      />
      <section className="products-section">
        {filtersVisible && <ProductFilters />}
        <div
          className={`products-container${!filtersVisible ? " products-container-full" : ""
            }`}
        >
          {filteredAndSortedProducts.length === 0 ? (
            <NoProductsFound />
          ) : (
            <div
              className="products-grid"
              role="grid"
              aria-label="Products"
              style={{
                gridTemplateColumns: filtersVisible
                  ? "repeat(3, 1fr)"
                  : "repeat(4, 1fr)",
              }}
            >
              {filteredAndSortedProducts.map((product) => {
                const realProduct: ProductWithStock =
                  productsWithStock.find((p) => p.id === product.id) || product;
                return (
                  <ProductCard
                    key={realProduct.id}
                    product={realProduct}
                    isInWishlist={wishlist[realProduct.id]}
                    onToggleWishlist={() => dispatch(toggleWishlistItem(realProduct.id))}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
