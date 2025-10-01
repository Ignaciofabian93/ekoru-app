import { BlogCategories } from "@/types/blog";
import Link from "next/link";
import {
  BookOpen,
  LucideIcon,
  Recycle,
  TreeDeciduous,
  HousePlug,
  Leaf,
  UtilityPole,
  LeafyGreen,
  Trees,
  Dam,
  Tent,
  Flower2,
  Tractor,
  Sun,
  Vegan,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import clsx from "clsx";
import { Title } from "@/ui/text/title";
import { Text } from "@/ui/text/text";

type Props = {
  category: BlogCategories;
};

export const BlogCategoryCardSkeleton = () => {
  return (
    <div className={clsx("w-full max-w-lg md:max-w-xs lg:max-w-[280px]")}>
      <div
        className={clsx(
          "relative bg-card-light-100 dark:bg-card-dark-800 rounded-xl shadow-md",
          "p-6",
          "border border-neutral/10"
        )}
      >
        {/* Header with Icon and Blog Count Skeleton */}
        <div className="flex items-start justify-between mb-4">
          {/* Icon Container Skeleton */}
          <div className="p-3 rounded-full bg-primary/10 animate-pulse">
            <div className="h-8 w-8 bg-neutral/30 dark:bg-neutral/40 rounded"></div>
          </div>
          {/* Blog Count Skeleton */}
          <div className="text-right space-y-1 bg-neutral-800/10 dark:bg-neutral-50/10 animate-pulse">
            <div className="h-3 w-16 bg-neutral/30 dark:bg-neutral/40 rounded animate-pulse" />
            <div className="h-4 w-8 bg-neutral/30 dark:bg-neutral/40 rounded animate-pulse" />
          </div>
        </div>

        {/* Category Name Skeleton */}
        <div className="mb-3 space-y-2 bg-neutral-800/10 dark:bg-neutral-50/10 animate-pulse">
          <div className="h-6 w-3/4 bg-neutral/30 dark:bg-neutral/40 rounded animate-pulse" />
          <div className="h-6 w-1/2 bg-neutral/30 dark:bg-neutral/40 rounded animate-pulse" />
        </div>

        {/* Description Skeleton */}
        <div className="mb-4 space-y-2 bg-neutral-800/10 dark:bg-neutral-50/10 animate-pulse">
          <div className="h-4 w-full bg-neutral/20 dark:bg-neutral/30 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-neutral/20 dark:bg-neutral/30 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-neutral/20 dark:bg-neutral/30 rounded animate-pulse" />
        </div>

        {/* CTA Button Skeleton */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral/10">
          <div className="flex items-center bg-neutral-800/10 dark:bg-neutral-50/10 animate-pulse">
            <div className="h-4 w-32 bg-neutral/30 dark:bg-neutral/40 rounded animate-pulse" />
            <div className="ml-2 h-4 w-4 bg-neutral/30 dark:bg-neutral/40 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CategoryCard({ category }: Props) {
  // Icon mapping function (same as mega menu)
  const getIconComponent = (iconName: string): LucideIcon => {
    const iconMap: Record<string, LucideIcon> = {
      Recycle: Recycle,
      TreeDeciduous: TreeDeciduous,
      HousePlug: HousePlug,
      Leaf: Leaf,
      UtilityPole: UtilityPole,
      LeafyGreen: LeafyGreen,
      Trees: Trees,
      Dam: Dam,
      Tent: Tent,
      Flower2: Flower2,
      Tractor: Tractor,
      Sun: Sun,
      Vegan: Vegan,
      ShieldCheck: ShieldCheck,
    };

    return iconMap[iconName] || BookOpen; // Default fallback icon
  };

  const Icon = getIconComponent(category?.icon || "");
  const blogCount = category?.blogs?.length || 0;

  return (
    <Link
      href={`/ekoru-blog/categories/${category.id}`}
      className={clsx("w-full max-w-lg md:max-w-xs lg:max-w-[280px]")}
    >
      <div
        className={clsx(
          "group relative bg-card-light-100 dark:bg-card-dark-800 rounded-xl shadow-md",
          "p-6 cursor-pointer",
          "border border-neutral/10 hover:border-primary/20",
          "hover:-translate-y-1",
          "hover:shadow-xl transition-all duration-300"
        )}
      >
        {/* Header with Icon and Blog Count */}
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
            <Icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-200" />
          </div>
          <div className="text-right">
            <Title variant="h6" className="text-xs font-semibold text-text-800 dark:text-text-100">
              Publicaciones
            </Title>
            <Text variant="span" className="font-bold">
              {blogCount}
            </Text>
          </div>
        </div>

        {/* Category Name */}
        <Title variant="h4" className="font-bold text-text-800 dark:text-text-100 mb-3 line-clamp-2">
          {category.name}
        </Title>

        {/* Description */}
        {category.description && (
          <Text variant="p" className="text-text-800 dark:text-text-100 leading-relaxed mb-4 line-clamp-3">
            {category.description}
          </Text>
        )}

        {/* CTA Button */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral/10">
          <Text
            variant="span"
            className="font-semibold text-primary group-hover:text-primary/80 transition-colors duration-200 flex items-center"
          >
            Explorar categoría
            <ChevronRight className="mt-[5.5px] ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Text>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </Link>
  );
}
