'use client';

import { motion } from 'framer-motion';

import { IngredientsList } from '@/components/recipe/IngredientsList';
import { InstructionsList } from '@/components/recipe/InstructionsList';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { ParsedRecipeContent } from '@/types';

interface RecipeContentProps {
  parsedContent: ParsedRecipeContent;
  tipsLabel: string;
}

export function RecipeContent({ parsedContent, tipsLabel }: RecipeContentProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
      {/* Left Column: Instructions and Tips */}
      <div className="space-y-8">
        {/* Introduction */}
        {parsedContent.introduction && (
          <motion.div
            className="prose prose-zinc dark:prose-invert max-w-none"
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="text-lg leading-relaxed text-text-secondary">
              {parsedContent.introduction}
            </p>
          </motion.div>
        )}

        {/* Instructions */}
        {parsedContent.instructions.length > 0 && (
          <InstructionsList instructions={parsedContent.instructions} />
        )}

        {/* Tips & Variations */}
        {parsedContent.tips && (
          <motion.div
            className="rounded-xl border border-border bg-surface p-6"
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <h2 className="mb-5 text-2xl font-bold text-text-primary">{tipsLabel}</h2>
            <motion.div
              className="prose prose-zinc dark:prose-invert max-w-none"
              initial={prefersReducedMotion ? undefined : { opacity: 0 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              dangerouslySetInnerHTML={{
                __html: parsedContent.tips
                  .split('\n')
                  .map((line) => {
                    const trimmed = line.trim();
                    if (trimmed.match(/^[-*]\s+(.+)$/)) {
                      const content = trimmed.replace(/^[-*]\s+/, '');
                      return `<li>${content}</li>`;
                    }
                    if (trimmed.match(/^\*\*(.+?)\*\*:\s*(.+)$/)) {
                      const match = trimmed.match(/^\*\*(.+?)\*\*:\s*(.+)$/);
                      if (match) {
                        return `<p><strong>${match[1]}:</strong> ${match[2]}</p>`;
                      }
                    }
                    return trimmed ? `<p>${trimmed}</p>` : '';
                  })
                  .join(''),
              }}
            />
          </motion.div>
        )}
      </div>

      {/* Right Column: Sticky Ingredients */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        {parsedContent.ingredients.length > 0 && (
          <IngredientsList
            ingredients={parsedContent.ingredients}
            optionalIngredients={parsedContent.optionalIngredients}
          />
        )}
      </div>
    </div>
  );
}
