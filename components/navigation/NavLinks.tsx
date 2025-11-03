'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { defaultLocale } from '@/i18n/config';
import { NAV_CATEGORIES } from '@/lib/navigation';
import { cn } from '@/lib/utils';

interface NavLinksProps {
  onLinkClick?: () => void;
  className?: string;
  linkClassName?: string;
}

export function NavLinks({ onLinkClick, className, linkClassName }: NavLinksProps) {
  const t = useTranslations();
  const params = useParams();
  const pathname = usePathname();
  const locale = params?.locale || defaultLocale;

  return (
    <nav className={cn('flex items-center gap-1', className)}>
      {NAV_CATEGORIES.map((category) => {
        const href = `/${locale}${category.href}`;
        const isActive = pathname === href;

        return (
          <Link
            key={category.id}
            href={href}
            onClick={onLinkClick}
            className={cn(
              'px-4 py-2.5 rounded-md text-base font-medium transition-colors relative',
              'hover:bg-surface-elevated',
              isActive ? 'text-green-600 dark:text-green-400' : 'text-text-primary',
              linkClassName
            )}
          >
            {t(category.labelKey)}
            <AnimatePresence>
              {isActive && (
                <motion.span
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-green-500 dark:bg-green-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '50%' }}
                  exit={{ width: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>
          </Link>
        );
      })}
    </nav>
  );
}
