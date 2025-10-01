"use client";

import MainLayout from "@/ui/layout/mainLayout";
import BlogHero from "@/app/(blog)/_ui/blogHero";
import BlogNavigation from "@/app/(blog)/_ui/blogNavigation";
import Link from "next/link";

export default function BlogPage() {
  // Get recent posts
  // const recentPosts = mockPosts
  //   .filter((post) => post.status === "PUBLISHED")
  //   .sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime())
  //   .slice(0, 6);

  // Get popular categories (top 6 by post count)
  // const popularCategories = [...blogCategoriesInfo].sort((a, b) => b.postsCount - a.postsCount).slice(0, 6);

  // // Get popular tags (top 8 by post count)
  // const popularTags = [...mockTags].sort((a, b) => b.postsCount - a.postsCount).slice(0, 8);

  return (
    <MainLayout>
      {/* Hero Section */}
      <BlogHero />

      {/* Navigation */}
      <BlogNavigation />

      <div className="container mx-auto px-4 py-12">
        {/* Recent Posts Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Recent Posts</h2>
            <Link href="/blog/posts" className="text-green-600 hover:text-green-700 font-medium flex items-center">
              View all posts
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* {recentPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} variant={index === 0 ? "featured" : "default"} />
            ))} */}
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Popular Categories</h2>
            <Link href="/blog/categories" className="text-green-600 hover:text-green-700 font-medium flex items-center">
              View all categories
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* {popularCategories.map((categoryInfo) => (
              <Link key={categoryInfo.category} href={`/blog/categories/${categoryInfo.category.toLowerCase()}`}>
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 cursor-pointer hover:scale-105">
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
                  <p className="text-gray-600 text-sm">{categoryInfo.description}</p>
                </div>
              </Link>
            ))} */}
          </div>
        </section>

        {/* Featured Authors Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Our Authors</h2>
            <Link href="/blog/authors" className="text-green-600 hover:text-green-700 font-medium flex items-center">
              Meet all authors
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* {mockAuthors.slice(0, 3).map((author) => (
              <Link key={author.id} href={`/blog/authors/${author.id}`}>
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 cursor-pointer text-center">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200 mx-auto mb-4">
                    <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-500 bg-green-100">
                      {author.name.charAt(0)}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{author.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{author.bio}</p>
                  <div className="text-sm text-gray-500">{author.postsCount} posts</div>
                </div>
              </Link>
            ))} */}
          </div>
        </section>

        {/* Popular Tags Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Popular Tags</h2>
            <Link href="/blog/tags" className="text-green-600 hover:text-green-700 font-medium flex items-center">
              View all tags
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="bg-gray-50 rounded-lg p-8">
            <div className="flex flex-wrap justify-center gap-3">
              {/* {popularTags.map((tag) => (
                <Link key={tag.id} href={`/blog/tags/${tag.slug}`}>
                  <div
                    className="px-4 py-2 rounded-full text-white font-medium hover:opacity-80 transition-opacity cursor-pointer"
                    style={{ backgroundColor: tag.color }}
                  >
                    #{tag.name} ({tag.postsCount})
                  </div>
                </Link>
              ))} */}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
