import { ThemeLabel } from './defaultThemes';
import { ITheme } from './ITheme';

export interface IViableTheme {
  name: string;
  palette: ITheme;
}

export interface IThemeContext {
  currentTheme: IViableTheme;
  switchTo: (theme: ThemeLabel | string) => void;
}
