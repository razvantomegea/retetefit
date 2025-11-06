import { getTranslations } from 'next-intl/server';

import { Hero } from '@/components/home/Hero';
import { RecipesSection } from '@/components/home/RecipesSection';
import { getFeaturedRecipes } from '@/lib/recipes';
import type { Locale } from '@/types';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata() {
  const t = await getTranslations('Metadata');

  return {
    title: t('title'),
    description: t('description'),
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
