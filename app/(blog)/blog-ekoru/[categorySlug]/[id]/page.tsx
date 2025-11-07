"use client";
import useBlogPost from "@/app/(blog)/_hooks/useBlogPost";
import MainLayout from "@/ui/layout/mainLayout";
import { useParams, useRouter } from "next/navigation";
import { BlogPostSkeleton } from "@/ui/skeleton/skeleton";
import { Title } from "@/ui/text/title";
import { Text } from "@/ui/text/text";
import { ShareModal } from "@/ui/modals/shareModal";
import { ShareData } from "@/utils/shareUtils";
import {
  Calendar,
  User,
  MessageCircle,
  Share2,
  Clock,
  ArrowLeft,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import Link from "next/link";
import RegularButton from "@/ui/buttons/regularButton";
import React from "react";

export default function BlogPost() {
  const params = useParams();
  const router = useRouter();
  const { data, loading, error } = useBlogPost({ id: params.id as string });
  const [isShareModalOpen, setIsShareModalOpen] = React.useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatRelativeDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Hoy";
    if (diffInDays === 1) return "Ayer";
    if (diffInDays < 7) return `Hace ${diffInDays} días`;
    if (diffInDays < 30) return `Hace ${Math.floor(diffInDays / 7)} semanas`;
    if (diffInDays < 365) return `Hace ${Math.floor(diffInDays / 30)} meses`;
    return `Hace ${Math.floor(diffInDays / 365)} años`;
  };

  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const cleanHtmlContent = (htmlContent: string) => {
    return { __html: htmlContent };
  };

  const getAuthorName = () => {
    if (data?.author?.name) return data.author.name + " " + (data.author.lastName || "");

    const profile = data?.author?.seller?.profile;
    if (profile) {
      // Type guard for PersonProfile
      if ("displayName" in profile && profile.displayName) {
        return profile.displayName;
      }
      // Type guard for BusinessProfile
      if ("businessName" in profile && profile.businessName) {
        return profile.businessName;
      }
    }

    return "Ekoru Team";
  };

  const getAuthorBio = () => {
    const profile = data?.author?.seller?.profile;
    if (profile) {
      // Type guard for PersonProfile
      if ("bio" in profile && profile.bio) {
        return profile.bio.length > 50 ? `${profile.bio.substring(0, 50)}...` : profile.bio;
      }
      // Type guard for BusinessProfile
      if ("description" in profile && profile.description) {
        return profile.description.length > 50 ? `${profile.description.substring(0, 50)}...` : profile.description;
      }
    }

    return "Autor";
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-lime-50">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <BlogPostSkeleton />
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !data) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-10 h-10 text-red-500" />
              </div>
              <Title variant="h2" className="text-gray-900 mb-4">
                Artículo no encontrado
              </Title>
              <Text variant="p" className="text-gray-600 mb-8 text-lg">
                {error?.message || "El artículo que buscas no existe o ha sido removido."}
              </Text>
              <Link
                href="/blog-ekoru"
                className="inline-flex items-center px-6 py-3 bg-lime-600 hover:bg-lime-700 text-white rounded-lg font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Blog
              </Link>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  const readingTime = estimateReadingTime(data.content);
  const publishedDate = data.publishedAt || data.createdAt;

  // Share data
  const shareData: ShareData = {
    title: data.title,
    text: `${data.content.replace(/<[^>]*>/g, "").substring(0, 150)}...`,
    url: typeof window !== "undefined" ? window.location.href : "",
  };

  return (
    <MainLayout>
      <article className="min-h-screen">
        {/* Breadcrumb Navigation */}
        <nav className="border-b border-gray-100" aria-label="Breadcrumb">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center space-x-2 text-sm">
              <Link
                href="/blog-ekoru"
                className="text-lime-600 hover:text-lime-800 font-medium transition-colors duration-200 hover:underline"
              >
                Blogs
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link
                href={`/blog-ekoru/${params.categorySlug}`}
                className="text-lime-600 hover:text-lime-800 font-medium transition-colors duration-200 hover:underline"
              >
                {(params.categorySlug as string)?.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Text variant="span" className="font-medium truncate max-w-xs">
                {data.title}
              </Text>
            </div>
          </div>
        </nav>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Article Header */}
          <header className="mb-12">
            {/* Category Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-lime-100 to-green-100 text-lime-700 mb-6">
              <span className="capitalize">{(params.categorySlug as string)?.replace(/-/g, " ")}</span>
            </div>

            {/* Article Title */}
            <Title
              variant="h1"
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6"
            >
              {data.title}
            </Title>

            {/* Article Meta */}
            <div className="flex flex-col items-start gap-4 text-gray-600 mb-8">
              {/* Author */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-lime-500 to-green-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{getAuthorName()}</p>
                  <p className="text-sm text-gray-500">{getAuthorBio()}</p>
                </div>
              </div>

              <div>
                {/* Reading Time */}
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">{readingTime} min de lectura</span>
                </div>

                {/* Published Date */}
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <div>
                    <span className="text-sm font-medium">{formatDate(publishedDate)}</span>
                    <span className="text-xs text-gray-400 ml-2">({formatRelativeDate(publishedDate)})</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Article Body */}
          <div className="prose prose-lg prose-slate max-w-none">
            <div
              className="
                prose-headings:font-bold prose-headings:text-gray-900
                prose-h1:text-3xl prose-h1:md:text-4xl prose-h1:leading-tight prose-h1:mb-6
                prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:leading-tight prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-xl prose-h3:md:text-2xl prose-h3:leading-tight prose-h3:mt-10 prose-h3:mb-4
                prose-h4:text-lg prose-h4:md:text-xl prose-h4:leading-tight prose-h4:mt-8 prose-h4:mb-4
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
                prose-a:text-lime-600 prose-a:no-underline hover:prose-a:text-lime-800 hover:prose-a:underline
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-em:text-gray-800
                prose-blockquote:border-l-4 prose-blockquote:border-lime-500 prose-blockquote:bg-lime-50 prose-blockquote:p-6 prose-blockquote:rounded-r-lg prose-blockquote:my-8
                prose-ul:my-6 prose-li:my-2 prose-li:text-gray-700
                prose-ol:my-6 prose-ol:list-decimal
                prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:p-6 prose-pre:overflow-x-auto prose-pre:my-8
                prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
              "
              dangerouslySetInnerHTML={cleanHtmlContent(data.content)}
            />
          </div>

          {/* Article Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:items-center justify-between space-y-8">
              <div className="flex flex-col md:flex-row items-start space-y-3 md:space-y-0 md:space-x-6">
                <button className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors">
                  <ThumbsUp className="w-5 h-5" />
                  <Text variant="span">Me gusta</Text>
                  <Text variant="span" className="font-medium">
                    {data.likes}
                  </Text>
                </button>

                <button className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors">
                  <ThumbsDown className="w-5 h-5" />
                  <Text variant="span">No me gusta</Text>
                  <Text variant="span" className="font-medium">
                    {data.dislikes}
                  </Text>
                </button>

                <button
                  onClick={() => setIsShareModalOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-lime-50 hover:bg-lime-100 text-lime-600 rounded-lg transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                  <span className="font-medium">Compartir</span>
                </button>
              </div>

              <RegularButton text="Volver" onClick={() => router.back()} />
            </div>
          </footer>
        </div>
      </article>

      {/* Share Modal */}
      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} shareData={shareData} />
    </MainLayout>
  );
}
