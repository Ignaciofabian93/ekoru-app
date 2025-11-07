import { BlogCategories } from "@/types/blog";
import { Text } from "@/ui/text/text";
import { Title } from "@/ui/text/title";
import { ShieldCheck, ChevronRight } from "lucide-react";
import { getIconComponent } from "../_utils/blogIcon";
import Link from "next/link";

type CategoryHeaderProps = {
  categoryInfo: BlogCategories | null;
};

export const CategoryHeader = ({ categoryInfo }: CategoryHeaderProps) => {
  const IconComponent = categoryInfo ? getIconComponent(categoryInfo.icon) : ShieldCheck;

  return (
    <>
      {/* Breadcrumb Navigation */}
      <nav className="border-b border-gray-100" aria-label="Breadcrumb">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link
              href="/blog-ekoru"
              className="text-lime-600 hover:text-lime-800 font-medium transition-colors duration-200 hover:underline"
            >
              Blogs
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Text variant="span" className="font-medium truncate max-w-xs">
              {categoryInfo?.name || "Categoría"}
            </Text>
          </div>
        </div>
      </nav>

      <div className="mb-12 flex items-center space-x-6">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-lime-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
            <IconComponent className="w-8 h-8 text-white" />
          </div>
        </div>

        <div>
          <Title variant="h1" className="font-bold mb-4">
            {categoryInfo?.name || "Blog"}
          </Title>

          {categoryInfo?.description && (
            <Text variant="p" className="leading-relaxed">
              {categoryInfo.description}
            </Text>
          )}
        </div>
      </div>
    </>
  );
};
