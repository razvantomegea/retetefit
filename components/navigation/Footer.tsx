'use client';

import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { FaFacebook, FaInstagram, FaPinterest } from 'react-icons/fa';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { defaultLocale } from '@/i18n/config';
import { DataTestId } from '@/lib/constants/data-test-id';
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
      <div className="container mx-auto max-w-7xl">
        {/* Main Footer Content - 3 columns on desktop, 2 columns on mobile with About spanning full width */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-8 mb-8">
          {/* About Section */}
          <motion.section
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-4 w-full col-span-2 md:col-span-1"
          >
            <Logo />
            <p className="text-sm text-text-secondary md:max-w-xs">{t('footer.tagline')}</p>
          </motion.section>

          {/* Categories Section */}
          <motion.section
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="w-full col-span-1"
          >
            <h2 className="text-base font-semibold text-text-primary mb-4">
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
                        data-testid={DataTestId.FooterCategoryLink(category.id)}
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
            className="w-full col-span-1"
          >
            <h2 className="text-base font-semibold text-text-primary mb-4">
              {t('footer.followUs')}
            </h2>
            {/* Social Media Links */}
            <div className="flex items-center gap-4 mb-6">
              <motion.a
                href="#"
                aria-label="Instagram"
                className="text-text-secondary hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.1, y: -2 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <FaInstagram className="w-5 h-5" aria-hidden="true" />
              </motion.a>
              <motion.a
                href="#"
                aria-label="Facebook"
                className="text-text-secondary hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.1, y: -2 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <FaFacebook className="w-5 h-5" aria-hidden="true" />
              </motion.a>
              <motion.a
                href="#"
                aria-label="Pinterest"
                className="text-text-secondary hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.1, y: -2 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <FaPinterest className="w-5 h-5" aria-hidden="true" />
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
