import { type Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { Hero } from '@/components/home/Hero';
import { RecipesSection } from '@/components/home/RecipesSection';
import { getFeaturedRecipes } from '@/lib/recipes';
import type { Locale } from '@/types';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('Metadata');
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        ro: `${baseUrl}/ro`,
        'x-default': `${baseUrl}/en`,
      },
    },
  };
}

export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;
  const featuredRecipes = getFeaturedRecipes(locale as Locale, 10);

  return (
    <main className="min-h-screen">
      <Hero />
      <RecipesSection recipes={featuredRecipes} />
    </main>
  );
}
