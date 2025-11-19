"use client";

import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "@/graphql/product/queries";
import { Product } from "@/types/product";
import ProductCardFlip from "@/ui/cards/product/marketplaceProduct/marketplaceCard";

type Props = {
  productCategoryId: number;
  currentProductId: number;
};

export default function RelatedProducts({ productCategoryId, currentProductId }: Props) {
  const { data, loading } = useQuery(GET_PRODUCTS, {
    variables: {
      page: 1,
      pageSize: 8,
      filter: {
        productCategoryId,
        isActive: true,
      },
    },
    skip: !productCategoryId,
  });

  const relatedProducts = (data?.getProducts?.nodes as Product[])?.filter(
    (product) => product.id !== currentProductId
  );

  if (loading) {
    return (
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-text-primary dark:text-stone-100 mb-6">Productos Relacionados</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-neutral-200 dark:bg-stone-700 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold text-text-primary dark:text-stone-100 mb-6">Productos Relacionados</h3>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
        {relatedProducts.slice(0, 6).map((product) => (
          <ProductCardFlip key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
