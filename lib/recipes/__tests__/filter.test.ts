import type { Category, Difficulty, RecipeMetadata } from '@/types';

import { applyFilters, buildFilters, VALID_CATEGORIES, VALID_DIFFICULTIES } from '../filter';

describe('buildFilters', () => {
  it('should return empty object for no params', () => {
    const filters = buildFilters({});
    expect(filters).toEqual({});
  });

  it('should validate and include valid categories', () => {
    VALID_CATEGORIES.forEach((category) => {
      const filters = buildFilters({ category });
      expect(filters.category).toBe(category);
    });
  });

  it('should ignore invalid category values', () => {
    const filters = buildFilters({ category: 'invalid-category' });
    expect(filters.category).toBeUndefined();
  });

  it('should validate and include valid difficulties', () => {
    VALID_DIFFICULTIES.forEach((difficulty) => {
      const filters = buildFilters({ difficulty });
      expect(filters.difficulty).toBe(difficulty);
    });
  });

  it('should ignore invalid difficulty values', () => {
    const filters = buildFilters({ difficulty: 'invalid-difficulty' });
    expect(filters.difficulty).toBeUndefined();
  });

  it('should parse numeric filters for cookTime', () => {
    const filters = buildFilters({
      minCookTime: '10',
      maxCookTime: '30',
    });
    expect(filters.minCookTime).toBe(10);
    expect(filters.maxCookTime).toBe(30);
  });

  it('should parse numeric filters for calories', () => {
    const filters = buildFilters({
      minCalories: '200',
      maxCalories: '500',
    });
    expect(filters.minCalories).toBe(200);
    expect(filters.maxCalories).toBe(500);
  });

  it('should ignore non-numeric values for numeric fields', () => {
    const filters = buildFilters({
      minCookTime: 'not-a-number',
      maxCookTime: 'also-not-a-number',
      minCalories: 'invalid',
      maxCalories: 'invalid',
    });
    expect(filters.minCookTime).toBeUndefined();
    expect(filters.maxCookTime).toBeUndefined();
    expect(filters.minCalories).toBeUndefined();
    expect(filters.maxCalories).toBeUndefined();
  });

  it('should handle all filters together', () => {
    const filters = buildFilters({
      category: 'high-protein',
      difficulty: 'easy',
      minCookTime: '15',
      maxCookTime: '45',
      minCalories: '200',
      maxCalories: '400',
    });

    expect(filters).toEqual({
      category: 'high-protein',
      difficulty: 'easy',
      minCookTime: 15,
      maxCookTime: 45,
      minCalories: 200,
      maxCalories: 400,
    });
  });

  it('should handle partial filters', () => {
    const filters = buildFilters({
      category: 'vegetarian',
      minCookTime: '20',
    });

    expect(filters.category).toBe('vegetarian');
    expect(filters.minCookTime).toBe(20);
    expect(filters.difficulty).toBeUndefined();
    expect(filters.maxCookTime).toBeUndefined();
  });
});

describe('applyFilters', () => {
  const createMockRecipe = (
    slug: string,
    category: Category,
    difficulty: Difficulty,
    cookTime: number,
    calories: number,
    tags: string[] = []
  ): RecipeMetadata => ({
    slug,
    title: `Recipe ${slug}`,
    description: 'Test recipe',
    category,
    lang: 'en',
    cookTime,
    servings: 4,
    calories,
    protein: 20,
    carbs: 20,
    fat: 10,
    fiber: 5,
    difficulty,
    tags,
    featured: false,
    publishedAt: '2024-01-01',
    updatedAt: '2024-01-01',
    image: '/test.jpg',
    imageAlt: 'Test image',
    author: 'Test Author',
    readingTime: 5,
  });

  const mockRecipes: RecipeMetadata[] = [
    createMockRecipe('recipe-1', 'high-protein', 'easy', 15, 200, ['breakfast', 'quick']),
    createMockRecipe('recipe-2', 'vegetarian', 'medium', 30, 300, ['lunch', 'healthy']),
    createMockRecipe('recipe-3', 'high-protein', 'hard', 45, 400, ['dinner', 'protein']),
    createMockRecipe('recipe-4', 'vegan', 'easy', 20, 250, ['breakfast', 'vegan']),
  ];

  it('should return all recipes when no filters applied', () => {
    const filtered = applyFilters(mockRecipes, {});
    expect(filtered).toHaveLength(4);
    expect(filtered).toEqual(mockRecipes);
  });

  it('should filter by category', () => {
    const filtered = applyFilters(mockRecipes, { category: 'high-protein' });
    expect(filtered).toHaveLength(2);
    expect(filtered.every((r) => r.category === 'high-protein')).toBe(true);
  });

  it('should filter by difficulty', () => {
    const filtered = applyFilters(mockRecipes, { difficulty: 'easy' });
    expect(filtered).toHaveLength(2);
    expect(filtered.every((r) => r.difficulty === 'easy')).toBe(true);
  });

  it('should filter by tags', () => {
    const filtered = applyFilters(mockRecipes, { tags: ['breakfast'] });
    expect(filtered).toHaveLength(2);
    expect(filtered.every((r) => r.tags.includes('breakfast'))).toBe(true);
  });

  it('should filter by multiple tags (any match)', () => {
    const filtered = applyFilters(mockRecipes, { tags: ['breakfast', 'dinner'] });
    expect(filtered).toHaveLength(3);
    expect(filtered.every((r) => r.tags.includes('breakfast') || r.tags.includes('dinner'))).toBe(
      true
    );
  });

  it('should filter by minCookTime', () => {
    const filtered = applyFilters(mockRecipes, { minCookTime: 30 });
    expect(filtered).toHaveLength(2);
    expect(filtered.every((r) => r.cookTime >= 30)).toBe(true);
  });

  it('should filter by maxCookTime', () => {
    const filtered = applyFilters(mockRecipes, { maxCookTime: 20 });
    expect(filtered).toHaveLength(2);
    expect(filtered.every((r) => r.cookTime <= 20)).toBe(true);
  });

  it('should filter by cookTime range', () => {
    const filtered = applyFilters(mockRecipes, { minCookTime: 20, maxCookTime: 30 });
    expect(filtered).toHaveLength(2);
    expect(filtered.every((r) => r.cookTime >= 20 && r.cookTime <= 30)).toBe(true);
  });

  it('should filter by minCalories', () => {
    const filtered = applyFilters(mockRecipes, { minCalories: 300 });
    expect(filtered).toHaveLength(2);
    expect(filtered.every((r) => r.calories >= 300)).toBe(true);
  });

  it('should filter by maxCalories', () => {
    const filtered = applyFilters(mockRecipes, { maxCalories: 250 });
    expect(filtered).toHaveLength(2);
    expect(filtered.every((r) => r.calories <= 250)).toBe(true);
  });

  it('should filter by calories range', () => {
    const filtered = applyFilters(mockRecipes, { minCalories: 200, maxCalories: 300 });
    expect(filtered).toHaveLength(3);
    expect(filtered.every((r) => r.calories >= 200 && r.calories <= 300)).toBe(true);
  });

  it('should apply multiple filters together', () => {
    const filtered = applyFilters(mockRecipes, {
      category: 'high-protein',
      difficulty: 'easy',
      minCookTime: 10,
      maxCookTime: 20,
      minCalories: 150,
      maxCalories: 250,
    });
    expect(filtered).toHaveLength(1);
    expect(filtered[0].slug).toBe('recipe-1');
  });

  it('should return empty array when no recipes match filters', () => {
    const filtered = applyFilters(mockRecipes, {
      category: 'high-protein',
      difficulty: 'hard',
      minCookTime: 60,
    });
    expect(filtered).toHaveLength(0);
  });

  it('should not mutate original array', () => {
    const original = [...mockRecipes];
    applyFilters(mockRecipes, { category: 'high-protein' });
    expect(mockRecipes).toEqual(original);
  });

  it('should return new array instance', () => {
    const filtered = applyFilters(mockRecipes, { category: 'high-protein' });
    expect(filtered).not.toBe(mockRecipes);
  });

  it('should handle empty recipes array', () => {
    const filtered = applyFilters([], { category: 'high-protein' });
    expect(filtered).toEqual([]);
  });

  it('should handle empty tags array in filters', () => {
    const filtered = applyFilters(mockRecipes, { tags: [] });
    expect(filtered).toHaveLength(4);
  });
});
