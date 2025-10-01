"use client";

import MainLayout from "@/ui/layout/mainLayout";
import Link from "next/link";

// Helper function to format dates

export default function CategoryDetailPage() {
  // Find the categor

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
              <Link href="/blog/categories" className="hover:text-gray-700">
                Categories
              </Link>
            </li>
            <li>•</li>
          </ol>
        </nav>

        {/* Category Header */}
        {/* Posts Grid */}

        {/* Related Categories */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Explore Other Categories</h2>
        </div>
      </div>
    </MainLayout>
  );
}
