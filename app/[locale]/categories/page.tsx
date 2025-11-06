import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { CategoriesGrid } from '@/components/categories/CategoriesGrid';
import { NAV_CATEGORIES } from '@/lib/navigation';
import { getCategoryRecipeCount } from '@/lib/recipes';
import type { Locale } from '@/types';

interface CategoriesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('categories');

  return {
    title: `${t('title')} | Maingain`,
    description: t('subtitle'),
  };
}

export default async function CategoriesPage({ params }: CategoriesPageProps) {
  const { locale } = await params;
  const localeEnum = locale as Locale;

  const categoriesWithCounts = NAV_CATEGORIES.map((category) => ({
    ...category,
    count: getCategoryRecipeCount(category.category, localeEnum),
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1280px] px-6 py-12 md:px-8 md:py-16">
        <CategoriesGrid categories={categoriesWithCounts} />
      </div>
    </div>
  );
}
