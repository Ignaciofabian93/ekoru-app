// Example usage and test of the birthday field functionality

import {
  formatBirthdayInput,
  convertToStorageFormat,
  convertToDisplayFormat,
  validateBirthday,
} from "./dateUtils";

// Test examples:
console.log("=== Birthday Field Functionality Tests ===");

// Test 1: Formatting user input as they type
console.log("\n1. Auto-formatting as user types:");
console.log('Input: "12"      -> Output:', formatBirthdayInput("12"));
console.log('Input: "1234"    -> Output:', formatBirthdayInput("1234"));
console.log('Input: "12345678" -> Output:', formatBirthdayInput("12345678"));
console.log(
  'Input: "12-34-5678" -> Output:',
  formatBirthdayInput("12-34-5678")
); // Removes existing hyphens and reformats

// Test 2: Converting between display and storage formats
console.log("\n2. Format conversion:");
const displayDate = "15-03-1990";
const storageDate = convertToStorageFormat(displayDate);
console.log("Display format:", displayDate);
console.log("Storage format:", storageDate);
console.log("Back to display:", convertToDisplayFormat(storageDate));

// Test 3: Validation
console.log("\n3. Date validation:");
const testDates = [
  "15-03-1990", // Valid
  "32-01-1990", // Invalid day
  "15-13-1990", // Invalid month
  "15-03-2030", // Future date
  "29-02-2021", // Invalid leap year
  "29-02-2020", // Valid leap year
  "15-3-1990", // Incomplete
];

testDates.forEach((date) => {
  const validation = validateBirthday(date);
  console.log(
    `${date}: ${validation.isValid ? "Valid" : "Invalid"} ${
      validation.error ? `(${validation.error})` : ""
    }`
  );
});

// Test 4: Real user interaction simulation
console.log("\n4. User typing simulation:");
const userInputs = [
  "1",
  "15",
  "153",
  "1530",
  "15303",
  "153031",
  "1530319",
  "15303199",
  "153031990",
];
userInputs.forEach((input) => {
  console.log(`User types "${input}" -> Shows "${formatBirthdayInput(input)}"`);
});

export {};
