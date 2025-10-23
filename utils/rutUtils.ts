/**
 * RUT (Rol Único Tributario) formatting and validation utilities for Chilean tax IDs
 * Format: XX.XXX.XXX-X or XXX.XXX.XXX-X
 */

/**
 * Formats RUT input as user types
 * Automatically adds dots and hyphen
 * Supports formats: XX.XXX.XXX-X and XXX.XXX.XXX-X
 */
export const formatRutInput = (value: string): string => {
  // Remove all non-alphanumeric characters
  const cleanValue = value.replace(/[^0-9kK]/g, "").toUpperCase();

  if (cleanValue.length === 0) return "";

  // Separate body and verification digit
  const body = cleanValue.slice(0, -1);
  const verifier = cleanValue.slice(-1);

  if (body.length === 0) return cleanValue;

  // Format body with dots (from right to left)
  const reversedBody = body.split("").reverse().join("");
  const formattedBody = reversedBody.match(/.{1,3}/g)?.join(".") || "";
  const finalBody = formattedBody.split("").reverse().join("");

  // Return with hyphen if we have a verifier digit
  if (verifier) {
    return `${finalBody}-${verifier}`;
  }

  return finalBody;
};

/**
 * Calculate the verification digit for a RUT
 * Using Chilean algorithm (Modulo 11)
 */
const calculateVerifier = (rut: string): string => {
  const cleanRut = rut.replace(/[^0-9]/g, "");
  let sum = 0;
  let multiplier = 2;

  // Calculate from right to left
  // Multiply each digit by series 2,3,4,5,6,7,2,3,4,5,6,7...
  for (let i = cleanRut.length - 1; i >= 0; i--) {
    sum += parseInt(cleanRut[i]) * multiplier;
    // Increment multiplier and cycle back to 2 after 7
    multiplier = multiplier < 7 ? multiplier + 1 : 2;
  }

  // Get remainder of division by 11
  const remainder = sum % 11;
  // Subtract remainder from 11 to get verifier
  const verifier = 11 - remainder;

  // Special cases: if 11 -> 0, if 10 -> K
  if (verifier === 11) return "0";
  if (verifier === 10) return "K";
  return verifier.toString();
};

/**
 * Validates Chilean RUT format and verifier digit
 * Accepts formats: XX.XXX.XXX-X or XXX.XXX.XXX-X
 */
export const validateRut = (rut: string): { isValid: boolean; error?: string } => {
  if (!rut || rut.trim() === "") {
    return { isValid: true }; // Empty is valid (field might be optional)
  }

  // Check basic format with regex
  const rutRegex = /^\d{1,3}\.\d{3}\.\d{3}-[0-9kK]$/;
  if (!rutRegex.test(rut)) {
    return {
      isValid: false,
      error: "Formato debe ser XX.XXX.XXX-X o XXX.XXX.XXX-X",
    };
  }

  // Split body and verifier
  const [body, verifier] = rut.split("-");
  const cleanBody = body.replace(/\./g, "");

  // Validate length (Chilean RUT should be 7-9 digits + verifier)
  if (cleanBody.length < 7 || cleanBody.length > 9) {
    return {
      isValid: false,
      error: "RUT debe tener entre 7 y 9 dígitos",
    };
  }

  // Calculate and validate verifier digit
  const calculatedVerifier = calculateVerifier(cleanBody);
  if (calculatedVerifier !== verifier.toUpperCase()) {
    return {
      isValid: false,
      error: "Dígito verificador inválido",
    };
  }

  return { isValid: true };
};

/**
 * Clean RUT for storage (removes formatting)
 * Returns format: XXXXXXXXX (just numbers and K)
 */
export const getRutForStorage = (rut: string): string => {
  if (!rut) return "";
  return rut.replace(/[^0-9kK]/gi, "").toUpperCase();
};

/**
 * Converts storage format to display format
 * From: XXXXXXXXX to XX.XXX.XXX-X
 */
export const convertRutToDisplayFormat = (rut: string): string => {
  if (!rut || rut.length < 2) return rut;

  const cleanRut = rut.replace(/[^0-9kK]/gi, "").toUpperCase();
  const body = cleanRut.slice(0, -1);
  const verifier = cleanRut.slice(-1);

  // Format body with dots (from right to left)
  const reversedBody = body.split("").reverse().join("");
  const formattedBody = reversedBody.match(/.{1,3}/g)?.join(".") || "";
  const finalBody = formattedBody.split("").reverse().join("");

  return `${finalBody}-${verifier}`;
};
