import { ITheme } from './ITheme';

export type ThemeLabel = 'light' | 'dark';

export const defaultThemes: Record<ThemeLabel | string, ITheme> = {
  dark: {
    primary: {
      backgroundColor: '#121212',
      color: '#ffffff',
      rule: 'rgba(255, 255, 255, 0.2)',
      boxShadow: '0 3px 28px rgba(255, 255, 255, 0.1)',
    },
  },
  light: {
    primary: {
      backgroundColor: '#ffffff',
      color: '#000000',
      rule: 'rgba(0, 0, 0, 0.2)',
      boxShadow: '0 12px 28px rgba(0, 0, 0, 0.1)',
    },
  },
};
