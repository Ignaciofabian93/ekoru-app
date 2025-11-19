"use client";
import { Product } from "@/types/product";
import { getImageUrl } from "@/utils/imageUtils";
import { useState } from "react";
import CardBackSide from "./backSide";
import CardFrontSide from "./frontSide";
import { useRouter } from "next/navigation";

type Props = {
  product: Product;
};

export default function ProductCardFlip({ product }: Props) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imageError, setImageError] = useState(false);
  const router = useRouter();

  const productImage = getImageUrl(product.images?.[0]);

  return (
    <article className="flex-shrink-0 w-[180px] md:w-[220px] h-[300px] card-flip-perspective">
      <div className={`card-flip-inner ${isFlipped ? "card-flip-flipped" : ""}`}>
        {/* Front Side - Product Info */}
        <CardFrontSide
          product={product}
          imageError={imageError}
          setImageError={setImageError}
          productImage={productImage}
          setIsFlipped={setIsFlipped}
          isFlipped={isFlipped}
          onCardClick={() => router.push(`/product/${product.id}`)}
        />

        {/* Back Side - Environmental Impact & Seller Info */}
        <CardBackSide product={product} setIsFlipped={setIsFlipped} isFlipped={isFlipped} />
      </div>
    </article>
  );
}
