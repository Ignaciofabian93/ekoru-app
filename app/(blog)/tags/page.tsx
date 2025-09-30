"use client";

import MainLayout from "@/ui/layout/mainLayout";
import BlogNavigation from "@/ui/components/blog/blogNavigation";
import { mockTags, getPostsByTag } from "@/lib/blogMockData";
import Link from "next/link";

export default function TagsPage() {
  // Sort tags by post count (descending) and then alphabetically
  const sortedTags = [...mockTags].sort((a, b) => {
    if (a.postsCount !== b.postsCount) {
      return b.postsCount - a.postsCount;
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <MainLayout>
      {/* Navigation */}
      <BlogNavigation />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Tags</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover content by topics and themes. Tags help you find specific articles about environmental issues,
            sustainability practices, and eco-friendly lifestyle tips.
          </p>
        </div>

        {/* Popular Tags Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Tags</h2>
          <div className="flex flex-wrap gap-3">
            {sortedTags.slice(0, 6).map((tag) => (
              <Link key={tag.id} href={`/blog/tags/${tag.slug}`}>
                <div
                  className="px-4 py-2 rounded-full text-white font-medium hover:opacity-80 transition-opacity cursor-pointer"
                  style={{ backgroundColor: tag.color }}
                >
                  {tag.name} ({tag.postsCount})
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* All Tags Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Tags</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedTags.map((tag) => (
              <TagCard key={tag.id} tag={tag} />
            ))}
          </div>
        </div>

        {/* Tag Cloud */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Tag Cloud</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {sortedTags.map((tag) => {
              // Calculate font size based on post count
              const minSize = 0.8;
              const maxSize = 1.6;
              const maxPosts = Math.max(...sortedTags.map((t) => t.postsCount));
              const fontSize = minSize + (tag.postsCount / maxPosts) * (maxSize - minSize);

              return (
                <Link key={tag.id} href={`/blog/tags/${tag.slug}`}>
                  <span
                    className="inline-block px-2 py-1 m-1 rounded text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
                    style={{
                      fontSize: `${fontSize}rem`,
                      color: tag.color,
                    }}
                  >
                    #{tag.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

interface TagCardProps {
  tag: (typeof mockTags)[0];
}

function TagCard({ tag }: TagCardProps) {
  const posts = getPostsByTag(tag.slug);

  return (
    <Link href={`/blog/tags/${tag.slug}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 cursor-pointer hover:scale-105">
        {/* Tag Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: tag.color }} />
            <h3 className="text-lg font-semibold text-gray-900">{tag.name}</h3>
          </div>
          <span
            className="px-2 py-1 text-xs rounded-full text-white font-medium"
            style={{ backgroundColor: tag.color }}
          >
            {tag.postsCount}
          </span>
        </div>

        {/* Description */}
        {tag.description && <p className="text-gray-600 mb-4 text-sm">{tag.description}</p>}

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

        {/* View Tag Button */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="text-sm font-medium inline-flex items-center" style={{ color: tag.color }}>
            View tagged posts
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
