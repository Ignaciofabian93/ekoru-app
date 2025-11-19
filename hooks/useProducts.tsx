import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "@/graphql/product/queries";
import { Product } from "@/types/product";
import { useState } from "react";

export default function useProducts() {
  const [page] = useState(1);
  const [pageSize] = useState(20);
  const {
    data: productsData,
    error: productsError,
    loading: productsLoading,
  } = useQuery(GET_PRODUCTS, {
    fetchPolicy: "cache-first",
    variables: { page, pageSize, isActive: true },
  });

  console.log("Products: ", productsData);

  return {
    productsData: (productsData?.getProducts.nodes as Product[]) || [],
    productsError,
    productsLoading,
  };
}
