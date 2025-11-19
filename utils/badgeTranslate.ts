export const badgeTranslate = (badge: string) => {
  const translations = {
    // Popular & Sales
    POPULAR: "Popular",
    DISCOUNTED: "Descontado",
    BEST_SELLER: "Más Vendido",
    TOP_RATED: "Mejor Calificado",
    COMMUNITY_FAVORITE: "Favorito de la Comunidad",
    LIMITED_TIME_OFFER: "Oferta por Tiempo Limitado",
    FLASH_SALE: "Venta Flash",
    BEST_VALUE: "Mejor Valor",
    LIMITED_STOCK: "Stock Limitado",
    SEASONAL: "Estacional",

    // Sustainability & Ethics
    WOMAN_OWNED: "Liderado por Mujer",
    HANDMADE: "Hecho a Mano",
    SUSTAINABLE: "Sustentable",
    SUPPORTS_CAUSE: "Apoya una Causa",
    FAMILY_BUSINESS: "Negocio Familiar",
    CHARITY_SUPPORT: "Apoya Caridad",
    CRUELTY_FREE: "Libre de Crueldad",

    // Shipping & Delivery
    FREE_SHIPPING: "Envío Gratis",
    DELIVERED_TO_HOME: "Entrega a Domicilio",
    IN_HOUSE_PICKUP: "Retiro en Casa",
    IN_MID_POINT_PICKUP: "Retiro en Punto Medio",

    // Second Hand & Condition
    FOR_REPAIR: "Para Reparar",
    REFURBISHED: "Reacondicionado",
    EXCHANGEABLE: "Intercambiable",
    LAST_PRICE: "Último Precio",
    FOR_GIFT: "Para Regalo",
    OPEN_TO_OFFERS: "Acepta Ofertas",
    OPEN_BOX: "Caja Abierta",
  };
  return translations[badge as keyof typeof translations] || badge;
};
