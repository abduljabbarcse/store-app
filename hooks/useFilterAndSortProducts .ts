// hooks/useFilterAndSortProducts.ts
import { UseFilterAndSortProductsProps } from '@/type/interFaces';
import { useMemo } from 'react';




const useFilterAndSortProducts = ({
    initialProducts,
    sortBy,
    filterOptions,
}: UseFilterAndSortProductsProps) => {
    const filteredAndSortedProducts = useMemo(() => {
        const filtered = initialProducts.filter((product) => {
            const matchesFilters = Object.entries(filterOptions).every(
                ([group, selected]) => {
                    if (!selected.length) return true;
                    return selected.some(
                        (val) =>
                            product.title.toLowerCase().includes(val.toLowerCase()) ||
                            product.description.toLowerCase().includes(val.toLowerCase())
                    );
                }
            );
            return matchesFilters;
        });

        switch (sortBy) {
            case "PRICE : LOW TO HIGH":
                filtered.sort((a, b) => a.price - b.price);
                break;
            case "PRICE : HIGH TO LOW":
                filtered.sort((a, b) => b.price - a.price);
                break;
            case "POPULAR":
                filtered.sort((a, b) => b.rating.rate - a.rating.rate);
                break;
            case "NEWEST FIRST":
                filtered.sort((a, b) => b.id - a.id);
                break;
            default:
                break;
        }

        return filtered;
    }, [initialProducts, sortBy, filterOptions]);

    return filteredAndSortedProducts;
};

export default useFilterAndSortProducts;