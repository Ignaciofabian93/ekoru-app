"use client";

import { Product } from "@/types/product";
import { getBadgeColor } from "@/utils/badgeColor";
import { badgeTranslate } from "@/utils/badgeTranslate";
import { productConditionTranslate } from "@/utils/conditionTranslate";
import { Heart, Share2, ShoppingCart, Package } from "lucide-react";
import { useState } from "react";

type Props = {
  product: Product;
};

export default function ProductInfo({ product }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);

  const hasOffer = product.hasOffer && product.offerPrice && product.offerPrice < product.price;
  const displayPrice = hasOffer ? product.offerPrice ?? product.price : product.price;
  const discountPercent =
    hasOffer && product.offerPrice ? Math.round(((product.price - product.offerPrice) / product.price) * 100) : 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Badges */}
      {product.badges.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {product.badges.map((badge, index) => (
            <span key={index} className={`${getBadgeColor(badge)} text-xs font-semibold px-3 py-1.5 rounded-md`}>
              {badgeTranslate(badge)}
            </span>
          ))}
        </div>
      )}

      {/* Product Name */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-stone-100 mb-2">{product.name}</h1>
        <p className="text-text-muted dark:text-stone-400 text-lg">
          {product.brand} {product.color && `• ${product.color}`}
        </p>
      </div>

      {/* Condition */}
      <div className="flex items-center gap-2">
        <Package className="w-5 h-5 text-text-muted dark:text-stone-400" />
        <span className="text-text-secondary dark:text-stone-300 font-medium">
          Condición: {productConditionTranslate(product.condition)}
        </span>
        {product.conditionDescription && (
          <span className="text-text-muted dark:text-stone-400 text-sm">({product.conditionDescription})</span>
        )}
      </div>

      {/* Price */}
      <div className="bg-neutral-50 dark:bg-stone-800/50 rounded-xl p-6">
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-bold text-primary dark:text-lime-400">{formatPrice(displayPrice)}</span>
          {hasOffer && (
            <>
              <span className="text-xl text-text-muted dark:text-stone-500 line-through">
                {formatPrice(product.price)}
              </span>
              <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-md">
                -{discountPercent}% OFF
              </span>
            </>
          )}
        </div>
        {product.isExchangeable && <p className="text-sm text-success mt-2 font-medium">✓ Acepta intercambios</p>}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95">
          <ShoppingCart className="w-5 h-5" />
          Añadir al carrito
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
              isFavorite
                ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-2 border-red-600"
                : "bg-neutral-100 dark:bg-stone-700 text-text-secondary dark:text-stone-300 hover:bg-neutral-200 dark:hover:bg-stone-600"
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
            {isFavorite ? "Guardado" : "Guardar"}
          </button>

          <button
            onClick={handleShare}
            className="py-3 rounded-xl font-semibold bg-neutral-100 dark:bg-stone-700 text-text-secondary dark:text-stone-300 hover:bg-neutral-200 dark:hover:bg-stone-600 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Compartir
          </button>
        </div>
      </div>

      {/* Quick Info */}
      <div className="border-t border-neutral-200 dark:border-stone-700 pt-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-text-muted dark:text-stone-400">Publicado</span>
          <span className="text-text-primary dark:text-stone-100 font-medium">
            {new Date(product.createdAt).toLocaleDateString("es-CL", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        {product.productCategory && (
          <div className="flex justify-between text-sm">
            <span className="text-text-muted dark:text-stone-400">Categoría</span>
            <span className="text-text-primary dark:text-stone-100 font-medium">
              {product.productCategory.productCategoryName}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
