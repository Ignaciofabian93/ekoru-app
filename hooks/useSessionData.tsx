import useSessionStore from "@/store/session";
import { BusinessProfile, PersonProfile } from "@/types/user";

export default function useSessionData() {
  const { data } = useSessionStore();

  const sellerType = data.sellerType;

  const isPersonProfile = sellerType === "PERSON";
  const isBusinessProfile = sellerType === "STARTUP" || sellerType === "COMPANY";

  const isRetailBusiness = (data.profile as BusinessProfile)?.businessType === "RETAIL";
  const isServicesBusiness = (data.profile as BusinessProfile)?.businessType === "SERVICES";
  const isMixedBusiness = (data.profile as BusinessProfile)?.businessType === "MIXED";

  const sellerImage = isPersonProfile
    ? (data.profile as PersonProfile)?.profileImage || "/brand/icon.webp"
    : (data.profile as BusinessProfile)?.logo || "/brand/icon.webp";

  const backgroundImage = data.profile?.coverImage || "/brand/logo.webp";

  return {
    sellerType,
    isPersonProfile,
    isBusinessProfile,
    isRetailBusiness,
    isServicesBusiness,
    isMixedBusiness,
    sellerImage,
    backgroundImage,
  };
}
