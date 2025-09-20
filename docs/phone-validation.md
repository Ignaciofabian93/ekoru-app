# Phone Number Validation System

## Overview

This system provides comprehensive phone number validation for Chilean numbers with support for international numbers commonly used in Chile (especially for WhatsApp business accounts).

## Features

### 1. **Auto-formatting as user types**

- Automatically adds `+` prefix
- Formats with hyphens: `+56-9-12345678`
- Handles different country code formats
- Limits input length appropriately

### 2. **Supported number types:**

#### Chilean Numbers:

- **Mobile**: `+56-9-XXXXXXXX` (8 digits after area code)
- **Landline**: `+56-XX-XXXXXX` (6-8 digits, various area codes)
  - Santiago: `+56-2-XXXXXXX`
  - Valparaíso: `+56-32-XXXXXX`
  - And many more regional codes

#### International Numbers:

- **US/Canada**: `+1-XXX-XXX-XXXX`
- **Argentina**: `+54-9-XXXXXXXX`
- **Spain, Germany, France, UK, Brazil**, etc.

### 3. **Real-time validation**

- Shows validation status as user types
- Displays phone type (mobile/landline/international)
- Shows WhatsApp compatibility
- Provides specific error messages in Spanish

## Usage Examples

### User Experience:

```
User types: "56912345678"
Shows: "+56-9-12345678"
Status: "📱 Móvil chileno ✓ WhatsApp compatible"
```

```
User types: "15551234567"
Shows: "+1-555-123-4567"
Status: "🌍 Número internacional ✓ WhatsApp compatible"
```

### Validation Results:

- ✅ **Valid Chilean Mobile**: `+56-9-12345678`
- ✅ **Valid Chilean Landline**: `+56-2-1234567`
- ✅ **Valid US Number**: `+1-555-123-4567`
- ❌ **Invalid (too short)**: `+56-9-1234567`
- ❌ **Invalid (missing +)**: `56-9-12345678`
- ❌ **Invalid (bad area code)**: `+56-8-12345678`

## Implementation

### Files:

- `utils/phoneUtils.ts` - Core validation logic
- `useProfileForm.tsx` - Form handling with phone validation
- `userForm.tsx` - UI component with real-time validation

### Key Functions:

- `formatPhoneInput()` - Auto-formats as user types
- `validatePhoneNumber()` - Comprehensive validation
- `isWhatsAppCompatible()` - Checks WhatsApp compatibility
- `getPhoneTypeDescription()` - Human-readable phone type

## WhatsApp Compatibility

The system identifies which numbers are compatible with WhatsApp:

- ✅ Most mobile numbers
- ✅ International numbers
- ❌ Some landline numbers (country dependent)

## Error Messages (Spanish)

- "Ingresa un número de teléfono válido"
- "El número debe comenzar con +"
- "Formato inválido. Use +XX-X-XXXXXXX"
- "Número móvil chileno debe tener 8 dígitos después del área"
- "Código de área chileno inválido: XX"
- "Código de país no soportado: +XX"

## Storage

- **Display Format**: `+56-9-12345678`
- **Storage Format**: `+56-9-12345678` (same, as it's already clean)

## Future Enhancements

1. Add more international country codes as needed
2. Implement phone number verification via SMS
3. Add business vs personal number detection
4. Integrate with WhatsApp Business API validation
