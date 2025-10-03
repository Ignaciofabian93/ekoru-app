import { BlogCategories } from "@/types/blog";
import { Department } from "@/types/product";
import { Seller } from "@/types/user";
import { create } from "zustand";

interface CatalogState {
  storeData: { storeCatalog: Seller[] | null } | null;
  marketData: { marketCatalog: Department[] | null } | null;
  blogData: { blogCategories: BlogCategories[] | null } | null;
  loading: boolean;
  error: unknown;
  initialized: boolean;
  setStoreData?: (data: { storeCatalog: Seller[] | null }) => void;
  setMarketData?: (data: { marketCatalog: Department[] | null }) => void;
  setBlogData?: (data: { blogCategories: BlogCategories[] | null }) => void;
}

export const useCatalogStore = create<CatalogState>((set) => ({
  storeData: null,
  marketData: null,
  blogData: null,
  loading: false,
  error: null,
  initialized: false,
  setStoreData: (data) => set(() => ({ storeData: data })),
  setMarketData: (data) => set(() => ({ marketData: data })),
  setBlogData: (data) => set(() => ({ blogData: data })),
}));
