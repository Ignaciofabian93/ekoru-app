import Link from "next/link";
import { mockPosts, blogCategoriesInfo } from "@/lib/blogMockData";

interface BlogHeroProps {
  variant?: "default" | "minimal";
  showFeaturedPost?: boolean;
  showStats?: boolean;
}

export default function BlogHero({ variant = "default", showFeaturedPost = true, showStats = true }: BlogHeroProps) {
  // Get the latest featured post
  const featuredPost = mockPosts
    .filter((post) => post.status === "PUBLISHED")
    .sort(
      (a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime()
    )[0];

  // Calculate stats
  const totalPosts = mockPosts.filter((post) => post.status === "PUBLISHED").length;
  const totalViews = mockPosts.reduce((sum, post) => sum + post.views, 0);
  const totalCategories = blogCategoriesInfo.length;

  if (variant === "minimal") {
    return (
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Ekoru Blog</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">Sustainable living insights and environmental tips</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-green-600 via-green-700 to-teal-600 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Ekoru Blog</h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto mb-8">
            Discover insights, tips, and stories about sustainability, environmental protection, and eco-friendly living
            from our community of experts.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog/posts"
              className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              Browse All Posts
            </Link>
            <Link
              href="/blog/categories"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition-colors"
            >
              Explore Categories
            </Link>
          </div>
        </div>

        {/* Stats */}
        {showStats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">{totalPosts}</div>
              <div className="text-green-100">Published Posts</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">{totalCategories}</div>
              <div className="text-green-100">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">{(totalViews / 1000).toFixed(1)}k</div>
              <div className="text-green-100">Total Views</div>
            </div>
          </div>
        )}

        {/* Featured Post */}
        {showFeaturedPost && featuredPost && (
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Featured Post</h2>
              <div className="w-20 h-1 bg-white mx-auto rounded"></div>
            </div>

            <div className="max-w-4xl mx-auto">
              <Link href={`/blog/posts/${featuredPost.slug}`}>
                <div className="cursor-pointer hover:opacity-90 transition-opacity">
                  {/* Category */}
                  <div className="text-center mb-4">
                    {(() => {
                      const categoryInfo = blogCategoriesInfo.find((info) => info.category === featuredPost.category);
                      return (
                        <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium">
                          {categoryInfo?.icon} {categoryInfo?.name || featuredPost.category}
                        </span>
                      );
                    })()}
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">{featuredPost.title}</h3>

                  {/* Excerpt */}
                  <p className="text-xl text-green-100 text-center mb-6 max-w-2xl mx-auto">{featuredPost.excerpt}</p>

                  {/* Meta */}
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-green-100">
                    <span>By {featuredPost.author.name}</span>
                    <span className="hidden sm:block">•</span>
                    <span>{featuredPost.readingTime} min read</span>
                    <span className="hidden sm:block">•</span>
                    <span>{featuredPost.views} views</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
