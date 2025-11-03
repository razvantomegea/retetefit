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

  const handleThemeToggle = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const handleLanguageToggle = () => {
    switchLanguage({ currentLocale, pathname, router });
  };

  const nextLang = LANGUAGES.find((lang) => lang.code !== currentLocale) || LANGUAGES[0];
  const nextLangLabel = nextLang.code === 'ro' ? 'Română' : 'English';

  const sheetClassName = useMemo(
    () =>
      mounted && resolvedTheme === 'dark'
        ? 'w-full bg-zinc-900/60 backdrop-blur-[64px] border-l border-white/10 shadow-2xl'
        : 'w-full bg-white backdrop-blur-none border-l border-border shadow-2xl',
    [mounted, resolvedTheme]
  );

  const nextThemeLabel = useMemo(
    () => (mounted && resolvedTheme === 'dark' ? 'light' : 'dark'),
    [mounted, resolvedTheme]
  );

  const toggleClassName = useMemo(
    () =>
      'w-full flex items-center gap-3 text-left text-lg px-4 py-3 rounded-md hover:bg-surface-elevated transition-colors cursor-pointer text-text-primary font-medium',
    []
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden w-10 h-10" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className={sheetClassName} open={open}>
        <SheetHeader className="flex-row items-center justify-between pr-12">
          <SheetTitle className="text-left">
            <Logo />
          </SheetTitle>
          <SheetDescription className="sr-only">{t('nav.mobileMenu')}</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-6 mt-8">
          {/* Navigation Links */}
          <NavLinks
            onLinkClick={() => setOpen(false)}
            className="flex-col items-start gap-1"
            linkClassName="w-full justify-start text-lg px-4 py-3"
          />

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Actions */}
          <div className="flex flex-col items-start gap-1">
            <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
            <button
              onClick={handleThemeToggle}
              className={toggleClassName}
              aria-label={`Switch to ${nextThemeLabel} theme`}
              disabled={!mounted}
            >
              {mounted && resolvedTheme === 'dark' ? (
                <Sun className="h-6 w-6 shrink-0 text-amber-500" />
              ) : mounted ? (
                <Moon className="h-6 w-6 shrink-0 text-text-primary" />
              ) : (
                <div className="h-6 w-6 shrink-0" />
              )}
              <span>{mounted ? (resolvedTheme === 'dark' ? 'Light' : 'Dark') : ''}</span>
            </button>

            <button
              onClick={handleLanguageToggle}
              className={toggleClassName}
              aria-label={`Switch to ${nextLangLabel}`}
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
