export interface NavCategory {
  id: string;
  href: string;
  labelKey: string; // Translation key
}

export const NAV_CATEGORIES: NavCategory[] = [
  {
    id: 'lowCalorie',
    href: '/mic-dejun',
    labelKey: 'nav.lowCalorie',
  },
];

export const LANGUAGES = [
  { code: 'ro', label: 'RO', flag: '🇷🇴' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
] as const;
