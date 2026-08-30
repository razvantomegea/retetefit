import { getThemeIcon, getThemeLabel, THEME_OPTIONS } from '../theme';

describe('theme helpers', () => {
  it('exposes light, dark, and system options', () => {
    expect(THEME_OPTIONS).toEqual(['light', 'dark', 'system']);
  });

  it('returns labels for each theme and a fallback', () => {
    expect(getThemeLabel('light')).toContain('Light');
    expect(getThemeLabel('dark')).toContain('Dark');
    expect(getThemeLabel('system')).toContain('System');
    expect(getThemeLabel(undefined)).toBe('System');
  });

  it('returns icons for each theme and a fallback', () => {
    expect(getThemeIcon('light')).toBe('☀️');
    expect(getThemeIcon('dark')).toBe('🌙');
    expect(getThemeIcon('system')).toBe('⚙️');
    expect(getThemeIcon(undefined)).toBe('⚙️');
  });
});
