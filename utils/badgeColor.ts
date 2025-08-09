export const getBadgeColor = (badge: string) => {
  const colors = {
    Bestseller: "bg-warning text-white",
    Orgánico: "bg-success text-white",
    Descuento: "bg-error text-white",
    "Zero Waste": "bg-info text-white",
    Jardín: "bg-primary text-white",
    Bambú: "bg-secondary text-white",
    "Top Rated": "bg-warning text-white",
    Certificado: "bg-success text-white",
    "Eco Expert": "bg-primary text-white",
    Popular: "bg-info text-white",
    "Segunda Mano": "bg-neutral text-white",
    Usado: "bg-neutral-dark text-white",
    Reacondicionado: "bg-success text-white",
    Intercambio: "bg-secondary text-white",
    Trueque: "bg-primary-light text-white",
  };
  return colors[badge as keyof typeof colors] || "bg-neutral text-white";
};
