import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/types/blog";
import { blogCategoriesInfo } from "@/lib/blogMockData";

interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "compact" | "featured";
  showAuthor?: boolean;
  showCategory?: boolean;
  showTags?: boolean;
  showStats?: boolean;
}

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

export default function BlogCard({
  post,
  variant = "default",
  showAuthor = true,
  showCategory = true,
  showTags = true,
  showStats = true,
}: BlogCardProps) {
  const categoryInfo = blogCategoriesInfo.find((info) => info.category === post.category);

  if (variant === "featured") {
    return (
      <Link href={`/blog/posts/${post.slug}`}>
        <article className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer">
          <div className="md:flex">
            {/* Featured Image */}
            {post.featuredImage && (
              <div className="md:w-1/2 relative h-64 md:h-auto">
                <Image src={post.featuredImage} alt={post.title} fill className="object-cover" />
              </div>
            )}

            <div className="md:w-1/2 p-8">
              {/* Category Badge */}
              {showCategory && (
                <div className="mb-4">
                  <span
                    className="px-3 py-1 text-sm rounded-full"
                    style={{
                      backgroundColor: categoryInfo?.color ? `${categoryInfo.color}20` : "#10B98120",
                      color: categoryInfo?.color || "#10B981",
                    }}
                  >
                    {categoryInfo?.icon} {categoryInfo?.name || post.category}
                  </span>
                </div>
              )}

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h3>

              {/* Excerpt */}
              <p className="text-gray-600 mb-6">{post.excerpt}</p>

              {/* Author and Meta */}
              {showAuthor && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 mr-3">
                      {post.author.avatar ? (
                        <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm font-bold text-gray-500 bg-green-100">
                          {post.author.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{post.author.name}</div>
                      <div className="text-sm text-gray-500">{post.publishedAt && formatDate(post.publishedAt)}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">{post.readingTime} min read</div>
                </div>
              )}
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/blog/posts/${post.slug}`}>
        <article className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer">
          {/* Small Image */}
          {post.featuredImage && (
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
              <Image src={post.featuredImage} alt={post.title} fill className="object-cover" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            {/* Category */}
            {showCategory && (
              <div className="mb-1">
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: categoryInfo?.color ? `${categoryInfo.color}20` : "#10B98120",
                    color: categoryInfo?.color || "#10B981",
                  }}
                >
                  {categoryInfo?.name || post.category}
                </span>
              </div>
            )}

            {/* Title */}
            <h4 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">{post.title}</h4>

            {/* Meta */}
            <div className="flex items-center text-sm text-gray-500 space-x-3">
              {showAuthor && <span>{post.author.name}</span>}
              <span>{post.readingTime} min read</span>
              {showStats && <span>{post.views} views</span>}
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // Default variant
  return (
    <Link href={`/blog/posts/${post.slug}`}>
      <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer">
        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative h-48 bg-gray-200">
            <Image src={post.featuredImage} alt={post.title} fill className="object-cover" />
          </div>
        )}

        <div className="p-6">
          {/* Category Badge */}
          {showCategory && (
            <div className="mb-3">
              <span
                className="px-2 py-1 text-xs rounded-full"
                style={{
                  backgroundColor: categoryInfo?.color ? `${categoryInfo.color}20` : "#10B98120",
                  color: categoryInfo?.color || "#10B981",
                }}
              >
                {categoryInfo?.icon} {categoryInfo?.name || post.category}
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>

          {/* Excerpt */}
          <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

          {/* Author Info */}
          {showAuthor && (
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
          )}

          {/* Tags */}
          {showTags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag.id} className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          {/* Meta */}
          {showStats && (
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{post.readingTime} min read</span>
              <div className="flex items-center space-x-3">
                <span>👁 {post.views}</span>
                <span>❤️ {post.likes}</span>
              </div>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
