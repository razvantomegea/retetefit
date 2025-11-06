import 'server-only';

import { Locale, RecipeMetadata } from '@/types';

import { getAllRecipes } from './get-all';

export function searchRecipes(query: string, locale: Locale): RecipeMetadata[] {
  const allRecipes = getAllRecipes(locale);
  const lowerQuery = query.toLowerCase();

  return allRecipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(lowerQuery) ||
      recipe.description.toLowerCase().includes(lowerQuery) ||
      recipe.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

