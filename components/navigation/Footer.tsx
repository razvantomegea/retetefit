'use client';

import { motion, type Variants } from 'framer-motion';
import { Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { defaultLocale } from '@/i18n/config';
import { NAV_CATEGORIES } from '@/lib/navigation';
import { cn } from '@/lib/utils';

import { Logo } from './Logo';

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  const t = useTranslations();
  const params = useParams();
  const locale = (params?.locale as string) || defaultLocale;
  const currentYear = new Date().getFullYear();
  const prefersReducedMotion = useReducedMotion();

  // Animation variants for staggered category links
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
        duration: prefersReducedMotion ? 0.1 : 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <footer
      className={cn(
        'w-full bg-surface border-t border-border',
        'py-12 px-4 sm:px-6 lg:px-8',
        className
      )}
    >
      <div className="container mx-auto">
        {/* Main Footer Content - 3 columns on desktop, single column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8">
          {/* About Section */}
          <motion.section
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-4"
          >
            <Logo />
            <p className="text-sm text-text-secondary max-w-xs">{t('footer.tagline')}</p>
          </motion.section>

          {/* Categories Section */}
          <motion.section
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
            <h2 className="text-base font-semibold text-text-primary mb-3">
              {t('footer.categories')}
            </h2>
            <nav aria-label="Footer navigation">
              <motion.ul
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-2"
              >
                {NAV_CATEGORIES.map((category) => {
                  const href = `/${locale}${category.href}`;
                  return (
                    <motion.li key={category.id} variants={itemVariants}>
                      <Link
                        href={href}
                        className="text-sm text-text-secondary hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200 inline-block"
                      >
                        {t(category.labelKey)}
                      </Link>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </nav>
          </motion.section>

          {/* Legal & Social Section */}
          <motion.section
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <h2 className="text-base font-semibold text-text-primary mb-3">
              {t('footer.followUs')}
            </h2>
            {/* Social Media Links */}
            <div className="flex items-center gap-4 mb-4">
              <motion.a
                href="#"
                aria-label="Instagram"
                className="text-text-secondary hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.1, y: -2 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </motion.a>
              <motion.a
                href="#"
                aria-label="Facebook"
                className="text-text-secondary hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.1, y: -2 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Facebook className="w-5 h-5" aria-hidden="true" />
              </motion.a>
              <motion.a
                href="#"
                aria-label="Pinterest"
                className="text-text-secondary hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.1, y: -2 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {/* Pinterest icon not available in lucide-react, using a generic icon */}
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.373 0 0 5.372 0 12s5.373 12 12 12c5.302 0 9.917-3.158 11.827-7.69-.053-.102-.115-.204-.19-.31-.625-1.11-1.391-2.314-1.391-4.163 0-3.338 2.498-5.837 5.504-5.837 1.602 0 2.902 1.2 2.902 2.8 0 1.61-.85 2.98-2.1 2.98-.69 0-1.35-.36-1.35-1.09 0-.9.72-1.96 1.71-1.96.58 0 1.04.2 1.21.58.13.32.44 1.38.51 1.71.09.38.51 2.3.6 2.91.18.78-.39 1.4-1.13 1.4-.68 0-1.19-.43-1.45-.85-.31-.52-.62-1.05-.93-1.58-.52-1.1-1.1-2.2-1.68-3.3-.24-.48-.5-1-.82-1.48-.18-.3-.38-.6-.6-.9-.22-.3-.46-.6-.72-.87-.26-.27-.54-.5-.84-.7-.3-.2-.62-.35-.96-.45-.34-.1-.7-.15-1.08-.15-.48 0-.94.08-1.38.24-.44.16-.84.4-1.2.72-.36.32-.66.7-.9 1.14-.24.44-.36.92-.36 1.44 0 .52.12 1 .36 1.44.24.44.54.82.9 1.14.36.32.76.56 1.2.72.44.16.9.24 1.38.24.38 0 .74-.05 1.08-.15.34-.1.66-.25.96-.45.3-.2.58-.43.84-.7.26-.27.5-.57.72-.87.22-.3.42-.6.6-.9.32-.48.58-1 .82-1.48.58-1.1 1.16-2.2 1.68-3.3.31-.53.62-1.06.93-1.58.26-.42.77-.85 1.45-.85.74 0 1.22.62 1.13 1.4-.09.61-.47 2.53-.6 2.91-.17.38-.63.58-1.21.58-.99 0-1.71-1.06-1.71-1.96 0-.73.66-1.09 1.35-1.09 1.25 0 2.1 1.37 2.1 2.98 0 1.6-1.3 2.8-2.9 2.8-3.01 0-5.5-2.5-5.5-5.84 0-1.85.77-3.05 1.39-4.16.08-.11.15-.21.19-.31C21.92 3.16 17.3 0 12 0z" />
                </svg>
              </motion.a>
            </div>

            {/* Privacy Policy Link */}
            <Link
              href="#"
              className="text-sm text-text-secondary hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200 inline-block"
            >
              {t('footer.privacy')}
            </Link>
          </motion.section>
        </div>

        {/* Copyright */}
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-6 border-t border-border"
        >
          <p className="text-sm text-text-secondary text-center">
            {t('footer.copyright', { year: currentYear })}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
