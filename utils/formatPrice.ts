export const formatPrice = (price: number, currency: string = "CLP"): string => {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency,
  }).format(price);
};
