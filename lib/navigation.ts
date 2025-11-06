import type { Category } from '@/types';

export interface NavCategory {
  id: string;
  href: string;
  labelKey: string; // Translation key
  category: Category;
}

export const NAV_CATEGORIES: NavCategory[] = [
  {
    id: 'easy',
    href: '/easy',
    labelKey: 'nav.categories.easy',
    category: 'easy',
  },
  {
    id: 'fast',
    href: '/fast',
    labelKey: 'nav.categories.fast',
    category: 'fast',
  },
  {
    id: 'high-protein',
    href: '/high-protein',
    labelKey: 'nav.categories.highProtein',
    category: 'high-protein',
  },
  {
    id: 'high-fiber',
    href: '/high-fiber',
    labelKey: 'nav.categories.highFiber',
    category: 'high-fiber',
  },
  {
    id: 'vegetarian',
    href: '/vegetarian',
    labelKey: 'nav.categories.vegetarian',
    category: 'vegetarian',
  },
  {
    id: 'vegan',
    href: '/vegan',
    labelKey: 'nav.categories.vegan',
    category: 'vegan',
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
