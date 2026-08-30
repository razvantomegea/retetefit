import { getCategoryFromSlug, getCategorySlug } from '../navigation';

describe('navigation helpers', () => {
  describe('getCategoryFromSlug', () => {
    it('should return correct category for valid slugs', () => {
      expect(getCategoryFromSlug('main')).toBe('main');
      expect(getCategoryFromSlug('vegetarian')).toBe('vegetarian');
      expect(getCategoryFromSlug('desserts')).toBe('desserts');
      expect(getCategoryFromSlug('brunch')).toBe('brunch');
    });

    it('should return null for invalid slugs', () => {
      expect(getCategoryFromSlug('invalid')).toBeNull();
      expect(getCategoryFromSlug('unknown')).toBeNull();
      expect(getCategoryFromSlug('')).toBeNull();
    });
  });

  describe('getCategorySlug', () => {
    it('should return correct slug for each category', () => {
      expect(getCategorySlug('main')).toBe('main');
      expect(getCategorySlug('vegetarian')).toBe('vegetarian');
      expect(getCategorySlug('desserts')).toBe('desserts');
      expect(getCategorySlug('brunch')).toBe('brunch');
    });

    it('should fall back to the category value when not in nav', () => {
      expect(getCategorySlug('unknown' as never)).toBe('unknown');
    });
  });
});
