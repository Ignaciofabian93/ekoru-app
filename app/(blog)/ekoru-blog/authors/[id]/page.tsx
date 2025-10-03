"use client";
import MainLayout from "@/ui/layout/mainLayout";
import Link from "next/link";

export default function AuthorDetailPage() {
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
