/**
 * Utility functions for repeater components to ensure data integrity
 */

export interface RepeaterEntry {
  id?: string;
  [key: string]: any;
}

/**
 * Ensures all entries in a repeater array have unique IDs
 * @param entries - Array of repeater entries
 * @returns Array with all entries guaranteed to have unique IDs
 */
export function normalizeRepeaterData<T extends RepeaterEntry>(
  entries: T[] | null | undefined
): T[] {
  if (!Array.isArray(entries)) {
    return [];
  }

  return entries.map((entry) => {
    // If entry doesn't have an ID or ID is invalid, assign a new UUID
    if (!entry.id || typeof entry.id !== 'string' || entry.id.trim() === '') {
      return {
        ...entry,
        id: crypto.randomUUID(),
      };
    }
    return entry;
  });
}
