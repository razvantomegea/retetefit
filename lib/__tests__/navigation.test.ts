import { getCategoryFromSlug, getCategorySlug } from '../navigation';

describe('navigation helpers', () => {
  describe('getCategoryFromSlug', () => {
    it('should return correct category for valid slugs', () => {
      expect(getCategoryFromSlug('fast')).toBe('fast');
      expect(getCategoryFromSlug('high-protein')).toBe('high-protein');
      expect(getCategoryFromSlug('high-fiber')).toBe('high-fiber');
      expect(getCategoryFromSlug('vegetarian')).toBe('vegetarian');
    });

    it('should return null for invalid slugs', () => {
      expect(getCategoryFromSlug('invalid')).toBeNull();
      expect(getCategoryFromSlug('unknown')).toBeNull();
      expect(getCategoryFromSlug('')).toBeNull();
    });
  });

  describe('getCategorySlug', () => {
    it('should return correct slug for each category', () => {
      expect(getCategorySlug('fast')).toBe('fast');
      expect(getCategorySlug('high-protein')).toBe('high-protein');
      expect(getCategorySlug('high-fiber')).toBe('high-fiber');
      expect(getCategorySlug('vegetarian')).toBe('vegetarian');
    });
  });
});
