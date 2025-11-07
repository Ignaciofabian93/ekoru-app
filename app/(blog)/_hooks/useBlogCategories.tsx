import { useQuery } from "@apollo/client";
import { GET_BLOG_CATEGORIES } from "@/graphql/blog/queries";
import { BlogPost } from "@/types/blog";

export interface BlogCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  href: string;
  posts: BlogPost[];
}

interface BlogCategoriesResponse {
  blogCategories: BlogCategory[];
}

const useBlogCategories = () => {
  const { data, loading, error } = useQuery<BlogCategoriesResponse>(GET_BLOG_CATEGORIES);

  return {
    categories: data?.blogCategories || [],
    loading,
    error,
  };
};

export default useBlogCategories;
