import { type Badge, type ProductSize, type WeightUnit, type ProductCondition } from "./enums";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  hasOffer: boolean;
  offerPrice?: number;
  sellerId: string;
  badges: Badge[];
  brand: string;
  color?: string;
  createdAt: string;
  images: string[];
  interests: string[];
  isActive: boolean;
  isExchangeable: boolean;
  productCategoryId: number;
  updatedAt: string;
  condition: ProductCondition;
  conditionDescription?: string;
  deletedAt?: string; // Soft delete - null means active
};

export type StoreProduct = {
  id: number;
  name: string;
  description: string;
  stock: number;
  barcode?: string;
  sku?: string;
  price: number;
  hasOffer: boolean;
  offerPrice?: number;
  sellerId: string;
  createdAt: string;
  images: string[];
  isActive: boolean;
  updatedAt: string;
  badges: Badge[];
  brand?: string;
  color?: string;
  ratingCount: number;
  averageRating: number;
  reviewsNumber: number;
  storeSubCategoryId: number;
  deletedAt?: string;
};

export type ProductVariant = {
  id: number;
  storeProductId: number;
  variantName: string;
  sku?: string;
  price: number;
  stock: number;
  attributes?: Record<string, unknown>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type StoreProductMaterial = {
  id: number;
  storeProductId: number;
  materialTypeId: number;
  quantity: number;
  unit: string;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ProductCategoryMaterial = {
  id: number;
  productCategoryId: number;
  materialTypeId: number;
  quantity: number;
  unit: string;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ProductLike = {
  id: number;
  productId: number;
  sellerId: string; // Changed from userId to sellerId
};

export type ProductComment = {
  id: number;
  comment: string;
  productId: number;
  sellerId: string; // Changed from userId to sellerId
};

export type MaterialImpactEstimate = {
  id: number;
  materialType: string;
  estimatedCo2SavingsKG: number;
  estimatedWaterSavingsLT: number;
};

export type ProductCategory = {
  id: number;
  departmentCategoryId: number;
  keywords: string[];
  productCategoryName: string;
  size?: ProductSize;
  averageWeight?: number;
  weightUnit?: WeightUnit;
  products?: Product[];
  materials?: ProductCategoryMaterial[];
};

export type DepartmentCategory = {
  id: number;
  departmentCategoryName: string;
  departmentId: number;
  productCategories: ProductCategory[];
};

export type Department = {
  id: number;
  departmentName: string;
  departmentCategories: DepartmentCategory[];
};
