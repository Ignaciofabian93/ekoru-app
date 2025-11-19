export const sellerTypeTranslate = (sellerType: string) => {
  if (sellerType === "PERSON") return "Persona";
  if (sellerType === "STARTUP") return "Emprendimiento";
  if (sellerType === "COMPANY") return "Empresa";
  return "Persona";
};
