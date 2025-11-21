"use client";

import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BY_ID } from "@/graphql/product/queries";
import { Product } from "@/types/product";
import MainLayout from "@/ui/layout/mainLayout";
import { useParams } from "next/navigation";
import ProductDetailView from "./_ui/productDetailView";
import ProductDetailSkeleton from "./_ui/productDetailSkeleton";

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = Number(params.id);

  const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id: productId },
    skip: !productId,
  });

  const product = data?.getProductById as Product;

  if (loading) {
    return (
      <MainLayout>
        <ProductDetailSkeleton />
      </MainLayout>
    );
  }

  if (error || !product) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-text-primary dark:text-stone-100 mb-4">Producto no encontrado</h1>
          <p className="text-text-muted dark:text-stone-400">El producto que buscas no existe o ha sido eliminado.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <ProductDetailView product={product} />
    </MainLayout>
  );
}
