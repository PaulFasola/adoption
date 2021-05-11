import { ITheme, PaletteCategory, StyleProp } from './ITheme';
import { defaultTheme } from './themeProvider';

const _ = (p: ITheme | null, depth: PaletteCategory, name: StyleProp): string | number => {
  // TODO: it may be a bit too weak to consider the provided theme as viable
  /* istanbul ignore next */
  const isThemeViable = p ? 'primary' in p : false;

  // Note: if ThemeProvider is not wrapping the app, defaultTheme will be used.
  const palette = isThemeViable && p ? p : defaultTheme.palette;
  return palette[depth][name];
};

export default _;
