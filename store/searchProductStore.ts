import { getSearchProducts } from "@/services/products";
import { SearchProductListing } from "@/types/searchListing";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SearchProductStore = {
    search?: SearchProductListing;
    getSearchProducts: (search: string) => void;
}

export const useSearchProductStore = create<SearchProductStore>()(
    persist(
        (set) => ({
            search: undefined,
            getSearchProducts: async (search: string) => {
                const res = await getSearchProducts(search);
                set({ search: res});
            }
        }),
        {
            name: 'search-product-store',
            storage: createJSONStorage(() => localStorage),
        }
    )
)