import { BlogCategories } from "@/types/blog";
import { Department } from "@/types/product";
import { StoreProfile } from "@/types/user";
import { create } from "zustand";

interface CatalogState {
  storeData: StoreProfile[] | null;
  marketData: Department[] | null;
  blogData: BlogCategories[] | null;
  loading: boolean;
  error: unknown;
  initialized: boolean;
  fetchCatalogs: (
    StoreCatalog: () => Promise<{ storeCatalog: StoreProfile[] }>,
    MarketCatalog: () => Promise<{ marketCatalog: Department[] }>,
    BlogCatalog: () => Promise<{ blogCategories: BlogCategories[] }>
  ) => Promise<void>;
}

export const useCatalogStore = create<CatalogState>((set) => ({
  storeData: null,
  marketData: null,
  blogData: null,
  loading: false,
  error: null,
  initialized: false,
  fetchCatalogs: async (
    StoreCatalog: () => Promise<{ storeCatalog: StoreProfile[] }>,
    MarketCatalog: () => Promise<{ marketCatalog: Department[] }>,
    BlogCatalog: () => Promise<{ blogCategories: BlogCategories[] }>
  ) => {
    set({ loading: true, error: null });
    try {
      const [storeData, marketData, blogData] = await Promise.all([StoreCatalog(), MarketCatalog(), BlogCatalog()]);
      set({
        storeData: storeData.storeCatalog,
        marketData: marketData.marketCatalog,
        blogData: blogData.blogCategories,
        loading: false,
        initialized: true,
      });
    } catch (error) {
      set({ loading: false, error });
    }
  },
}));
