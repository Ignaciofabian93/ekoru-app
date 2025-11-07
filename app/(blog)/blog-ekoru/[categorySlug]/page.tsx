"use client";
import { useCatalogStore } from "@/store/catalog";
import { useParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { getBlogTypeFromSlug } from "@/utils/blogUtils";
import { BlogPost } from "@/types/blog";
import { BlogCategories } from "@/types/blog";
import { BlogPostSkeleton, HeaderSkeleton } from "@/ui/skeleton/skeleton";
import { ShieldCheck } from "lucide-react";
import { CategoryHeader } from "../../_ui/header";
import { CategoryCard } from "../../_ui/card";
import { EmptyContent } from "../../_ui/emptyContent";
import MainLayout from "@/ui/layout/mainLayout";
import useBlogsByCategory from "../../_hooks/useBlogsByCategory";
import Pagination from "@/ui/pagination/pagination";

export default function BlogSlugPage() {
  const params = useParams();
  const { blogData } = useCatalogStore();
  const [categoryInfo, setCategoryInfo] = useState<BlogCategories | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Memoize the blog type to avoid unnecessary recalculations
  const blogType = useMemo(() => {
    const categorySlug = params.categorySlug as string;
    return categorySlug ? getBlogTypeFromSlug(categorySlug) : null;
  }, [params.categorySlug]);

  // Use the improved hook with automatic query execution
  const { blogPosts, loading, error, totalPages } = useBlogsByCategory({
    category: blogType,
    page: currentPage,
    pageSize: itemsPerPage,
    enabled: !!blogType, // Only run query when we have a valid blog type
  });

  useEffect(() => {
    const categorySlug = params.categorySlug as string;
    if (!categorySlug) return;

    // Find category in blog catalog
    const foundCategory = blogData?.blogCatalog?.find((cat) => cat.href.toLowerCase() === categorySlug.toLowerCase());

    if (foundCategory) {
      setCategoryInfo(foundCategory);
    }

    if (!blogType) {
      console.error(`No mapping found for category slug: ${categorySlug}`);
    }
  }, [params, blogData, blogType]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading && !categoryInfo) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
          <div className="container mx-auto px-4 py-12 max-w-7xl">
            <HeaderSkeleton />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <BlogPostSkeleton key={index} />
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
          <div className="container mx-auto px-4 py-12 max-w-7xl">
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                <ShieldCheck className="w-12 h-12 text-red-500" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Error al cargar los artículos</h1>
              <p className="text-lg text-red-600 mb-8">{error.message}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Intentar de nuevo
              </button>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 pt-4 pb-12 max-w-7xl">
        {/* Category Header */}
        <CategoryHeader categoryInfo={categoryInfo} />
        {/* Blog Posts Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <BlogPostSkeleton key={index} />
            ))}
          </div>
        ) : blogPosts && blogPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {blogPosts.map((post: BlogPost) => (
                <CategoryCard
                  key={post.id}
                  post={post}
                  categoryInfo={categoryInfo}
                  slug={params.categorySlug as string}
                />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={handlePageChange}
              setItemsPerPage={setItemsPerPage}
              itemsPerPage={itemsPerPage}
            />
          </>
        ) : (
          <EmptyContent />
        )}
      </div>
    </MainLayout>
  );
}
