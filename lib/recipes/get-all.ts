import 'server-only';

import { Locale, Recipe, RecipeMetadata } from '@/types';

import { getAllRecipeFilePaths, parseRecipeFile } from './utils';

export function getAllRecipes(locale: Locale): RecipeMetadata[] {
  const filePaths = getAllRecipeFilePaths(locale);
  const recipes = filePaths
    .map((filePath) => parseRecipeFile(filePath))
    .filter((recipe): recipe is Recipe => recipe !== null && recipe.lang === locale)
    .filter((recipe) => {
      // Only include published recipes
      const publishedDate = new Date(recipe.publishedAt);
      return !isNaN(publishedDate.getTime()) && publishedDate <= new Date();
    })
    .map(({ ...metadata }) => ({
      ...metadata,
      readingTime: metadata.readingTime,
    }));

  return recipes;
}

