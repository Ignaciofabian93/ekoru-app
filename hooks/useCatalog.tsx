import { useLazyQuery } from "@apollo/client";
import { GET_BLOG_CATALOG, GET_MARKET_CATALOG, GET_STORE_CATALOG } from "@/graphql/catalog/queries";
import { Seller } from "@/types/user";
import { BlogCategories } from "@/types/blog";
import { Department } from "@/types/product";

export default function useCatalog() {
  const [StoreCatalog, { data: StoreData, loading: storeLoading, error: storeError }] = useLazyQuery(
    GET_STORE_CATALOG,
    { fetchPolicy: "cache-first" }
  );
  const [MarketCatalog, { data: MarketData, loading: marketLoading, error: marketError }] = useLazyQuery(
    GET_MARKET_CATALOG,
    { fetchPolicy: "cache-first" }
  );
  const [BlogCatalog, { data: BlogData, loading: blogLoading, error: blogError }] = useLazyQuery(GET_BLOG_CATALOG, {
    fetchPolicy: "cache-first",
  });

  return {
    StoreCatalog,
    MarketCatalog,
    BlogCatalog,
    StoreData: StoreData?.storeCatalog as Seller[] | null,
    BlogData: BlogData?.blogCategories as BlogCategories[] | null,
    MarketData: MarketData?.marketCatalog as Department[] | null,
    storeLoading,
    storeError,
    marketLoading,
    marketError,
    blogLoading,
    blogError,
  };
}
