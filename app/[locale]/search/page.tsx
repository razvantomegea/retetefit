import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { RecipeCard } from '@/components/recipe/RecipeCard';
import { buildFilters, filterRecipes, searchRecipes, sortRecipes } from '@/lib/recipes';
import type { Locale, SortOption } from '@/types';

interface SearchPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    q?: string;
    category?: string;
    difficulty?: string;
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
  locale: string;
  searchParams: {
    q?: string;
    category?: string;
    difficulty?: string;
    maxCookTime?: string;
    minCookTime?: string;
    maxCalories?: string;
    minCalories?: string;
    sort?: string;
  };
}

async function SearchResults({ locale, searchParams }: SearchResultsProps) {
  const t = await getTranslations('recipes');
  const localeEnum = locale as Locale;

  const recipes = searchParams.q
    ? searchRecipes(searchParams.q, localeEnum)
    : filterRecipes(buildFilters(searchParams), localeEnum);

  const sortBy = (searchParams.sort as SortOption) || 'newest';
  const sortedRecipes = sortRecipes(recipes, sortBy);

  if (sortedRecipes.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-text-secondary">{t('noRecipesFound')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {sortedRecipes.map((recipe) => (
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

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1280px] px-6 py-12 md:px-8 md:py-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-text-primary md:text-5xl">{t('title')}</h1>
          {resolvedSearchParams.q && (
            <p className="text-lg text-text-secondary">
              {tRecipes('recipeCount', {
                count: (await searchRecipes(resolvedSearchParams.q, locale as Locale)).length,
              })}{' '}
              for &quot;{resolvedSearchParams.q}&quot;
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
          <SearchResults locale={locale} searchParams={resolvedSearchParams} />
        </Suspense>
      </div>
    </div>
  );
}
