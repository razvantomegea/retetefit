'use client';

import { motion, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { RecipeCard } from '@/components/recipe/RecipeCard';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { RecipeMetadata } from '@/types';

interface RecipesSectionProps {
  recipes: RecipeMetadata[];
}

// Main RecipesSection Component
export function RecipesSection({ recipes }: RecipesSectionProps) {
  const t = useTranslations('recipes');
  const prefersReducedMotion = useReducedMotion();

  // Animation variants for beautiful staggered reveal
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.12,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.2 : 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  if (recipes.length === 0) {
    return null;
  }

  return (
    <section
      id="recipes"
      className="bg-background px-6 py-12 md:px-8 md:py-16"
      aria-labelledby="recipes-heading"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Section Header */}
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0.2 : 0.7,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="mb-8 text-center md:mb-12"
        >
          <h2
            id="recipes-heading"
            className="mb-4 text-3xl font-bold text-text-primary md:text-4xl"
          >
            {t('title')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-text-secondary">{t('subtitle')}</p>
        </motion.div>

        {/* Recipe Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
        >
          {recipes.map((recipe) => (
            <motion.div key={recipe.slug} variants={itemVariants}>
              <RecipeCard recipe={recipe} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
