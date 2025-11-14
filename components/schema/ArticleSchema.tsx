import { BASE_URL } from '@/lib/constants';
import type { EducationalArticle, Locale } from '@/types';

interface ArticleSchemaProps {
  article: EducationalArticle;
  locale: Locale;
  keywords: string[];
}

export function ArticleSchema({ article, locale, keywords }: ArticleSchemaProps) {
  const wordCount = article.content.split(/\s+/).length;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image.startsWith('http') ? article.image : `${BASE_URL}${article.image}`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Person',
      name: article.author,
      // Add author details for E-E-A-T
      url: 'https://razvantomegea.com', // Create author page
      jobTitle: 'Software Engineer',
      description: 'Software Engineer at MainGain',
    },
    publisher: {
      '@type': 'Organization',
      name: 'MainGain',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/${locale as Locale}/educational/${article.slug}`,
    },
    articleSection: 'Nutrition Education',
    keywords: keywords.join(', '),
    wordCount,
    timeRequired: `PT${article.readingTime}M`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}
