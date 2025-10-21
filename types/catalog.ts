export type StoreCatalog = {
  id: number;
  category: string;
  subcategories: {
    id: number;
    subcategory: string;
  }[];
};
