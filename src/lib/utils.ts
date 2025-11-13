import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Normalizes selected options to match valid options list
 * Filters out invalid entries and uses case-insensitive matching
 */
export function normalizeSelectOptions(
  selectedValues: string[] | null | undefined,
  validOptions: string[]
): string[] {
  if (!Array.isArray(selectedValues)) return [];
  
  const validOptionsLower = validOptions.map(opt => opt.toLowerCase());
  const normalized: string[] = [];
  const invalid: string[] = [];
  
  selectedValues.forEach(value => {
    if (typeof value !== 'string') return;
    
    const index = validOptionsLower.indexOf(value.toLowerCase());
    if (index !== -1) {
      // Use the properly cased version from validOptions
      normalized.push(validOptions[index]);
    } else {
      invalid.push(value);
    }
  });
  
  if (invalid.length > 0) {
    console.warn('Invalid options filtered out:', invalid);
  }
  
  return normalized;
}
