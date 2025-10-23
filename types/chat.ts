export type Match = {
  id: number;
  senderId: string;
  receiverId: string;
  createdAt: string;
  isMatched: boolean;
};

export type Chat = {
  id: number;
  senderId: string;
  receiverId: string;
  productId?: number;
  isExchange: boolean;
  createdAt: string;
};

export type Message = {
  id: number;
  chatId: number;
  senderId: string;
  content: string;
  createdAt: string;
};

export type CommunityPost = {
  id: number;
  title: string;
  content: string;
  sellerId: string;
  communitySubCategoryId: number;
  images?: string[];
  likeCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
};

export type CommunityComment = {
  id: number;
  content: string;
  communityPostId: number;
  sellerId: string;
  createdAt: string;
};

export type CommunityCategory = {
  id: number;
  category: string;
};

export type CommunitySubCategory = {
  id: number;
  subCategory: string;
  communityCategoryId: number;
};

export type Co2ImpactMessage = {
  id: number;
  min: number;
  max: number;
  message1: string;
  message2: string;
  message3: string;
};

export type WaterImpactMessage = {
  id: number;
  min: number;
  max: number;
  message1: string;
  message2: string;
  message3: string;
};
