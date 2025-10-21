import { BlogCategories } from "@/types/blog";
import { Text } from "@/ui/text/text";
import { Title } from "@/ui/text/title";
import {
  BookOpen,
  Dam,
  Flower2,
  HousePlug,
  Leaf,
  LeafyGreen,
  LucideIcon,
  Recycle,
  ShieldCheck,
  Sun,
  Tent,
  Tractor,
  TreeDeciduous,
  Trees,
  UtilityPole,
  Vegan,
} from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

export default function BlogCategoryCard({ id, name, icon, description }: BlogCategories) {
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
  const Icon = getIconComponent(icon);
  return (
    <Link
      href={`/ekoru-blog/categories/${id}`}
      className={clsx(
        "group",
        "flex flex-col items-start",
        "p-5",
        "w-full max-w-xs",
        "rounded-lg",
        "border-2 border-amber-200",
        "bg-white/90 dark:bg-stone-800",
        "hover:border-lime-500",
        "hover:bg-lime-50",
        "hover:shadow-xl",
        "hover:scale-[1.02]",
        "transition-all duration-300",
        "cursor-pointer"
      )}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-lime-100 group-hover:bg-lime-200 transition-colors duration-300">
          <Icon className="h-6 w-6 text-lime-600" />
        </div>
        <Title
          variant="h5"
          className="font-semibold text-stone-800 group-hover:text-lime-700 transition-colors duration-300"
        >
          {name}
        </Title>
      </div>
      <Text variant="p" className="text-sm text-stone-600 group-hover:text-stone-700 leading-relaxed">
        {description}
      </Text>
    </Link>
  );
}
