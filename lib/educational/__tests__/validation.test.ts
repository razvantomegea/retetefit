import { isString, isValidISODate } from '../validation';

describe('isValidISODate', () => {
  it('should return true for valid ISO date strings', () => {
    expect(isValidISODate('2025-11-07')).toBe(true);
    expect(isValidISODate('2024-01-01')).toBe(true);
    expect(isValidISODate('2023-12-31')).toBe(true);
  });

  it('should return false for invalid date formats', () => {
    expect(isValidISODate('11/07/2025')).toBe(false);
    expect(isValidISODate('2025-11-7')).toBe(false);
    expect(isValidISODate('2025-1-07')).toBe(false);
    expect(isValidISODate('07-11-2025')).toBe(false);
  });

  it('should return false for invalid dates', () => {
    expect(isValidISODate('2025-13-01')).toBe(false); // invalid month
    expect(isValidISODate('2025-02-30')).toBe(false); // invalid day
    expect(isValidISODate('2025-00-01')).toBe(false); // invalid month
  });

  it('should return false for non-string values', () => {
    expect(isValidISODate(null)).toBe(false);
    expect(isValidISODate(undefined)).toBe(false);
    expect(isValidISODate(12345)).toBe(false);
    expect(isValidISODate(true)).toBe(false);
    expect(isValidISODate({})).toBe(false);
    expect(isValidISODate([])).toBe(false);
  });

  it('should return false for empty strings', () => {
    expect(isValidISODate('')).toBe(false);
    expect(isValidISODate('   ')).toBe(false);
  });

  it('should return false for datetime strings', () => {
    expect(isValidISODate('2025-11-07T10:30:00')).toBe(false);
    expect(isValidISODate('2025-11-07T10:30:00.000Z')).toBe(false);
  });

  it('should return false for partial dates', () => {
    expect(isValidISODate('2025-11')).toBe(false);
    expect(isValidISODate('2025')).toBe(false);
  });
});

describe('isString', () => {
  it('should return true for non-empty strings', () => {
    expect(isString('hello')).toBe(true);
    expect(isString('test')).toBe(true);
    expect(isString('a')).toBe(true);
    expect(isString('123')).toBe(true);
  });

  it('should return false for empty strings', () => {
    expect(isString('')).toBe(false);
  });

  it('should return false for strings with only whitespace', () => {
    expect(isString('   ')).toBe(false);
    expect(isString('\t')).toBe(false);
    expect(isString('\n')).toBe(false);
    expect(isString('  \t\n  ')).toBe(false);
  });

  it('should return false for non-string values', () => {
    expect(isString(null)).toBe(false);
    expect(isString(undefined)).toBe(false);
    expect(isString(123)).toBe(false);
    expect(isString(true)).toBe(false);
    expect(isString(false)).toBe(false);
    expect(isString({})).toBe(false);
    expect(isString([])).toBe(false);
  });

  it('should return true for strings with leading/trailing spaces but content', () => {
    expect(isString('  hello  ')).toBe(true);
    expect(isString('\thello\t')).toBe(true);
    expect(isString('\nhello\n')).toBe(true);
  });
});
