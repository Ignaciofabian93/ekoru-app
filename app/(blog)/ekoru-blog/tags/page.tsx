"use client";
import MainLayout from "@/ui/layout/mainLayout";
import BlogNavigation from "@/app/(blog)/_ui/blogNavigation";

export default function TagsPage() {
  return (
    <MainLayout>
      {/* Navigation */}
      <BlogNavigation />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Tags</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover content by topics and themes. Tags help you find specific articles about environmental issues,
            sustainability practices, and eco-friendly lifestyle tips.
          </p>
        </div>

        {/* Popular Tags Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Tags</h2>
          <div className="flex flex-wrap gap-3"></div>
        </div>

        {/* All Tags Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Tags</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
        </div>

        {/* Tag Cloud */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Tag Cloud</h2>
          <div className="flex flex-wrap justify-center gap-2"></div>
        </div>
      </div>
    </MainLayout>
  );
}
