import { Product } from "@/types/product";
import { create } from "zustand";

type ProductStore = {
  product: Product | null;
  isOpen: boolean;
  openModal: (mode: "create" | "edit", productId?: number) => void;
  onClose: () => void;
  mode: "create" | "edit";
  selectedProductId?: number;
};

export const useProductStore = create<ProductStore>((set) => ({
  product: null,
  isOpen: false,
  openModal: (mode, productId) =>
    set({ isOpen: true, mode, selectedProductId: productId }),
  mode: "create",
  onClose: () => set({ isOpen: false }),
  selectedProductId: undefined,
}));
