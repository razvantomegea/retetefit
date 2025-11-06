'use client';

import { motion } from 'framer-motion';
import { Clock, Droplet, Dumbbell, Flame, Leaf, Wheat } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { getCategorySlug } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import type { RecipeMetadata } from '@/types';

interface RecipeCardProps {
  recipe: RecipeMetadata;
  className?: string;
}

export function RecipeCard({ recipe, className }: RecipeCardProps) {
  const params = useParams();
  const locale = (params?.locale as string) || 'ro';
  const t = useTranslations('recipes');
  const categorySlug = getCategorySlug(recipe.category);

  // Content reveal animations with stagger
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1] as const,
          },
        },
      }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] as const }}
      className="h-full group"
    >
      <Link
        href={`/${locale}/${categorySlug}/${recipe.slug}`}
        className={cn(
          'block h-full rounded-xl border border-border bg-surface transition-all duration-200 ease-in-out',
          'hover:border-green-500 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2',
          'relative overflow-hidden',
          className
        )}
        aria-label={`${recipe.title} - ${t('viewRecipe')}`}
      >
        {/* Image Container with Category Badge */}
        <motion.div
          className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-zinc-200 dark:bg-zinc-800"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] as const, delay: 0.1 }}
        >
          <div
            className="relative h-full w-full transition-transform duration-400 group-hover:scale-105"
            style={{
              transformOrigin: 'center center',
              transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            <Image
              src={recipe.image}
              alt={recipe.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          {/* Category Badge */}
          <motion.div
            className="absolute left-3 top-3 rounded-md bg-badge-category-bg text-badge-category-text border border-badge-category-border px-3 py-1 text-xs font-semibold backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] as const, delay: 0.3 }}
          >
            {t(
              `categories.${recipe.category.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())}`
            )}
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div className="p-5" variants={contentVariants} initial="hidden" animate="visible">
          {/* Title */}
          <motion.h3
            variants={itemVariants}
            className="mb-3 line-clamp-2 text-xl font-semibold leading-tight text-text-primary"
          >
            {recipe.title}
          </motion.h3>

          {/* Description */}
          {recipe.description && (
            <motion.p
              variants={itemVariants}
              className="mb-4 line-clamp-2 text-sm text-text-secondary"
            >
              {recipe.description}
            </motion.p>
          )}

          {/* Meta Info */}
          <motion.div
            variants={itemVariants}
            className="mb-4 flex items-center gap-4 text-sm text-text-tertiary"
          >
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" />
              <span>
                {recipe.cookTime} {t('min')}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Flame className="h-4 w-4" aria-hidden="true" />
              <span>
                {recipe.calories} {t('kcal')}
              </span>
            </div>
          </motion.div>

          {/* Nutrition Quick View */}
          <motion.div variants={itemVariants} className="grid grid-cols-4 gap-2">
            {[
              {
                value: recipe.protein,
                label: t('nutrition.protein'),
                icon: <Dumbbell className="h-3.5 w-3.5" />,
              },
              {
                value: recipe.carbs,
                label: t('nutrition.carbs'),
                icon: <Wheat className="h-3.5 w-3.5" />,
              },
              {
                value: recipe.fat,
                label: t('nutrition.fat'),
                icon: <Droplet className="h-3.5 w-3.5" />,
              },
              {
                value: recipe.fiber,
                label: t('nutrition.fiber'),
                icon: <Leaf className="h-3.5 w-3.5" />,
              },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1">
                <div className="text-xs text-text-tertiary line-clamp-1">{item.icon}</div>
                <div className="text-xs font-semibold text-text-primary">{item.value}g</div>
                <div className="text-xs text-text-tertiary line-clamp-1">{item.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
