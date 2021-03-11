import { ITheme, PaletteCategory, StyleProp } from './ITheme';
import { defaultTheme } from './themeProvider';

const _ = (p: ITheme, depth: PaletteCategory, name: StyleProp): string | number => {
  // TODO: it may be a bit too weak to consider the provided theme as viable
  const isThemeViable = 'primary' in p || undefined;

  // Note: if ThemeProvider is not wrapping the app, defaultTheme will be used.
  return (isThemeViable ? p : defaultTheme.palette)[depth][name];
};

export default _;
