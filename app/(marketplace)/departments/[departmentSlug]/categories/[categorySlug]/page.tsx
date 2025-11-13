"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MainLayout from "@/ui/layout/mainLayout";
import useDepartment from "@/app/(marketplace)/_hooks/useDepartment";
import { DepartmentCategory, ProductCategory } from "@/types/product";
import {
  AlertTriangle,
  ArrowLeft,
  Home,
  Package,
  ChevronRight,
  Layers,
  Tag,
  Box,
  Info,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";

export default function CategorySlugPage() {
  const params = useParams();
  const router = useRouter();
  const departmentSlug = params.departmentSlug as string;
  const categorySlug = params.categorySlug as string;

  // TODO: Map slug to actual department ID from your catalog
  const [departmentId] = useState<number>(1);

  const { department, loading, error } = useDepartment({
    id: departmentId,
    page: 1,
    pageSize: 50,
  });

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
                <div className="h-4 w-4 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
              </div>

              {/* Header skeleton */}
              <div className="mb-12">
                <div className="h-10 w-64 bg-neutral-200 dark:bg-neutral-700 rounded mb-4"></div>
                <div className="h-6 w-96 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
              </div>

              {/* Grid skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700"
                  >
                    <div className="h-6 w-3/4 bg-neutral-200 dark:bg-neutral-700 rounded mb-3"></div>
                    <div className="h-4 w-1/2 bg-neutral-200 dark:bg-neutral-700 rounded mb-2"></div>
                    <div className="h-4 w-2/3 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
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
      <MainLayout>
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 flex items-center justify-center">
          <div className="text-center max-w-lg mx-auto p-8">
            <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-2xl p-6 w-20 h-20 mx-auto mb-8 flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400" />
            </div>

            <h1 className="text-3xl font-bold text-text-primary mb-4">Categoría no encontrada</h1>

            <p className="text-text-secondary mb-10 text-sm">
              No pudimos encontrar la categoría que buscas. Verifica el enlace o explora otras opciones.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-neutral-300 dark:border-neutral-600 text-text-secondary hover:text-primary hover:border-primary hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-200 rounded-xl font-medium"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Volver atrás
              </button>

              <Link
                href="/feed"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white hover:shadow-lg hover:scale-105 transition-all duration-200 rounded-xl font-medium"
              >
                <Home className="w-5 h-5 mr-2" />
                Ir al inicio
              </Link>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Find the category by slug
  const category = department.departmentCategory?.find(
    (cat: DepartmentCategory) =>
      cat.href === categorySlug || cat.departmentCategoryName.toLowerCase().replace(/\s+/g, "-") === categorySlug
  );

  if (!category) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 flex items-center justify-center">
          <div className="text-center max-w-lg mx-auto p-8">
            <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-2xl p-6 w-20 h-20 mx-auto mb-8 flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400" />
            </div>

            <h1 className="text-3xl font-bold text-text-primary mb-4">Categoría no encontrada</h1>

            <p className="text-text-secondary mb-3 text-lg">
              La categoría &quot;{categorySlug}&quot; no existe en {department.departmentName}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link
                href={`/departments/${departmentSlug}`}
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-neutral-300 dark:border-neutral-600 text-text-secondary hover:text-primary hover:border-primary hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-200 rounded-xl font-medium"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Ver todas las categorías
              </Link>

              <Link
                href="/feed"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white hover:shadow-lg hover:scale-105 transition-all duration-200 rounded-xl font-medium"
              >
                <Home className="w-5 h-5 mr-2" />
                Ir al inicio
              </Link>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center flex-wrap gap-2 text-sm text-text-secondary mb-8">
            <Link href="/feed" className="hover:text-primary transition-colors flex items-center group">
              <Home className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform" />
              Inicio
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/departments/${departmentSlug}`} className="hover:text-primary transition-colors">
              {department.departmentName}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-text-primary font-medium">{category.departmentCategoryName}</span>
          </nav>

          {/* Header Section */}
          <div className="mb-12">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-gradient-to-br from-primary/20 to-primary/10 dark:from-primary/30 dark:to-primary/20 p-4 rounded-2xl">
                <Layers className="w-10 h-10 text-primary" />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-3">
                  {category.departmentCategoryName}
                </h1>
                <p className="text-text-secondary text-lg">
                  Explora {category.productCategory?.length || 0} subcategorías de productos
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-neutral-800 rounded-full border border-neutral-200 dark:border-neutral-700">
                <Package className="w-4 h-4 text-primary" />
                <span className="text-text-secondary">
                  <span className="font-semibold text-text-primary">{category.productCategory?.length || 0}</span>{" "}
                  subcategorías
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-full border border-green-200 dark:border-green-700">
                <Tag className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-green-700 dark:text-green-300 font-medium">Productos de segunda mano</span>
              </div>
            </div>
          </div>

          {/* Product Categories Grid */}
          {category.productCategory && category.productCategory.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-text-primary flex items-center gap-2">
                  <div className="w-1 h-8 bg-gradient-to-b from-primary to-primary-dark rounded-full"></div>
                  Subcategorías disponibles
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.productCategory.map((productCat: ProductCategory) => {
                  // When products are available, you can display the count
                  const productCount = 0; // productCat.products?.nodes?.length || 0;

                  return (
                    <div
                      key={productCat.id}
                      className="group relative bg-white dark:bg-neutral-800 rounded-2xl p-6 border-2 border-neutral-200 dark:border-neutral-700 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-xl hover:scale-105"
                    >
                      {/* Decorative gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

                      <div className="relative z-10">
                        {/* Category Icon & Badge */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Box className="w-6 h-6 text-primary" />
                          </div>
                          {productCat.size && (
                            <span className="px-2 py-1 text-xs font-semibold bg-neutral-100 dark:bg-neutral-700 text-text-secondary rounded-full">
                              {productCat.size}
                            </span>
                          )}
                        </div>

                        {/* Category Name */}
                        <h3 className="text-lg font-bold text-text-primary mb-3 group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]">
                          {productCat.productCategoryName}
                        </h3>

                        {/* Product Info */}
                        <div className="space-y-2 mb-4">
                          {productCat.averageWeight && (
                            <div className="flex items-center text-sm text-text-secondary">
                              <Info className="w-4 h-4 mr-2 flex-shrink-0" />
                              <span>
                                ~{productCat.averageWeight} {productCat.weightUnit}
                              </span>
                            </div>
                          )}
                          <div className="flex items-center text-sm text-text-secondary">
                            <ShoppingBag className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span>{productCount > 0 ? `${productCount} productos` : "Próximamente"}</span>
                          </div>
                        </div>

                        {/* Keywords */}
                        {productCat.keywords && productCat.keywords.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-4">
                            {productCat.keywords.slice(0, 3).map((keyword: string, idx: number) => (
                              <span
                                key={idx}
                                className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-700 text-text-secondary rounded-md"
                              >
                                {keyword}
                              </span>
                            ))}
                            {productCat.keywords.length > 3 && (
                              <span className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-700 text-text-secondary rounded-md">
                                +{productCat.keywords.length - 3}
                              </span>
                            )}
                          </div>
                        )}

                        {/* CTA Button - Disabled until products are available */}
                        <button
                          disabled
                          className="w-full px-4 py-2 bg-neutral-100 dark:bg-neutral-700 text-text-secondary rounded-lg font-medium cursor-not-allowed opacity-60"
                        >
                          Próximamente
                        </button>
                      </div>

                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 rounded-2xl ring-2 ring-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-neutral-800 rounded-2xl border-2 border-dashed border-neutral-300 dark:border-neutral-700">
              <Package className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-text-primary mb-2">Sin subcategorías disponibles</h3>
              <p className="text-text-secondary">Esta categoría aún no tiene subcategorías configuradas.</p>
            </div>
          )}

          {/* Info Banner */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded-xl">
                <Info className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-2">Productos próximamente</h3>
                <p className="text-text-secondary mb-4">
                  Estamos trabajando para traerte la mejor selección de productos de segunda mano. Pronto podrás
                  explorar y comprar productos en esta categoría.
                </p>
                <Link
                  href={`/departments/${departmentSlug}`}
                  className="inline-flex items-center text-primary hover:text-primary-dark font-medium group"
                >
                  Explorar otras categorías
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10 dark:to-transparent rounded-2xl p-8 border border-primary/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">¿Quieres vender productos?</h3>
                <p className="text-text-secondary">
                  Únete a nuestra comunidad de vendedores y ayuda a dar una segunda vida a tus productos.
                </p>
              </div>
              <Link
                href="/profile"
                className="flex-shrink-0 inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                Comenzar a vender
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
