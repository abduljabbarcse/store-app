"use client";

import { sortOptions } from "@/utils/utils";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

interface ProductsHeaderProps {
    productsCount: number;
    sortBy: string;
    filtersVisible: boolean;
    onSortChange: (sortOption: string) => void;
    onToggleFilters: () => void;
}

const ProductsHeader: React.FC<ProductsHeaderProps> = ({
    productsCount,
    sortBy,
    filtersVisible,
    onSortChange,
    onToggleFilters,
}) => {
    const sortRef = useRef<HTMLDivElement>(null);
    const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

    // Close sort dropdown on outside click
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
                setSortDropdownOpen(false);
            }
        }
        if (sortDropdownOpen) {
            document.addEventListener("mousedown", handleClick);
        } else {
            document.removeEventListener("mousedown", handleClick);
        }
        return () => document.removeEventListener("mousedown", handleClick);
    }, [sortDropdownOpen]);

    return (
        <div className="products-header">
            <div className="products-header-left not-mobile-view" >
                <span className="products-count-bold hide-on-mobile font-sora">
                    {productsCount} ITEMS
                </span>
                <div className="products-header-row">
                    <div className="products-filter-toggle">
                        {filtersVisible ? <ChevronRight /> : <ChevronLeft />}
                        <span
                            className="filter-toggle-link font-serif"
                            onClick={onToggleFilters}
                        >
                            {filtersVisible ? "HIDE FILTER" : "SHOW FILTER"}
                        </span>
                    </div>
                </div>
            </div>
            <div className="products-header-left mobile-view" >
                <span
                    className="sort-label font-sora"
                    onClick={onToggleFilters}
                >
                    FILTER
                </span>
            </div>
            <div className="divider mobile-view">|</div>
            <div className="products-sort" ref={sortRef}>
                <span
                    className="sort-label"
                    tabIndex={0}
                    onClick={() => setSortDropdownOpen((v) => !v)}
                    style={{
                        cursor: "pointer",
                        textTransform: "uppercase",
                        fontWeight: sortDropdownOpen ? 700 : 700,
                    }}
                >
                    {sortBy}
                </span>
                <span
                    className="sort-arrow"
                    onClick={() => setSortDropdownOpen(v => !v)}
                    style={{
                        cursor: "pointer",
                        display: "inline-flex",
                        marginLeft: "0.2rem",
                        transition: "transform 0.2s ease",
                        transform: sortDropdownOpen ? "rotate(180deg)" : "none",
                    }}
                >
                    <ChevronDown size={20} />
                </span>
                {sortDropdownOpen && (
                    <div className="sort-dropdown">
                        {sortOptions.map((opt) => (
                            <div
                                key={opt}
                                className={`font-sora sort-dropdown-option${sortBy === opt ? " selected" : ""}`}
                                onClick={() => {
                                    onSortChange(opt);
                                    setSortDropdownOpen(false);
                                }}
                                style={{ textTransform: "uppercase" }}
                            >
                                {sortBy === opt && <span className="sort-check">✔</span>}
                                {opt}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsHeader;