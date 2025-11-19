import { BusinessProfile, PersonProfile, Seller } from "@/types/user";

export const displaySellerName = (seller: Seller) => {
  if (seller.sellerType === "PERSON")
    return (seller.profile as PersonProfile).firstName + " " + (seller.profile as PersonProfile).lastName;
  if (seller.sellerType === "STARTUP" || seller.sellerType === "COMPANY")
    return (seller.profile as BusinessProfile).businessName;
  return "Vendedor";
};
