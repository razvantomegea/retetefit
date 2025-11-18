'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

import { IngredientsList } from '@/components/recipe/IngredientsList';
import { InstructionsList } from '@/components/recipe/InstructionsList';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { enhanceAnchorProps } from '@/lib/external-links';
import type { ParsedRecipeContent } from '@/types';

interface RecipeContentProps {
  parsedContent: ParsedRecipeContent;
  tipsLabel: string;
}

export function RecipeContent({ parsedContent, tipsLabel }: RecipeContentProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
      {/* Ingredients Column */}
      <div className="order-first lg:order-last lg:sticky lg:top-24 lg:self-start">
        {parsedContent.ingredients.length > 0 && (
          <IngredientsList
            ingredients={parsedContent.ingredients}
            optionalIngredients={parsedContent.optionalIngredients}
          />
        )}
      </div>

      {/* Instructions Column */}
      <div className="order-last lg:order-first">
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
              <ReactMarkdown
                components={{
                  p: ({ ...props }) => (
                    <p className="text-lg leading-relaxed text-text-secondary" {...props} />
                  ),
                  a: ({ ...props }) => {
                    const enhancedProps = enhanceAnchorProps(props);
                    return (
                      <a
                        className="text-green-600 dark:text-green-400 hover:underline font-medium"
                        {...enhancedProps}
                      />
                    );
                  },
                }}
              >
                {parsedContent.introduction}
              </ReactMarkdown>
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
              >
                <ReactMarkdown
                  components={{
                    a: ({ ...props }) => {
                      const enhancedProps = enhanceAnchorProps(props);
                      return (
                        <a
                          className="text-green-600 dark:text-green-400 hover:underline font-medium"
                          {...enhancedProps}
                        />
                      );
                    },
                  }}
                >
                  {parsedContent.tips}
                </ReactMarkdown>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
