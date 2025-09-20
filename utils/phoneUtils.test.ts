// Example usage and test of the phone number validation functionality

import {
  formatPhoneInput,
  validatePhoneNumber,
  getPhoneForStorage,
  isWhatsAppCompatible,
  getPhoneTypeDescription,
  getSuggestedAreaCodes,
} from "./phoneUtils";

// Test examples:
console.log("=== Phone Number Validation Tests ===");

// Test 1: Auto-formatting as user types
console.log("\n1. Auto-formatting as user types:");
const typingSequence = [
  "5",
  "56",
  "569",
  "5691",
  "56912",
  "569123",
  "5691234",
  "56912345",
  "569123456",
  "5691234567",
  "56912345678",
];
typingSequence.forEach((input) => {
  console.log(`User types "${input}" -> Shows "${formatPhoneInput(input)}"`);
});

// Test 2: Different country codes
console.log("\n2. Different country codes:");
const internationalInputs = [
  "1",
  "12",
  "123",
  "1234",
  "12345",
  "123456",
  "1234567",
  "12345678",
  "123456789",
  "1234567890",
];
internationalInputs.forEach((input) => {
  console.log(`US number "${input}" -> Shows "${formatPhoneInput(input)}"`);
});

// Test 3: Validation tests
console.log("\n3. Phone number validation:");
const testNumbers = [
  "+56-9-12345678", // Valid Chilean mobile
  "+56-2-1234567", // Valid Chilean landline (Santiago)
  "+56-9-1234567", // Invalid Chilean mobile (too short)
  "+56-9-123456789", // Invalid Chilean mobile (too long)
  "+1-555-123-4567", // Valid US number
  "+1-555-1234", // Invalid US number (incomplete)
  "+34-612345678", // Spanish number
  "+44-7123456789", // UK number
  "+99-123456789", // Unsupported country code
  "56-9-12345678", // Missing + sign
  "+56-8-12345678", // Invalid Chilean area code
];

testNumbers.forEach((phone) => {
  const validation = validatePhoneNumber(phone);
  const typeDesc = getPhoneTypeDescription(phone);
  const whatsappCompatible = isWhatsAppCompatible(phone);

  console.log(`${phone}:`);
  console.log(`  Valid: ${validation.isValid}`);
  console.log(`  Type: ${validation.type || "N/A"}`);
  console.log(`  Description: ${typeDesc || "N/A"}`);
  console.log(`  WhatsApp Compatible: ${whatsappCompatible}`);
  if (!validation.isValid && validation.error) {
    console.log(`  Error: ${validation.error}`);
  }
  console.log("");
});

// Test 4: Storage format
console.log("\n4. Storage format:");
const displayNumbers = ["+56-9-12345678", "+1-555-123-4567"];
displayNumbers.forEach((phone) => {
  console.log(`Display: ${phone} -> Storage: ${getPhoneForStorage(phone)}`);
});

// Test 5: Suggested area codes
console.log("\n5. Suggested area codes:");
const suggestions = getSuggestedAreaCodes();
suggestions.slice(0, 10).forEach((suggestion) => {
  // Show first 10
  console.log(`${suggestion.label} (${suggestion.category})`);
});

export {};
