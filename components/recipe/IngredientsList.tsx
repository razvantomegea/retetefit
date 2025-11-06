'use client';

import { motion, type Variants } from 'framer-motion';
import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

interface IngredientsListProps {
  ingredients: string[];
  optionalIngredients?: {
    title: string;
    items: string[];
  };
  className?: string;
}

export function IngredientsList({
  ingredients,
  optionalIngredients,
  className,
}: IngredientsListProps) {
  const t = useTranslations('recipes');
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const prefersReducedMotion = useReducedMotion();

  const toggleItem = (index: number) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedItems(newChecked);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: prefersReducedMotion ? 0.2 : 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <motion.div
      className={cn('rounded-xl border border-border bg-surface p-6', className)}
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <h2 className="mb-5 text-2xl font-bold text-text-primary">{t('ingredients')}</h2>

      <motion.ul
        className="list-none space-y-0 p-0"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {ingredients.map((ingredient, index) => {
          const isChecked = checkedItems.has(index);

          return (
            <motion.li
              key={index}
              variants={itemVariants}
              className={cn(
                'flex items-start gap-3 rounded-lg p-3 transition-colors',
                'hover:bg-surface-elevated',
                isChecked && 'opacity-75'
              )}
            >
              <motion.button
                type="button"
                onClick={() => toggleItem(index)}
                className={cn(
                  'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2',
                  isChecked
                    ? 'border-green-500 bg-green-500 text-white'
                    : 'border-zinc-300 bg-background dark:border-zinc-600'
                )}
                aria-label={`${isChecked ? 'Uncheck' : 'Check'} ingredient ${index + 1}`}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  initial={false}
                  animate={{ scale: isChecked ? 1 : 0, opacity: isChecked ? 1 : 0 }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Check className="h-3 w-3" />
                </motion.div>
              </motion.button>
              <motion.span
                className={cn(
                  'flex-1 text-base leading-relaxed text-text-primary',
                  isChecked && 'line-through text-text-tertiary'
                )}
                animate={{ opacity: isChecked ? 0.6 : 1 }}
                transition={{ duration: 0.2 }}
              >
                {ingredient}
              </motion.span>
            </motion.li>
          );
        })}
      </motion.ul>

      {/* Optional Ingredients Section */}
      {optionalIngredients && optionalIngredients.items.length > 0 && (
        <motion.div
          className="mt-6 pt-6 border-t border-border"
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <h3 className="mb-4 text-lg font-semibold text-text-primary">
            {optionalIngredients.title}
          </h3>
          <motion.ul
            className="list-none space-y-0 p-0"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {optionalIngredients.items.map((ingredient, index) => {
              const adjustedIndex = ingredients.length + index;
              const isChecked = checkedItems.has(adjustedIndex);

              return (
                <motion.li
                  key={adjustedIndex}
                  variants={itemVariants}
                  className={cn(
                    'flex items-start gap-3 rounded-lg p-3 transition-colors',
                    'hover:bg-surface-elevated',
                    isChecked && 'opacity-75'
                  )}
                >
                  <motion.button
                    type="button"
                    onClick={() => toggleItem(adjustedIndex)}
                    className={cn(
                      'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2',
                      isChecked
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-zinc-300 bg-background dark:border-zinc-600'
                    )}
                    aria-label={`${isChecked ? 'Uncheck' : 'Check'} optional ingredient ${index + 1}`}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.div
                      initial={false}
                      animate={{ scale: isChecked ? 1 : 0, opacity: isChecked ? 1 : 0 }}
                      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <Check className="h-3 w-3" />
                    </motion.div>
                  </motion.button>
                  <motion.span
                    className={cn(
                      'flex-1 text-base leading-relaxed text-text-secondary',
                      isChecked && 'line-through text-text-tertiary'
                    )}
                    animate={{ opacity: isChecked ? 0.6 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {ingredient}
                  </motion.span>
                </motion.li>
              );
            })}
          </motion.ul>
        </motion.div>
      )}
    </motion.div>
  );
}
