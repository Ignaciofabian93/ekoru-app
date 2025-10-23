/**
 * Business Hours utilities for formatting and validating Chilean business operating hours
 */

export type DaySchedule = {
  open: string; // Format: "HH:MM"
  close: string; // Format: "HH:MM"
  isClosed: boolean;
};

export type BusinessHours = {
  lunes: DaySchedule;
  martes: DaySchedule;
  miercoles: DaySchedule;
  jueves: DaySchedule;
  viernes: DaySchedule;
  sabado: DaySchedule;
  domingo: DaySchedule;
};

export const daysOfWeek = [
  { key: "lunes", label: "Lunes" },
  { key: "martes", label: "Martes" },
  { key: "miercoles", label: "Miércoles" },
  { key: "jueves", label: "Jueves" },
  { key: "viernes", label: "Viernes" },
  { key: "sabado", label: "Sábado" },
  { key: "domingo", label: "Domingo" },
] as const;

export const defaultBusinessHours: BusinessHours = {
  lunes: { open: "09:00", close: "18:00", isClosed: false },
  martes: { open: "09:00", close: "18:00", isClosed: false },
  miercoles: { open: "09:00", close: "18:00", isClosed: false },
  jueves: { open: "09:00", close: "18:00", isClosed: false },
  viernes: { open: "09:00", close: "18:00", isClosed: false },
  sabado: { open: "10:00", close: "14:00", isClosed: false },
  domingo: { open: "", close: "", isClosed: true },
};

/**
 * Formats time input (removes non-numeric characters and adds colon)
 * Supports format: HH:MM (24-hour format)
 */
export const formatTimeInput = (value: string): string => {
  // Remove all non-numeric characters
  const numericValue = value.replace(/\D/g, "");

  if (numericValue.length === 0) return "";
  if (numericValue.length <= 2) return numericValue;

  // Add colon after 2 digits
  const hours = numericValue.slice(0, 2);
  const minutes = numericValue.slice(2, 4);

  return `${hours}:${minutes}`;
};

/**
 * Validates time format (HH:MM) and ensures valid hours/minutes
 */
export const validateTime = (time: string): { isValid: boolean; error?: string } => {
  if (!time || time.trim() === "") {
    return { isValid: false, error: "Hora requerida" };
  }

  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!timeRegex.test(time)) {
    return { isValid: false, error: "Formato debe ser HH:MM" };
  }

  const [hoursStr, minutesStr] = time.split(":");
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  if (hours < 0 || hours > 23) {
    return { isValid: false, error: "Horas deben estar entre 00 y 23" };
  }

  if (minutes < 0 || minutes > 59) {
    return { isValid: false, error: "Minutos deben estar entre 00 y 59" };
  }

  return { isValid: true };
};

/**
 * Validates that closing time is after opening time
 */
export const validateTimeRange = (open: string, close: string): { isValid: boolean; error?: string } => {
  const openValidation = validateTime(open);
  if (!openValidation.isValid) {
    return { isValid: false, error: `Hora apertura: ${openValidation.error}` };
  }

  const closeValidation = validateTime(close);
  if (!closeValidation.isValid) {
    return { isValid: false, error: `Hora cierre: ${closeValidation.error}` };
  }

  const [openHours, openMinutes] = open.split(":").map(Number);
  const [closeHours, closeMinutes] = close.split(":").map(Number);

  const openTotalMinutes = openHours * 60 + openMinutes;
  const closeTotalMinutes = closeHours * 60 + closeMinutes;

  if (closeTotalMinutes <= openTotalMinutes) {
    return {
      isValid: false,
      error: "Hora de cierre debe ser posterior a hora de apertura",
    };
  }

  return { isValid: true };
};

/**
 * Converts BusinessHours object to display string format
 */
export const formatBusinessHoursForDisplay = (hours: BusinessHours | Record<string, unknown>): string => {
  if (!hours) return "";

  const lines: string[] = [];

  daysOfWeek.forEach(({ key, label }) => {
    const daySchedule = hours[key] as DaySchedule;
    if (daySchedule) {
      if (daySchedule.isClosed) {
        lines.push(`${label}: Cerrado`);
      } else {
        lines.push(`${label}: ${daySchedule.open} - ${daySchedule.close}`);
      }
    }
  });

  return lines.join("\n");
};

/**
 * Parses string format back to BusinessHours object
 */
export const parseBusinessHoursFromString = (text: string): BusinessHours | null => {
  if (!text || text.trim() === "") return null;

  const result: Partial<BusinessHours> = {};
  const lines = text.split("\n");

  daysOfWeek.forEach(({ key, label }) => {
    const line = lines.find((l) => l.toLowerCase().startsWith(label.toLowerCase()));

    if (line) {
      const parts = line.split(":");
      if (parts.length >= 2) {
        const timeStr = parts.slice(1).join(":").trim();

        if (timeStr.toLowerCase() === "cerrado") {
          result[key] = { open: "", close: "", isClosed: true };
        } else {
          const timeParts = timeStr.split("-").map((t) => t.trim());
          if (timeParts.length === 2) {
            result[key] = {
              open: timeParts[0],
              close: timeParts[1],
              isClosed: false,
            };
          }
        }
      }
    }
  });

  return result as BusinessHours;
};

/**
 * Validates entire BusinessHours object
 */
export const validateBusinessHours = (
  hours: BusinessHours | Record<string, unknown>
): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  daysOfWeek.forEach(({ key }) => {
    const daySchedule = hours[key] as DaySchedule;

    if (daySchedule && !daySchedule.isClosed) {
      const rangeValidation = validateTimeRange(daySchedule.open, daySchedule.close);
      if (!rangeValidation.isValid) {
        errors[key] = rangeValidation.error || "Horario inválido";
      }
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Normalizes business hours data to ensure all required properties are present
 * This is useful when loading data from the database that might be incomplete
 */
export const normalizeBusinessHours = (
  hours: BusinessHours | Record<string, unknown> | null | undefined
): BusinessHours => {
  if (!hours) return defaultBusinessHours;

  const normalized: BusinessHours = { ...defaultBusinessHours };

  daysOfWeek.forEach(({ key }) => {
    const daySchedule = hours[key] as DaySchedule | undefined;
    if (daySchedule) {
      normalized[key] = {
        open: daySchedule.open || "",
        close: daySchedule.close || "",
        isClosed: daySchedule.isClosed ?? false, // Use nullish coalescing to handle undefined/null
      };
    }
  });

  return normalized;
};
