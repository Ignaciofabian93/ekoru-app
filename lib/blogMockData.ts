import { BlogAuthor, BlogPost, BlogTag, BlogCategoryInfo } from "@/types/blog";
import { BlogCategory } from "@/types/enums";

// Blog Category Information
export const blogCategoriesInfo: BlogCategoryInfo[] = [
  {
    category: BlogCategory.RECYCLING,
    name: "Recycling",
    description: "Learn about proper recycling techniques and best practices",
    color: "#10B981",
    icon: "♻️",
    postsCount: 15,
  },
  {
    category: BlogCategory.POLLUTION,
    name: "Pollution",
    description: "Understanding environmental pollution and its impacts",
    color: "#EF4444",
    icon: "🏭",
    postsCount: 8,
  },
  {
    category: BlogCategory.SUSTAINABILITY,
    name: "Sustainability",
    description: "Sustainable practices for a better future",
    color: "#059669",
    icon: "🌱",
    postsCount: 22,
  },
  {
    category: BlogCategory.CIRCULAR_ECONOMY,
    name: "Circular Economy",
    description: "Creating circular economic systems that reduce waste",
    color: "#7C3AED",
    icon: "🔄",
    postsCount: 12,
  },
  {
    category: BlogCategory.USED_PRODUCTS,
    name: "Used Products",
    description: "Finding value in pre-owned and second-hand items",
    color: "#F59E0B",
    icon: "📦",
    postsCount: 18,
  },
  {
    category: BlogCategory.REUSE,
    name: "Reuse",
    description: "Creative ways to give items a second life",
    color: "#8B5CF6",
    icon: "🔄",
    postsCount: 14,
  },
  {
    category: BlogCategory.ENVIRONMENT,
    name: "Environment",
    description: "Environmental conservation and protection",
    color: "#06B6D4",
    icon: "🌍",
    postsCount: 25,
  },
  {
    category: BlogCategory.UPCYCLING,
    name: "Upcycling",
    description: "Transform waste materials into new products of higher value",
    color: "#EC4899",
    icon: "✨",
    postsCount: 16,
  },
  {
    category: BlogCategory.RESPONSIBLE_CONSUMPTION,
    name: "Responsible Consumption",
    description: "Making conscious choices as consumers",
    color: "#F97316",
    icon: "🛒",
    postsCount: 20,
  },
  {
    category: BlogCategory.ECO_TIPS,
    name: "Eco Tips",
    description: "Practical tips for living more sustainably",
    color: "#84CC16",
    icon: "💡",
    postsCount: 30,
  },
  {
    category: BlogCategory.ENVIRONMENTAL_IMPACT,
    name: "Environmental Impact",
    description: "Understanding how our actions affect the environment",
    color: "#DC2626",
    icon: "📊",
    postsCount: 11,
  },
  {
    category: BlogCategory.SUSTAINABLE_LIVING,
    name: "Sustainable Living",
    description: "Lifestyle choices for sustainable living",
    color: "#16A34A",
    icon: "🏠",
    postsCount: 28,
  },
  {
    category: BlogCategory.OTHER,
    name: "Other",
    description: "Other environmental topics and discussions",
    color: "#6B7280",
    icon: "📝",
    postsCount: 5,
  },
];

// Mock Authors
export const mockAuthors: BlogAuthor[] = [
  {
    id: "1",
    name: "Elena Rodriguez",
    bio: "Environmental scientist and sustainability advocate with over 10 years of experience in waste management and circular economy.",
    avatar: "/images/authors/elena.jpg",
    email: "elena@ekoru.com",
    socialLinks: {
      twitter: "@elena_eco",
      linkedin: "elena-rodriguez-env",
      website: "https://elenarodriguez.eco",
    },
    specialties: [BlogCategory.SUSTAINABILITY, BlogCategory.CIRCULAR_ECONOMY, BlogCategory.ENVIRONMENT],
    postsCount: 25,
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-09-20"),
  },
  {
    id: "2",
    name: "Marcus Chen",
    bio: "Upcycling expert and DIY enthusiast who transforms everyday waste into beautiful, functional items.",
    avatar: "/images/authors/marcus.jpg",
    email: "marcus@ekoru.com",
    socialLinks: {
      twitter: "@marcus_upcycle",
      website: "https://marcusupcycles.com",
    },
    specialties: [BlogCategory.UPCYCLING, BlogCategory.REUSE, BlogCategory.ECO_TIPS],
    postsCount: 18,
    createdAt: new Date("2023-03-10"),
    updatedAt: new Date("2024-09-15"),
  },
  {
    id: "3",
    name: "Sarah Johnson",
    bio: 'Zero-waste lifestyle blogger and author of "Living Without Waste". Passionate about sustainable living and conscious consumption.',
    avatar: "/images/authors/sarah.jpg",
    email: "sarah@ekoru.com",
    socialLinks: {
      twitter: "@sarah_zerowaste",
      linkedin: "sarah-johnson-zerowaste",
      website: "https://zerowastesarah.com",
    },
    specialties: [BlogCategory.SUSTAINABLE_LIVING, BlogCategory.RESPONSIBLE_CONSUMPTION, BlogCategory.ECO_TIPS],
    postsCount: 32,
    createdAt: new Date("2022-11-20"),
    updatedAt: new Date("2024-09-25"),
  },
  {
    id: "4",
    name: "David Kim",
    bio: "Environmental policy researcher focusing on pollution control and environmental impact assessment.",
    avatar: "/images/authors/david.jpg",
    email: "david@ekoru.com",
    socialLinks: {
      linkedin: "david-kim-environmental",
      website: "https://davidkim-env.org",
    },
    specialties: [BlogCategory.POLLUTION, BlogCategory.ENVIRONMENTAL_IMPACT, BlogCategory.ENVIRONMENT],
    postsCount: 14,
    createdAt: new Date("2023-05-08"),
    updatedAt: new Date("2024-09-10"),
  },
  {
    id: "5",
    name: "Emma Thompson",
    bio: "Recycling coordinator and educator with expertise in waste sorting, recycling processes, and community engagement.",
    avatar: "/images/authors/emma.jpg",
    email: "emma@ekoru.com",
    socialLinks: {
      twitter: "@emma_recycles",
      linkedin: "emma-thompson-recycling",
    },
    specialties: [BlogCategory.RECYCLING, BlogCategory.USED_PRODUCTS, BlogCategory.ECO_TIPS],
    postsCount: 21,
    createdAt: new Date("2023-02-14"),
    updatedAt: new Date("2024-09-18"),
  },
];

// Mock Tags
export const mockTags: BlogTag[] = [
  {
    id: "1",
    name: "Zero Waste",
    slug: "zero-waste",
    description: "Living without creating waste",
    color: "#10B981",
    postsCount: 15,
    createdAt: new Date("2023-01-01"),
  },
  {
    id: "2",
    name: "DIY",
    slug: "diy",
    description: "Do It Yourself projects",
    color: "#F59E0B",
    postsCount: 22,
    createdAt: new Date("2023-01-01"),
  },
  {
    id: "3",
    name: "Climate Change",
    slug: "climate-change",
    description: "Global warming and climate issues",
    color: "#EF4444",
    postsCount: 18,
    createdAt: new Date("2023-01-01"),
  },
  {
    id: "4",
    name: "Green Energy",
    slug: "green-energy",
    description: "Renewable energy sources",
    color: "#84CC16",
    postsCount: 12,
    createdAt: new Date("2023-01-01"),
  },
  {
    id: "5",
    name: "Plastic Free",
    slug: "plastic-free",
    description: "Reducing plastic consumption",
    color: "#06B6D4",
    postsCount: 25,
    createdAt: new Date("2023-01-01"),
  },
  {
    id: "6",
    name: "Composting",
    slug: "composting",
    description: "Organic waste recycling",
    color: "#16A34A",
    postsCount: 14,
    createdAt: new Date("2023-01-01"),
  },
  {
    id: "7",
    name: "Sustainable Fashion",
    slug: "sustainable-fashion",
    description: "Eco-friendly clothing choices",
    color: "#EC4899",
    postsCount: 19,
    createdAt: new Date("2023-01-01"),
  },
  {
    id: "8",
    name: "Eco Products",
    slug: "eco-products",
    description: "Environmentally friendly products",
    color: "#8B5CF6",
    postsCount: 16,
    createdAt: new Date("2023-01-01"),
  },
  {
    id: "9",
    name: "Water Conservation",
    slug: "water-conservation",
    description: "Saving and protecting water resources",
    color: "#0EA5E9",
    postsCount: 11,
    createdAt: new Date("2023-01-01"),
  },
  {
    id: "10",
    name: "Urban Gardening",
    slug: "urban-gardening",
    description: "Growing plants in urban environments",
    color: "#65A30D",
    postsCount: 13,
    createdAt: new Date("2023-01-01"),
  },
];

// Mock Blog Posts
export const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Ultimate Guide to Zero Waste Living",
    slug: "ultimate-guide-zero-waste-living",
    excerpt:
      "Discover how to reduce your environmental footprint by adopting zero waste principles in your daily life.",
    content: "Content for zero waste living guide...",
    featuredImage: "/images/blog/zero-waste-guide.jpg",
    author: mockAuthors[2],
    category: BlogCategory.SUSTAINABLE_LIVING,
    tags: [mockTags[0], mockTags[4], mockTags[7]],
    status: "PUBLISHED",
    readingTime: 8,
    views: 1250,
    likes: 89,
    publishedAt: new Date("2024-09-15"),
    createdAt: new Date("2024-09-10"),
    updatedAt: new Date("2024-09-15"),
    seo: {
      metaTitle: "Complete Zero Waste Living Guide - Ekoru Blog",
      metaDescription:
        "Learn how to live a zero waste lifestyle with practical tips and strategies for reducing your environmental impact.",
      keywords: ["zero waste", "sustainable living", "environmental impact", "eco-friendly"],
    },
  },
  {
    id: "2",
    title: "10 Creative Upcycling Projects for Beginners",
    slug: "10-creative-upcycling-projects-beginners",
    excerpt:
      "Transform everyday waste into beautiful, functional items with these easy upcycling projects that anyone can do.",
    content: "Content for upcycling projects guide...",
    featuredImage: "/images/blog/upcycling-projects.jpg",
    author: mockAuthors[1],
    category: BlogCategory.UPCYCLING,
    tags: [mockTags[1]],
    status: "PUBLISHED",
    readingTime: 6,
    views: 890,
    likes: 67,
    publishedAt: new Date("2024-09-20"),
    createdAt: new Date("2024-09-18"),
    updatedAt: new Date("2024-09-20"),
    seo: {
      metaTitle: "10 Easy Upcycling Projects for Beginners - Ekoru Blog",
      metaDescription:
        "Discover creative upcycling projects that transform waste into beautiful, functional items. Perfect for beginners!",
      keywords: ["upcycling", "DIY", "creative projects", "waste reduction"],
    },
  },
  {
    id: "3",
    title: "Understanding Plastic Pollution and How to Combat It",
    slug: "understanding-plastic-pollution-combat",
    excerpt:
      "Explore the global plastic pollution crisis and discover actionable ways to reduce plastic waste in your daily life.",
    content: "Content for plastic pollution guide...",
    featuredImage: "/images/blog/plastic-pollution.jpg",
    author: mockAuthors[3],
    category: BlogCategory.POLLUTION,
    tags: [mockTags[4], mockTags[2]],
    status: "PUBLISHED",
    readingTime: 7,
    views: 1450,
    likes: 103,
    publishedAt: new Date("2024-09-18"),
    createdAt: new Date("2024-09-15"),
    updatedAt: new Date("2024-09-18"),
    seo: {
      metaTitle: "Understanding Plastic Pollution - Causes, Effects & Solutions",
      metaDescription:
        "Learn about the plastic pollution crisis and discover practical ways to reduce plastic waste in your daily life.",
      keywords: ["plastic pollution", "environmental impact", "plastic waste", "marine pollution"],
    },
  },
  {
    id: "4",
    title: "The Complete Guide to Home Composting",
    slug: "complete-guide-home-composting",
    excerpt:
      "Learn everything you need to know about composting at home, from getting started to troubleshooting common problems.",
    content: "Content for home composting guide...",
    featuredImage: "/images/blog/home-composting.jpg",
    author: mockAuthors[4],
    category: BlogCategory.RECYCLING,
    tags: [mockTags[5], mockTags[9]],
    status: "PUBLISHED",
    readingTime: 9,
    views: 720,
    likes: 54,
    publishedAt: new Date("2024-09-12"),
    createdAt: new Date("2024-09-08"),
    updatedAt: new Date("2024-09-12"),
    seo: {
      metaTitle: "Complete Home Composting Guide - Start Composting Today",
      metaDescription:
        "Learn how to start composting at home with this comprehensive guide. Reduce waste and create nutrient-rich soil for your garden.",
      keywords: ["composting", "home composting", "organic waste", "recycling", "gardening"],
    },
  },
  {
    id: "5",
    title: "Sustainable Fashion: Building an Eco-Friendly Wardrobe",
    slug: "sustainable-fashion-eco-friendly-wardrobe",
    excerpt: "Discover how to create a sustainable wardrobe that is both stylish and environmentally responsible.",
    content: "Content for sustainable fashion guide...",
    featuredImage: "/images/blog/sustainable-fashion.jpg",
    author: mockAuthors[2],
    category: BlogCategory.RESPONSIBLE_CONSUMPTION,
    tags: [mockTags[6], mockTags[7]],
    status: "PUBLISHED",
    readingTime: 11,
    views: 980,
    likes: 76,
    publishedAt: new Date("2024-09-10"),
    createdAt: new Date("2024-09-05"),
    updatedAt: new Date("2024-09-10"),
    seo: {
      metaTitle: "Sustainable Fashion Guide - Build an Eco-Friendly Wardrobe",
      metaDescription:
        "Learn how to create a sustainable wardrobe with eco-friendly fashion choices. Discover ethical brands and sustainable shopping tips.",
      keywords: ["sustainable fashion", "eco-friendly wardrobe", "ethical fashion", "slow fashion"],
    },
  },
];

// Helper function to get category info by category
export const getCategoryInfo = (category: BlogCategory): BlogCategoryInfo => {
  return (
    blogCategoriesInfo.find((info) => info.category === category) || blogCategoriesInfo[blogCategoriesInfo.length - 1]
  );
};

// Helper function to get posts by category
export const getPostsByCategory = (category: BlogCategory): BlogPost[] => {
  return mockPosts.filter((post) => post.category === category);
};

// Helper function to get posts by tag
export const getPostsByTag = (tagSlug: string): BlogPost[] => {
  return mockPosts.filter((post) => post.tags.some((tag) => tag.slug === tagSlug));
};

// Helper function to get posts by author
export const getPostsByAuthor = (authorId: string): BlogPost[] => {
  return mockPosts.filter((post) => post.author.id === authorId);
};

// Helper function to get related posts
export const getRelatedPosts = (currentPost: BlogPost, limit: number = 3): BlogPost[] => {
  return mockPosts
    .filter(
      (post) =>
        post.id !== currentPost.id &&
        (post.category === currentPost.category ||
          post.tags.some((tag) => currentPost.tags.some((currentTag) => currentTag.id === tag.id)))
    )
    .slice(0, limit);
};
