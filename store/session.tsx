import { create } from "zustand";
import type { BusinessProfile, PersonProfile, Seller } from "../types/user";

type SessionStore = {
  data: Seller;
  handleSession: (data: Seller) => void;
  edit: boolean;
  toggleEdit: () => void;
};

export const defaultSeller: Seller = {
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
  points: 0,
  county: { id: 0, county: "", cityId: 0 },
  region: { id: 0, region: "", countryId: 0 },
  country: { id: 0, country: "" },
  city: { id: 0, city: "", regionId: 0 },
  profile: {} as PersonProfile | BusinessProfile,
};

const useSessionStore = create<SessionStore>((set) => ({
  data: defaultSeller,
  handleSession: (data: Seller) => set(() => ({ data })),
  edit: false,
  toggleEdit: () => set((state) => ({ edit: !state.edit })),
}));

export default useSessionStore;
