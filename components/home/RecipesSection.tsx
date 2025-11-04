'use client';

import { motion, type Variants } from 'framer-motion';
import { Clock, Leaf, TrendingDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

import { useReducedMotion } from '@/hooks/useReducedMotion';

// Recipe data structure
interface RecipeNutrition {
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  fiber?: number; // in grams
}

interface Recipe {
  id: string;
  slug: string;
  title: string;
  description?: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  prepTime: number; // in minutes
  calories: number;
  image: string;
  nutrition?: RecipeNutrition;
}

// Sample recipe data
const SAMPLE_RECIPES: Recipe[] = [
  {
    id: '1',
    slug: 'clatite-proteice-cu-banane',
    title: 'Clătite Proteice cu Banane',
    description: 'Clătite delicioase și bogate în proteine, perfecte pentru micul dejun',
    category: 'breakfast',
    prepTime: 25,
    calories: 280,
    image: '/hero.png',
    nutrition: {
      protein: 22,
      carbs: 32,
      fat: 6,
      fiber: 4,
    },
  },
  {
    id: '2',
    slug: 'pui-teriyaki-cu-quinoa',
    title: 'Pui Teriyaki cu Quinoa',
    description: 'Pui aromat teriyaki servit cu quinoa și legume proaspete',
    category: 'lunch',
    prepTime: 30,
    calories: 350,
    image: '/hero.png',
    nutrition: {
      protein: 35,
      carbs: 42,
      fat: 8,
      fiber: 5,
    },
  },
  {
    id: '3',
    slug: 'salata-caesar-cu-pui',
    title: 'Salată Caesar cu Pui',
    description: 'Salată clasică Caesar cu piept de pui grătar și dressing ușor',
    category: 'lunch',
    prepTime: 20,
    calories: 250,
    image: '/hero.png',
    nutrition: {
      protein: 28,
      carbs: 18,
      fat: 9,
      fiber: 3,
    },
  },
  {
    id: '4',
    slug: 'overnight-oats-cu-fructe-de-padure',
    title: 'Overnight Oats cu Fructe de Pădure',
    description: 'Orez cremos preparat peste noapte cu fructe de pădure și miere',
    category: 'breakfast',
    prepTime: 10,
    calories: 220,
    image: '/hero.png',
    nutrition: {
      protein: 12,
      carbs: 38,
      fat: 5,
      fiber: 6,
    },
  },
  {
    id: '5',
    slug: 'bowl-buddha-mediteranean',
    title: 'Bowl Buddha Mediteranean',
    description: 'Bowl colorat cu legume, hummus, quinoa și dressing mediteranean',
    category: 'dinner',
    prepTime: 35,
    calories: 320,
    image: '/hero.png',
    nutrition: {
      protein: 18,
      carbs: 45,
      fat: 10,
      fiber: 8,
    },
  },
  {
    id: '6',
    slug: 'smoothie-verde-detox',
    title: 'Smoothie Verde Detox',
    description: 'Smoothie revigorant cu spanac, banana, mango și proteine',
    category: 'snack',
    prepTime: 5,
    calories: 180,
    image: '/hero.png',
    nutrition: {
      protein: 15,
      carbs: 28,
      fat: 3,
      fiber: 5,
    },
  },
];

// Category badge label mapping
const getCategoryLabel = (
  category: Recipe['category'],
  t: ReturnType<typeof useTranslations<'recipes'>>
) => {
  return t(`categories.${category}`);
};

// Recipe Card Component
interface RecipeCardProps {
  recipe: Recipe;
  index: number;
  locale: string;
  variants: Variants;
  prefersReducedMotion: boolean;
  t: ReturnType<typeof useTranslations>;
}

function RecipeCard({ recipe, index, locale, variants, prefersReducedMotion, t }: RecipeCardProps) {
  const isPriority = index < 3; // First 3 cards load with priority

  // Card hover and tap variants
  const cardVariants: Variants = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.02, y: -8, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
    tap: { scale: 0.98, transition: { duration: 0.2 } },
  };

  // Icon hover animations (using whileHover directly, not variants)
  const iconHoverAnimations = {
    clock: { rotate: 12, scale: 1.1, transition: { duration: 0.3 } },
    trend: { y: 2, transition: { duration: 0.3, ease: 'easeOut' as const } },
    leaf: { rotate: [0, -5, 5, -5, 0], transition: { duration: 0.8 } },
  };

  // Nutrition stats stagger animation
  const nutritionContainerVariants: Variants = {
    rest: {},
    hover: { transition: { staggerChildren: 0.08 } },
  };

  const nutritionItemVariants: Variants = {
    rest: { y: 0, scale: 1 },
    hover: { y: -2, scale: 1.05, transition: { duration: 0.3 } },
  };

  // Metadata stagger animation
  const metadataContainerVariants: Variants = {
    rest: {},
    hover: { transition: { staggerChildren: 0.05 } },
  };

  const metadataItemVariants: Variants = {
    rest: { opacity: 1, x: 0 },
    hover: { opacity: 1, x: 2, transition: { duration: 0.25 } },
  };

  return (
    <motion.article variants={variants} className="h-full">
      <motion.div
        variants={prefersReducedMotion ? undefined : cardVariants}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        className="h-full"
      >
        <Link
          href={`/${locale}/recipes/${recipe.slug}`}
          className="group block h-full rounded-xl border border-border bg-surface transition-all duration-200 ease-in-out hover:border-green-500 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background relative overflow-hidden before:absolute before:inset-0 before:rounded-xl before:border before:border-transparent before:transition-all before:duration-300 hover:before:border-green-500 hover:before:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
          aria-label={`${recipe.title} - ${t('viewRecipe')}`}
          style={{ willChange: 'transform' }}
        >
          {/* Image Container with Category Badge */}
          <div className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-zinc-200 dark:bg-zinc-800">
            {/* Animated gradient overlay */}
            {!prefersReducedMotion && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 z-10"
                initial={false}
                transition={{ duration: 0.3 }}
              />
            )}
            <Image
              src={recipe.image}
              alt={`${recipe.title} - ${recipe.description || ''}`}
              fill
              priority={isPriority}
              loading={isPriority ? undefined : 'lazy'}
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{ willChange: 'transform' }}
            />
            {/* Category Badge with hover animation */}
            <div className="absolute top-3 left-3 z-20">
              <motion.span
                className="inline-flex items-center rounded-md bg-white/90 px-3 py-1 text-xs font-semibold text-green-700 backdrop-blur-sm dark:bg-zinc-900/90 dark:text-green-400"
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        scale: 1.05,
                        boxShadow: '0 0 12px rgba(34, 197, 94, 0.4)',
                        transition: { duration: 0.3 },
                      }
                }
              >
                {getCategoryLabel(recipe.category, t)}
              </motion.span>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-5">
            {/* Recipe Title */}
            {prefersReducedMotion ? (
              <h3 className="mb-3 line-clamp-2 text-xl font-semibold leading-tight text-text-primary transition-colors duration-200 group-hover:text-green-600 dark:group-hover:text-green-400">
                {recipe.title}
              </h3>
            ) : (
              <motion.h3
                className="mb-3 line-clamp-2 text-xl font-semibold leading-tight text-text-primary transition-colors duration-200 group-hover:text-green-600 dark:group-hover:text-green-400"
                whileHover={{ x: 2, transition: { duration: 0.3 } }}
              >
                {recipe.title}
              </motion.h3>
            )}

            {/* Recipe Meta Info */}
            <motion.div
              className="mb-4 flex flex-wrap items-center gap-4 text-sm text-text-tertiary"
              variants={prefersReducedMotion ? undefined : metadataContainerVariants}
              initial="rest"
              whileHover="hover"
            >
              {/* Prep Time with Clock rotation */}
              <motion.div
                className="flex items-center gap-1.5"
                variants={prefersReducedMotion ? undefined : metadataItemVariants}
              >
                {prefersReducedMotion ? (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                  </div>
                ) : (
                  <motion.div whileHover={iconHoverAnimations.clock} className="flex items-center">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                  </motion.div>
                )}
                <span>
                  &lt; {recipe.prepTime} {t('min')}
                </span>
              </motion.div>

              {/* Calories with TrendingDown bounce */}
              <motion.div
                className="flex items-center gap-1.5"
                variants={prefersReducedMotion ? undefined : metadataItemVariants}
              >
                {prefersReducedMotion ? (
                  <div className="flex items-center">
                    <TrendingDown className="h-4 w-4" aria-hidden="true" />
                  </div>
                ) : (
                  <motion.div whileHover={iconHoverAnimations.trend} className="flex items-center">
                    <TrendingDown className="h-4 w-4" aria-hidden="true" />
                  </motion.div>
                )}
                <span>
                  {recipe.calories} {t('kcal')}
                </span>
              </motion.div>

              {/* Low Calorie with Leaf wiggle */}
              {recipe.calories < 300 && (
                <motion.div
                  className="flex items-center gap-1.5"
                  variants={prefersReducedMotion ? undefined : metadataItemVariants}
                >
                  {prefersReducedMotion ? (
                    <div className="flex items-center">
                      <Leaf className="h-4 w-4" aria-hidden="true" />
                    </div>
                  ) : (
                    <motion.div whileHover={iconHoverAnimations.leaf} className="flex items-center">
                      <Leaf className="h-4 w-4" aria-hidden="true" />
                    </motion.div>
                  )}
                  <span>{t('lowCalorie')}</span>
                </motion.div>
              )}
            </motion.div>

            {/* Nutrition Quick View */}
            {recipe.nutrition && (
              <motion.div
                className="grid grid-cols-4 gap-2 border-t border-border pt-4"
                variants={prefersReducedMotion ? undefined : nutritionContainerVariants}
                initial="rest"
                whileHover="hover"
              >
                <motion.div
                  className="text-center"
                  variants={prefersReducedMotion ? undefined : nutritionItemVariants}
                >
                  <div className="text-xs font-semibold text-text-primary">
                    {recipe.nutrition.protein}g
                  </div>
                  <div className="text-xs text-text-tertiary">{t('nutrition.protein')}</div>
                </motion.div>
                <motion.div
                  className="text-center"
                  variants={prefersReducedMotion ? undefined : nutritionItemVariants}
                >
                  <div className="text-xs font-semibold text-text-primary">
                    {recipe.nutrition.carbs}g
                  </div>
                  <div className="text-xs text-text-tertiary">{t('nutrition.carbs')}</div>
                </motion.div>
                <motion.div
                  className="text-center"
                  variants={prefersReducedMotion ? undefined : nutritionItemVariants}
                >
                  <div className="text-xs font-semibold text-text-primary">
                    {recipe.nutrition.fat}g
                  </div>
                  <div className="text-xs text-text-tertiary">{t('nutrition.fat')}</div>
                </motion.div>
                <motion.div
                  className="text-center"
                  variants={prefersReducedMotion ? undefined : nutritionItemVariants}
                >
                  <div className="text-xs font-semibold text-text-primary">{recipe.calories}</div>
                  <div className="text-xs text-text-tertiary">{t('nutrition.calories')}</div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </Link>
      </motion.div>
    </motion.article>
  );
}

// Main RecipesSection Component
export function RecipesSection() {
  const t = useTranslations('recipes');
  const params = useParams();
  const locale = (params?.locale as string) || 'ro';
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Animation variants matching Hero component patterns
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
        delayChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.2 : 0.6,
        ease: [0.4, 0, 0.2, 1], // cubic-bezier ease-in-out
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="recipes"
      className="bg-background px-6 py-12 md:px-8 md:py-16"
      aria-labelledby="recipes-heading"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Section Header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
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
          {SAMPLE_RECIPES.map((recipe, index) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              index={index}
              locale={locale}
              variants={itemVariants}
              prefersReducedMotion={prefersReducedMotion}
              t={t}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
