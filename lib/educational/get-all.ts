import 'server-only';

import type { EducationalArticle, Locale } from '@/types';

import { getAllEducationalFilePaths, parseEducationalFile } from './utils';

export function getAllEducationalArticles(locale: Locale): EducationalArticle[] {
  const filePaths = getAllEducationalFilePaths(locale);
  const articles: EducationalArticle[] = [];

  for (const filePath of filePaths) {
    const article = parseEducationalFile(filePath);
    if (article) {
      articles.push(article);
    }
  }

  // Sort by published date, newest first
  return articles.sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

