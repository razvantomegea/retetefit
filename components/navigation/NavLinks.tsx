'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { defaultLocale } from '@/i18n/config';
import { NAV_CATEGORIES, NAV_LINKS } from '@/lib/navigation';
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

  const allNavItems = [
    ...NAV_LINKS.map((link) => ({ ...link, type: 'link' as const })),
    ...NAV_CATEGORIES.map((cat) => ({ ...cat, type: 'category' as const }))
    
  ];

  return (
    <nav className={cn('flex items-center gap-1', className)}>
      {allNavItems.map((item) => {
        const href = `/${locale}${item.href}`;
        const isActive = pathname === href;

        return (
          <Link
            key={item.id}
            href={href}
            onClick={onLinkClick}
            className={cn(
              'px-4 py-2.5 rounded-md text-base font-medium transition-colors relative',
              'hover:bg-surface-elevated',
              isActive ? 'text-green-600 dark:text-green-400' : 'text-text-primary',
              linkClassName
            )}
          >
            {t(item.labelKey)}
            <AnimatePresence>
              {isActive && (
                <motion.span
                  layoutId="activeIndicator"
                  className="hidden lg:block absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-green-500 dark:bg-green-400 rounded-full"
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
