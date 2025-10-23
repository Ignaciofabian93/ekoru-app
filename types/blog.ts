import { BlogCategory, BlogType, BlogReactionType } from "./enums";

export interface BlogAuthor {
  id: string;
  name: string;
  bio: string;
  avatar?: string;
  email: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  specialties: BlogCategory[];
  postsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  postsCount: number;
  createdAt: Date;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  authorId: string; // Admin who wrote the post
  author?: {
    id: string;
    name: string;
    email: string;
  };
  blogType: BlogType;
  blogCategoryId?: number;
  tags?: string[];
  isPublished: boolean;
  readingTime?: number;
  views: number;
  likeCount: number;
  dislikeCount: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

export interface BlogReaction {
  id: number;
  blogPostId: number;
  sellerId: string;
  reactionType: BlogReactionType;
  createdAt: string;
  updatedAt: string;
}

export interface BlogCategoryModel {
  id: number;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogCategoryInfo {
  category: BlogCategory;
  name: string;
  description: string;
  color: string;
  icon?: string;
  postsCount: number;
}

export interface BlogStats {
  totalPosts: number;
  totalAuthors: number;
  totalCategories: number;
  totalTags: number;
  totalViews: number;
  mostPopularCategory: BlogCategory;
  recentPosts: BlogPost[];
}

export interface BlogFilters {
  category?: BlogCategory;
  tags?: string[];
  author?: string;
  search?: string;
  sortBy?: "newest" | "oldest" | "popular" | "mostViewed";
  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface BlogListResponse<T> {
  items: T[];
  pagination: PaginationInfo;
  filters?: BlogFilters;
}

export type BlogCategories = {
  id: number;
  name: string;
  icon: string;
  description: string;
};
