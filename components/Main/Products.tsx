"use client";

import React, { useEffect, useState } from "react";
import { ProductCatalogProps, ProductWithStock } from "@/type/interFaces";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
  setFiltersVisible,
  setSortBy,
  toggleWishlistItem,
  setSearchQuery,
} from "@/lib/slices/productCatalogSlice";
import { useStockProducts } from "@/hooks/useStockProducts";
import ProductsHeader from "./ProductsHeader";
import useFilterAndSortProducts from "@/hooks/useFilterAndSortProducts ";
import ProductFilters from "./ProductFilters";
import "../../public/styles/main.css";
import { NoProductsFound } from "./NoProductsFound";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";


export default function ProductCatalog({
  initialProducts,
}: ProductCatalogProps) {
  const { sortBy, filterOptions, wishlist, filtersVisible, searchQuery } = useAppSelector(
    (state) => state.productCatalog
  );
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6); // You can adjust this number

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
    searchQuery,
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);

  // Reset to first page when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterOptions, sortBy, searchQuery]);

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  return (
    <>
      <div className="products-search-container">
        <SearchBar onSearch={handleSearch} />
      </div>
      
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
            <>
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
                {currentProducts.map((product) => {
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
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}