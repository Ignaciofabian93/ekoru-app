"use client";

import { useParams } from "next/navigation";
import MainLayout from "@/ui/layout/mainLayout";
import { mockTags, getPostsByTag, blogCategoriesInfo } from "@/lib/blogMockData";
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

export default function TagDetailPage() {
  const params = useParams();
  const tagSlug = params.slug as string;

  const tag = mockTags.find((t) => t.slug === tagSlug);
  const posts = tag ? getPostsByTag(tag.slug) : [];

  if (!tag) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tag Not Found</h1>
          <p className="text-gray-600 mb-8">The tag you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/blog/tags"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            View All Tags
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
              <Link href="/blog/tags" className="hover:text-gray-700">
                Tags
              </Link>
            </li>
            <li>•</li>
            <li className="text-gray-900">{tag.name}</li>
          </ol>
        </nav>

        {/* Tag Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 rounded-full mr-3" style={{ backgroundColor: tag.color }} />
            <h1 className="text-4xl font-bold" style={{ color: tag.color }}>
              #{tag.name}
            </h1>
          </div>
          {tag.description && <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">{tag.description}</p>}
          <div className="text-gray-500">
            {tag.postsCount} posts tagged with {tag.name}
          </div>
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
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((postTag) => (
                        <span
                          key={postTag.id}
                          className={`px-2 py-1 text-xs rounded-full ${
                            postTag.slug === tag.slug ? "text-white font-medium" : "bg-gray-100 text-gray-600"
                          }`}
                          style={postTag.slug === tag.slug ? { backgroundColor: postTag.color } : {}}
                        >
                          {postTag.name}
                        </span>
                      ))}
                    </div>

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
              style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
            >
              #
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Posts Yet</h3>
            <p className="text-gray-600 mb-6">
              We haven&apos;t published any posts with this tag yet. Check back soon!
            </p>
            <Link
              href="/blog/tags"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Browse Other Tags
            </Link>
          </div>
        )}

        {/* Related Tags */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Related Tags</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {mockTags
              .filter((t) => t.slug !== tag.slug)
              .slice(0, 8)
              .map((relatedTag) => (
                <Link key={relatedTag.id} href={`/blog/tags/${relatedTag.slug}`}>
                  <div
                    className="px-4 py-2 rounded-full text-white font-medium hover:opacity-80 transition-opacity cursor-pointer"
                    style={{ backgroundColor: relatedTag.color }}
                  >
                    {relatedTag.name} ({relatedTag.postsCount})
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
