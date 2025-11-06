'use client';

import { motion, type Variants } from 'framer-motion';
import { ArrowDown, Clock, Leaf, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { useReducedMotion } from '@/hooks/useReducedMotion';

export function Hero() {
  const t = useTranslations('hero');
  const prefersReducedMotion = useReducedMotion();

  // Smooth scroll handler
  const handleScrollToRecipes = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const recipesSection = document.getElementById('recipes');
    if (recipesSection) {
      recipesSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // Animation variants for staggered entrance
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : {
            staggerChildren: 0.15,
            delayChildren: 0.1,
          },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : {
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1], // cubic-bezier ease-in-out
          },
    },
  };

  const iconVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: prefersReducedMotion ? 1 : 0.8,
      rotate: prefersReducedMotion ? 0 : -10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : {
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1],
          },
    },
    hover: {
      scale: prefersReducedMotion ? 1 : 1.1,
      rotate: prefersReducedMotion ? 0 : 5,
      transition: {
        duration: 0.2,
      },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : {
            duration: 0.8,
            delay: 0.4,
            ease: [0.4, 0, 0.2, 1],
          },
    },
  };

  const scrollIndicatorVariants: Variants = {
    initial: { opacity: 0, y: -10 },
    animate: {
      opacity: prefersReducedMotion ? 0.4 : [0.3, 0.5, 0.3],
      y: prefersReducedMotion ? 0 : [0, 6, 0],
      transition: {
        opacity: prefersReducedMotion
          ? { delay: 1, duration: 0.5 }
          : { delay: 1.5, duration: 2, repeat: Infinity, ease: 'easeInOut' },
        y: prefersReducedMotion
          ? { delay: 1, duration: 0.5 }
          : {
              delay: 1.5,
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            },
      },
    },
  };

  return (
    <section
      className="relative md:min-h-[calc(100vh-120px)] flex flex-col items-center justify-center overflow-hidden bg-linear-to-b from-surface to-background px-6 py-12 text-center md:grid md:grid-cols-2 md:items-center md:gap-12 md:px-8 md:py-20"
      aria-label="Hero section"
    >
      {/* Subtle animated background gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-green-50/30 via-transparent to-transparent dark:from-green-950/20" />

      {/* Decorative floating icons with subtle animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-4 md:left-10 text-green-500/20 dark:text-green-400/10"
          animate={
            prefersReducedMotion
              ? { y: 0, rotate: 0 }
              : {
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
        >
          <Leaf className="h-8 w-8 md:h-12 md:w-12" aria-hidden="true" />
        </motion.div>
        <motion.div
          className="absolute top-32 right-8 md:right-16 text-green-500/20 dark:text-green-400/10"
          animate={
            prefersReducedMotion
              ? { y: 0, rotate: 0 }
              : {
                  y: [0, 10, 0],
                  rotate: [0, -5, 0],
                }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }
          }
        >
          <Sparkles className="h-6 w-6 md:h-10 md:w-10" aria-hidden="true" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-1/4 text-green-500/20 dark:text-green-400/10"
          animate={
            prefersReducedMotion
              ? { y: 0, rotate: 0 }
              : {
                  y: [0, -8, 0],
                  rotate: [0, 3, 0],
                }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 2,
                }
          }
        >
          <Clock className="h-7 w-7 md:h-9 md:w-9" aria-hidden="true" />
        </motion.div>
      </div>

      {/* Main content container */}
      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-8 md:max-w-none md:items-start md:text-left"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Title */}
        <motion.h1
          className="text-5xl font-normal leading-tight tracking-tight dark:font-normal md:text-6xl"
          variants={itemVariants}
          style={{ lineHeight: 1.1, color: 'var(--text-primary)' }}
        >
          {t('title')}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mx-auto max-w-[650px] text-lg leading-relaxed tracking-wide md:mx-0 md:text-xl"
          variants={itemVariants}
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('subtitle')}
        </motion.p>

        {/* CTA Button with icon */}
        <motion.div variants={itemVariants}>
          <Link
            href="/#recipes"
            onClick={handleScrollToRecipes}
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-green-500 px-8 py-3 text-base font-semibold text-white shadow-sm transition-all duration-200 ease-in-out hover:bg-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:bg-green-400 dark:hover:bg-green-500 dark:focus-visible:ring-green-400"
            aria-label={t('cta')}
          >
            <motion.span
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              whileHover={prefersReducedMotion ? undefined : 'hover'}
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </motion.span>
            {t('cta')}
          </Link>
        </motion.div>

        {/* Optional decorative elements below CTA */}
        <motion.div
          className="mt-4 flex items-center gap-4 text-xs text-zinc-400 dark:text-zinc-500 md:text-sm"
          variants={itemVariants}
        >
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" aria-hidden="true" />
            <span>{t('quickPrep')}</span>
          </div>
          <span className="text-border">•</span>
          <div className="flex items-center gap-1.5">
            <Leaf className="h-4 w-4" aria-hidden="true" />
            <span>{t('lowCalorie')}</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Hero Image */}
      <motion.div
        className="relative z-10 mt-8 w-full md:mt-0"
        variants={imageVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="relative aspect-4/3 w-full max-w-md mx-auto overflow-hidden rounded-xl shadow-lg md:max-w-none">
          <Image
            src="/hero.png"
            alt="Healthy meal prep bowls with grilled chicken, quinoa, and fresh vegetables"
            fill
            priority={true}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="hidden relative mx-auto mt-8 md:flex items-center justify-center pointer-events-none md:absolute md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:z-20"
        variants={scrollIndicatorVariants}
        initial="initial"
        animate="animate"
        aria-hidden="true"
      >
        <ArrowDown className="size-6 text-foreground/50 dark:text-foreground/40" />
      </motion.div>
    </section>
  );
}
