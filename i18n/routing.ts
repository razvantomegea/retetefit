import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

import { defaultLocale, locales } from './config';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // The `pathnames` object holds pairs of internal and
  // external pathnames. Based on the locale, the
  // external pathnames are rewritten to the shared,
  // internal format.
  //
  // Example: `/de/team` → `/en/team`
  // Example: `/en/team` → `/en/team`
  pathnames: {
    '/': '/',
  },
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
