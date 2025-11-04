"use client";
import { useEffect } from "react";
import { useCatalogStore } from "@/store/catalog";
import useCatalog from "@/hooks/useCatalog";

export default function InitialDataProvider({ children }: { children: React.ReactNode }) {
  const { setBlogData, setMarketData, setStoreData, setServiceData } = useCatalogStore();
  const { StoreData, MarketData, BlogData, ServiceData } = useCatalog();

  useEffect(() => {
    // Set data immediately when available
    if (StoreData) {
      setStoreData?.({ storeCatalog: StoreData });
    }
    if (MarketData) {
      setMarketData?.({ marketCatalog: MarketData });
    }
    if (BlogData) {
      setBlogData?.({ blogCategories: BlogData });
    }
    if (ServiceData) {
      setServiceData?.({ serviceCatalog: ServiceData });
    }
  }, [StoreData, MarketData, BlogData, ServiceData, setStoreData, setMarketData, setBlogData, setServiceData]);

  return <>{children}</>;
}
