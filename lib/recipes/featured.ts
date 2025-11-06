import 'server-only';

import { Locale, RecipeMetadata } from '@/types';

import { getAllRecipes } from './get-all';

export function getFeaturedRecipes(locale: Locale, limit: number = 6): RecipeMetadata[] {
  const allRecipes = getAllRecipes(locale);
  return allRecipes.filter((recipe) => recipe.featured).slice(0, limit);
}
