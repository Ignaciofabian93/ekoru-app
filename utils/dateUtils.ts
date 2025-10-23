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
    return `${numericValue.slice(0, 2)}-${numericValue.slice(2, 4)}-${numericValue.slice(4, 8)}`;
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
 * Converts DD-MM-YYYY to a proper Date object for backend storage
 * Creates the date at noon local time to avoid timezone issues
 */
export const convertToDateObject = (displayDate: string): Date | null => {
  if (!displayDate || displayDate.length !== 10) return null;

  const [day, month, year] = displayDate.split("-");
  if (!day || !month || !year) return null;

  // Create date at noon local time to avoid timezone issues with birthdays
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), 12, 0, 0, 0);

  return date;
};

/**
 * Converts YYYY-MM-DD or DateTime string to DD-MM-YYYY for display
 */
export const convertToDisplayFormat = (storageDate: string): string => {
  if (!storageDate) return "";

  let dateToProcess = storageDate;

  // If it's a DateTime string (contains 'T'), extract just the date part
  if (storageDate.includes("T")) {
    dateToProcess = storageDate.split("T")[0];
  }

  const [year, month, day] = dateToProcess.split("-");
  if (!year || !month || !day) return "";

  return `${day}-${month}-${year}`;
};

/**
 * Validates if the date is valid and not in the future
 */
export const validateBirthday = (displayDate: string): { isValid: boolean; error?: string } => {
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
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
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

/**
 * Extracts date part from DateTime string or Date object
 * Returns YYYY-MM-DD format
 */
export const extractDatePart = (dateInput: string | Date): string => {
  if (!dateInput) return "";

  if (typeof dateInput === "string") {
    // If it's a DateTime string (contains 'T'), extract just the date part
    if (dateInput.includes("T")) {
      return dateInput.split("T")[0];
    }
    return dateInput;
  }

  // If it's a Date object, format it as YYYY-MM-DD
  const year = dateInput.getFullYear();
  const month = String(dateInput.getMonth() + 1).padStart(2, "0");
  const day = String(dateInput.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * Validates business start date for Chilean businesses (Fecha Inicio de Actividades)
 * Must be between 1990 (when current tax system was established) and today
 */
export const validateBusinessStartDate = (displayDate: string): { isValid: boolean; error?: string } => {
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
  // Chilean businesses: modern tax system started in 1990
  if (year < 1990 || year > currentYear) {
    return {
      isValid: false,
      error: `Año debe estar entre 1990 y ${currentYear}`,
    };
  }

  // Create date object and validate
  const date = new Date(year, month - 1, day);

  // Check if date is valid (handles leap years, etc.)
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return { isValid: false, error: "Fecha no es válida" };
  }

  // Check if date is not in the future
  if (date > new Date()) {
    return { isValid: false, error: "La fecha no puede ser futura" };
  }

  return { isValid: true };
};
