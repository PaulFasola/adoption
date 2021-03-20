import { useContext } from 'react';
import { ITheme } from '../providers/theme/ITheme';
import { ThemeContext } from '../providers/theme/themeProvider';

export const useTheme = (): ITheme => {
  const { currentTheme } = useContext(ThemeContext);
  return currentTheme.palette;
};
