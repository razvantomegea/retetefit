import { MetadataRoute } from 'next';

import { locales } from '@/i18n/config';
import { BASE_URL } from '@/lib/constants';
import { getAllEducationalArticles } from '@/lib/educational';
import { getCategorySlug } from '@/lib/navigation';
import { getAllRecipes } from '@/lib/recipes';
import type { Locale } from '@/types';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  const routes: MetadataRoute.Sitemap = [];

  // Home pages
  locales.forEach((locale) => {
    routes.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${BASE_URL}/${l}`])) as Record<
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
        url: `${BASE_URL}/${locale}/${categorySlug}/${recipe.slug}`,
        lastModified: new Date(recipe.updatedAt),
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE_URL}/${l}/${categorySlug}/${recipe.slug}`])
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
        url: `${BASE_URL}/${locale}/educational/${article.slug}`,
        lastModified: new Date(article.updatedAt),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE_URL}/${l}/educational/${article.slug}`])
          ) as Record<string, string>,
        },
      });
    });
  });

  // Category pages
  locales.forEach((locale) => {
    const categories = ['main', 'vegetarian', 'desserts', 'brunch'];

    categories.forEach((category) => {
      routes.push({
        url: `${BASE_URL}/${locale}/${category}`,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 0.9,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE_URL}/${l}/${category}`])
          ) as Record<string, string>,
        },
      });
    });

    // Categories index
    routes.push({
      url: `${BASE_URL}/${locale}/categories`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE_URL}/${l}/categories`])
        ) as Record<string, string>,
      },
    });

    // Search page
    routes.push({
      url: `${BASE_URL}/${locale}/search`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${BASE_URL}/${l}/search`])) as Record<
          string,
          string
        >,
      },
    });
  });

  return routes;
}
