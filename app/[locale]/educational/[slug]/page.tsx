import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { EducationalContent } from '@/components/educational/EducationalContent';
import { EducationalHero } from '@/components/educational/EducationalHero';
import { ArticleSchema } from '@/components/schema/ArticleSchema';
import { locales } from '@/i18n/config';
import {
  getAllEducationalArticles,
  getEducationalArticleBySlug,
  parseEducationalContent,
} from '@/lib/educational';
import type { Locale } from '@/types';

interface EducationalPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const params: Array<{ locale: string; slug: string }> = [];

  for (const locale of locales) {
    const articles = getAllEducationalArticles(locale as Locale);
    for (const article of articles) {
      params.push({
        locale,
        slug: article.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: EducationalPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getEducationalArticleBySlug(slug, locale as Locale);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  const t = await getTranslations('Metadata');
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const url = `${baseUrl}/${locale}/educational/${slug}`;
  const imageUrl = article.image.startsWith('http') ? article.image : `${baseUrl}${article.image}`;
  return {
    title: `${article.title} | ${t('title')}`,
    description: article.description,
    keywords: ['nutrition', 'health', 'weight loss', 'educational', 'diet', 'fitness'],
    authors: [{ name: article.author }],
    creator: article.author,
    publisher: t('title'),
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url,
      siteName: t('title'),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.imageAlt,
          type: 'image/png',
        },
      ],
      locale,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [imageUrl],
      creator: '@maingain',
      site: '@maingain',
    },
    alternates: {
      canonical: url,
      languages: {
        en: `${baseUrl}/en/educational/${slug}`,
        ro: `${baseUrl}/ro/educational/${slug}`,
        'x-default': `${baseUrl}/en/educational/${slug}`,
      },
    },
  };
}

export default async function EducationalPage({ params }: EducationalPageProps) {
  const { locale, slug } = await params;

  const article = getEducationalArticleBySlug(slug, locale as Locale);

  if (!article) {
    notFound();
  }

  const parsedContent = parseEducationalContent(article.content);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return (
    <>
      <ArticleSchema article={article} baseUrl={baseUrl} locale={locale as Locale} />
      <article className="min-h-screen bg-background">
        <div className="mx-auto max-w-[1280px] px-6 py-12 md:px-8 md:py-16">
          {/* Article Hero */}
          <EducationalHero article={article} className="mb-12" />

          {/* Article Content */}
          <div className="mt-12">
            <EducationalContent content={parsedContent.content} />
          </div>
        </div>
      </article>
    </>
  );
}
