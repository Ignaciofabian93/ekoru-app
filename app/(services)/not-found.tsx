import MainLayout from "@/ui/layout/mainLayout";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ServiceNotFound() {
  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-center max-w-lg mx-auto p-8">
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-full p-4 w-16 h-16 mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          </div>

          <h1 className="text-3xl font-bold text-text-primary mb-4">Página no encontrada</h1>

          <p className="text-text-secondary mb-2">La página que estás buscando no existe o ha sido movida.</p>

          <p className="text-text-secondary mb-8">
            Verifica la URL o navega desde el menú principal para encontrar lo que buscas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.history.back()}
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

          <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-700">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Enlaces útiles:</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link
                href="/feed"
                className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-800 text-text-secondary hover:bg-primary hover:text-white transition-colors duration-200 rounded-full"
              >
                Inicio
              </Link>
              <Link
                href="/ekoru-blog"
                className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-800 text-text-secondary hover:bg-primary hover:text-white transition-colors duration-200 rounded-full"
              >
                Blog
              </Link>
              <Link
                href="/help"
                className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-800 text-text-secondary hover:bg-primary hover:text-white transition-colors duration-200 rounded-full"
              >
                Ayuda
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
