import { blogTypeMapping } from "@/constants/blog/blogtype";
import { BlogType } from "@/types/enums";

/**
 * Maps a category slug to its corresponding BlogType enum value
 * @param slug - The category slug (e.g., "seguridad")
 * @returns The corresponding BlogType or null if not found
 */
export const getBlogTypeFromSlug = (slug: string): BlogType | null => {
  const blogType = blogTypeMapping[slug];
  return blogType ? (blogType as BlogType) : null;
};

/**
 * Gets all available blog category slugs
 * @returns Array of available blog category slugs
 */
export const getAvailableBlogSlugs = (): string[] => {
  return Object.keys(blogTypeMapping);
};

/**
 * Checks if a slug is valid
 * @param slug - The slug to validate
 * @returns boolean indicating if the slug is valid
 */
export const isValidBlogSlug = (slug: string): boolean => {
  return slug in blogTypeMapping;
};

/**
 * Converts a category name to a slug format
 * @param categoryName - The category name (e.g., "Seguridad")
 * @returns The slug format (e.g., "seguridad")
 */
export const categoryNameToSlug = (categoryName: string): string => {
  return categoryName
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[áäà]/g, "a")
    .replace(/[éëè]/g, "e")
    .replace(/[íïì]/g, "i")
    .replace(/[óöò]/g, "o")
    .replace(/[úüù]/g, "u")
    .replace(/ñ/g, "n");
};

/**
 * Converts a slug back to a readable category name
 * @param slug - The slug (e.g., "seguridad")
 * @returns The readable category name (e.g., "Seguridad")
 */
export const slugToCategoryName = (slug: string): string => {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};
