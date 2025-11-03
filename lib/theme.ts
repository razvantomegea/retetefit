export const THEME_OPTIONS = ['light', 'dark', 'system'] as const;

export type Theme = (typeof THEME_OPTIONS)[number];

export const getThemeLabel = (theme: Theme | undefined): string => {
  const labels: Record<Theme, string> = {
    light: '☀️ Light',
    dark: '🌙 Dark',
    system: '⚙️ System',
  };

  return labels[theme as Theme] || 'System';
};

export const getThemeIcon = (theme: Theme | undefined) => {
  switch (theme) {
    case 'light':
      return '☀️';
    case 'dark':
      return '🌙';
    default:
      return '⚙️';
  }
};

