import 'server-only';

import fs from 'fs';

import { Category, Locale, Recipe } from '@/types';

import { getAllRecipeFilePaths, getRecipeFilePath, parseRecipeFile } from './utils';

export function getRecipeBySlug(slug: string, locale: Locale, category?: Category): Recipe | null {
  if (category) {
    const filePath = getRecipeFilePath(locale, category, slug);
    if (fs.existsSync(filePath)) {
      return parseRecipeFile(filePath);
    }
    return null;
  }

  // Search across all categories
  const filePaths = getAllRecipeFilePaths(locale);
  for (const filePath of filePaths) {
    const recipe = parseRecipeFile(filePath);
    if (recipe && recipe.slug === slug && recipe.lang === locale) {
      return recipe;
    }
  }

  return null;
}
