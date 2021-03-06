import React, { useCallback, useEffect, useState } from 'react';
import { defaultThemes, ThemeLabel } from './defaultThemes';
import { ITheme } from './ITheme';
import { IViableTheme, IThemeContext } from './IThemeContext';

const LOCAL_STORAGE_KEY = 'adoption-theme';

const defaultTheme = {
  name: 'light',
  palette: defaultThemes['light'],
};

interface IProps {
  customThemes?: Record<string, ITheme>;
}

export const ThemeContext = React.createContext<IThemeContext>({
  currentTheme: defaultTheme,
  switchTo: () => {},
});

export const ThemeProvider: React.FC<IProps> = ({ customThemes, children }) => {
  const [currentTheme, setCurrentTheme] = useState<IViableTheme>(defaultTheme);

  const setViableThemeOrDefault = useCallback(
    (themeName: string): [string, ITheme] => {
      const availableThemes = { ...defaultThemes, ...customThemes };
      const requestedTheme = availableThemes[themeName] as ITheme;
      let theme = defaultTheme;

      if (requestedTheme) {
        theme = {
          name: themeName,
          palette: requestedTheme,
        };
      } else {
        console.warn(`[WARN] Adoption Theme - requested theme "${themeName}" was not found. Defaulting to "${
          theme.name
        }" preset.\n
Add your theme to 'customThemes' property on <ThemeProvider>.
Available themes: ${Object.keys(availableThemes).join(', ')}`);
      }

      setCurrentTheme(theme);

      return [theme.name, theme.palette];
    },
    [customThemes]
  );

  useEffect(() => {
    const theme = localStorage.getItem(LOCAL_STORAGE_KEY) ?? 'white';
    setViableThemeOrDefault(theme);
  }, [setViableThemeOrDefault]);

  const switchTo = (nextTheme: ThemeLabel | string) => {
    const [name] = setViableThemeOrDefault(nextTheme);
    localStorage.setItem(LOCAL_STORAGE_KEY, name);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, switchTo }}>{children}</ThemeContext.Provider>
  );
};
