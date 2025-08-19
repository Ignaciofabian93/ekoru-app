import {
  GET_MARKET_CATALOG,
  GET_STORE_CATALOG,
} from "@/graphql/catalog/queries";
import { useLazyQuery } from "@apollo/client";

export default function useCatalog() {
  const [
    StoreCatalog,
    { data: StoreData, loading: storeLoading, error: storeError },
  ] = useLazyQuery(GET_STORE_CATALOG);
  const [
    MarketCatalog,
    { data: MarketData, loading: marketLoading, error: marketError },
  ] = useLazyQuery(GET_MARKET_CATALOG);

  return {
    StoreCatalog,
    MarketCatalog,
    StoreData,
    MarketData,
    storeLoading,
    storeError,
    marketLoading,
    marketError,
  };
}
