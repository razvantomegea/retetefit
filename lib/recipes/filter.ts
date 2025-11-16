import 'server-only';

import { Category, Locale, RecipeFilters, RecipeMetadata } from '@/types';

import { getAllRecipes } from './get-all';

export const VALID_CATEGORIES: Category[] = ['vegetarian', 'desserts', 'brunch', 'main'];

export interface SearchParamsFilters {
  category?: string;
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

  if (searchParams.minCookTime) {
    const parsed = parseInt(searchParams.minCookTime, 10);
    if (!isNaN(parsed)) {
      filters.minCookTime = parsed;
    }
  }

  if (searchParams.maxCookTime) {
    const parsed = parseInt(searchParams.maxCookTime, 10);
    if (!isNaN(parsed)) {
      filters.maxCookTime = parsed;
    }
  }

  if (searchParams.minCalories) {
    const parsed = parseInt(searchParams.minCalories, 10);
    if (!isNaN(parsed)) {
      filters.minCalories = parsed;
    }
  }

  if (searchParams.maxCalories) {
    const parsed = parseInt(searchParams.maxCalories, 10);
    if (!isNaN(parsed)) {
      filters.maxCalories = parsed;
    }
  }

  return filters;
}

/**
 * Applies filters to an existing array of recipes.
 * This is a pure function that can be used to filter any recipe array.
 */
export function applyFilters(recipes: RecipeMetadata[], filters: RecipeFilters): RecipeMetadata[] {
  let filtered = recipes;

  if (filters.category) {
    filtered = filtered.filter((r) => r.category === filters.category);
  }

  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter((r) => filters.tags!.some((tag) => r.tags.includes(tag)));
  }

  if (filters.minCookTime !== undefined) {
    filtered = filtered.filter((r) => r.cookTime >= filters.minCookTime!);
  }

  if (filters.maxCookTime !== undefined) {
    filtered = filtered.filter((r) => r.cookTime <= filters.maxCookTime!);
  }

  if (filters.minCalories !== undefined) {
    filtered = filtered.filter((r) => r.calories >= filters.minCalories!);
  }

  if (filters.maxCalories !== undefined) {
    filtered = filtered.filter((r) => r.calories <= filters.maxCalories!);
  }

  return filtered;
}

export function filterRecipes(filters: RecipeFilters, locale: Locale): RecipeMetadata[] {
  const recipes = getAllRecipes(locale);
  return applyFilters(recipes, filters);
}
