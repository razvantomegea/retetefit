import 'server-only';

import { Locale, RecipeMetadata, SortOption } from '@/types';

import { applyFilters, buildFilters, filterRecipes, type SearchParamsFilters } from './filter';
import { getAllRecipes } from './get-all';
import { sortRecipes } from './sort';

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

export interface PerformSearchParams extends SearchParamsFilters {
  q?: string;
  sort?: string;
}

/**
 * Performs a complete search operation: search by query (if provided),
 * apply filters, and sort the results.
 */
export function performSearch(searchParams: PerformSearchParams, locale: Locale): RecipeMetadata[] {
  // Start with search or filter
  let recipes = searchParams.q
    ? searchRecipes(searchParams.q, locale)
    : filterRecipes(buildFilters(searchParams), locale);

  // If there's a search query, also apply filters to the search results
  if (searchParams.q) {
    const filters = buildFilters(searchParams);
    recipes = applyFilters(recipes, filters);
  }

  // Apply sorting
  const sortBy = (searchParams.sort as SortOption) || 'newest';
  return sortRecipes(recipes, sortBy);
}
