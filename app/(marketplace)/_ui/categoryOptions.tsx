import { Department, DepartmentCategory, Product } from "@/types/product";
import { Title } from "@/ui/text/title";
import { ChevronRight, Package, Sparkles } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { Text } from "@/ui/text/text";

type Props = {
  department: Department;
  departmentSlug: string;
  allProducts: Product[];
  updateFilter: (key: string, value: string | null) => void;
  filters: {
    selectedCategory: string | null;
  };
};

export default function CategoryOptions({ department, departmentSlug, allProducts, updateFilter, filters }: Props) {
  return (
    <section className="mb-8">
      <Title variant="h2" className="font-semibold mb-4">
        Explorar por categoría
      </Title>

      <div className="relative">
        {/* Horizontal scrollable categories */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide py-4 px-2">
          {/* All Products Option */}
          <button
            onClick={() => updateFilter("selectedCategory", null)}
            className={clsx(
              "flex-shrink-0 group relative rounded-2xl p-4 min-w-[200px] h-[80px]",
              "hover:shadow-lg hover:scale-105 transition-all duration-300",
              filters.selectedCategory === null
                ? "bg-gradient-to-br from-primary to-lime-700 text-white"
                : "bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 hover:border-primary"
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={clsx(
                  "p-2 rounded-xl",
                  filters.selectedCategory === null
                    ? "bg-white/20 backdrop-blur-sm"
                    : "bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10"
                )}
              >
                <Sparkles
                  className={clsx("w-5 h-5", filters.selectedCategory === null ? "text-white" : "text-primary")}
                />
              </div>
              <div className="text-left">
                <Title
                  variant="h6"
                  className={clsx(
                    "font-semibold",
                    filters.selectedCategory === null ? "text-white" : "text-text-primary"
                  )}
                >
                  Todos los productos
                </Title>
                <Text
                  variant="span"
                  className={clsx(
                    "text-xs",
                    filters.selectedCategory === null ? "text-white/80" : "text-text-secondary"
                  )}
                >
                  {allProducts.length} productos
                </Text>
              </div>
            </div>
          </button>

          {/* Category Cards */}
          {department.departmentCategory.map((category: DepartmentCategory) => {
            const subcategoryCount = category.productCategory?.length || 0;
            const categoryProducts =
              category.productCategory?.reduce((acc, productCat) => {
                return acc + (productCat.products ? (productCat.products as Product[]).length : 0);
              }, 0) || 0;

            const isSelected = filters.selectedCategory === category.id.toString();

            return (
              <div key={category.id} className="flex-shrink-0 min-w-[200px]">
                {/* Category Button with Navigation */}
                <Link
                  href={`/departments/${departmentSlug}/categories/${
                    category.href || category.departmentCategoryName.toLowerCase().replace(/\s+/g, "-")
                  }`}
                  className={clsx(
                    "block w-full group relative rounded-2xl p-4 h-[80px]",
                    "hover:shadow-lg hover:scale-105 transition-all duration-300",
                    isSelected
                      ? "bg-gradient-to-br from-primary to-primary-dark text-white"
                      : "bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 hover:border-primary"
                  )}
                >
                  {/* Decorative gradient overlay */}
                  {!isSelected && (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  )}

                  <div className="relative z-10">
                    <div className="flex items-center gap-3">
                      {/* Category Icon */}
                      <div
                        className={clsx(
                          "p-2 rounded-xl group-hover:scale-110 transition-transform duration-300",
                          isSelected
                            ? "bg-white/20 backdrop-blur-sm"
                            : "bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10"
                        )}
                      >
                        <Package className={clsx("w-5 h-5", isSelected ? "text-white" : "text-primary")} />
                      </div>

                      {/* Category Info */}
                      <div className="flex-1 text-left">
                        <h3
                          className={clsx(
                            "font-semibold text-sm transition-colors line-clamp-2",
                            isSelected ? "text-white" : "text-text-primary group-hover:text-primary"
                          )}
                        >
                          {category.departmentCategoryName}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <p className={clsx("text-xs", isSelected ? "text-white/80" : "text-text-secondary")}>
                            {subcategoryCount} subcategorías
                          </p>
                          {categoryProducts > 0 && (
                            <>
                              <span
                                className={clsx(
                                  "w-1 h-1 rounded-full",
                                  isSelected ? "bg-white/60" : "bg-text-secondary"
                                )}
                              ></span>
                              <p
                                className={clsx(
                                  "text-xs",
                                  isSelected ? "text-white" : "text-green-600 dark:text-green-400"
                                )}
                              >
                                {categoryProducts} productos
                              </p>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Arrow Icon */}
                      <div className="flex-shrink-0">
                        <ChevronRight
                          className={clsx(
                            "w-5 h-5 group-hover:translate-x-1 transition-transform duration-300",
                            isSelected ? "text-white" : "text-text-secondary group-hover:text-primary"
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Hover effect ring */}
                  {!isSelected && (
                    <div className="absolute inset-0 rounded-2xl ring-2 ring-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </Link>

                {/* Quick Filter Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    updateFilter("selectedCategory", category.id.toString());
                  }}
                  className="absolute top-2 left-2 z-20 p-1 rounded-lg bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <span className="text-xs text-text-secondary">Filtrar</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
