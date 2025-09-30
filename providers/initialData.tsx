"use client";
import { useEffect } from "react";
import { useCatalogStore } from "@/store/catalog";
import { StoreProfile } from "@/types/user";
import { Department } from "@/types/product";
import { BlogCategories } from "@/types/blog";
import useCatalog from "@/hooks/useCatalog";

export default function InitialDataProvider({ children }: { children: React.ReactNode }) {
  const { fetchCatalogs } = useCatalogStore();
  const { StoreCatalog, MarketCatalog, BlogCatalog } = useCatalog();

  useEffect(() => {
    fetchCatalogs(
      async () => {
        const { data: storeData } = await StoreCatalog();
        return { storeCatalog: storeData as StoreProfile[] };
      },
      async () => {
        const { data: marketData } = await MarketCatalog();
        return { marketCatalog: marketData as Department[] };
      },
      async () => {
        const { data: blogData } = await BlogCatalog();
        console.log(blogData);

        return { blogCategories: blogData as BlogCategories[] };
      }
    );
  }, [fetchCatalogs, StoreCatalog, MarketCatalog, BlogCatalog]);

  return <>{children}</>;
}
