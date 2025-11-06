import 'server-only';

import { Category, Difficulty, Locale, RecipeFilters, RecipeMetadata } from '@/types';

import { getAllRecipes } from './get-all';

export const VALID_CATEGORIES: Category[] = [
  'easy',
  'fast',
  'high-protein',
  'high-fiber',
  'vegetarian',
  'vegan',
];

export const VALID_DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard'];

export interface SearchParamsFilters {
  category?: string;
  difficulty?: string;
  maxCookTime?: string;
  minCookTime?: string;
  maxCalories?: string;
  minCalories?: string;
}

export function buildFilters(searchParams: SearchParamsFilters): RecipeFilters {
  const filters: RecipeFilters = {};

  if (searchParams.category && VALID_CATEGORIES.includes(searchParams.category as Category)) {
    filters.category = searchParams.category as Category;
  }

  if (
    searchParams.difficulty &&
    VALID_DIFFICULTIES.includes(searchParams.difficulty as Difficulty)
  ) {
    filters.difficulty = searchParams.difficulty as Difficulty;
  }

  if (searchParams.minCookTime) {
    filters.minCookTime = parseInt(searchParams.minCookTime);
  }

  if (searchParams.maxCookTime) {
    filters.maxCookTime = parseInt(searchParams.maxCookTime);
  }

  if (searchParams.minCalories) {
    filters.minCalories = parseInt(searchParams.minCalories);
  }

  if (searchParams.maxCalories) {
    filters.maxCalories = parseInt(searchParams.maxCalories);
  }

  return filters;
}

export function filterRecipes(filters: RecipeFilters, locale: Locale): RecipeMetadata[] {
  let recipes = getAllRecipes(locale);

  if (filters.category) {
    recipes = recipes.filter((r) => r.category === filters.category);
  }

  if (filters.tags && filters.tags.length > 0) {
    recipes = recipes.filter((r) => filters.tags!.some((tag) => r.tags.includes(tag)));
  }

  if (filters.difficulty) {
    recipes = recipes.filter((r) => r.difficulty === filters.difficulty);
  }

  if (filters.minCookTime !== undefined) {
    recipes = recipes.filter((r) => r.cookTime >= filters.minCookTime!);
  }

  if (filters.maxCookTime !== undefined) {
    recipes = recipes.filter((r) => r.cookTime <= filters.maxCookTime!);
  }

  if (filters.minCalories !== undefined) {
    recipes = recipes.filter((r) => r.calories >= filters.minCalories!);
  }

  if (filters.maxCalories !== undefined) {
    recipes = recipes.filter((r) => r.calories <= filters.maxCalories!);
  }

  return recipes;
}
