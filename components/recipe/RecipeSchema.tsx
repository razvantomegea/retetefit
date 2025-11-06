import type { Recipe } from '@/lib/recipes';
import { parseIngredients, parseInstructions } from '@/lib/recipes/parse-schema';

interface RecipeSchemaProps {
  recipe: Recipe;
  baseUrl: string;
}

export function RecipeSchema({ recipe, baseUrl }: RecipeSchemaProps) {
  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'Recipe',
    name: recipe.title,
    description: recipe.description,
    image: `${baseUrl}${recipe.image}`,
    author: {
      '@type': 'Person',
      name: recipe.author,
    },
    datePublished: recipe.publishedAt,
    dateModified: recipe.updatedAt,
    prepTime: `PT${recipe.cookTime}M`,
    cookTime: `PT${recipe.cookTime}M`,
    totalTime: `PT${recipe.cookTime}M`,
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
