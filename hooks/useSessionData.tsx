import { BusinessProfile, PersonProfile } from "@/types/user";
import useSessionStore from "@/store/session";

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

  const personFullName = `${(data.profile as PersonProfile)?.firstName ?? ""} ${
    (data.profile as PersonProfile)?.lastName ?? ""
  }`;
  const personDisplayedName = (data.profile as PersonProfile)?.displayName ?? personFullName;
  const businessName = (data.profile as BusinessProfile)?.businessName ?? "";
  const displayedName = isPersonProfile ? personDisplayedName : businessName;

  const address =
    data.address && data.county?.county ? `${data.address}, ${data.county?.county}` : "Sin dirección registrada";

  const memberSince = data.createdAt.split("T")[0].split("-").toReversed().join("-");

  const description = isPersonProfile
    ? (data.profile as PersonProfile)?.bio || "Sin biografía"
    : (data.profile as BusinessProfile)?.description || "Sin descripción";

  const phone = data.phone || "Sin teléfono registrado";

  const isVerified = data.isVerified;

  const email = data.email;

  return {
    sellerType,
    isPersonProfile,
    isBusinessProfile,
    isRetailBusiness,
    isServicesBusiness,
    isMixedBusiness,
    sellerImage,
    backgroundImage,
    displayedName,
    address,
    memberSince,
    description,
    phone,
    isVerified,
    email,
    data,
  };
}
