"use client";

import { useParams } from "next/navigation";
import MainLayout from "@/ui/layout/mainLayout";
import { blogCategoriesInfo, getPostsByCategory } from "@/lib/blogMockData";
import { BlogCategory } from "@/types/enums";
import Link from "next/link";
import Image from "next/image";

// Helper function to format dates
function formatDate(date: Date): string {
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "1 day ago";
  if (diffInDays < 30) return `${diffInDays} days ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
}

export default function CategoryDetailPage() {
  const params = useParams();
  const categorySlug = (params.slug as string).toUpperCase();

  // Find the category
  const categoryInfo = blogCategoriesInfo.find((info) => info.category === (categorySlug as BlogCategory));

  const posts = categoryInfo ? getPostsByCategory(categoryInfo.category) : [];

  if (!categoryInfo) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-8">The category you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/blog/categories"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            View All Categories
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/blog" className="hover:text-gray-700">
                Blog
              </Link>
            </li>
            <li>•</li>
            <li>
              <Link href="/blog/categories" className="hover:text-gray-700">
                Categories
              </Link>
            </li>
            <li>•</li>
            <li className="text-gray-900">{categoryInfo.name}</li>
          </ol>
        </nav>

        {/* Category Header */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full text-4xl mb-4"
            style={{ backgroundColor: `${categoryInfo.color}20` }}
          >
            {categoryInfo.icon}
          </div>
          <h1 className="text-4xl font-bold mb-4" style={{ color: categoryInfo.color }}>
            {categoryInfo.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">{categoryInfo.description}</p>
          <div className="text-gray-500">{categoryInfo.postsCount} posts in this category</div>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/posts/${post.slug}`}>
                <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer">
                  {/* Featured Image */}
                  {post.featuredImage && (
                    <div className="relative h-48 bg-gray-200">
                      <Image src={post.featuredImage} alt={post.title} fill className="object-cover" />
                    </div>
                  )}

                  <div className="p-6">
                    {/* Author Info */}
                    <div className="flex items-center mb-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200 mr-3">
                        {post.author.avatar ? (
                          <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-500 bg-green-100">
                            {post.author.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">{post.author.name}</div>
                        <div className="text-gray-500">{post.publishedAt && formatDate(post.publishedAt)}</div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag.id} className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{post.readingTime} min read</span>
                      <div className="flex items-center space-x-3">
                        <span>👁 {post.views}</span>
                        <span>❤️ {post.likes}</span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full text-2xl mb-4"
              style={{ backgroundColor: `${categoryInfo.color}20` }}
            >
              {categoryInfo.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Posts Yet</h3>
            <p className="text-gray-600 mb-6">
              We haven&apos;t published any posts in this category yet. Check back soon!
            </p>
            <Link
              href="/blog/categories"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Browse Other Categories
            </Link>
          </div>
        )}

        {/* Related Categories */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Explore Other Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {blogCategoriesInfo
              .filter((cat) => cat.category !== categoryInfo.category)
              .slice(0, 4)
              .map((cat) => (
                <Link key={cat.category} href={`/blog/categories/${cat.category.toLowerCase()}`}>
                  <div className="text-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
                    <div
                      className="inline-flex items-center justify-center w-12 h-12 rounded-lg text-xl mb-2"
                      style={{ backgroundColor: `${cat.color}20` }}
                    >
                      {cat.icon}
                    </div>
                    <h3 className="text-sm font-medium text-gray-900">{cat.name}</h3>
                    <p className="text-xs text-gray-500">{cat.postsCount} posts</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
