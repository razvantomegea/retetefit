import type { Category } from '@/types';

export interface NavCategory {
  id: string;
  href: string;
  labelKey: string; // Translation key
  category: Category;
}

export interface NavLink {
  id: string;
  href: string;
  labelKey: string;
}

export const NAV_CATEGORIES: NavCategory[] = [
  {
    id: 'vegetarian',
    href: '/vegetarian',
    labelKey: 'nav.categories.vegetarian',
    category: 'vegetarian',
  },
  {
    id: 'desserts',
    href: '/desserts',
    labelKey: 'nav.categories.desserts',
    category: 'desserts',
  },
  {
    id: 'brunch',
    href: '/brunch',
    labelKey: 'nav.categories.brunch',
    category: 'brunch',
  },
  {
    id: 'main',
    href: '/main',
    labelKey: 'nav.categories.main',
    category: 'main',
  },
];

export const NAV_LINKS: NavLink[] = [
  {
    id: 'educational',
    href: '/educational/why-we-get-fat',
    labelKey: 'nav.educational',
  },
];

export const LANGUAGES = [
  { code: 'ro', label: 'RO', flag: '🇷🇴' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
] as const;

// Helper function to get category from slug
export function getCategoryFromSlug(slug: string): Category | null {
  const category = NAV_CATEGORIES.find((cat) => cat.id === slug);
  return category ? category.category : null;
}

// Helper function to get category slug from Category type
export function getCategorySlug(category: Category): string {
  const navCategory = NAV_CATEGORIES.find((cat) => cat.category === category);
  return navCategory ? navCategory.id : category;
}
