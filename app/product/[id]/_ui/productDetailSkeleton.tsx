export default function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery Skeleton */}
        <div className="space-y-4">
          <div className="aspect-square bg-neutral-200 dark:bg-stone-700 rounded-xl" />
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square bg-neutral-200 dark:bg-stone-700 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="space-y-6">
          <div className="h-8 bg-neutral-200 dark:bg-stone-700 rounded w-3/4" />
          <div className="h-6 bg-neutral-200 dark:bg-stone-700 rounded w-1/2" />
          <div className="h-12 bg-neutral-200 dark:bg-stone-700 rounded w-1/3" />
          <div className="space-y-2">
            <div className="h-4 bg-neutral-200 dark:bg-stone-700 rounded" />
            <div className="h-4 bg-neutral-200 dark:bg-stone-700 rounded" />
            <div className="h-4 bg-neutral-200 dark:bg-stone-700 rounded w-5/6" />
          </div>
          <div className="h-12 bg-neutral-200 dark:bg-stone-700 rounded" />
        </div>
      </div>
    </div>
  );
}
