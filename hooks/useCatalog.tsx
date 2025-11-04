import { useQuery } from "@apollo/client";
import {
  GET_BLOG_CATALOG,
  GET_COMMUNITY_CATALOG,
  GET_MARKET_CATALOG,
  GET_SERVICES_CATALOG,
  GET_STORE_CATALOG,
} from "@/graphql/catalog/queries";
import { BlogCategories } from "@/types/blog";
import { Department } from "@/types/product";
import { ServiceCategory, StoreCatalog } from "@/types/catalog";
import { CommunityCategory } from "@/types/community";

export default function useCatalog() {
  const {
    data: StoreData,
    loading: storeLoading,
    error: storeError,
  } = useQuery(GET_STORE_CATALOG, { fetchPolicy: "cache-first" });
  const {
    data: MarketData,
    loading: marketLoading,
    error: marketError,
  } = useQuery(GET_MARKET_CATALOG, { fetchPolicy: "cache-first" });
  const {
    data: ServiceData,
    loading: serviceLoading,
    error: serviceError,
  } = useQuery(GET_SERVICES_CATALOG, {
    fetchPolicy: "cache-first",
  });
  const {
    data: BlogData,
    loading: blogLoading,
    error: blogError,
  } = useQuery(GET_BLOG_CATALOG, {
    fetchPolicy: "cache-first",
  });
  const {
    data: CommunityData,
    loading: communityLoading,
    error: communityError,
  } = useQuery(GET_COMMUNITY_CATALOG, {
    fetchPolicy: "cache-first",
  });

  return {
    StoreData: StoreData?.storeCatalog as StoreCatalog[] | null,
    BlogData: BlogData?.blogCatalog as BlogCategories[] | null,
    MarketData: MarketData?.marketCatalog as Department[] | null,
    ServiceData: ServiceData?.serviceCatalog as ServiceCategory[] | null,
    CommunityData: CommunityData?.communityCatalog as CommunityCategory[] | null,
    storeLoading,
    storeError,
    marketLoading,
    marketError,
    serviceLoading,
    serviceError,
    blogLoading,
    blogError,
    communityLoading,
    communityError,
  };
}
