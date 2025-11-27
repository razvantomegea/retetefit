'use client';

import { motion } from 'framer-motion';
import {
  Clock,
  DollarSign,
  Droplet,
  Dumbbell,
  Flame,
  Leaf,
  Scale,
  Users,
  Wheat,
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Gallery } from '@/components/recipe/Gallery';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { defaultLocale } from '@/i18n/config';
import { getCategorySlug } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import type { Recipe } from '@/types';

interface RecipeHeroProps {
  recipe: Recipe;
  className?: string;
}

export function RecipeHero({ recipe, className }: RecipeHeroProps) {
  const t = useTranslations('recipes');
  const prefersReducedMotion = useReducedMotion();
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || defaultLocale;
  const tagsDictionary = (t.raw('tags') as Record<string, string> | undefined) ?? {};

  type NutritionView = 'per-serving' | 'per-100g';
  const [nutritionView, setNutritionView] = useState<NutritionView>('per-serving');

  const handleNutritionViewChange = (view: NutritionView) => {
    setNutritionView(view);
  };

  const calculatePer100g = () => {
    const weightPerServing = Math.max(recipe.weight, 1);
    const totalWeight = weightPerServing * recipe.servings;
    const factor = 100 / weightPerServing;

    return {
      calories: Math.round(recipe.calories * factor),
      protein: Math.round(recipe.protein * factor),
      carbs: Math.round(recipe.carbs * factor),
      fat: Math.round(recipe.fat * factor),
      fiber: Math.round(recipe.fiber * factor),
      price: Math.round(((recipe.price / weightPerServing) * 100 + Number.EPSILON) * 100) / 100,
      totalWeight,
    };
  };

  const per100gValues = calculatePer100g();

  const translateTag = (tag: string) => {
    const normalizedTag = tag.trim().toLowerCase();
    const camelCasedTag = normalizedTag.replace(/[-_\s]+([a-z0-9])/g, (_: string, letter: string) =>
      letter.toUpperCase()
    );

    return (
      tagsDictionary[normalizedTag] ?? tagsDictionary[camelCasedTag] ?? tagsDictionary[tag] ?? tag
    );
  };

  // Reusable badge animations
  const badgeHoverAnimation = prefersReducedMotion
    ? undefined
    : {
        scale: 1.05,
        y: -1,
        transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] as const },
      };

  const badgeTapAnimation = prefersReducedMotion
    ? undefined
    : {
        scale: 0.95,
        y: 0,
        transition: { duration: 0.1 },
      };

  const handleTagClick = (tag: string) => {
    // Navigate to search with tag as query
    const searchPath = locale ? `/${locale}/search` : '/search';
    router.push(`${searchPath}?q=${encodeURIComponent(tag)}`);
  };

  return (
    <div className={cn('grid gap-8 lg:grid-cols-2 lg:gap-12', className)}>
      {/* Gallery */}
      <motion.div
        initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.95 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <Gallery
          mainImage={recipe.image}
          mainImageAlt={recipe.imageAlt}
          galleryImages={recipe.galleryImages}
        />
      </motion.div>

      {/* Info */}
      <motion.div
        className="flex flex-col gap-4"
        initial={prefersReducedMotion ? undefined : { opacity: 0, x: 20 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Category Badge */}
        <div>
          <Link href={`/${locale}/${getCategorySlug(recipe.category)}`}>
            <motion.span
              className="inline-block rounded-md bg-badge-category-bg text-badge-category-text border border-badge-category-border px-3 py-1 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
              whileHover={badgeHoverAnimation}
              whileTap={badgeTapAnimation}
            >
              {t(
                `categories.${recipe.category.replace(/-([a-z])/g, (_: string, letter: string) => letter.toUpperCase())}`
              )}
            </motion.span>
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold leading-tight text-text-primary md:text-4xl">
          {recipe.title}
        </h1>

        {/* Description */}
        <p className="mb-2 text-lg leading-relaxed text-text-secondary">{recipe.description}</p>

        {/* Tags */}
        {recipe.tags.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {recipe.tags.map((tag: string) => (
              <motion.button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="rounded-md bg-badge-tag-bg text-badge-tag-text border border-badge-tag-border px-3 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
                initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.8 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
                whileHover={badgeHoverAnimation}
                whileTap={badgeTapAnimation}
              >
                {translateTag(tag)}
              </motion.button>
            ))}
          </div>
        )}

        {/* Nutrition View Toggle */}
        <motion.div
          className="flex items-center justify-between mb-4"
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="text-lg font-semibold text-text-primary">{t('nutritionFacts')}</h2>
          <div
            className="flex bg-secondary rounded-full p-1 gap-0.5 dark:ring-1 dark:ring-border/50 dark:bg-muted/30"
            role="group"
            aria-label={t('nutritionInfoLabel')}
          >
            <button
              type="button"
              onClick={() => handleNutritionViewChange('per-serving')}
              className={cn(
                'px-3 py-1.5 text-sm rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer',
                nutritionView === 'per-serving'
                  ? 'bg-primary text-primary-foreground font-bold'
                  : 'text-text-secondary hover:text-text-primary dark:hover:bg-muted/50 font-medium'
              )}
              aria-pressed={nutritionView === 'per-serving'}
            >
              {t('nutritionView.perServing')}
            </button>
            <button
              type="button"
              onClick={() => handleNutritionViewChange('per-100g')}
              className={cn(
                'px-3 py-1.5 text-sm rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer',
                nutritionView === 'per-100g'
                  ? 'bg-primary text-primary-foreground font-bold'
                  : 'text-text-secondary hover:text-text-primary dark:hover:bg-muted/50 font-medium'
              )}
              aria-pressed={nutritionView === 'per-100g'}
            >
              {t('nutritionView.per100g')}
            </button>
          </div>
        </motion.div>

        {/* Meta Grid */}
        <motion.div
          className="grid grid-cols-3 gap-4"
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-text-secondary" aria-hidden="true" />
            <div>
              <div className="text-xs text-text-secondary">{t('cookTime')}</div>
              <div className="font-semibold text-text-primary">
                {recipe.cookTime} {t('min')}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {nutritionView === 'per-serving' ? (
              <Users className="h-5 w-5 text-text-secondary" aria-hidden="true" />
            ) : (
              <Scale className="h-5 w-5 text-text-secondary" aria-hidden="true" />
            )}
            <div>
              <div className="text-xs text-text-secondary">
                {nutritionView === 'per-serving' ? t('servings') : t('totalWeight')}
              </div>
              <div className="font-semibold text-text-primary">
                {nutritionView === 'per-serving'
                  ? recipe.servings
                  : `${per100gValues.totalWeight} g`}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-text-secondary" aria-hidden="true" />
            <div>
              <div className="text-xs text-text-secondary">{t('nutrition.calories')}</div>
              <div className="font-semibold text-text-primary">
                {nutritionView === 'per-serving' ? recipe.calories : per100gValues.calories}{' '}
                {t('kcal')}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-text-secondary" aria-hidden="true" />
            <div>
              <div className="text-xs text-text-secondary">{t('nutrition.protein')}</div>
              <div className="font-semibold text-text-primary">
                {nutritionView === 'per-serving' ? recipe.protein : per100gValues.protein} g
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Wheat className="h-5 w-5 text-text-secondary" aria-hidden="true" />
            <div>
              <div className="text-xs text-text-secondary">{t('nutrition.carbs')}</div>
              <div className="font-semibold text-text-primary">
                {nutritionView === 'per-serving' ? recipe.carbs : per100gValues.carbs} g
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Droplet className="h-5 w-5 text-text-secondary" aria-hidden="true" />
            <div>
              <div className="text-xs text-text-secondary">{t('nutrition.fat')}</div>
              <div className="font-semibold text-text-primary">
                {nutritionView === 'per-serving' ? recipe.fat : per100gValues.fat} g
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-text-secondary" aria-hidden="true" />
            <div>
              <div className="text-xs text-text-secondary">{t('nutrition.fiber')}</div>
              <div className="font-semibold text-text-primary">
                {nutritionView === 'per-serving' ? recipe.fiber : per100gValues.fiber} g
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-text-secondary" aria-hidden="true" />
            <div>
              <div className="text-xs text-text-secondary">{t('price')}</div>
              <div className="font-semibold text-text-primary">
                {nutritionView === 'per-serving'
                  ? locale === 'ro'
                    ? `${recipe.price} RON`
                    : `$${recipe.price}`
                  : locale === 'ro'
                    ? `${per100gValues.price.toFixed(2)} RON`
                    : `$${per100gValues.price.toFixed(2)}`}
              </div>
            </div>
          </div>

          {nutritionView === 'per-serving' && (
            <div className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-text-secondary" aria-hidden="true" />
              <div>
                <div className="text-xs text-text-secondary">{t('weight')}</div>
                <div className="font-semibold text-text-primary">{recipe.weight} g</div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
