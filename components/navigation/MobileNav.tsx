'use client';

import { Menu, Moon, Sun } from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { startTransition, useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { LANGUAGES } from '@/lib/navigation';

import { switchLanguage } from './LanguageSwitcher';
import { Logo } from './Logo';
import { NavLinks } from './NavLinks';
import { SearchDialog } from './SearchDialog';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations();
  const { resolvedTheme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = (params?.locale as string) || 'ro';

  // Prevent hydration mismatch
  useEffect(() => {
    startTransition(() => {
      setMounted(true);
    });
  }, []);

  const isDark = resolvedTheme === 'dark';

  const handleClose = () => {
    setOpen(false);
  };

  const handleThemeToggle = () => {
    handleClose();
    setTheme(isDark ? 'light' : 'dark');
  };

  const handleLanguageToggle = () => {
    handleClose();
    switchLanguage({ currentLocale, pathname, router });
  };

  const handleSearchOpenChange = (value: boolean) => {
    setSearchOpen(value);
    if (value) {
      handleClose();
    }
  };

  const currentIndex = LANGUAGES.findIndex((lang) => lang.code === currentLocale);
  const nextIndex = (currentIndex + 1) % LANGUAGES.length;
  const nextLang = LANGUAGES[nextIndex];
  const nextLangLabel = t(`nav.language.names.${nextLang.code}`);

  const sheetClassName = useMemo(
    () =>
      mounted && isDark
        ? 'w-full bg-zinc-900/60 backdrop-blur-[64px] border-l border-white/10 shadow-2xl'
        : 'w-full bg-white backdrop-blur-none border-l border-border shadow-2xl',
    [mounted, isDark]
  );

  const toggleClassName = useMemo(
    () =>
      'w-full flex items-center gap-3 text-left text-lg px-4 py-3 rounded-md hover:bg-surface-elevated transition-colors cursor-pointer text-text-primary font-medium',
    []
  );

  const toggleThemeAriaLabel = useMemo(
    () =>
      mounted
        ? t('theme.switchTo', {
            theme: isDark ? 'light' : 'dark',
            defaultValue: `Switch to ${isDark ? 'light' : 'dark'} theme`,
          })
        : t('nav.theme', { defaultValue: 'Theme' }),
    [mounted, t, isDark]
  );

  const toggleThemeLabel = useMemo(
    () =>
      mounted
        ? isDark
          ? t('theme.light', { defaultValue: 'Light' })
          : t('theme.dark', { defaultValue: 'Dark' })
        : '',
    [mounted, t, isDark]
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden w-10 h-10" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className={sheetClassName} open={open}>
        <SheetHeader className="flex-row items-center justify-between" showClose>
          <SheetTitle className="text-left">
            <Logo />
          </SheetTitle>
          <SheetDescription className="sr-only">{t('nav.mobileMenu')}</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-6 mt-8">
          {/* Navigation Links */}
          <NavLinks
            onLinkClick={handleClose}
            className="flex-col items-start gap-1"
            linkClassName="w-full justify-start text-lg px-4 py-3"
          />

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Actions */}
          <div className="flex flex-col items-start gap-1">
            <SearchDialog open={searchOpen} onOpenChange={handleSearchOpenChange} />
            <button
              onClick={handleThemeToggle}
              className={toggleClassName}
              aria-label={toggleThemeAriaLabel}
              disabled={!mounted}
            >
              {mounted && isDark ? (
                <Sun className="h-6 w-6 shrink-0 text-amber-500" />
              ) : mounted ? (
                <Moon className="h-6 w-6 shrink-0 text-text-primary" />
              ) : (
                <div className="h-6 w-6 shrink-0" />
              )}
              <span>{toggleThemeLabel}</span>
            </button>

            <button
              onClick={handleLanguageToggle}
              className={toggleClassName}
              aria-label={t('nav.language.switchTo', { language: nextLangLabel })}
            >
              <span className="text-xl shrink-0">{nextLang.flag}</span>
              <span>{nextLangLabel}</span>
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
