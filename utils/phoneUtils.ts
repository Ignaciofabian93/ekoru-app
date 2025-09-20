/**
 * Phone number formatting and validation utilities
 * Currently supports Chilean phone numbers with international format
 */

// Chilean area codes - includes mobile and landline codes
const CHILE_AREA_CODES = {
  // Mobile carriers (most common)
  mobile: ["56-9"], // Standard Chilean mobile

  // International mobile codes that might be used in Chile via WhatsApp/international services
  international: [
    "54-9", // Argentina mobile
    "57-3", // Colombia mobile
    "51-9", // Peru mobile
    "1", // US/Canada (often used for business WhatsApp)
    "34", // Spain
    "49", // Germany
    "33", // France
    "39", // Italy
    "44", // UK
    "55", // Brazil
  ],

  // Chilean landline area codes
  landline: [
    "56-2", // Santiago
    "56-32", // Valparaíso
    "56-33", // Viña del Mar
    "56-34", // Mendoza
    "56-35", // Rancagua
    "56-41", // Puerto Montt
    "56-42", // Osorno
    "56-43", // Temuco
    "56-44", // Valdivia
    "56-45", // Coyhaique
    "56-51", // La Serena
    "56-52", // Calama
    "56-55", // Antofagasta
    "56-57", // Iquique
    "56-58", // Arica
    "56-61", // Punta Arenas
    "56-63", // Valdivia
    "56-64", // Puerto Aysén
    "56-65", // Puerto Natales
    "56-67", // Coyhaique
    "56-71", // Talca
    "56-72", // Curicó
    "56-73", // Linares
    "56-75", // Constitución
  ],
};

/**
 * Formats phone input as user types
 * Automatically adds country code prefix and formats number
 */
export const formatPhoneInput = (value: string): string => {
  // Remove all non-numeric characters
  const numericOnly = value.replace(/\D/g, "");

  // If empty, return +
  if (!numericOnly) return "+";

  // Format based on detected country code
  if (numericOnly.length >= 2) {
    const countryCode = numericOnly.substring(0, 2);

    if (countryCode === "56") {
      // Chilean format: +56-X-XXXXXXXX
      if (numericOnly.length <= 2) {
        // +56
        return `+${numericOnly}`;
      } else if (numericOnly.length <= 3) {
        // +56-X
        return `+${numericOnly.substring(0, 2)}-${numericOnly.substring(2)}`;
      } else {
        // +56-X-XXXXXXXX (limit to 11 total digits: 56 + 1 area + 8 number)
        const maxLength = Math.min(numericOnly.length, 11);
        const limitedNumber = numericOnly.substring(0, maxLength);
        return `+${limitedNumber.substring(0, 2)}-${limitedNumber.substring(
          2,
          3
        )}-${limitedNumber.substring(3)}`;
      }
    } else if (countryCode === "1") {
      // US/Canada format: +1-XXX-XXX-XXXX
      if (numericOnly.length <= 1) {
        return `+${numericOnly}`;
      } else if (numericOnly.length <= 4) {
        return `+${numericOnly.substring(0, 1)}-${numericOnly.substring(1)}`;
      } else if (numericOnly.length <= 7) {
        return `+${numericOnly.substring(0, 1)}-${numericOnly.substring(
          1,
          4
        )}-${numericOnly.substring(4)}`;
      } else {
        const maxLength = Math.min(numericOnly.length, 11);
        const limitedNumber = numericOnly.substring(0, maxLength);
        return `+${limitedNumber.substring(0, 1)}-${limitedNumber.substring(
          1,
          4
        )}-${limitedNumber.substring(4, 7)}-${limitedNumber.substring(7)}`;
      }
    } else {
      // Other international: +XX-XXXXXXXXXX
      if (numericOnly.length <= 2) {
        return `+${numericOnly}`;
      } else {
        const maxLength = Math.min(numericOnly.length, 14); // Reasonable limit
        const limitedNumber = numericOnly.substring(0, maxLength);
        return `+${limitedNumber.substring(0, 2)}-${limitedNumber.substring(
          2
        )}`;
      }
    }
  } else {
    // Just country code digit(s)
    return `+${numericOnly}`;
  }
};

/**
 * Validates phone number format and area code
 */
export const validatePhoneNumber = (
  phone: string
): {
  isValid: boolean;
  error?: string;
  type?: "mobile" | "landline" | "international";
} => {
  if (!phone || phone.length < 4) {
    return { isValid: false, error: "Ingresa un número de teléfono válido" };
  }

  // Must start with +
  if (!phone.startsWith("+")) {
    return { isValid: false, error: "El número debe comenzar con +" };
  }

  // Extract the area code part
  const withoutPlus = phone.substring(1);
  const parts = withoutPlus.split("-");

  if (parts.length < 2) {
    return { isValid: false, error: "Formato inválido. Use +XX-X-XXXXXXX" };
  }

  const countryCode = parts[0];
  const areaCode = parts[1];
  const numberPart = parts.slice(2).join("");

  // Check for Chilean numbers
  if (countryCode === "56") {
    // Check if it's a valid Chilean mobile
    if (areaCode === "9") {
      // Mobile number validation - be more lenient during typing
      if (numberPart.length === 0) {
        return { isValid: true, type: "mobile" }; // Allow empty while typing
      }
      if (numberPart.length < 8) {
        return { isValid: true, type: "mobile" }; // Allow partial numbers while typing
      }
      if (numberPart.length === 8) {
        return { isValid: true, type: "mobile" }; // Perfect mobile number
      }
      if (numberPart.length > 8) {
        return {
          isValid: false,
          error: "Número móvil chileno debe tener exactamente 8 dígitos",
        };
      }
    }

    // Check if it's a valid Chilean landline area code
    const fullAreaCode = `${countryCode}-${areaCode}`;
    if (CHILE_AREA_CODES.landline.includes(fullAreaCode)) {
      if (numberPart.length === 0) {
        return { isValid: true, type: "landline" }; // Allow empty while typing
      }
      if (numberPart.length < 6) {
        return { isValid: true, type: "landline" }; // Allow partial while typing
      }
      if (numberPart.length >= 6 && numberPart.length <= 8) {
        return { isValid: true, type: "landline" }; // Valid landline
      }
      if (numberPart.length > 8) {
        return {
          isValid: false,
          error: "Número fijo chileno debe tener máximo 8 dígitos",
        };
      }
    }

    // If we get here, it's an invalid Chilean area code
    if (areaCode.length <= 2) {
      return {
        isValid: false,
        error: `Código de área chileno inválido: ${areaCode}`,
      };
    }

    return {
      isValid: false,
      error: "Formato de número chileno inválido",
    };
  }

  // Check international numbers
  if (CHILE_AREA_CODES.international.includes(countryCode)) {
    if (countryCode === "1") {
      // US/Canada format - be more lenient during typing
      if (numberPart.length === 0) {
        return { isValid: true, type: "international" }; // Allow empty while typing
      }
      if (numberPart.length < 10) {
        return { isValid: true, type: "international" }; // Allow partial while typing
      }
      if (
        parts.length === 4 &&
        areaCode.length === 3 &&
        parts[2].length === 3 &&
        parts[3].length === 4
      ) {
        return { isValid: true, type: "international" }; // Perfect format
      }
      if (numberPart.length > 10) {
        return {
          isValid: false,
          error: "Número USA/Canadá debe tener formato +1-XXX-XXX-XXXX",
        };
      }
    } else {
      // Other international - basic validation
      if (numberPart.length === 0) {
        return { isValid: true, type: "international" }; // Allow empty while typing
      }
      if (numberPart.length < 6) {
        return { isValid: true, type: "international" }; // Allow partial while typing
      }
      if (numberPart.length > 12) {
        return {
          isValid: false,
          error: "Número internacional debe tener máximo 12 dígitos",
        };
      }
    }
    return { isValid: true, type: "international" };
  }

  return {
    isValid: false,
    error: `Código de país no soportado: +${countryCode}`,
  };
};

/**
 * Gets the phone type description in Spanish
 */
export const getPhoneTypeDescription = (phone: string): string => {
  const validation = validatePhoneNumber(phone);
  if (!validation.isValid) return "";

  switch (validation.type) {
    case "mobile":
      return "Móvil chileno";
    case "landline":
      return "Teléfono fijo chileno";
    case "international":
      return "Número internacional";
    default:
      return "";
  }
};

/**
 * Extracts just the number part for storage (removes formatting)
 */
export const getPhoneForStorage = (displayPhone: string): string => {
  return displayPhone.replace(/[^\d+-]/g, "");
};

/**
 * Gets suggested area codes for autocomplete
 */
export const getSuggestedAreaCodes = (): {
  label: string;
  value: string;
  category: string;
}[] => {
  return [
    // Most common first
    { label: "+56-9 (Móvil Chile)", value: "+56-9-", category: "Móvil" },
    { label: "+56-2 (Santiago)", value: "+56-2-", category: "Fijo Chile" },
    { label: "+1 (USA/Canadá)", value: "+1-", category: "Internacional" },

    // Other Chilean mobile/landline
    ...CHILE_AREA_CODES.landline
      .filter((code) => code !== "56-2")
      .map((code) => ({
        label: `+${code} (Chile)`,
        value: `+${code}-`,
        category: "Fijo Chile",
      })),

    // International
    ...CHILE_AREA_CODES.international
      .filter((code) => code !== "1")
      .map((code) => ({
        label: `+${code} (Internacional)`,
        value: `+${code}-`,
        category: "Internacional",
      })),
  ];
};

/**
 * Check if a phone number is a WhatsApp-compatible format
 */
export const isWhatsAppCompatible = (phone: string): boolean => {
  const validation = validatePhoneNumber(phone);
  // WhatsApp works with most mobile numbers and some international numbers
  return (
    validation.isValid &&
    (validation.type === "mobile" || validation.type === "international")
  );
};
