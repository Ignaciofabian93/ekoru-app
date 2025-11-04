import { BlogCategories } from "@/types/blog";
import { ServiceCategory, StoreCatalog } from "@/types/catalog";
import { Department } from "@/types/product";
import { create } from "zustand";

interface CatalogState {
  storeData: { storeCatalog: StoreCatalog[] | null } | null;
  marketData: { marketCatalog: Department[] | null } | null;
  blogData: { blogCategories: BlogCategories[] | null } | null;
  serviceData: { serviceCatalog: ServiceCategory[] | null } | null;
  loading: boolean;
  error: unknown;
  initialized: boolean;
  setStoreData?: (data: { storeCatalog: StoreCatalog[] | null }) => void;
  setMarketData?: (data: { marketCatalog: Department[] | null }) => void;
  setBlogData?: (data: { blogCategories: BlogCategories[] | null }) => void;
  setServiceData?: (data: { serviceCatalog: ServiceCategory[] | null }) => void;
}

export const useCatalogStore = create<CatalogState>((set) => ({
  storeData: null,
  marketData: null,
  blogData: null,
  serviceData: null,
  loading: false,
  error: null,
  initialized: false,
  setStoreData: (data) => set(() => ({ storeData: data })),
  setMarketData: (data) => set(() => ({ marketData: data })),
  setBlogData: (data) => set(() => ({ blogData: data })),
  setServiceData: (data) => set(() => ({ serviceData: data })),
}));
