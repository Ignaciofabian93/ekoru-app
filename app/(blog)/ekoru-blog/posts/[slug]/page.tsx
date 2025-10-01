"use client";

import { useParams } from "next/navigation";
import MainLayout from "@/ui/layout/mainLayout";
import { mockPosts, getRelatedPosts, blogCategoriesInfo } from "@/lib/blogMockData";
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

export default function PostDetailPage() {
  const params = useParams();
  const postSlug = params.slug as string;

  const post = mockPosts.find((p) => p.slug === postSlug);
  const relatedPosts = post ? getRelatedPosts(post) : [];

  if (!post) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The post you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/blog/posts"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            View All Posts
          </Link>
        </div>
      </MainLayout>
    );
  }

  const categoryInfo = blogCategoriesInfo.find((info) => info.category === post.category);

  return (
    <MainLayout>
      <article className="container mx-auto px-4 py-8 max-w-4xl">
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
              <Link href="/blog/posts" className="hover:text-gray-700">
                Posts
              </Link>
            </li>
            <li>•</li>
            <li className="text-gray-900 line-clamp-1">{post.title}</li>
          </ol>
        </nav>

        {/* Post Header */}
        <header className="mb-8">
          {/* Category Badge */}
          <div className="mb-4">
            <Link href={`/blog/categories/${post.category.toLowerCase()}`}>
              <span
                className="px-3 py-1 text-sm rounded-full hover:opacity-80 transition-opacity cursor-pointer"
                style={{
                  backgroundColor: categoryInfo?.color ? `${categoryInfo.color}20` : "#10B98120",
                  color: categoryInfo?.color || "#10B981",
                }}
              >
                {categoryInfo?.icon} {categoryInfo?.name || post.category}
              </span>
            </Link>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">{post.title}</h1>

          {/* Excerpt */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">{post.excerpt}</p>

          {/* Author and Meta Info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-8">
            <div className="flex items-center mb-4 sm:mb-0">
              <Link href={`/blog/authors/${post.author.id}`}>
                <div className="flex items-center cursor-pointer hover:opacity-80">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 mr-4">
                    {post.author.avatar ? (
                      <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-lg font-bold text-gray-500 bg-green-100">
                        {post.author.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{post.author.name}</div>
                    <div className="text-sm text-gray-500">
                      {post.publishedAt && formatDate(post.publishedAt)} • {post.readingTime} min read
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Engagement Stats */}
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <span className="flex items-center">
                <span className="mr-1">👁</span>
                {post.views} views
              </span>
              <span className="flex items-center">
                <span className="mr-1">❤️</span>
                {post.likes} likes
              </span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden bg-gray-200">
            <Image src={post.featuredImage} alt={post.title} fill className="object-cover" />
          </div>
        )}

        {/* Post Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="whitespace-pre-wrap leading-relaxed text-gray-800">{post.content}</div>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="border-t border-gray-200 pt-8 mb-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <Link key={tag.id} href={`/blog/tags/${tag.slug}`}>
                  <span
                    className="px-3 py-2 rounded-full text-white font-medium hover:opacity-80 transition-opacity cursor-pointer"
                    style={{ backgroundColor: tag.color }}
                  >
                    #{tag.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio */}
        <div className="border-t border-gray-200 pt-8 mb-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Author</h3>
          <Link href={`/blog/authors/${post.author.id}`}>
            <div className="flex items-start cursor-pointer hover:bg-gray-50 p-4 rounded-lg transition-colors">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200 mr-4 flex-shrink-0">
                {post.author.avatar ? (
                  <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xl font-bold text-gray-500 bg-green-100">
                    {post.author.name.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">{post.author.name}</h4>
                <p className="text-gray-600 mb-3">{post.author.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {post.author.specialties.slice(0, 3).map((specialty) => {
                    const specCategoryInfo = blogCategoriesInfo.find((info) => info.category === specialty);
                    return (
                      <span
                        key={specialty}
                        className="px-2 py-1 text-xs rounded-full"
                        style={{
                          backgroundColor: specCategoryInfo?.color ? `${specCategoryInfo.color}20` : "#10B98120",
                          color: specCategoryInfo?.color || "#10B981",
                        }}
                      >
                        {specCategoryInfo?.name || specialty}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Posts</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/posts/${relatedPost.slug}`}>
                  <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer">
                    {/* Featured Image */}
                    {relatedPost.featuredImage && (
                      <div className="relative h-40 bg-gray-200">
                        <Image src={relatedPost.featuredImage} alt={relatedPost.title} fill className="object-cover" />
                      </div>
                    )}

                    <div className="p-4">
                      {/* Category Badge */}
                      <div className="mb-2">
                        {(() => {
                          const relatedCategoryInfo = blogCategoriesInfo.find(
                            (info) => info.category === relatedPost.category
                          );
                          return (
                            <span
                              className="px-2 py-1 text-xs rounded-full"
                              style={{
                                backgroundColor: relatedCategoryInfo?.color
                                  ? `${relatedCategoryInfo.color}20`
                                  : "#10B98120",
                                color: relatedCategoryInfo?.color || "#10B981",
                              }}
                            >
                              {relatedCategoryInfo?.icon} {relatedCategoryInfo?.name || relatedPost.category}
                            </span>
                          );
                        })()}
                      </div>

                      {/* Title */}
                      <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{relatedPost.title}</h4>

                      {/* Excerpt */}
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{relatedPost.excerpt}</p>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{relatedPost.author.name}</span>
                        <span>{relatedPost.readingTime} min read</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </MainLayout>
  );
}
