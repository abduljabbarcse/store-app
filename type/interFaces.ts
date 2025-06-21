export interface MenuItem {
  text: string;
  active: boolean;
  mobile?: boolean; // Optional property
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
export interface FilterOptions {
  [key: string]: string[];
}

export interface ProductCatalogState {
  products: Product[];
  sortBy: string;
  openFilter: string | null;
  filterOptions: FilterOptions;
  wishlist: { [id: number]: boolean };
  filtersVisible: boolean;
  searchQuery: string;

}

export type FilterGroups = {
  "IDEAL FOR": string[];
  OCCASION: string[];
  WORK: string[];
  FABRIC: string[];
  SEGMENT: string[];
  "SUITABLE FOR": string[];
  "RAW MATERIALS": string[];
  PATTERN: string[];
};

export interface ProductCatalogProps {
  initialProducts: Product[];
}

export interface ProductWithStock extends Product {
  outOfStock?: boolean;
}

export interface UseFilterAndSortProductsProps {
  initialProducts: Product[];
  sortBy: string;
  filterOptions: FilterOptions;
  searchQuery: string
}