import { Department, DepartmentCategory } from "@/types/product";
import { Title } from "@/ui/text/title";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";

type Props = {
  filters: {
    searchTerm: string;
    priceRange: {
      min: string;
      max: string;
    };
    brand: string;
    condition: string;
    isExchangeable: boolean | null;
    hasOffer: boolean | null;
    selectedCategory: string | null;
  };
  sortBy: string;
  setSortBy: (value: string) => void;
  showFilters: boolean;
  setShowFilters: (value: boolean) => void;
  clearFilters: () => void;
  updateFilter: (key: string, value: string | boolean | null | { min: string; max: string }) => void;
  department: Department;
};

export default function FilterPanel({
  filters,
  sortBy,
  setSortBy,
  showFilters,
  setShowFilters,
  clearFilters,
  updateFilter,
  department,
}: Props) {
  return (
    <section className="mb-8">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
        <Title variant="h3" className="font-semibold">
          Productos disponibles
        </Title>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          {/* Search */}
          <div className="relative flex-1 lg:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={filters.searchTerm}
              onChange={(e) => updateFilter("searchTerm", e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-neutral-800 text-text-primary"
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary text-text-primary"
            >
              <option value="newest">Más recientes</option>
              <option value="price-low">Menor precio</option>
              <option value="price-high">Mayor precio</option>
              <option value="name">Nombre A-Z</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtros
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Filtros</h3>
            <div className="flex gap-2">
              <button onClick={clearFilters} className="text-sm text-text-secondary hover:text-primary">
                Limpiar filtros
              </button>
              <button onClick={() => setShowFilters(false)} className="text-text-secondary hover:text-text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Rango de precio</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange.min}
                  onChange={(e) => updateFilter("priceRange", { ...filters.priceRange, min: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-text-primary text-sm"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange.max}
                  onChange={(e) => updateFilter("priceRange", { ...filters.priceRange, max: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-text-primary text-sm"
                />
              </div>
            </div>

            {/* Brand */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Marca</label>
              <input
                type="text"
                placeholder="Buscar marca..."
                value={filters.brand}
                onChange={(e) => updateFilter("brand", e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-text-primary text-sm"
              />
            </div>

            {/* Condition */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Estado</label>
              <select
                value={filters.condition}
                onChange={(e) => updateFilter("condition", e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-text-primary text-sm"
              >
                <option value="">Todos</option>
                <option value="NEW">Nuevo</option>
                <option value="LIKE_NEW">Como nuevo</option>
                <option value="GOOD">Buen estado</option>
                <option value="FAIR">Estado regular</option>
                <option value="POOR">Necesita reparación</option>
              </select>
            </div>

            {/* Special Filters */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Características</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.isExchangeable === true}
                    onChange={(e) => updateFilter("isExchangeable", e.target.checked ? true : null)}
                    className="rounded border-neutral-300 dark:border-neutral-600 text-primary focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-text-primary">Intercambiable</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.hasOffer === true}
                    onChange={(e) => updateFilter("hasOffer", e.target.checked ? true : null)}
                    className="rounded border-neutral-300 dark:border-neutral-600 text-primary focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-text-primary">En oferta</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters */}
      {(filters.searchTerm ||
        filters.priceRange.min ||
        filters.priceRange.max ||
        filters.brand ||
        filters.condition ||
        filters.isExchangeable !== null ||
        filters.hasOffer !== null ||
        filters.selectedCategory !== null) && (
        <div className="flex flex-wrap gap-2 mb-6">
          {filters.selectedCategory && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              Categoría:{" "}
              {
                department.departmentCategory?.find(
                  (cat: DepartmentCategory) => cat.id.toString() === filters.selectedCategory
                )?.departmentCategoryName
              }
              <button onClick={() => updateFilter("selectedCategory", null)} className="hover:text-primary-dark">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.searchTerm && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              Búsqueda: &quot;{filters.searchTerm}&quot;
              <button onClick={() => updateFilter("searchTerm", "")} className="hover:text-primary-dark">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.brand && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              Marca: {filters.brand}
              <button onClick={() => updateFilter("brand", "")} className="hover:text-primary-dark">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.condition && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              Estado: {filters.condition}
              <button onClick={() => updateFilter("condition", "")} className="hover:text-primary-dark">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </section>
  );
}
