import 'server-only';

import { RecipeMetadata, SortOption } from '@/types';

export function sortRecipes(
  recipes: RecipeMetadata[],
  sortBy: SortOption = 'newest'
): RecipeMetadata[] {
  const sorted = [...recipes];

  switch (sortBy) {
    case 'newest':
      return sorted.sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    case 'oldest':
      return sorted.sort(
        (a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      );
    case 'quickest':
      return sorted.sort((a, b) => a.cookTime - b.cookTime);
    case 'longest':
      return sorted.sort((a, b) => b.cookTime - a.cookTime);
    case 'low-calories':
      return sorted.sort((a, b) => a.calories - b.calories);
    case 'high-calories':
      return sorted.sort((a, b) => b.calories - a.calories);
    case 'high-protein':
      return sorted.sort((a, b) => b.protein - a.protein);
    default:
      return sorted;
  }
}

