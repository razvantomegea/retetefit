import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { RecipeCard } from '@/components/recipe/RecipeCard';
import { performSearch } from '@/lib/recipes';
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
}

async function SearchResults({ recipes }: SearchResultsProps) {
  const t = await getTranslations('recipes');

  if (recipes.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-text-secondary">{t('noRecipesFound')}</p>
      </div>
    );
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
          <SearchResults recipes={results} />
        </Suspense>
      </div>
    </div>
  );
}
