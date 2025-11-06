'use client';

import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { getCategorySlug } from '@/lib/navigation';
import type { Category } from '@/types';

interface CategoryWithCount {
  id: string;
  category: Category;
  count: number;
}

interface CategoriesGridProps {
  categories: CategoryWithCount[];
}

export function CategoriesGrid({ categories }: CategoriesGridProps) {
  const params = useParams();
  const locale = (params?.locale as string) || 'ro';
  const t = useTranslations('categories');
  const tRecipes = useTranslations('recipes');
  const prefersReducedMotion = useReducedMotion();

  // Animation variants for beautiful staggered reveal
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.2,
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

  return (
    <>
      {/* Header */}
      <motion.div
        className="mb-12 text-center"
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0.2 : 0.6,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <h1 className="mb-4 text-4xl font-bold text-text-primary md:text-5xl">{t('title')}</h1>
        <p className="mx-auto max-w-2xl text-lg text-text-secondary">{t('subtitle')}</p>
      </motion.div>

      {/* Categories Grid */}
      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {categories.map((category) => {
          const categorySlug = getCategorySlug(category.category);
          // Map category enum to translation key format (high-protein -> highProtein)
          const categoryKey = category.category.replace(/-([a-z])/g, (_, letter) =>
            letter.toUpperCase()
          );

          const categoryLabel = tRecipes(`categories.${categoryKey}`);

          return (
            <motion.div key={category.id} variants={itemVariants}>
              <Link href={`/${locale}/${categorySlug}`} className="block h-full">
                <motion.div
                  className="group relative h-full overflow-hidden rounded-xl border border-border bg-surface p-8 transition-colors duration-200 hover:border-green-500"
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] as const }}
                >
                  <div className="relative z-10">
                    <h2 className="mb-2 text-2xl font-bold text-text-primary">{categoryLabel}</h2>
                    <p className="mb-4 text-text-secondary">
                      {t('recipes', { count: category.count })}
                    </p>
                    <span className="inline-flex items-center text-sm font-semibold text-accent-primary">
                      {t('viewRecipes')} →
                    </span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );
}
