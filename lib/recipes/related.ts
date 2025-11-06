import 'server-only';

import { Locale, Recipe, RecipeMetadata } from '@/types';

import { getAllRecipes } from './get-all';

export function getRelatedRecipes(
  recipe: Recipe | RecipeMetadata,
  locale: Locale,
  limit: number = 4
): RecipeMetadata[] {
  const allRecipes = getAllRecipes(locale);
  const related = allRecipes
    .filter(
      (r) =>
        r.slug !== recipe.slug &&
        r.category === recipe.category &&
        r.tags.some((tag) => recipe.tags.includes(tag))
    )
    .slice(0, limit);

  // If not enough related recipes by category and tags, fill with same category
  if (related.length < limit) {
    const additional = allRecipes
      .filter(
        (r) =>
          r.slug !== recipe.slug &&
          r.category === recipe.category &&
          !related.some((rel) => rel.slug === r.slug)
      )
      .slice(0, limit - related.length);
    related.push(...additional);
  }

  return related;
}
