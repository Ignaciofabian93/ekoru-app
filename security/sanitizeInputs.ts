// Removes dangerous characters from a name (letters, spaces, hyphens, apostrophes allowed)
export function sanitizeNameInput(input: string): string {
  return input
    .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\-\'\s]/g, "") // allow letters, spaces, hyphens, apostrophes
    .replace(/\s{2,}/g, " ") // collapse multiple spaces
    .trim();
}

// Removes dangerous characters from an email (basic validation, strips quotes, spaces, etc.)
export function sanitizeEmailInput(input: string): string {
  return input
    .replace(/["'\s]/g, "") // remove quotes and spaces
    .replace(/[^a-zA-Z0-9@._+-]/g, "") // allow only valid email chars
    .trim();
}

// Generic text input sanitizer (removes quotes, angle brackets, and other dangerous symbols)
export function sanitizeTextInput(input: string): string {
  return input
    .replace(/["'<>`]/g, "") // remove quotes, angle brackets, backticks
    .replace(/\s{2,}/g, " ") // collapse multiple spaces
    .trim();
}
