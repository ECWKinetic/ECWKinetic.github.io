import { z } from 'zod';

// Common email domain typos
const emailTypos: Record<string, string> = {
  'gmial.com': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gmil.com': 'gmail.com',
  'yahooo.com': 'yahoo.com',
  'yaho.com': 'yahoo.com',
  'outloo.com': 'outlook.com',
  'outlok.com': 'outlook.com',
  'hotmial.com': 'hotmail.com',
  'hotmal.com': 'hotmail.com',
};

// Phone number validation schema
export const phoneSchema = z
  .string()
  .trim()
  .refine(
    (val) => {
      if (!val) return true; // Allow empty for optional fields
      // Remove all non-numeric characters except +
      const cleaned = val.replace(/[^\d+]/g, '');
      // Check if it's a valid phone number (10-15 digits, optional + prefix)
      return /^\+?\d{10,15}$/.test(cleaned);
    },
    { message: "Please enter a valid phone number, e.g., (555) 123-4567" }
  )
  .or(z.literal(''));

// Required phone number schema
export const phoneRequiredSchema = z
  .string()
  .trim()
  .min(1, "Phone number is required")
  .refine(
    (val) => {
      // Remove all non-numeric characters except +
      const cleaned = val.replace(/[^\d+]/g, '');
      // Check if it's a valid phone number (10-15 digits, optional + prefix)
      return /^\+?\d{10,15}$/.test(cleaned);
    },
    { message: "Please enter a valid phone number, e.g., (555) 123-4567" }
  );

// Enhanced email validation schema
export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email("Invalid email address")
  .max(255, "Email must be less than 255 characters")
  .refine(
    (val) => {
      const domain = val.split('@')[1];
      if (!domain) return true;
      return !Object.keys(emailTypos).includes(domain);
    },
    (val) => {
      const domain = val.split('@')[1];
      const suggestion = emailTypos[domain];
      return {
        message: suggestion
          ? `Did you mean ${suggestion} instead of ${domain}?`
          : "Invalid email address",
      };
    }
  );

// Helper function to format phone number for storage (digits only)
export const formatPhoneForStorage = (phone: string): string => {
  return phone.replace(/[^\d+]/g, '');
};

// Helper function to format phone number for display
export const formatPhoneForDisplay = (phone: string): string => {
  const cleaned = phone.replace(/[^\d]/g, '');
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  
  return phone;
};
