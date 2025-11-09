import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { NotFound } from '@/components/common/NotFound';
import { RecipeCard } from '@/components/recipe/RecipeCard';
import { performSearch } from '@/lib/recipes';
import enMessages from '@/messages/en.json';
import roMessages from '@/messages/ro.json';
import type { Locale } from '@/types';

interface SearchPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    q?: string;
    category?: string;
    maxCookTime?: string;
    minCookTime?: string;
    maxCalories?: string;
    minCalories?: string;
    sort?: string;
  }>;
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('search');

  return {
    title: `${t('title')} | Maingain`,
    description: t('subtitle') || 'Search for healthy recipes',
  };
}

interface SearchResultsProps {
  recipes: ReturnType<typeof performSearch>;
  locale: Locale;
}

type MessagesByLocale = {
  en: typeof enMessages;
  ro: typeof roMessages;
};

const messagesByLocale: MessagesByLocale = {
  en: enMessages,
  ro: roMessages,
};

function findTranslationPath(node: unknown, target: string, path: string[] = []): string[] | null {
  if (typeof node === 'string') {
    return node.toLowerCase() === target.toLowerCase() ? path : null;
  }

  if (Array.isArray(node)) {
    for (let index = 0; index < node.length; index += 1) {
      const result = findTranslationPath(node[index], target, [...path, String(index)]);
      if (result) {
        return result;
      }
    }
    return null;
  }

  if (node && typeof node === 'object') {
    for (const [key, value] of Object.entries(node)) {
      const result = findTranslationPath(value, target, [...path, key]);
      if (result) {
        return result;
      }
    }
  }

  return null;
}

function getValueByPath(node: unknown, path: string[]): unknown {
  return path.reduce<unknown>((accumulator, key) => {
    if (accumulator && typeof accumulator === 'object') {
      return (accumulator as Record<string, unknown>)[key];
    }
    return undefined;
  }, node);
}

function translateQuery(query: string | undefined, locale: Locale): string | undefined {
  if (!query) {
    return query;
  }

  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return query;
  }

  const localeMessages = messagesByLocale[locale];
  const alternateLocale = locale === 'en' ? 'ro' : 'en';
  const alternateMessages = messagesByLocale[alternateLocale];

  if (findTranslationPath(localeMessages, trimmedQuery)) {
    return trimmedQuery;
  }

  const translationPath = findTranslationPath(alternateMessages, trimmedQuery);

  if (!translationPath) {
    return trimmedQuery;
  }

  const translatedValue = getValueByPath(localeMessages, translationPath);

  return typeof translatedValue === 'string' ? translatedValue : trimmedQuery;
}

async function SearchResults({ recipes, locale }: SearchResultsProps) {
  if (recipes.length === 0) {
    return <NotFound homeHref={`/${locale}`} />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.slug} recipe={recipe} />
      ))}
    </div>
  );
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const t = await getTranslations('search');
  const tRecipes = await getTranslations('recipes');
  const localeEnum = locale as Locale;
  const results = performSearch(resolvedSearchParams, localeEnum);
  const translatedQuery = translateQuery(resolvedSearchParams.q, localeEnum);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1280px] px-6 py-12 md:px-8 md:py-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-text-primary md:text-5xl">{t('title')}</h1>
          {resolvedSearchParams.q && (
            <p className="text-lg text-text-secondary">
              {tRecipes('recipeCount', {
                count: results.length,
              })}{' '}
              {t('for')} &quot;{translatedQuery ?? resolvedSearchParams.q}&quot;
            </p>
          )}
        </div>

        {/* Search Results */}
        <Suspense
          fallback={
            <div className="py-12 text-center">
              <p className="text-text-secondary">Loading...</p>
            </div>
          }
        >
          <SearchResults recipes={results} locale={localeEnum} />
        </Suspense>
      </div>
    </div>
  );
}
