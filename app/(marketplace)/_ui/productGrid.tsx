import { Product } from "@/types/product";
import Pagination from "@/ui/pagination/pagination";
import { Eye, Heart, Package, Repeat2 } from "lucide-react";
import Image from "next/image";

type Props = {
  filteredProducts: Product[];
};

export default function ProductsGrid({ filteredProducts }: Props) {
  return (
    <>
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {filteredProducts.map((product: Product) => (
          <div
            key={product.id}
            className="group bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            {/* Product Image */}
            <div className="relative aspect-square bg-neutral-100 dark:bg-neutral-700 overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Package className="w-12 h-12 text-neutral-400" />
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1">
                {product.hasOffer && (
                  <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">Oferta</span>
                )}
                {product.isExchangeable && (
                  <span className="px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded-full flex items-center gap-1">
                    <Repeat2 className="w-3 h-3" />
                    Intercambiable
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex flex-col gap-2">
                  <button className="p-2 bg-white dark:bg-neutral-800 rounded-full shadow-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
                    <Heart className="w-4 h-4 text-text-secondary hover:text-red-500" />
                  </button>
                  <button className="p-2 bg-white dark:bg-neutral-800 rounded-full shadow-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
                    <Eye className="w-4 h-4 text-text-secondary hover:text-primary" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {product.name}
              </h3>

              <p className="text-sm text-text-secondary mb-3 line-clamp-2">{product.description}</p>

              <div className="flex items-center justify-between mb-3">
                <div className="flex flex-col">
                  {product.hasOffer && product.offerPrice ? (
                    <>
                      <span className="text-lg font-bold text-primary">${product.offerPrice.toLocaleString()}</span>
                      <span className="text-sm text-text-secondary line-through">
                        ${product.price.toLocaleString()}
                      </span>
                    </>
                  ) : (
                    <span className="text-lg font-bold text-text-primary">${product.price.toLocaleString()}</span>
                  )}
                </div>

                {product.brand && (
                  <span className="text-xs text-text-secondary bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded">
                    {product.brand}
                  </span>
                )}
              </div>

              {/* Condition */}
              <div className="flex items-center justify-between text-xs text-text-secondary">
                <span>Estado: {product.condition}</span>
                <span>{new Date(product.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={1}
        setCurrentPage={() => {}}
        totalPages={10}
        itemsPerPage={10}
        setItemsPerPage={() => {}}
      />
    </>
  );
}
