import { BASE_URL } from '@/lib/constants';
import { parseIngredients, parseInstructions } from '@/lib/recipes/parse-schema';
import type { Recipe } from '@/types';

interface RecipeSchemaProps {
  recipe: Recipe;
}

export function RecipeSchema({ recipe }: RecipeSchemaProps) {
  // Extract prep time if available (checking both prepTime and prepMinutes for flexibility)
  const prepTime =
    ('prepTime' in recipe && typeof recipe.prepTime === 'number' ? recipe.prepTime : null) ??
    ('prepMinutes' in recipe && typeof recipe.prepMinutes === 'number' ? recipe.prepMinutes : null);

  const cookTime = typeof recipe.cookTime === 'number' ? recipe.cookTime : 0;

  // Build time fields based on whether prep time exists
  const timeFields =
    prepTime !== null
      ? {
          prepTime: `PT${prepTime}M`,
          cookTime: `PT${cookTime}M`,
          totalTime: `PT${prepTime + cookTime}M`,
        }
      : {
          // If no separate prep time exists, only output totalTime using cookTime
          totalTime: `PT${cookTime}M`,
        };

  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'Recipe',
    name: recipe.title,
    description: recipe.description,
    image: `${BASE_URL}${recipe.image}`,
    author: {
      '@type': 'Person',
      name: recipe.author,
    },
    datePublished: recipe.publishedAt,
    dateModified: recipe.updatedAt,
    ...timeFields,
    recipeYield: recipe.servings.toString(),
    recipeCategory: recipe.category,
    recipeCuisine: recipe.lang === 'ro' ? 'Romanian' : 'International',
    recipeIngredient: parseIngredients(recipe.content),
    recipeInstructions: parseInstructions(recipe.content),
    nutrition: {
      '@type': 'NutritionInformation',
      calories: `${recipe.calories} kcal`,
      proteinContent: `${recipe.protein}g`,
      carbohydrateContent: `${recipe.carbs}g`,
      fatContent: `${recipe.fat}g`,
      fiberContent: `${recipe.fiber}g`,
    },
    keywords: recipe.tags.join(', '),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}
