import { GET_BLOG_BY_ID } from "@/graphql/blog/queries";
import { BlogPost } from "@/types/blog";
import { useQuery } from "@apollo/client";

interface UseBlogPostProps {
  id: string;
}

export default function useBlogPost({ id }: UseBlogPostProps) {
  const { data, loading, error, refetch } = useQuery<{ blog: BlogPost }>(GET_BLOG_BY_ID, {
    variables: { id },
    skip: !id,
    fetchPolicy: "cache-first",
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
  });

  return {
    data: data?.blog || null,
    loading,
    error,
    refetch,
  };
}
