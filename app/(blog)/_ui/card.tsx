import { BlogCategories, BlogPost } from "@/types/blog";
import { Title } from "@/ui/text/title";
import { Calendar, ShieldCheck, ThumbsDown, ThumbsUp, UserRound } from "lucide-react";
import { getIconComponent } from "../_utils/blogIcon";
import Link from "next/link";

type CategoryCardProps = {
  post: BlogPost;
  categoryInfo: BlogCategories | null;
  slug?: string;
};

export const CategoryCard = ({ post, categoryInfo, slug }: CategoryCardProps) => {
  const extractExcerpt = (content: string, maxLength: number = 150) => {
    const plainText = content.replace(/<[^>]*>/g, "");
    return plainText.length > maxLength ? plainText.substring(0, maxLength) + "..." : plainText;
  };

  const authorName = post.author?.name + " " + post.author?.lastName || "Ekoru Team";

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es-CL", options);
  };

  const IconComponent = categoryInfo ? getIconComponent(categoryInfo.icon) : ShieldCheck;

  return (
    <article
      key={post.id}
      className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="p-6">
        {/* Category Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-lime-100 to-green-100 text-lime-700 mb-4">
          <IconComponent className="w-3 h-3 mr-1" />
          {categoryInfo?.name}
        </div>

        {/* Title */}
        <Title variant="h3" className="font-bold mb-3 line-clamp-2">
          {post.title}
        </Title>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">{extractExcerpt(post.content)}</p>

        {/* Author & Date */}
        <div className="flex flex-col items-start justify-between space-y-4 mb-4">
          <div className="flex items-center justify-end text-sm text-gray-500">
            <UserRound className="w-4 h-4 text-gray-500 mr-1" />
            <p className="text-sm font-medium text-gray-900">{authorName}</p>
          </div>

          <div className="flex items-center justify-end text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-10">
            <div className="flex items-center text-sm text-gray-500">
              <ThumbsUp className="w-4 h-4 mr-1" />
              {post.likes || 0}
            </div>

            <div className="flex items-center text-sm text-gray-500">
              <ThumbsDown className="w-4 h-4 mr-1" />
              {post.dislikes || 0}
            </div>
          </div>
          <Link
            href={`/blog-ekoru/${slug}/${post.id}`}
            className="text-sm font-medium text-lime-600 hover:text-lime-700 transition-colors"
          >
            Leer más →
          </Link>
        </div>
      </div>
    </article>
  );
};
