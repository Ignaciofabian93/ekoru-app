"use client";

import MainLayout from "@/ui/layout/mainLayout";
import BlogNavigation from "@/ui/components/blog/blogNavigation";
import { blogCategoriesInfo, getPostsByCategory } from "@/lib/blogMockData";
import Link from "next/link";

export default function CategoriesPage() {
  return (
    <MainLayout>
      {/* Navigation */}
      <BlogNavigation />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Categories</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our environmental and sustainability topics. Find articles on everything from recycling and
            upcycling to sustainable living and environmental impact.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogCategoriesInfo.map((categoryInfo) => (
            <CategoryCard key={categoryInfo.category} categoryInfo={categoryInfo} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

interface CategoryCardProps {
  categoryInfo: (typeof blogCategoriesInfo)[0];
}

function CategoryCard({ categoryInfo }: CategoryCardProps) {
  const posts = getPostsByCategory(categoryInfo.category);

  return (
    <Link href={`/blog/categories/${categoryInfo.category.toLowerCase()}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 cursor-pointer hover:scale-105">
        {/* Category Icon and Header */}
        <div className="flex items-center mb-4">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl mr-4"
            style={{ backgroundColor: `${categoryInfo.color}20` }}
          >
            {categoryInfo.icon}
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-1" style={{ color: categoryInfo.color }}>
              {categoryInfo.name}
            </h3>
            <p className="text-sm text-gray-500">{categoryInfo.postsCount} posts</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-2">{categoryInfo.description}</p>

        {/* Recent Posts Preview */}
        {posts.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-700 mb-2">RECENT POSTS</p>
            <div className="space-y-1">
              {posts.slice(0, 2).map((post) => (
                <div key={post.id} className="text-sm text-gray-600 line-clamp-1">
                  • {post.title}
                </div>
              ))}
              {posts.length > 2 && <div className="text-xs text-gray-500">+{posts.length - 2} more posts</div>}
            </div>
          </div>
        )}

        {/* View Category Button */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="text-sm font-medium inline-flex items-center" style={{ color: categoryInfo.color }}>
            View all posts
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
