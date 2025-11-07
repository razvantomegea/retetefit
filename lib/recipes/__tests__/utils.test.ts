import type { Category } from '@/types';

import { getRecipeFilePath } from '../utils';

describe('getRecipeFilePath', () => {
  it('should construct correct path with locale, category, and slug', () => {
    const path = getRecipeFilePath('en', 'high-protein', 'protein-pancakes');
    expect(path).toContain('content/recipes');
    expect(path).toContain('en');
    expect(path).toContain('high-protein');
    expect(path).toContain('protein-pancakes.md');
  });

  it('should handle different locales', () => {
    const enPath = getRecipeFilePath('en', 'fast', 'quick-meal');
    const roPath = getRecipeFilePath('ro', 'fast', 'masa-rapida');

    expect(enPath).toContain('en');
    expect(roPath).toContain('ro');
  });

  it('should handle different categories', () => {
    const categories: Category[] = ['fast', 'high-protein', 'high-fiber', 'vegetarian'];

    categories.forEach((category) => {
      const path = getRecipeFilePath('en', category, 'test-recipe');
      expect(path).toContain(category);
    });
  });

  it('should append .md extension to slug', () => {
    const path = getRecipeFilePath('en', 'fast', 'simple-recipe');
    expect(path).toMatch(/\.md$/);
  });
});
