"use client";

import { Product } from "@/types/product";
import { useState } from "react";
import ImageGallery from "./imageGallery";
import ProductInfo from "./productInfo";
import ProductTabs from "./productTabs";
import SellerInfo from "./sellerInfo";
import RelatedProducts from "./relatedProducts";

type Props = {
  product: Product;
};

export default function ProductDetailView({ product }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Left: Image Gallery */}
        <ImageGallery
          images={product.images}
          productName={product.name}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />

        {/* Right: Product Info */}
        <ProductInfo product={product} />
      </div>

      {/* Product Details Tabs */}
      <ProductTabs product={product} />

      {/* Seller Information */}
      {product.seller && (
        <div className="mb-12">
          <SellerInfo seller={product.seller} />
        </div>
      )}

      {/* Related Products */}
      <RelatedProducts productCategoryId={product.productCategoryId} currentProductId={product.id} />
    </div>
  );
}
