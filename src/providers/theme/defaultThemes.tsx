import { ITheme } from './ITheme';

export type ThemeLabel = 'light' | 'dark';

export const defaultThemes: Record<ThemeLabel | string, ITheme> = {
  dark: {
    primary: {
      backgroundColor: '#121212',
      color: '#ffffff',
      rule: 'rgba(255, 255, 255, 0.2)',
      boxShadow: '0 3px 28px rgba(255, 255, 255, 0.1)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      hoverColor: '#ffffff',
      hoverBgColor: '#2c2f36',
    },
    secondary: {
      color: '#000000',
    },
    disabled: {
      color: '#dddddd',
    },
    messages: {
      success: '#007e33',
      warning: '#ff8800',
      info: '#bde5f8',
      error: '#ff4444',
    },
    defaultButton: {
      backgroundColor: '#efefef',
      hoverBgColor: '#e7e7e7',
      color: '#000000',
    },
  },
  light: {
    primary: {
      backgroundColor: '#ffffff',
      color: '#000000',
      rule: 'rgba(0, 0, 0, 0.2)',
      boxShadow: '0 12px 28px rgba(0, 0, 0, 0.1)',
      borderColor: 'rgba(0, 0, 0, 0.1)',
      hoverColor: '#000000',
      hoverBgColor: '#e7e7e7',
    },
    secondary: {
      color: '#000000',
    },
    disabled: {
      color: '#dddddd',
    },
    messages: {
      success: '#007e33',
      warning: '#ff8800',
      info: '#bde5f8',
      error: '#ff4444',
    },
    defaultButton: {
      backgroundColor: '#efefef',
      hoverBgColor: '#e7e7e7',
      color: '#000000',
    },
  },
};
