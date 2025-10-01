"use client";

import { useParams } from "next/navigation";
import MainLayout from "@/ui/layout/mainLayout";
import { mockAuthors, getPostsByAuthor, blogCategoriesInfo } from "@/lib/blogMockData";
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

export default function AuthorDetailPage() {
  const params = useParams();
  const authorId = params.id as string;

  const author = mockAuthors.find((a) => a.id === authorId);
  const authorPosts = author ? getPostsByAuthor(author.id) : [];

  if (!author) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Author Not Found</h1>
          <p className="text-gray-600 mb-8">The author you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/blog/authors"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            View All Authors
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
              <Link href="/blog/authors" className="hover:text-gray-700">
                Authors
              </Link>
            </li>
            <li>•</li>
            <li className="text-gray-900">{author.name}</li>
          </ol>
        </nav>

        {/* Author Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Author Avatar */}
            <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
              {author.avatar ? (
                <Image src={author.avatar} alt={author.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-500 bg-green-100">
                  {author.name.charAt(0)}
                </div>
              )}
            </div>

            {/* Author Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{author.name}</h1>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">{author.bio}</p>

              {/* Specialties */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">SPECIALIZES IN</h3>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {author.specialties.map((specialty) => {
                    const categoryInfo = blogCategoriesInfo.find((info) => info.category === specialty);
                    return (
                      <Link
                        key={specialty}
                        href={`/blog/categories/${specialty.toLowerCase()}`}
                        className="px-3 py-2 text-sm rounded-full transition-colors hover:opacity-80"
                        style={{
                          backgroundColor: categoryInfo?.color ? `${categoryInfo.color}20` : "#10B98120",
                          color: categoryInfo?.color || "#10B981",
                        }}
                      >
                        {categoryInfo?.icon} {categoryInfo?.name || specialty}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-center md:justify-start space-x-8 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{author.postsCount}</div>
                  <div className="text-sm text-gray-500">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{formatDate(author.createdAt)}</div>
                  <div className="text-sm text-gray-500">Writing since</div>
                </div>
              </div>

              {/* Social Links */}
              {author.socialLinks && Object.keys(author.socialLinks).length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">CONNECT</h3>
                  <div className="flex justify-center md:justify-start space-x-4">
                    {author.socialLinks.twitter && (
                      <a
                        href={`https://twitter.com/${author.socialLinks.twitter.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <span className="text-sm">Twitter</span>
                      </a>
                    )}
                    {author.socialLinks.linkedin && (
                      <a
                        href={`https://linkedin.com/in/${author.socialLinks.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-3 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                      >
                        <span className="text-sm">LinkedIn</span>
                      </a>
                    )}
                    {author.socialLinks.website && (
                      <a
                        href={author.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <span className="text-sm">Website</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Author's Posts */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Posts by {author.name}</h2>

          {authorPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {authorPosts.map((post) => (
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

                      {/* Meta */}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{post.readingTime} min read</span>
                        <span>{post.publishedAt && formatDate(post.publishedAt)}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No posts found for this author.</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
