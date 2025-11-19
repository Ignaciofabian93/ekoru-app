import { ENVIRONMENT } from "@/config/environment";

/**
 * Get the full URL for an image path
 * Handles both relative and absolute URLs
 */
export const getImageUrl = (imagePath: string | undefined | null): string => {
  if (!imagePath) return "/placeholder.svg";

  // If it's already a full URL, return as is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // For relative paths, prepend the API base URL
  const baseUrl =
    ENVIRONMENT === "production"
      ? "https://gateway.ekoru.cl"
      : ENVIRONMENT === "qa"
      ? "https://qa.gateway.ekoru.cl"
      : "http://localhost:9000";

  return `${baseUrl}${imagePath}`;
};

/**
 * Get multiple image URLs from an array of paths
 */
export const getImageUrls = (imagePaths: string[] | undefined | null): string[] => {
  if (!imagePaths || imagePaths.length === 0) {
    return ["/placeholder.svg"];
  }

  return imagePaths.map(getImageUrl);
};
