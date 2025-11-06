import React from "react";

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] ${className}`}
      style={{
        animation: "shimmer 2s infinite linear",
      }}
    />
  );
};

export const BlogPostSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6">
        {/* Category badge skeleton */}
        <Skeleton className="h-6 w-20 rounded-full mb-4" />

        {/* Title skeleton */}
        <Skeleton className="h-6 w-full mb-3" />
        <Skeleton className="h-6 w-3/4 mb-4" />

        {/* Content skeleton */}
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />

        {/* Meta info skeleton */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-4 w-20" />
        </div>

        {/* Stats skeleton */}
        <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-gray-100">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
};

export const HeaderSkeleton: React.FC = () => {
  return (
    <div className="mb-12">
      {/* Icon skeleton */}
      <Skeleton className="h-16 w-16 rounded-2xl mb-6" />

      {/* Title skeleton */}
      <Skeleton className="h-10 w-64 mb-4" />

      {/* Description skeleton */}
      <Skeleton className="h-5 w-full max-w-2xl mb-2" />
      <Skeleton className="h-5 w-3/4 max-w-xl" />
    </div>
  );
};
