import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "@/graphql/product/queries";
import { Product } from "@/types/product";

interface UseProductsArgs {
  isExchangeable?: boolean;
}

export default function useProducts({ isExchangeable = false }: UseProductsArgs) {
  const [page] = useState(1);
  const [pageSize] = useState(20);
  const filter = {
    isExchangeable,
    isActive: true,
  };
  const sort = { field: "CREATED_AT", order: "DESC" };
  const {
    data: productsData,
    error: productsError,
    loading: productsLoading,
  } = useQuery(GET_PRODUCTS, {
    fetchPolicy: "cache-first",
    variables: { page, pageSize, filter, sort },
  });

  return {
    productsData: (productsData?.getProducts.nodes as Product[]) || [],
    productsError,
    productsLoading,
  };
}
