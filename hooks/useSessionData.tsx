import useSessionStore from "@/store/session";
import { BusinessProfile } from "@/types/user";

export default function useSessionData() {
  const { data } = useSessionStore();

  const sellerType = data.sellerType;

  const isPersonProfile = sellerType === "PERSON";
  const isBusinessProfile = sellerType === "STARTUP" || sellerType === "COMPANY";

  const isRetailBusiness = (data.profile as BusinessProfile)?.businessType === "RETAIL";
  const isServicesBusiness = (data.profile as BusinessProfile)?.businessType === "SERVICES";
  const isMixedBusiness = (data.profile as BusinessProfile)?.businessType === "MIXED";

  return {
    sellerType,
    isPersonProfile,
    isBusinessProfile,
    isRetailBusiness,
    isServicesBusiness,
    isMixedBusiness,
  };
}
