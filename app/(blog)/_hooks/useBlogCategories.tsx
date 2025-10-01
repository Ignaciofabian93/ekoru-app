import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_BLOG_CATEGORIES } from "@/graphql/blog/queries";
import { BlogCategories } from "@/types/blog";

export default function useBlogCategories() {
  const [blogCategories, { data: categories, loading: loadingCategories }] = useLazyQuery(GET_BLOG_CATEGORIES, {
    fetchPolicy: "cache-first",
  });

  useEffect(() => {
    blogCategories();
  }, [blogCategories]);

  return { categories: categories?.blogCategories as BlogCategories[], loadingCategories };
}
