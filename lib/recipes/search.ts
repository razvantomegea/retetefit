import 'server-only';

import enMessages from '@/messages/en.json';
import roMessages from '@/messages/ro.json';
import { Locale, RecipeMetadata, SortOption } from '@/types';

import { applyFilters, buildFilters, filterRecipes, type SearchParamsFilters } from './filter';
import { getAllRecipes } from './get-all';
import { sortRecipes } from './sort';

const tagTranslationsByLocale: Record<Locale, Record<string, string>> = {
  en: (enMessages.recipes?.tags ?? {}) as Record<string, string>,
  ro: (roMessages.recipes?.tags ?? {}) as Record<string, string>,
};

const locales: Locale[] = ['en', 'ro'];

function getTagVariants(tag: string): string[] {
  const variants = new Set<string>([tag.toLowerCase()]);

  for (const locale of locales) {
    const translatedTag = tagTranslationsByLocale[locale]?.[tag];
    if (typeof translatedTag === 'string' && translatedTag.length > 0) {
      variants.add(translatedTag.toLowerCase());
    }
  }

  return Array.from(variants);
}

export function searchRecipes(query: string, locale: Locale): RecipeMetadata[] {
  const allRecipes = getAllRecipes(locale);
  const lowerQuery = query.toLowerCase();

  return allRecipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(lowerQuery) ||
      recipe.description.toLowerCase().includes(lowerQuery) ||
      recipe.tags.some((tag) => getTagVariants(tag).some((variant) => variant.includes(lowerQuery)))
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
