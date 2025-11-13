"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Department, DepartmentCategory, Product } from "@/types/product";
import { Package } from "lucide-react";
import useDepartment from "../../_hooks/useDepartment";
import MainLayout from "@/ui/layout/mainLayout";
import { useCatalogStore } from "@/store/catalog";
import NotFoundSection from "../../_ui/notFound";
import { DepartmentHeader } from "../../_ui/header";
import CategoryOptions from "../../_ui/categoryOptions";
import FilterPanel from "../../_ui/filterPanel";
import ProductsGrid from "../../_ui/productGrid";
import NoProductsAvailable from "../../_ui/noProducts";
import { Title } from "@/ui/text/title";
import { Text } from "@/ui/text/text";

// Extended Product type with category info
interface ProductWithCategory extends Product {
  categoryId: number;
  categoryName: string;
}

export default function DepartmentSlugPage() {
  const params = useParams();
  const { marketData } = useCatalogStore();
  const departmentSlug = params.departmentSlug as string;

  console.log("params:: ", params);

  // TODO: Map slug to actual department ID from your catalog
  // For now using "1" - replace with proper mapping
  const [departmentId, setDepartmentId] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState(10);
  const [departmentInfo, setDepartmentInfo] = useState<Department>();

  console.log(departmentInfo);

  useEffect(() => {
    const foundDepartment = marketData?.marketCatalog?.find(
      (dept) => dept.href.toLowerCase() === departmentSlug.toLowerCase()
    );
    if (foundDepartment) {
      setDepartmentId(foundDepartment.id);
      setDepartmentInfo(foundDepartment);
    }
  }, [departmentSlug, marketData]);

  // Filter states
  const [filters, setFilters] = useState({
    searchTerm: "",
    priceRange: { min: "", max: "" },
    brand: "",
    condition: "",
    isExchangeable: null as boolean | null,
    hasOffer: null as boolean | null,
    selectedCategory: null as string | null, // Add category filter
  });

  const { department, loading, error } = useDepartment({
    id: departmentId as number,
    page: currentPage,
    pageSize: itemsPerPage,
  });

  // Extract all products from all categories
  const allProducts: ProductWithCategory[] =
    department?.departmentCategory?.reduce((acc: ProductWithCategory[], category: DepartmentCategory) => {
      category.productCategory?.forEach((productCat) => {
        // For now, since we don't have actual products data, we'll create empty array
        // In real implementation, this would be: productCat.products?.nodes || []
        if (productCat.products) {
          // Add category info to each product for filtering
          const productsWithCategory = (productCat.products as Product[]).map((product) => ({
            ...product,
            categoryId: category.id,
            categoryName: category.departmentCategoryName,
          }));
          acc.push(...productsWithCategory);
        }
      });
      return acc;
    }, []) || [];

  // Apply filters and sorting
  const filteredProducts = allProducts
    .filter((product: ProductWithCategory) => {
      if (filters.searchTerm && !product.name.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
        return false;
      }
      if (filters.priceRange.min && product.price < parseFloat(filters.priceRange.min)) {
        return false;
      }
      if (filters.priceRange.max && product.price > parseFloat(filters.priceRange.max)) {
        return false;
      }
      if (filters.brand && !product.brand.toLowerCase().includes(filters.brand.toLowerCase())) {
        return false;
      }
      if (filters.condition && product.condition !== filters.condition) {
        return false;
      }
      if (filters.isExchangeable !== null && product.isExchangeable !== filters.isExchangeable) {
        return false;
      }
      if (filters.hasOffer !== null && product.hasOffer !== filters.hasOffer) {
        return false;
      }
      // Add category filtering
      if (filters.selectedCategory && product.categoryId.toString() !== filters.selectedCategory) {
        return false;
      }
      return true;
    })
    .sort((a: Product, b: Product) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        case "newest":
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const clearFilters = () => {
    setFilters({
      searchTerm: "",
      priceRange: { min: "", max: "" },
      brand: "",
      condition: "",
      isExchangeable: null,
      hasOffer: null,
      selectedCategory: null,
    });
  };

  const updateFilter = (key: string, value: string | boolean | null | { min: string; max: string }) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Skeleton Loader */}
            <div className="animate-pulse">
              {/* Breadcrumb skeleton */}
              <div className="flex items-center space-x-2 mb-8">
                <div className="h-4 w-20 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                <div className="h-4 w-4 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
              </div>

              {/* Header skeleton */}
              <div className="mb-12">
                <div className="h-10 w-64 bg-neutral-200 dark:bg-neutral-700 rounded mb-4"></div>
                <div className="h-6 w-96 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
              </div>

              {/* Grid skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700"
                  >
                    <div className="h-6 w-3/4 bg-neutral-200 dark:bg-neutral-700 rounded mb-3"></div>
                    <div className="h-4 w-1/2 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !department) {
    return (
      <NotFoundSection
        title="Departamento no encontrado"
        errorMessage={error ? "Hubo un error al cargar el departamento" : `No pudimos encontrar "${departmentSlug}"`}
        message="Verifica que el nombre esté escrito correctamente o explora nuestros departamentos disponibles."
      />
    );
  }

  const totalSubcategories =
    department.departmentCategory?.reduce(
      (acc: number, cat: DepartmentCategory) => acc + (cat.productCategory?.length || 0),
      0
    ) || 0;

  return (
    <MainLayout>
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-4 md:pb-12">
          <DepartmentHeader department={department} totalSubcategories={totalSubcategories} />

          {/* Categories Grid - Now simplified for products view */}
          {department.departmentCategory && department.departmentCategory.length > 0 ? (
            <div>
              {/* Categories Navigation Row */}
              <CategoryOptions
                department={department}
                departmentSlug={departmentSlug}
                allProducts={allProducts}
                updateFilter={updateFilter}
                filters={filters}
              />

              {/* Filters and Search Section */}
              <FilterPanel
                filters={filters}
                updateFilter={updateFilter}
                sortBy={sortBy}
                setSortBy={setSortBy}
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                clearFilters={clearFilters}
                department={department}
              />

              {/* Products Grid or Empty State */}
              {filteredProducts.length > 0 ? (
                <ProductsGrid filteredProducts={filteredProducts} />
              ) : (
                /* No Products State */
                <NoProductsAvailable allProducts={allProducts} clearFilters={clearFilters} />
              )}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-neutral-800 rounded-2xl border-2 border-dashed border-neutral-300 dark:border-neutral-700">
              <Package className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
              <Title variant="h3" className="font-semibold mb-2">
                Sin categorías disponibles
              </Title>
              <Text variant="p">Este departamento aún no tiene categorías configuradas.</Text>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
