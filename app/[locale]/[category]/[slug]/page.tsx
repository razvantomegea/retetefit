import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { RecipeCard } from '@/components/recipe/RecipeCard';
import { RecipeContent } from '@/components/recipe/RecipeContent';
import { RecipeHero } from '@/components/recipe/RecipeHero';
import { RecipeSchema } from '@/components/recipe/RecipeSchema';
import { BASE_URL } from '@/lib/constants';
import { getCategoryFromSlug, getCategorySlug } from '@/lib/navigation';
import {
  getAllRecipes,
  getRecipeBySlug,
  getRelatedRecipes,
  parseRecipeContent,
} from '@/lib/recipes';
import type { Locale } from '@/types';

interface RecipePageProps {
  params: Promise<{
    locale: string;
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const locales: Locale[] = ['ro', 'en'];
  const params: Array<{ locale: string; category: string; slug: string }> = [];

  for (const locale of locales) {
    const recipes = getAllRecipes(locale);
    for (const recipe of recipes) {
      const categorySlug = getCategorySlug(recipe.category);
      params.push({
        locale,
        category: categorySlug,
        slug: recipe.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  const { locale, category, slug } = await params;
  const recipe = getRecipeBySlug(
    slug,
    locale as Locale,
    getCategoryFromSlug(category) || undefined
  );

  if (!recipe) {
    return {
      title: 'Recipe Not Found',
    };
  }

  const t = await getTranslations('Metadata');
  const url = `${BASE_URL}/${locale}/${category}/${slug}`;
  const imageUrl = `${BASE_URL}${recipe.image}`;

  return {
    title: `${recipe.title} | ${t('title')}`,
    description: recipe.description,
    keywords: [
      ...recipe.tags,
      recipe.category,
      'recipe',
      'healthy',
      'low-calorie',
      `${recipe.cookTime} minutes`,
    ],
    authors: [{ name: recipe.author }],
    creator: recipe.author,
    publisher: t('title'),
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      url,
      siteName: t('title'),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: recipe.imageAlt,
          type: 'image/png',
        },
      ],
      locale,
      type: 'article',
      publishedTime: recipe.publishedAt,
      modifiedTime: recipe.updatedAt,
      authors: [recipe.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: recipe.title,
      description: recipe.description,
      images: [imageUrl],
      creator: '@maingain',
      site: '@maingain',
    },
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en/${category}/${slug}`,
        ro: `${BASE_URL}/ro/${category}/${slug}`,
        'x-default': `${BASE_URL}/en/${category}/${slug}`,
      },
    },
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { locale, category, slug } = await params;
  const categoryEnum = getCategoryFromSlug(category);

  if (!categoryEnum) {
    notFound();
  }

  const recipe = getRecipeBySlug(slug, locale as Locale, categoryEnum);

  if (!recipe) {
    notFound();
  }

  const parsedContent = parseRecipeContent(recipe.content);
  const relatedRecipes = getRelatedRecipes(recipe, locale as Locale, 4);
  const t = await getTranslations('recipes');

  return (
    <>
      <RecipeSchema recipe={recipe} />
      <article className="min-h-screen bg-background">
        <div className="mx-auto max-w-[1280px] px-6 py-12 md:px-8 md:py-16">
          {/* Recipe Hero */}
          <RecipeHero recipe={recipe} className="mb-12" />

          {/* Main Content Grid */}
          <RecipeContent parsedContent={parsedContent} tipsLabel={t('tips')} />

          {/* Related Recipes */}
          {relatedRecipes.length > 0 && (
            <section className="mt-16">
              <h2 className="mb-8 text-3xl font-bold text-text-primary">{t('relatedRecipes')}</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {relatedRecipes.map((relatedRecipe) => (
                  <RecipeCard key={relatedRecipe.slug} recipe={relatedRecipe} />
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
