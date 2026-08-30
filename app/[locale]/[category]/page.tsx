import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { NotFound } from '@/components/common/NotFound';
import { RecipeCard } from '@/components/recipe/RecipeCard';
import { BASE_URL } from '@/lib/constants';
import { DataTestId } from '@/lib/constants/data-test-id';
import { getCategoryFromSlug } from '@/lib/navigation';
import { getRecipesByCategory, sortRecipes } from '@/lib/recipes';
import type { Locale, SortOption } from '@/types';

interface CategoryPageProps {
  params: Promise<{
    locale: string;
    category: string;
  }>;
  searchParams: Promise<{
    sort?: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { locale, category } = await params;
  const t = await getTranslations('recipes');
  const categoryEnum = getCategoryFromSlug(category);

  if (!categoryEnum) {
    return {
      title: 'Category Not Found',
    };
  }

  const categoryKey = categoryEnum.replace(/-([a-z])/g, (_: string, letter: string) =>
    letter.toUpperCase()
  );

  const categoryName = t(`categories.${categoryKey}`);

  return {
    title: `${categoryName} | Maingain`,
    description: `Browse all ${categoryName.toLowerCase()} recipes`,
    alternates: {
      canonical: `${BASE_URL}/${locale}/${category}`,
      languages: {
        en: `${BASE_URL}/en/${category}`,
        ro: `${BASE_URL}/ro/${category}`,
        'x-default': `${BASE_URL}/en/${category}`,
      },
    },
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { locale, category } = await params;
  const resolvedSearchParams = await searchParams;
  const categoryEnum = getCategoryFromSlug(category);

  if (!categoryEnum) {
    notFound();
  }

  const t = await getTranslations('recipes');
  let recipes = getRecipesByCategory(categoryEnum, locale as Locale);
  const sortBy = (resolvedSearchParams.sort as SortOption) || 'newest';
  recipes = sortRecipes(recipes, sortBy);

  const categoryKey = categoryEnum.replace(/-([a-z])/g, (_: string, letter: string) =>
    letter.toUpperCase()
  );

  const categoryName = t(`categories.${categoryKey}`);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1280px] px-6 py-12 md:px-8 md:py-16">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="mb-4 text-4xl font-bold text-text-primary md:text-5xl"
            data-testid={DataTestId.CategoryTitle}
          >
            {categoryName}
          </h1>
          <p className="text-lg text-text-secondary">
            {t('recipeCount', { count: recipes.length })}
          </p>
        </div>

        {/* Recipes Grid */}
        {recipes.length === 0 ? (
          <NotFound homeHref={`/${locale}`} />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
