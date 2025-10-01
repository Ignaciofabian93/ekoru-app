"use client";

import MainLayout from "@/ui/layout/mainLayout";
import BlogNavigation from "@/app/(blog)/_ui/blogNavigation";
import { mockAuthors, blogCategoriesInfo } from "@/lib/blogMockData";
import { BlogAuthor } from "@/types/blog";
import Link from "next/link";
import Image from "next/image";

export default function AuthorsPage() {
  return (
    <MainLayout>
      {/* Navigation */}
      <BlogNavigation />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Authors</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet our team of environmental experts, sustainability advocates, and eco-conscious writers who share their
            knowledge to help you live more sustainably.
          </p>
        </div>

        {/* Authors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockAuthors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

interface AuthorCardProps {
  author: BlogAuthor;
}

function AuthorCard({ author }: AuthorCardProps) {
  return (
    <Link href={`/blog/authors/${author.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 cursor-pointer">
        {/* Author Avatar */}
        <div className="flex justify-center mb-4">
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200">
            {author.avatar ? (
              <Image src={author.avatar} alt={author.name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-500 bg-green-100">
                {author.name.charAt(0)}
              </div>
            )}
          </div>
        </div>

        {/* Author Info */}
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{author.name}</h3>
          <p className="text-gray-600 text-sm line-clamp-3">{author.bio}</p>
        </div>

        {/* Specialties */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {author.specialties.slice(0, 3).map((specialty) => {
              const categoryInfo = blogCategoriesInfo.find((info) => info.category === specialty);
              return (
                <span
                  key={specialty}
                  className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800"
                  style={{
                    backgroundColor: categoryInfo?.color ? `${categoryInfo.color}20` : "#10B98120",
                    color: categoryInfo?.color || "#10B981",
                  }}
                >
                  {categoryInfo?.name || specialty}
                </span>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="text-center">
          <div className="flex justify-center space-x-4 text-sm text-gray-500">
            <span>{author.postsCount} posts</span>
            {author.socialLinks && Object.keys(author.socialLinks).length > 0 && <span>•</span>}
            {author.socialLinks?.website && <span className="text-green-600">Website</span>}
          </div>
        </div>

        {/* Social Links */}
        {author.socialLinks && Object.keys(author.socialLinks).length > 0 && (
          <div className="flex justify-center space-x-3 mt-4">
            {author.socialLinks.twitter && (
              <div className="w-6 h-6 bg-blue-500 rounded text-white text-xs flex items-center justify-center">T</div>
            )}
            {author.socialLinks.linkedin && (
              <div className="w-6 h-6 bg-blue-700 rounded text-white text-xs flex items-center justify-center">L</div>
            )}
            {author.socialLinks.website && (
              <div className="w-6 h-6 bg-gray-600 rounded text-white text-xs flex items-center justify-center">W</div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
