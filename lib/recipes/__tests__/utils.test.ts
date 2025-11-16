import type { Category } from '@/types';

import { getRecipeFilePath } from '../utils';

describe('getRecipeFilePath', () => {
  it('should construct correct path with locale, category, and slug', () => {
    const path = getRecipeFilePath('en', 'main', 'protein-pancakes');
    expect(path).toContain('content');
    expect(path).toContain('recipes');
    expect(path).toContain('en');
    expect(path).toContain('main');
    expect(path).toContain('protein-pancakes.md');
  });

  it('should handle different locales', () => {
    const enPath = getRecipeFilePath('en', 'main', 'quick-meal');
    const roPath = getRecipeFilePath('ro', 'main', 'masa-rapida');

    expect(enPath).toContain('en');
    expect(roPath).toContain('ro');
  });

  it('should handle different categories', () => {
    const categories: Category[] = ['main', 'vegetarian', 'desserts', 'brunch'];

    categories.forEach((category) => {
      const path = getRecipeFilePath('en', category, 'test-recipe');
      expect(path).toContain(category);
    });
  });

  it('should append .md extension to slug', () => {
    const path = getRecipeFilePath('en', 'main', 'simple-recipe');
    expect(path).toMatch(/\.md$/);
  });
});
