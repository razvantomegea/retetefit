import { getTranslations } from 'next-intl/server';

import { Hero } from '@/components/home/Hero';
import { RecipesSection } from '@/components/home/RecipesSection';

export async function generateMetadata() {
  const t = await getTranslations('Metadata');

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <RecipesSection />
    </main>
  );
}
