"use client";

import { useState } from "react";
import MainLayout from "@/ui/layout/mainLayout";
import BlogNavigation from "@/ui/components/blog/blogNavigation";
import { mockPosts, blogCategoriesInfo } from "@/lib/blogMockData";
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

export default function PostsPage() {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | "ALL">("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "popular">("newest");

  // Filter and sort posts
  const filteredPosts = mockPosts
    .filter((post) => {
      const matchesCategory = selectedCategory === "ALL" || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime();
        case "oldest":
          return new Date(a.publishedAt || a.createdAt).getTime() - new Date(b.publishedAt || b.createdAt).getTime();
        case "popular":
          return b.views - a.views;
        default:
          return 0;
      }
    });

  // Get featured post (most recent)
  const featuredPost = mockPosts
    .filter((post) => post.status === "PUBLISHED")
    .sort(
      (a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime()
    )[0];

  return (
    <MainLayout>
      {/* Navigation */}
      <BlogNavigation />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Posts</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover insights, tips, and stories about sustainability, environmental protection, and eco-friendly living
            from our community of experts.
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Post</h2>
            <Link href={`/blog/posts/${featuredPost.slug}`}>
              <article className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer">
                <div className="md:flex">
                  {/* Featured Image */}
                  {featuredPost.featuredImage && (
                    <div className="md:w-1/2 relative h-64 md:h-auto">
                      <Image src={featuredPost.featuredImage} alt={featuredPost.title} fill className="object-cover" />
                    </div>
                  )}

                  <div className="md:w-1/2 p-8">
                    {/* Category Badge */}
                    <div className="mb-4">
                      {(() => {
                        const categoryInfo = blogCategoriesInfo.find((info) => info.category === featuredPost.category);
                        return (
                          <span
                            className="px-3 py-1 text-sm rounded-full"
                            style={{
                              backgroundColor: categoryInfo?.color ? `${categoryInfo.color}20` : "#10B98120",
                              color: categoryInfo?.color || "#10B981",
                            }}
                          >
                            {categoryInfo?.icon} {categoryInfo?.name || featuredPost.category}
                          </span>
                        );
                      })()}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{featuredPost.title}</h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>

                    {/* Author and Meta */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 mr-3">
                          {featuredPost.author.avatar ? (
                            <Image
                              src={featuredPost.author.avatar}
                              alt={featuredPost.author.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-sm font-bold text-gray-500 bg-green-100">
                              {featuredPost.author.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{featuredPost.author.name}</div>
                          <div className="text-sm text-gray-500">
                            {featuredPost.publishedAt && formatDate(featuredPost.publishedAt)}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">{featuredPost.readingTime} min read</div>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        )}

        {/* Filters and Search */}
        <div className="mb-8 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between">
          {/* Search */}
          <div className="lg:w-1/3">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="lg:w-1/4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as BlogCategory | "ALL")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="ALL">All Categories</option>
              {blogCategoriesInfo.map((cat) => (
                <option key={cat.category} value={cat.category}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Filter */}
          <div className="lg:w-1/4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "newest" | "oldest" | "popular")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredPosts.length} of {mockPosts.length} posts
            {selectedCategory !== "ALL" && (
              <span> in {blogCategoriesInfo.find((cat) => cat.category === selectedCategory)?.name}</span>
            )}
            {searchTerm && <span> matching &quot;{searchTerm}&quot;</span>}
          </p>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link key={post.id} href={`/blog/posts/${post.slug}`}>
                <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer">
                  {/* Featured Image */}
                  {post.featuredImage && (
                    <div className="relative h-48 bg-gray-200">
                      <Image src={post.featuredImage} alt={post.title} fill className="object-cover" />
                    </div>
                  )}

                  <div className="p-6">
                    {/* Category Badge */}
                    <div className="mb-3">
                      {(() => {
                        const categoryInfo = blogCategoriesInfo.find((info) => info.category === post.category);
                        return (
                          <span
                            className="px-2 py-1 text-xs rounded-full"
                            style={{
                              backgroundColor: categoryInfo?.color ? `${categoryInfo.color}20` : "#10B98120",
                              color: categoryInfo?.color || "#10B981",
                            }}
                          >
                            {categoryInfo?.icon} {categoryInfo?.name || post.category}
                          </span>
                        );
                      })()}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                    {/* Author Info */}
                    <div className="flex items-center mb-4">
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
            <h3 className="text-xl font-semibold text-gray-900 mb-4">No Posts Found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? `No posts match your search "${searchTerm}"` : "No posts found with the selected filters"}
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("ALL");
                setSortBy("newest");
              }}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Load More Button (for future pagination) */}
        {filteredPosts.length > 9 && (
          <div className="text-center mt-12">
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors">
              Load More Posts
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
