/**
 * Date formatting and validation utilities for birthday field
 */

/**
 * Formats input as DD-MM-YYYY while user types
 * Automatically adds hyphens and limits input length
 */
export const formatBirthdayInput = (value: string): string => {
  // Remove all non-numeric characters
  const numericValue = value.replace(/\D/g, "");

  // Apply formatting based on length
  if (numericValue.length <= 2) {
    return numericValue;
  } else if (numericValue.length <= 4) {
    return `${numericValue.slice(0, 2)}-${numericValue.slice(2)}`;
  } else {
    return `${numericValue.slice(0, 2)}-${numericValue.slice(
      2,
      4
    )}-${numericValue.slice(4, 8)}`;
  }
};

/**
 * Converts DD-MM-YYYY to YYYY-MM-DD for storage
 */
export const convertToStorageFormat = (displayDate: string): string => {
  if (!displayDate || displayDate.length !== 10) return "";

  const [day, month, year] = displayDate.split("-");
  if (!day || !month || !year) return "";

  return `${year}-${month}-${day}`;
};

/**
 * Converts YYYY-MM-DD to DD-MM-YYYY for display
 */
export const convertToDisplayFormat = (storageDate: string): string => {
  if (!storageDate) return "";

  const [year, month, day] = storageDate.split("-");
  if (!year || !month || !day) return "";

  return `${day}-${month}-${year}`;
};

/**
 * Validates if the date is valid and not in the future
 */
export const validateBirthday = (
  displayDate: string
): { isValid: boolean; error?: string } => {
  if (!displayDate || displayDate.length !== 10) {
    return { isValid: false, error: "Fecha debe tener formato DD-MM-YYYY" };
  }

  const [dayStr, monthStr, yearStr] = displayDate.split("-");
  const day = parseInt(dayStr, 10);
  const month = parseInt(monthStr, 10);
  const year = parseInt(yearStr, 10);

  // Basic range checks
  if (day < 1 || day > 31) {
    return { isValid: false, error: "Día debe estar entre 1 y 31" };
  }

  if (month < 1 || month > 12) {
    return { isValid: false, error: "Mes debe estar entre 1 y 12" };
  }

  const currentYear = new Date().getFullYear();
  if (year < 1900 || year > currentYear) {
    return {
      isValid: false,
      error: `Año debe estar entre 1900 y ${currentYear}`,
    };
  }

  // Create date object and validate
  const date = new Date(year, month - 1, day);

  // Check if date is valid (handles leap years, etc.)
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return { isValid: false, error: "Fecha no es válida" };
  }

  // Check if date is not in the future
  if (date > new Date()) {
    return { isValid: false, error: "La fecha no puede ser futura" };
  }

  return { isValid: true };
};

/**
 * Gets the maximum allowed date (today) in YYYY-MM-DD format
 */
export const getMaxBirthdayDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
