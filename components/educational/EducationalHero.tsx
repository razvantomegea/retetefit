'use client';

import { motion } from 'framer-motion';
import { BookOpen, Calendar, User } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';
import type { EducationalArticle } from '@/types';

interface EducationalHeroProps {
  article: EducationalArticle;
  className?: string;
}

export function EducationalHero({ article, className }: EducationalHeroProps) {
  const t = useTranslations('educational');
  const prefersReducedMotion = useReducedMotion();

  const formattedDate = new Date(article.publishedAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={cn('space-y-8', className)}>
      {/* Title and Description */}
      <motion.div
        className="space-y-4"
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <h1 className="text-4xl font-bold leading-tight text-text-primary md:text-5xl lg:text-6xl">
          {article.title}
        </h1>
        <p className="text-xl leading-relaxed text-text-secondary md:text-2xl">
          {article.description}
        </p>
      </motion.div>

      {/* Meta Information */}
      <motion.div
        className="flex flex-wrap items-center gap-4 text-sm text-text-secondary"
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" aria-hidden="true" />
          <span>
            {t('publishedOn')} {formattedDate}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" aria-hidden="true" />
          <span>
            {t('author')}: {article.author}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" aria-hidden="true" />
          <span>{t('readingTime', { minutes: article.readingTime })}</span>
        </div>
      </motion.div>

      {/* Hero Image */}
      <motion.div
        className="relative aspect-video w-full overflow-hidden rounded-2xl bg-zinc-200 shadow-xl dark:bg-zinc-800"
        initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.95 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px"
        />
      </motion.div>
    </div>
  );
}

