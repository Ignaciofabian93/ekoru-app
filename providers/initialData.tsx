"use client";
import { useEffect } from "react";
import { useCatalogStore } from "@/store/catalog";
import { Seller } from "@/types/user";
import { Department } from "@/types/product";
import { BlogCategories } from "@/types/blog";
import useCatalog from "@/hooks/useCatalog";

export default function InitialDataProvider({ children }: { children: React.ReactNode }) {
  const { setBlogData, setMarketData, setStoreData } = useCatalogStore();
  const { StoreCatalog, MarketCatalog, BlogCatalog } = useCatalog();

  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        const [storeResult, marketResult, blogResult] = await Promise.all([
          StoreCatalog(),
          MarketCatalog(),
          BlogCatalog(),
        ]);

        if (storeResult?.data?.storeCatalog) {
          setStoreData?.({ storeCatalog: storeResult.data.storeCatalog as Seller[] });
        }
        if (marketResult?.data?.marketCatalog) {
          setMarketData?.({ marketCatalog: marketResult.data.marketCatalog as Department[] });
        }
        if (blogResult?.data?.blogCategories) {
          setBlogData?.({ blogCategories: blogResult.data.blogCategories as BlogCategories[] });
        }
      } catch (error) {
        throw new Error("Error al cargar datos de catalogo:" + error);
      }
    };

    fetchCatalogs();
  }, [StoreCatalog, MarketCatalog, BlogCatalog, setStoreData, setMarketData, setBlogData]);

  return <>{children}</>;
}
