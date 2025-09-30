import { useState } from "react";
import { BlogCategory } from "@/types/enums";
import { BlogFilters } from "@/types/blog";
import { blogCategoriesInfo, mockTags } from "@/lib/blogMockData";

interface BlogFiltersComponentProps {
  filters: BlogFilters;
  onFiltersChange: (filters: BlogFilters) => void;
  showAdvanced?: boolean;
}

export default function BlogFiltersComponent({
  filters,
  onFiltersChange,
  showAdvanced = false,
}: BlogFiltersComponentProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const handleFilterChange = (key: keyof BlogFilters, value: string | string[] | BlogCategory | undefined) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      sortBy: "newest",
    });
  };

  const hasActiveFilters =
    filters.category ||
    filters.search ||
    filters.author ||
    (filters.tags && filters.tags.length > 0) ||
    filters.sortBy !== "newest";

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      {/* Basic Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Search */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search posts..."
            value={filters.search || ""}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category"
            value={filters.category || "ALL"}
            onChange={(e) =>
              handleFilterChange("category", e.target.value === "ALL" ? undefined : (e.target.value as BlogCategory))
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="ALL">All Categories</option>
            {blogCategoriesInfo.map((cat) => (
              <option key={cat.category} value={cat.category}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Filter */}
        <div>
          <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            id="sort"
            value={filters.sortBy || "newest"}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="popular">Most Popular</option>
            <option value="mostViewed">Most Viewed</option>
          </select>
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      {showAdvanced && (
        <div className="mb-4">
          <button
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="flex items-center text-sm font-medium text-green-600 hover:text-green-700"
          >
            <span>Advanced Filters</span>
            <svg
              className={`ml-1 w-4 h-4 transform transition-transform ${isAdvancedOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}

      {/* Advanced Filters */}
      {showAdvanced && isAdvancedOpen && (
        <div className="border-t border-gray-200 pt-4 space-y-4">
          {/* Author Filter */}
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
              Author
            </label>
            <input
              id="author"
              type="text"
              placeholder="Filter by author name..."
              value={filters.author || ""}
              onChange={(e) => handleFilterChange("author", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Tags Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
            <div className="flex flex-wrap gap-2">
              {mockTags.slice(0, 10).map((tag) => {
                const isSelected = filters.tags?.includes(tag.slug) || false;
                return (
                  <button
                    key={tag.id}
                    onClick={() => {
                      const currentTags = filters.tags || [];
                      const newTags = isSelected
                        ? currentTags.filter((t) => t !== tag.slug)
                        : [...currentTags, tag.slug];
                      handleFilterChange("tags", newTags.length > 0 ? newTags : undefined);
                    }}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      isSelected ? "text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    style={isSelected ? { backgroundColor: tag.color } : {}}
                  >
                    {tag.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Active Filters and Clear */}
      {hasActiveFilters && (
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Active filters:</span>
              <div className="flex flex-wrap gap-2">
                {filters.category && (
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                    Category: {blogCategoriesInfo.find((c) => c.category === filters.category)?.name}
                  </span>
                )}
                {filters.search && (
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    Search: &quot;{filters.search}&quot;
                  </span>
                )}
                {filters.author && (
                  <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                    Author: {filters.author}
                  </span>
                )}
                {filters.tags && filters.tags.length > 0 && (
                  <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
                    {filters.tags.length} tag{filters.tags.length > 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </div>
            <button onClick={clearFilters} className="text-sm text-red-600 hover:text-red-700 font-medium">
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
