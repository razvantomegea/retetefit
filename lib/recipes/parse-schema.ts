import 'server-only';

import type { ParsedRecipeContent } from '@/types';

/**
 * Parse ingredients from markdown content for schema.org structured data
 */
export function parseIngredients(content: string): string[] {
  const ingredientsMatch = content.match(/## Ingredients?\s+([\s\S]*?)(?=##|$)/i);
  if (!ingredientsMatch) return [];

  const ingredientsText = ingredientsMatch[1];
  const lines = ingredientsText.split('\n');
  const ingredients: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    // Match markdown list items (- or *)
    if (trimmed.match(/^[-*]\s+(.+)$/)) {
      const ingredient = trimmed.replace(/^[-*]\s+/, '').trim();
      if (ingredient && !ingredient.startsWith('###')) {
        ingredients.push(ingredient);
      }
    }
  }

  return ingredients;
}

/**
 * Parse instructions from markdown content for schema.org structured data
 */
export function parseInstructions(content: string): Array<{ '@type': string; text: string }> {
  const instructionsMatch = content.match(/## Instructions?\s+([\s\S]*?)(?=##|$)/i);
  if (!instructionsMatch) return [];

  const instructionsText = instructionsMatch[1];
  const lines = instructionsText.split('\n');
  const instructions: Array<{ '@type': string; text: string }> = [];

  for (const line of lines) {
    const trimmed = line.trim();
    // Match numbered list items (1. or 1) format
    const match = trimmed.match(/^\d+[.)]\s+(.+)$/);
    if (match) {
      instructions.push({
        '@type': 'HowToStep',
        text: match[1].trim(),
      });
    }
  }

  return instructions;
}

export function parseRecipeContent(content: string): ParsedRecipeContent {
  const result: ParsedRecipeContent = {
    introduction: '',
    ingredients: [],
    instructions: [],
  };

  // Extract introduction (everything before first ## heading)
  const introMatch = content.match(/^([\s\S]*?)(?=##)/);
  if (introMatch) {
    result.introduction = introMatch[1].trim();
  }

  // Extract Ingredients section (English: "Ingredients" or "Ingredient", Romanian: "Ingrediente")
  const ingredientsMatch = content.match(/## (Ingredients?|Ingrediente)\s+([\s\S]*?)(?=##|$)/i);
  if (ingredientsMatch) {
    const ingredientsText = ingredientsMatch[2];
    const lines = ingredientsText.split('\n');
    let inOptionalSection = false;
    let optionalTitle = '';
    const optionalItems: string[] = [];

    for (const line of lines) {
      const trimmed = line.trim();

      // Check if we're entering an optional section (### subsection)
      const subsectionMatch = trimmed.match(/^###\s+(.+)$/);
      if (subsectionMatch) {
        inOptionalSection = true;
        optionalTitle = subsectionMatch[1].trim();
        continue;
      }

      // Match markdown list items (- or *)
      if (trimmed.match(/^[-*]\s+(.+)$/)) {
        const ingredient = trimmed.replace(/^[-*]\s+/, '').trim();
        if (ingredient) {
          if (inOptionalSection) {
            optionalItems.push(ingredient);
          } else {
            result.ingredients.push(ingredient);
          }
        }
      }
    }

    // Add optional ingredients if any were found
    if (optionalItems.length > 0) {
      result.optionalIngredients = {
        title: optionalTitle,
        items: optionalItems,
      };
    }
  }

  // Extract Instructions section (English: "Instructions" or "Instruction", Romanian: "Instrucțiuni")
  const instructionsMatch = content.match(/## (Instructions?|Instrucțiuni)\s+([\s\S]*?)(?=##|$)/i);
  if (instructionsMatch) {
    const instructionsText = instructionsMatch[2];
    const lines = instructionsText.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      // Match numbered list items (1. or 1) format)
      const match = trimmed.match(/^\d+[.)]\s+(.+)$/);
      if (match) {
        result.instructions.push(match[1].trim());
      }
    }
  }

  // Extract Nutrition section (optional)
  const nutritionMatch = content.match(
    /## (Nutrition Facts?|Valori Nutriționale)\s+([\s\S]*?)(?=##|$)/i
  );
  if (nutritionMatch) {
    result.nutrition = nutritionMatch[2].trim();
  }

  // Extract Tips & Variations section (optional)
  const tipsMatch = content.match(/## Tips? & (Variations?|Variații)\s+([\s\S]*?)(?=##|$)/i);
  if (tipsMatch) {
    result.tips = tipsMatch[2].trim();
  }

  return result;
}
