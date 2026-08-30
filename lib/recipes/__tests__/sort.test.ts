import type { RecipeMetadata } from '@/types';

import { sortRecipes } from '../sort';

const createMockRecipe = (
  slug: string,
  publishedAt: string,
  cookTime: number,
  calories: number,
  protein: number
): RecipeMetadata => ({
  slug,
  title: `Recipe ${slug}`,
  description: 'Test recipe',
  category: 'fast',
  lang: 'en',
  cookTime,
  servings: 4,
  calories,
  protein,
  carbs: 20,
  fat: 10,
  fiber: 5,
  tags: [],
  featured: false,
  publishedAt,
  updatedAt: publishedAt,
  image: '/test.jpg',
  imageAlt: 'Test image',
  author: 'Test Author',
  readingTime: 5,
});

describe('sortRecipes', () => {
  const recipes: RecipeMetadata[] = [
    createMockRecipe('oldest', '2020-01-01', 30, 300, 20),
    createMockRecipe('newest', '2024-01-01', 15, 200, 30),
    createMockRecipe('middle', '2022-01-01', 45, 400, 15),
  ];

  it('should sort by newest (default)', () => {
    const sorted = sortRecipes(recipes);
    expect(sorted[0].slug).toBe('newest');
    expect(sorted[1].slug).toBe('middle');
    expect(sorted[2].slug).toBe('oldest');
  });

  it('should sort by newest explicitly', () => {
    const sorted = sortRecipes(recipes, 'newest');
    expect(sorted[0].slug).toBe('newest');
    expect(sorted[1].slug).toBe('middle');
    expect(sorted[2].slug).toBe('oldest');
  });

  it('should sort by oldest', () => {
    const sorted = sortRecipes(recipes, 'oldest');
    expect(sorted[0].slug).toBe('oldest');
    expect(sorted[1].slug).toBe('middle');
    expect(sorted[2].slug).toBe('newest');
  });

  it('should sort by quickest', () => {
    const sorted = sortRecipes(recipes, 'quickest');
    expect(sorted[0].cookTime).toBe(15);
    expect(sorted[1].cookTime).toBe(30);
    expect(sorted[2].cookTime).toBe(45);
  });

  it('should sort by longest', () => {
    const sorted = sortRecipes(recipes, 'longest');
    expect(sorted[0].cookTime).toBe(45);
    expect(sorted[1].cookTime).toBe(30);
    expect(sorted[2].cookTime).toBe(15);
  });

  it('should sort by low-calories', () => {
    const sorted = sortRecipes(recipes, 'low-calories');
    expect(sorted[0].calories).toBe(200);
    expect(sorted[1].calories).toBe(300);
    expect(sorted[2].calories).toBe(400);
  });

  it('should sort by high-calories', () => {
    const sorted = sortRecipes(recipes, 'high-calories');
    expect(sorted[0].calories).toBe(400);
    expect(sorted[1].calories).toBe(300);
    expect(sorted[2].calories).toBe(200);
  });

  it('should sort by high-protein', () => {
    const sorted = sortRecipes(recipes, 'high-protein');
    expect(sorted[0].protein).toBe(30);
    expect(sorted[1].protein).toBe(20);
    expect(sorted[2].protein).toBe(15);
  });

  it('should handle empty arrays', () => {
    const sorted = sortRecipes([], 'newest');
    expect(sorted).toEqual([]);
  });

  it('should not mutate original array', () => {
    const original = [...recipes];
    sortRecipes(recipes, 'newest');
    expect(recipes).toEqual(original);
  });

  it('should return new array instance', () => {
    const sorted = sortRecipes(recipes, 'newest');
    expect(sorted).not.toBe(recipes);
  });

  it('should return copy unchanged for unknown sort option', () => {
    const sorted = sortRecipes(recipes, 'unknown' as never);
    expect(sorted).toEqual(recipes);
    expect(sorted).not.toBe(recipes);
  });

  it('should treat invalid dates as equal when sorting newest', () => {
    const withBadDates: RecipeMetadata[] = [
      createMockRecipe('a', 'not-a-date', 10, 100, 10),
      createMockRecipe('b', 'also-bad', 20, 200, 20),
    ];
    const sorted = sortRecipes(withBadDates, 'newest');
    expect(sorted.map((r) => r.slug)).toEqual(['a', 'b']);
  });
});
