'use client';

import { motion } from 'framer-motion';
import { Clock, DollarSign, Droplet, Dumbbell, Flame, Leaf, Users, Wheat } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { defaultLocale } from '@/i18n/config';
import { Gallery } from '@/components/recipe/Gallery';
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
        className="flex flex-col"
        initial={prefersReducedMotion ? undefined : { opacity: 0, x: 20 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Category Badge */}
        <div className="mb-4">
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
        <h1 className="mb-4 text-3xl font-bold leading-tight text-text-primary md:text-4xl">
          {recipe.title}
        </h1>

        {/* Description */}
        <p className="mb-6 text-lg leading-relaxed text-text-secondary">{recipe.description}</p>

        {/* Tags */}
        {recipe.tags.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
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
                {tag}
              </motion.button>
            ))}
          </div>
        )}

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
            <Users className="h-5 w-5 text-text-secondary" aria-hidden="true" />
            <div>
              <div className="text-xs text-text-secondary">{t('servings')}</div>
              <div className="font-semibold text-text-primary">{recipe.servings}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-text-secondary" aria-hidden="true" />
            <div>
              <div className="text-xs text-text-secondary">{t('nutrition.calories')}</div>
              <div className="font-semibold text-text-primary">
                {recipe.calories} {t('kcal')}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-text-secondary" aria-hidden="true" />
            <div>
              <div className="text-xs text-text-secondary">{t('nutrition.protein')}</div>
              <div className="font-semibold text-text-primary">{recipe.protein} g</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Wheat className="h-5 w-5 text-text-secondary" aria-hidden="true" />
            <div>
              <div className="text-xs text-text-secondary">{t('nutrition.carbs')}</div>
              <div className="font-semibold text-text-primary">{recipe.carbs} g</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Droplet className="h-5 w-5 text-text-secondary" aria-hidden="true" />
            <div>
              <div className="text-xs text-text-secondary">{t('nutrition.fat')}</div>
              <div className="font-semibold text-text-primary">{recipe.fat} g</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-text-secondary" aria-hidden="true" />
            <div>
              <div className="text-xs text-text-secondary">{t('nutrition.fiber')}</div>
              <div className="font-semibold text-text-primary">{recipe.fiber} g</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-text-secondary" aria-hidden="true" />
            <div>
              <div className="text-xs text-text-secondary">{t('price')}</div>
              <div className="font-semibold text-text-primary">
                {locale === 'ro' ? `${recipe.price} RON` : `$${recipe.price}`}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
