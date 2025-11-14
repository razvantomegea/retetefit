import { MetadataRoute } from 'next';

import { locales } from '@/i18n/config';
import { getAllEducationalArticles } from '@/lib/educational';
import { getCategorySlug } from '@/lib/navigation';
import { getAllRecipes } from '@/lib/recipes';
import type { Locale } from '@/types';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const currentDate = new Date();

  const routes: MetadataRoute.Sitemap = [];

  // Home pages
  locales.forEach((locale) => {
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}`])) as Record<
          string,
          string
        >,
      },
    });
  });

  // Recipe pages
  locales.forEach((locale) => {
    const recipes = getAllRecipes(locale as Locale);

    recipes.forEach((recipe) => {
      const categorySlug = getCategorySlug(recipe.category);

      routes.push({
        url: `${baseUrl}/${locale}/${categorySlug}/${recipe.slug}`,
        lastModified: new Date(recipe.updatedAt),
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/${categorySlug}/${recipe.slug}`])
          ) as Record<string, string>,
        },
      });
    });
  });

  // Educational pages
  locales.forEach((locale) => {
    const articles = getAllEducationalArticles(locale as Locale);

    articles.forEach((article) => {
      routes.push({
        url: `${baseUrl}/${locale}/educational/${article.slug}`,
        lastModified: new Date(article.updatedAt),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/educational/${article.slug}`])
          ) as Record<string, string>,
        },
      });
    });
  });

  // Category pages
  locales.forEach((locale) => {
    const categories = ['fast', 'high-protein', 'high-fiber', 'vegetarian'];

    categories.forEach((category) => {
      routes.push({
        url: `${baseUrl}/${locale}/${category}`,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 0.9,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/${category}`])
          ) as Record<string, string>,
        },
      });
    });

    // Categories index
    routes.push({
      url: `${baseUrl}/${locale}/categories`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}/categories`])
        ) as Record<string, string>,
      },
    });

    // Search page
    routes.push({
      url: `${baseUrl}/${locale}/search`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}/search`])) as Record<
          string,
          string
        >,
      },
    });
  });

  return routes;
}
