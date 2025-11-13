import { Product } from "@/types/product";
import MainButton from "@/ui/buttons/mainButton";
import { Text } from "@/ui/text/text";
import { Title } from "@/ui/text/title";
import { Package } from "lucide-react";

type Props = {
  allProducts: Product[];
  clearFilters: () => void;
};

export default function NoProductsAvailable({ allProducts, clearFilters }: Props) {
  return (
    <section className="text-center py-16 bg-white dark:bg-neutral-800 rounded-2xl border-2 border-dashed border-neutral-300 dark:border-neutral-700">
      <div className="max-w-md mx-auto">
        <div className="bg-neutral-100 dark:bg-neutral-700 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Package className="w-10 h-10 text-neutral-400" />
        </div>

        <h3 className="text-2xl font-bold text-text-primary mb-3">No hay productos disponibles</h3>

        <p className="text-text-secondary mb-6">
          {allProducts.length === 0
            ? "Este departamento aún no tiene productos publicados. Pronto habrá productos disponibles para ti."
            : "No se encontraron productos que coincidan con tus filtros. Prueba ajustando los criterios de búsqueda."}
        </p>

        {allProducts.length > 0 && (
          <button
            onClick={clearFilters}
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
          >
            Limpiar filtros
          </button>
        )}

        <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-700">
          <Title variant="h4" className="font-semibold mb-4">
            ¿Quieres ser el primero en vender aquí?
          </Title>
          <Text variant="p" className="mb-4">
            Únete a nuestra comunidad y publica tus productos en esta categoría.
          </Text>
          <MainButton text="Comenzar a vender" onClick={() => {}} />
        </div>
      </div>
    </section>
  );
}
