import { ITheme, PaletteCategory, StyleProp } from './ITheme';
import { defaultTheme } from './themeProvider';

const _ = (p: ITheme, depth: PaletteCategory, name: StyleProp): string | number => {
  // TODO: it may be a bit too weak to consider the provided theme as viable
  const isThemeViable = 'primary' in p || undefined;
  return (isThemeViable ? p : defaultTheme.palette)[depth][name];
};

export default _;
