export interface NavCategory {
  id: string;
  href: string;
  labelKey: string; // Translation key
}

export const NAV_CATEGORIES: NavCategory[] = [];

export const LANGUAGES = [
  { code: 'ro', label: 'RO', flag: '🇷🇴' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
] as const;
