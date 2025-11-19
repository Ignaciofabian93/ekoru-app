import { Product } from "@/types/product";
import { displaySellerName } from "@/utils/displaySellerName";
import { sellerTypeTranslate } from "@/utils/sellerTypeTranslate";
import { Droplets, Leaf, MapPin, Phone, RotateCcw, UserRound } from "lucide-react";

type Props = {
  product: Product;
  setIsFlipped: (flipped: boolean) => void;
  isFlipped: boolean;
};

export default function CardBackSide({ product, setIsFlipped, isFlipped }: Props) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("es-CL", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(num);
  };
  return (
    <div className="card-flip-back dark:bg-stone-800 dark:border dark:border-stone-700">
      <div className="py-3 px-4 w-full h-full flex flex-col overflow-y-auto scrollbar-hide">
        {/* Flip Button */}
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="absolute top-2 right-2 bg-primary hover:bg-primary/90 text-white p-1.5 rounded-full shadow-lg transition-all duration-200 z-10"
          aria-label="Ver producto"
        >
          <RotateCcw className="w-3 h-3" />
        </button>

        {/* Environmental Impact Section */}
        {product.environmentalImpact && (
          <div className="mb-3">
            <h4 className="font-bold text-text-primary dark:text-stone-100 text-xs mt-3 mb-2 flex items-center gap-1">
              <Leaf className="w-3 h-3 text-success" />
              Impacto Ambiental
            </h4>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-success/10 dark:bg-success/20 rounded-lg p-2">
                <div className="flex items-center gap-1 mb-0.5">
                  <Leaf className="w-2.5 h-2.5 text-success" />
                  <span className="text-[9px] text-text-muted dark:text-stone-400">CO₂</span>
                </div>
                <p className="text-xs font-bold text-success">
                  {formatNumber(product.environmentalImpact.totalCo2SavingsKG)} kg
                </p>
              </div>

              <div className="bg-info/10 dark:bg-info/20 rounded-lg p-2">
                <div className="flex items-center gap-1 mb-0.5">
                  <Droplets className="w-2.5 h-2.5 text-info" />
                  <span className="text-[9px] text-text-muted dark:text-stone-400">Agua</span>
                </div>
                <p className="text-xs font-bold text-info">
                  {formatNumber(product.environmentalImpact.totalWaterSavingsLT)} L
                </p>
              </div>
            </div>

            {/* Material Breakdown */}
            {product.environmentalImpact.materialBreakdown.length > 0 && (
              <div className="space-y-1">
                <p className="text-[9px] font-semibold text-text-muted dark:text-stone-400">Materiales:</p>
                {product.environmentalImpact.materialBreakdown.map((material, index) => (
                  <div key={index} className="flex items-center justify-between text-[10px]">
                    <span className="text-text-secondary dark:text-stone-300 truncate">{material.materialType}</span>
                    <span className="font-semibold text-text-primary dark:text-stone-100 ml-1">
                      {material.percentage.toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Seller Information */}
        {product.seller && (
          <div className="mt-auto pt-2 border-t border-neutral/20 dark:border-stone-700">
            <div className="flex items-center gap-1.5 mb-2">
              <h4 className="font-bold text-text-primary dark:text-stone-100 text-xs">Vendedor</h4>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="px-1.5 py-0.5 bg-primary/10 text-primary rounded text-[9px] font-semibold">
                  {sellerTypeTranslate(product.seller.sellerType)}
                </span>
              </div>
            </div>
            <div className="space-y-1.5 text-[10px]">
              {product.seller.profile && (
                <div className="flex items-center gap-1.5 text-text-secondary dark:text-stone-300">
                  <UserRound className="w-2.5 h-2.5 flex-shrink-0" />
                  <span className="truncate text-[9px]">{displaySellerName(product.seller)}</span>
                </div>
              )}
              {product.seller.phone && (
                <div className="flex items-center gap-1.5 text-text-secondary dark:text-stone-300">
                  <Phone className="w-2.5 h-2.5 flex-shrink-0" />
                  <span className="truncate text-[9px]">{product.seller.phone}</span>
                </div>
              )}

              {product.seller.address && (
                <div className="flex items-center gap-1.5 text-text-secondary dark:text-stone-300">
                  <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
                  <span className="truncate text-[9px]">
                    {product.seller.address}, {product.seller.county?.county}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
