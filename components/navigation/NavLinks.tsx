'use client';

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
          </Link>
        );
      })}
    </nav>
  );
}
