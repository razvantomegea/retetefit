/**
 * Validates if a date string is a valid ISO date (YYYY-MM-DD format)
 * @param dateString - The date string to validate
 * @returns True if the date string is a valid ISO date, false otherwise
 */
export function isValidISODate(dateString: unknown): dateString is string {
  if (typeof dateString !== 'string') {
    return false;
  }
  const date = new Date(dateString);
  return !isNaN(date.getTime()) && dateString === date.toISOString().split('T')[0];
}

/**
 * Validates if a value is a non-empty string
 * @param value - The value to validate
 * @returns True if the value is a non-empty string, false otherwise
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

