"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MainLayout from "@/ui/layout/mainLayout";
import { useCatalogStore } from "@/store/catalog";
import { Department } from "@/types/product";
import { AlertTriangle, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

export default function DepartmentSlugPage() {
  const params = useParams();
  const router = useRouter();
  const { marketData } = useCatalogStore();
  const [department, setDepartment] = useState<Department | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const departmentSlug = params.departmentSlug as string;

  useEffect(() => {
    if (!marketData?.marketCatalog) {
      setLoading(false);
      setError("No hay datos de catálogo disponibles");
      return;
    }

    // Convert slug back to match department names
    const searchName = departmentSlug.replace(/-/g, " ");

    // Find department by matching slug with converted name
    const foundDepartment = marketData.marketCatalog.find(
      (dept) => dept.departmentName.toLowerCase() === searchName.toLowerCase()
    );

    if (foundDepartment) {
      setDepartment(foundDepartment);
    } else {
      setError(`El departamento "${departmentSlug}" no existe`);
    }

    setLoading(false);
  }, [departmentSlug, marketData]);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-text-secondary">Cargando departamento...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !department) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[500px]">
          <div className="text-center max-w-md mx-auto p-8">
            <div className="bg-red-50 dark:bg-red-900/20 rounded-full p-4 w-16 h-16 mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>

            <h1 className="text-2xl font-bold text-text-primary mb-4">Departamento no encontrado</h1>

            <p className="text-text-secondary mb-2">
              {error || `El departamento "${departmentSlug}" no existe en nuestro catálogo.`}
            </p>

            <p className="text-text-secondary mb-8">
              Verifica que el nombre del departamento esté escrito correctamente o selecciona uno de los departamentos
              disponibles.
            </p>

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

            {marketData?.marketCatalog && marketData.marketCatalog.length > 0 && (
              <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-700">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Departamentos disponibles:</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {marketData.marketCatalog.map((dept) => (
                    <Link
                      key={dept.id}
                      href={`/departments/${dept.departmentName.toLowerCase().replace(/\s+/g, "-")}`}
                      className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-800 text-text-secondary hover:bg-primary hover:text-white transition-colors duration-200 rounded-full"
                    >
                      {dept.departmentName}
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
            <span className="text-text-primary font-medium">{department.departmentName}</span>
          </nav>

          <h1 className="text-3xl font-bold text-text-primary">{department.departmentName}</h1>
        </div>

        {/* Categories grid */}
        {department.departmentCategory && department.departmentCategory.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {department.departmentCategory.map((category) => (
              <Link
                key={category.id}
                href={`/departments/${departmentSlug}/categories/${category.departmentCategoryName
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="block p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-neutral-200 dark:border-neutral-700"
              >
                <h3 className="text-lg font-semibold text-text-primary mb-2">{category.departmentCategoryName}</h3>
                <p className="text-text-secondary text-sm">
                  {category.productCategory.length} subcategorías disponibles
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
