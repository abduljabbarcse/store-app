import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterGroups, FilterOptions, Product, ProductCatalogState } from '@/type/interFaces';
import { filterGroupOptions, initialFilterOptions } from '@/utils/utils';



const initialState: ProductCatalogState = {
    products: [],
    sortBy: "RECOMMENDED",
    openFilter: null,
    filterOptions: initialFilterOptions,
    wishlist: {},
    filtersVisible: typeof window !== 'undefined' ? window.innerWidth > 900 : true,
    searchQuery: ""
};

const productCatalogSlice = createSlice({
    name: 'productCatalog',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        },
        setSortBy: (state, action: PayloadAction<string>) => {
            state.sortBy = action.payload;
        },
        setOpenFilter: (state, action: PayloadAction<string | null>) => {
            state.openFilter = action.payload;
        },
        setFilterOptions: (state, action: PayloadAction<FilterOptions>) => {
            state.filterOptions = action.payload;
        },
        toggleWishlistItem: (state, action: PayloadAction<number>) => {
            const productId = action.payload;
            state.wishlist[productId] = !state.wishlist[productId];
        },
        setFiltersVisible: (state, action: PayloadAction<boolean>) => {
            state.filtersVisible = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        handleFilterCheck: (
            state,
            action: PayloadAction<{ group: string; option: string; checked: boolean }>
        ) => {
            const { group, option, checked } = action.payload;
            const arr = state.filterOptions[group] || [];
            state.filterOptions[group] = checked
                ? [...arr, option]
                : arr.filter((i) => i !== option);
        },
        handleUnselectAll: (state, action: PayloadAction<string>) => {
            state.filterOptions[action.payload] = [];
        },
        handleSelectAll: (state, action: PayloadAction<keyof FilterGroups>) => {
            const group = action.payload;
            const allOptions = filterGroupOptions[group] || [];
            state.filterOptions[group] = [...allOptions];
        },
    },
});



export const {
    setProducts,
    setSortBy,
    setOpenFilter,
    setFilterOptions,
    toggleWishlistItem,
    setFiltersVisible,
    handleFilterCheck,
    handleUnselectAll,
    handleSelectAll,
    setSearchQuery,
} = productCatalogSlice.actions;

export default productCatalogSlice.reducer;