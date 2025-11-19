import { Product } from "@/types/product";
import { RotateCcw } from "lucide-react";
import { formatPrice } from "@/utils/formatPrice";
import { productConditionTranslate } from "@/utils/conditionTranslate";
import ShoppingCartButton from "@/ui/buttons/shoppingCartButton";
import Image from "next/image";

type Props = {
  product: Product;
  imageError: boolean;
  setImageError: (error: boolean) => void;
  productImage: string;
  setIsFlipped: (flipped: boolean) => void;
  isFlipped: boolean;
  onCardClick: () => void;
};

export default function CardFrontSide({
  product,
  imageError,
  setImageError,
  productImage,
  setIsFlipped,
  isFlipped,
  onCardClick,
}: Props) {
  return (
    <div className="card-flip-front bg-white dark:bg-stone-800 rounded-xl shadow-sm border border-neutral/20 dark:border-stone-700 overflow-hidden hover:shadow-lg transition-all duration-200 group">
      <figure className="relative aspect-[4/3] bg-neutral-100 dark:bg-stone-700">
        {!imageError ? (
          <Image
            src={productImage}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-400 dark:text-stone-500">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Condition Badge */}
        <span className="absolute bottom-2 left-2 bg-white/90 dark:bg-stone-900/90 backdrop-blur-sm text-text-primary dark:text-stone-100 text-xs font-medium px-2 py-1 rounded capitalize">
          {productConditionTranslate(product.condition)}
        </span>

        {/* Flip Button */}
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="absolute top-2 right-2 bg-primary hover:bg-primary/90 text-white p-1.5 rounded-full shadow-lg transition-all duration-200"
          aria-label="Ver impacto ambiental"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </figure>

      <div className="p-4" onClick={onCardClick}>
        <header className="flex items-center justify-between mb-2">
          <span className="text-text-muted dark:text-stone-400 text-xs truncate">{product.brand}</span>
          {product.color && <span className="text-text-muted dark:text-stone-400 text-xs ml-2">{product.color}</span>}
        </header>

        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>

        <p className="text-text-muted text-sm mb-3 line-clamp-2">{product.description}</p>
        <footer className="flex items-center justify-between">
          <p className="text-primary font-bold text-xl">{formatPrice(product.price, "CLP")}</p>
          <ShoppingCartButton onClick={() => {}} />
        </footer>
      </div>
    </div>
  );
}
