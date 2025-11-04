import { BlogCategories } from "@/types/blog";
import { ServiceCategory, StoreCatalog } from "@/types/catalog";
import { CommunityCategory } from "@/types/community";
import { Department } from "@/types/product";
import { create } from "zustand";

interface CatalogState {
  storeData: { storeCatalog: StoreCatalog[] | null } | null;
  marketData: { marketCatalog: Department[] | null } | null;
  blogData: { blogCatalog: BlogCategories[] | null } | null;
  communityData: { communityCatalog: CommunityCategory[] | null } | null;
  serviceData: { serviceCatalog: ServiceCategory[] | null } | null;
  loading: boolean;
  error: unknown;
  initialized: boolean;
  setStoreData?: (data: { storeCatalog: StoreCatalog[] | null }) => void;
  setMarketData?: (data: { marketCatalog: Department[] | null }) => void;
  setBlogData?: (data: { blogCatalog: BlogCategories[] | null }) => void;
  setCommunityData?: (data: { communityCatalog: CommunityCategory[] | null }) => void;
  setServiceData?: (data: { serviceCatalog: ServiceCategory[] | null }) => void;
}

export const useCatalogStore = create<CatalogState>((set) => ({
  storeData: null,
  marketData: null,
  blogData: null,
  communityData: null,
  serviceData: null,
  loading: false,
  error: null,
  initialized: false,
  setStoreData: (data) => set(() => ({ storeData: data })),
  setMarketData: (data) => set(() => ({ marketData: data })),
  setBlogData: (data) => set(() => ({ blogData: data })),
  setCommunityData: (data) => set(() => ({ communityData: data })),
  setServiceData: (data) => set(() => ({ serviceData: data })),
}));
