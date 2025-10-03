"use client";
import MainLayout from "@/ui/layout/mainLayout";
import BlogNavigation from "@/app/(blog)/_ui/blogNavigation";

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"></div>
      </div>
    </MainLayout>
  );
}
