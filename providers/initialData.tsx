"use client";
import { useEffect } from "react";
import { useCatalogStore } from "@/store/catalog";
import useCatalog from "@/hooks/useCatalog";

export default function InitialDataProvider({ children }: { children: React.ReactNode }) {
  const { setBlogData, setMarketData, setStoreData, setServiceData, setCommunityData } = useCatalogStore();
  const { StoreData, MarketData, BlogData, ServiceData, CommunityData } = useCatalog();

  useEffect(() => {
    // Set data immediately when available
    if (StoreData) {
      setStoreData?.({ storeCatalog: StoreData });
    }
    if (MarketData) {
      setMarketData?.({ marketCatalog: MarketData });
    }
    if (BlogData) {
      setBlogData?.({ blogCatalog: BlogData });
    }
    if (ServiceData) {
      setServiceData?.({ serviceCatalog: ServiceData });
    }
    if (CommunityData) {
      setCommunityData?.({ communityCatalog: CommunityData });
    }
  }, [
    StoreData,
    MarketData,
    BlogData,
    ServiceData,
    CommunityData,
    setStoreData,
    setMarketData,
    setBlogData,
    setServiceData,
    setCommunityData,
  ]);

  return <>{children}</>;
}
