import 'server-only';

import type { EducationalArticle, Locale } from '@/types';

import { getAllEducationalArticles } from './get-all';

export function getEducationalArticleBySlug(
  slug: string,
  locale: Locale
): EducationalArticle | null {
  const articles = getAllEducationalArticles(locale);
  return articles.find((article) => article.slug === slug) || null;
}
