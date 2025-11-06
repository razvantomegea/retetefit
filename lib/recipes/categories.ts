import 'server-only';

import { Category, Locale, RecipeMetadata } from '@/types';

import { getAllRecipes } from './get-all';

export function getRecipesByCategory(category: Category, locale: Locale): RecipeMetadata[] {
  const allRecipes = getAllRecipes(locale);
  return allRecipes.filter((recipe) => recipe.category === category);
}

export function getAllCategories(locale: Locale): Category[] {
  const recipes = getAllRecipes(locale);
  const categoriesSet = new Set<Category>();
  recipes.forEach((recipe) => categoriesSet.add(recipe.category));
  return Array.from(categoriesSet);
}

export function getCategoryRecipeCount(category: Category, locale: Locale): number {
  return getRecipesByCategory(category, locale).length;
}
