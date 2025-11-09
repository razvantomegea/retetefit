import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

interface NotFoundProps {
  homeHref: string;
}

export async function NotFound({ homeHref }: NotFoundProps) {
  const t = await getTranslations('recipes');
  const heading = t('noRecipesFound');

  return (
    <div className="py-12 text-center">
      <h2 className="mb-4 text-2xl font-semibold text-text-primary">{heading}</h2>
      <Link
        href={homeHref}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-green-500 px-6 py-3 text-base font-semibold text-white shadow-sm transition duration-200 hover:bg-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        <span>{t('goHomeButton')}</span>
      </Link>
    </div>
  );
}
