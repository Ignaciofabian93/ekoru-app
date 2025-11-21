import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BusinessProfile, PersonProfile, Seller } from "../types/user";

type SessionStore = {
  data: Seller;
  handleSession: (data: Seller) => void;
  edit: boolean;
  toggleEdit: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  clearSession: () => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
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

const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      data: defaultSeller,
      handleSession: (data: Seller) => set(() => ({ data })),
      edit: false,
      toggleEdit: () => set((state) => ({ edit: !state.edit })),
      isLoading: false,
      setIsLoading: (loading: boolean) => set(() => ({ isLoading: loading })),
      clearSession: () => set(() => ({ data: defaultSeller })),
      _hasHydrated: false,
      setHasHydrated: (state: boolean) => set({ _hasHydrated: state }),
    }),
    {
      name: "session-storage",
      version: 1,
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export default useSessionStore;
