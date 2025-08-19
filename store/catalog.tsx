import { Department } from "@/types/product";
import { StoreProfile } from "@/types/user";
import { create } from "zustand";

interface CatalogState {
  storeData: StoreProfile[] | null;
  marketData: Department[] | null;
  loading: boolean;
  error: unknown;
  initialized: boolean;
  fetchCatalogs: (
    StoreCatalog: () => Promise<{ storeCatalog: StoreProfile[] }>,
    MarketCatalog: () => Promise<{ marketCatalog: Department[] }>
  ) => Promise<void>;
}

export const useCatalogStore = create<CatalogState>((set) => ({
  storeData: null,
  marketData: null,
  loading: false,
  error: null,
  initialized: false,
  fetchCatalogs: async (
    StoreCatalog: () => Promise<{ storeCatalog: StoreProfile[] }>,
    MarketCatalog: () => Promise<{ marketCatalog: Department[] }>
  ) => {
    set({ loading: true, error: null });
    try {
      const [storeData, marketData] = await Promise.all([
        StoreCatalog(),
        MarketCatalog(),
      ]);
      set({
        storeData: storeData.storeCatalog,
        marketData: marketData.marketCatalog,
        loading: false,
        initialized: true,
      });
    } catch (error) {
      set({ loading: false, error });
    }
  },
}));
