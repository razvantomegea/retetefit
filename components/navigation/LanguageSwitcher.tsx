'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import { startTransition, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { LANGUAGES } from '@/lib/navigation';

interface SwitchLanguageParams {
  currentLocale: string;
  pathname: string;
  router: ReturnType<typeof useRouter>;
}

export const switchLanguage = ({ currentLocale, pathname, router }: SwitchLanguageParams) => {
  if (!pathname) return;

  const currentIndex = LANGUAGES.findIndex((lang) => lang.code === currentLocale);
  const nextIndex = (currentIndex + 1) % LANGUAGES.length;
  const nextLocale = LANGUAGES[nextIndex].code;

  const segments = pathname.split('/');
  segments[1] = nextLocale;
  const newPathname = segments.join('/');
  router.push(newPathname);
};

export function LanguageSwitcher() {
  const [mounted, setMounted] = useState(false);
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

  const handleSwitchLanguage = () => {
    switchLanguage({ currentLocale, pathname, router });
  };

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="w-10 h-10"
        disabled
        aria-label="Loading language"
      />
    );
  }

  const nextLang = LANGUAGES.find((lang) => lang.code !== currentLocale) || LANGUAGES[0];
  const nextLangLabel = nextLang.code === 'ro' ? 'Română' : 'English';

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleSwitchLanguage}
      className="w-10 h-10 rounded-md hover:bg-surface-elevated transition-colors"
      aria-label={`Switch to ${nextLangLabel}`}
      title={`Switch to ${nextLangLabel}`}
    >
      <span className="text-lg leading-none">{nextLang.flag}</span>
      <span className="sr-only">{nextLangLabel}</span>
    </Button>
  );
}
