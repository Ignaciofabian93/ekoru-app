export const getBadgeColor = (badge: string) => {
  const colors = {
    // Popular & Sales
    POPULAR: "bg-warning text-white",
    DISCOUNTED: "bg-error text-white",
    BEST_SELLER: "bg-warning text-white",
    TOP_RATED: "bg-warning text-white",
    COMMUNITY_FAVORITE: "bg-info text-white",
    LIMITED_TIME_OFFER: "bg-error text-white",
    FLASH_SALE: "bg-error text-white",
    BEST_VALUE: "bg-success text-white",
    LIMITED_STOCK: "bg-warning text-white",
    SEASONAL: "bg-info text-white",

    // Sustainability & Ethics
    WOMAN_OWNED: "bg-primary text-white",
    HANDMADE: "bg-secondary text-white",
    SUSTAINABLE: "bg-success text-white",
    SUPPORTS_CAUSE: "bg-primary text-white",
    FAMILY_BUSINESS: "bg-secondary text-white",
    CHARITY_SUPPORT: "bg-primary text-white",
    CRUELTY_FREE: "bg-success text-white",

    // Shipping & Delivery
    FREE_SHIPPING: "bg-success text-white",
    DELIVERED_TO_HOME: "bg-info text-white",
    IN_HOUSE_PICKUP: "bg-secondary text-white",
    IN_MID_POINT_PICKUP: "bg-secondary text-white",

    // Second Hand & Condition
    FOR_REPAIR: "bg-slate-300 text-white",
    REFURBISHED: "bg-success text-white",
    EXCHANGEABLE: "bg-secondary text-white",
    LAST_PRICE: "bg-error text-white",
    FOR_GIFT: "bg-primary text-white",
    OPEN_TO_OFFERS: "bg-info text-white",
    OPEN_BOX: "bg-neutral text-white",
  };
  return colors[badge as keyof typeof colors] || "bg-neutral text-white";
};
