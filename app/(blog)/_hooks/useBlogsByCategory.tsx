import { useQuery } from "@apollo/client";
import { GET_BLOGS_BY_CATEGORY } from "@/graphql/blog/queries";
import { BlogType } from "@/types/enums";
import { BlogPost } from "@/types/blog";
import { PageInfo } from "@/types/general";

interface BlogsByCategoryResponse {
  blogsByCategory: {
    nodes: BlogPost[];
    pageInfo: PageInfo;
  };
}

interface UseBlogsByCategoryProps {
  category: BlogType | null;
  page?: number;
  pageSize?: number;
  enabled?: boolean; // Control when to run the query
}

export default function useBlogsByCategory({
  category,
  page = 1,
  pageSize = 12,
  enabled = true,
}: UseBlogsByCategoryProps) {
  const { data, loading, error, refetch } = useQuery<BlogsByCategoryResponse>(GET_BLOGS_BY_CATEGORY, {
    variables: {
      category,
      page,
      pageSize,
    },
    skip: !category || !enabled, // Skip query if no category or disabled
    fetchPolicy: "cache-first",
    errorPolicy: "all", // Return partial data on error
    notifyOnNetworkStatusChange: true, // Update loading state on refetch
  });

  // Computed values from the query data
  const blogPosts = data?.blogsByCategory?.nodes || [];
  const pageInfo = data?.blogsByCategory?.pageInfo || null;
  const hasNextPage = pageInfo?.hasNextPage || false;
  const hasPreviousPage = pageInfo?.hasPreviousPage || false;
  const totalCount = pageInfo?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    // Data
    blogPosts,
    pageInfo,
    totalCount,
    totalPages,
    hasNextPage,
    hasPreviousPage,

    // States
    loading,
    error,

    // Actions
    refetch, // For manual refetching if needed
  };
}
