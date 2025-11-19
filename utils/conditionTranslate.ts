export const productConditionTranslate = (condition: string) => {
  const conditions = {
    NEW: "Nuevo",
    LIKE_NEW: "Como Nuevo",
    OPEN_BOX: "Caja Abierta",
    FAIR: "Aceptable",
    POOR: "Deteriorado",
    FOR_PARTS: "Para Repuestos",
    REFURBISHED: "Reacondicionado",
  };

  return conditions[condition as keyof typeof conditions] || condition;
};
