"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MainLayout from "@/ui/layout/mainLayout";
import { useCatalogStore } from "@/store/catalog";
import { Department, DepartmentCategory, ProductCategory } from "@/types/product";
import { AlertTriangle, ArrowLeft, Home, Package } from "lucide-react";
import Link from "next/link";

export default function SubcategorySlugPage() {
  const params = useParams();
  const router = useRouter();
  const { marketData } = useCatalogStore();
  const [department, setDepartment] = useState<Department | null>(null);
  const [category, setCategory] = useState<DepartmentCategory | null>(null);
  const [subcategory, setSubcategory] = useState<ProductCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const departmentSlug = params.departmentSlug as string;
  const categorySlug = params.categorySlug as string;
  const subcategorySlug = params.subcategorySlug as string;

  useEffect(() => {
    if (!marketData?.marketCatalog) {
      setLoading(false);
      setError("No hay datos de catálogo disponibles");
      return;
    }

    // Convert slugs back to match names
    const searchDepartmentName = departmentSlug.replace(/-/g, " ");
    const searchCategoryName = categorySlug.replace(/-/g, " ");
    const searchSubcategoryName = subcategorySlug.replace(/-/g, " ");

    // Find department
    const foundDepartment = marketData.marketCatalog.find(
      (dept) => dept.departmentName.toLowerCase() === searchDepartmentName.toLowerCase()
    );

    if (!foundDepartment) {
      setError(`El departamento "${departmentSlug}" no existe`);
      setLoading(false);
      return;
    }

    // Find category within department
    const foundCategory = foundDepartment.departmentCategory.find(
      (cat) => cat.departmentCategoryName.toLowerCase() === searchCategoryName.toLowerCase()
    );

    if (!foundCategory) {
      setError(`La categoría "${categorySlug}" no existe en el departamento "${foundDepartment.departmentName}"`);
      setLoading(false);
      return;
    }

    // Find subcategory within category
    const foundSubcategory = foundCategory.productCategory.find(
      (subcat) => subcat.productCategoryName.toLowerCase() === searchSubcategoryName.toLowerCase()
    );

    if (!foundSubcategory) {
      setError(
        `La subcategoría "${subcategorySlug}" no existe en la categoría "${foundCategory.departmentCategoryName}"`
      );
      setLoading(false);
      return;
    }

    setDepartment(foundDepartment);
    setCategory(foundCategory);
    setSubcategory(foundSubcategory);
    setLoading(false);
  }, [departmentSlug, categorySlug, subcategorySlug, marketData]);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-text-secondary">Cargando subcategoría...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!department || !category || !subcategory) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[500px]">
          <div className="text-center max-w-md mx-auto p-8">
            <div className="bg-red-50 dark:bg-red-900/20 rounded-full p-4 w-16 h-16 mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>

            <h1 className="text-2xl font-bold text-text-primary mb-4">Subcategoría no encontrada</h1>

            <p className="text-text-secondary mb-8">{error || `La subcategoría "${subcategorySlug}" no existe.`}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center px-6 py-3 border border-neutral-300 dark:border-neutral-600 text-text-secondary hover:text-primary hover:border-primary transition-colors duration-200 rounded-lg"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver atrás
              </button>

              <Link
                href="/feed"
                className="inline-flex items-center px-6 py-3 bg-primary text-white hover:bg-primary-dark transition-colors duration-200 rounded-lg"
              >
                <Home className="w-4 h-4 mr-2" />
                Ir al inicio
              </Link>
            </div>

            {category && category.productCategory.length > 0 && (
              <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-700">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Subcategorías disponibles en {category.departmentCategoryName}:
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {category.productCategory.map((subcat) => (
                    <Link
                      key={subcat.id}
                      href={`/departments/${departmentSlug}/categories/${categorySlug}/subcategories/${subcat.productCategoryName
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-800 text-text-secondary hover:bg-primary hover:text-white transition-colors duration-200 rounded-full"
                    >
                      {subcat.productCategoryName}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-4">
            <Link href="/feed" className="hover:text-primary transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <Link href={`/departments/${departmentSlug}`} className="hover:text-primary transition-colors">
              {department.departmentName}
            </Link>
            <span>/</span>
            <Link
              href={`/departments/${departmentSlug}/categories/${categorySlug}`}
              className="hover:text-primary transition-colors"
            >
              {category.departmentCategoryName}
            </Link>
            <span>/</span>
            <span className="text-text-primary font-medium">{subcategory.productCategoryName}</span>
          </nav>

          <h1 className="text-3xl font-bold text-text-primary">{subcategory.productCategoryName}</h1>
          <p className="text-text-secondary mt-2">
            en {category.departmentCategoryName} - {department.departmentName}
          </p>
        </div>

        {/* Products placeholder - This will be replaced with actual product listing */}
        <div className="text-center py-16 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
          <Package className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-text-primary mb-2">Productos próximamente</h3>
          <p className="text-text-secondary">
            Esta sección mostrará todos los productos disponibles en {subcategory.productCategoryName}
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
