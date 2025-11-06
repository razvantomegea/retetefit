export type Category = 'easy' | 'fast' | 'high-protein' | 'high-fiber' | 'vegetarian' | 'vegan';
export type Difficulty = 'easy' | 'medium' | 'hard';
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
  difficulty: Difficulty;
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
  difficulty?: Difficulty;
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
