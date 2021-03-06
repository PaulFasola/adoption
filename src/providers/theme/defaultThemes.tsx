import { ITheme } from './ITheme';

export type ThemeLabel = 'light' | 'dark';

export const defaultThemes: Record<ThemeLabel, ITheme> = {
  dark: {
    primary: {
      backgroundColor: 'black',
      color: 'white',
    },
  },
  light: {
    primary: {
      backgroundColor: 'white',
      color: 'black',
    },
  },
};
