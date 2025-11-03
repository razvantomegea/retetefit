import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('Metadata');

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function Home() {
  const t = await getTranslations('HomePage');

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-text-primary">
            {t('title')}
          </h1>
          <p className="max-w-md text-lg leading-8 text-text-secondary">
            {t('description')}{' '}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-text-primary hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              {t('templates')}
            </a>{' '}
            {t('or')}{' '}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-text-primary hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              {t('learning')}
            </a>
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-green-500 px-5 text-white transition-colors hover:bg-green-600 dark:hover:bg-green-400 md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            {t('deployNow')}
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-border px-5 text-text-primary transition-colors hover:border-green-500 hover:bg-surface-elevated md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('documentation')}
          </a>
        </div>
      </main>
    </div>
  );
}
