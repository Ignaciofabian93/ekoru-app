import { create } from "zustand";
import type { Seller } from "../types/user";

type SessionStore = {
  data: Seller;
  handleSession: (data: Seller) => void;
  edit: boolean;
  toggleEdit: () => void;
};

const defaultSeller: Seller = {
  id: "",
  email: "",
  password: "",
  sellerType: "PERSON", // or your default SellerType
  isActive: false,
  isVerified: false,
  createdAt: "",
  updatedAt: "",
  address: "",
  phone: "",
  preferredContactMethod: "EMAIL", // or your default ContactMethod
  accountType: "FREE", // or your default AccountType
  points: 0,
  userCategoryId: undefined,
};

const useSessionStore = create<SessionStore>((set) => ({
  data: defaultSeller,
  handleSession: (data: Seller) => set(() => ({ data })),
  edit: false,
  toggleEdit: () => set((state) => ({ edit: !state.edit })),
}));

export default useSessionStore;
