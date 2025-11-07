export type Category = 'fast' | 'high-protein' | 'high-fiber' | 'vegetarian';
export type Locale = 'ro' | 'en';

export interface RecipeFrontmatter {
  title: string;
  slug: string;
  description: string;
  category: Category;
  lang: Locale;
  cookTime: number; // in minutes
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  tags: string[];
  featured: boolean;
  publishedAt: string;
  updatedAt: string;
  image: string;
  imageAlt: string;
  author: string;
}

export interface Recipe extends RecipeFrontmatter {
  content: string;
  readingTime: number;
}

export interface RecipeMetadata extends RecipeFrontmatter {
  readingTime: number;
}

export interface RecipeFilters {
  category?: Category;
  tags?: string[];
  maxCookTime?: number;
  minCookTime?: number;
  maxCalories?: number;
  minCalories?: number;
}

export type SortOption =
  | 'newest'
  | 'oldest'
  | 'quickest'
  | 'longest'
  | 'low-calories'
  | 'high-calories'
  | 'high-protein';

export interface ParsedRecipeContent {
  introduction: string;
  ingredients: string[];
  optionalIngredients?: {
    title: string;
    items: string[];
  };
  instructions: string[];
  nutrition?: string;
  tips?: string;
}
