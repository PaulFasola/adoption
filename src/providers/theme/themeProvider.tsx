import React, { useCallback, useEffect, useState } from 'react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import { defaultThemes, ThemeLabel } from './defaultThemes';
import { IViableTheme, IThemeContext } from './IThemeContext';
import { mergeDeep } from '../../utils/mergeDeep';
import { ITheme } from './ITheme';

const LOCAL_STORAGE_KEY = 'adoption-theme';

interface IProps {
  customThemes?: Record<string, Partial<ITheme>>;
}

const getDefaultTheme = (): IViableTheme => {
  /* TODO: handle user theme pref + priorities (selected theme > user pref > default theme)
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')) {
        return {
          name: 'dark',
          palette: defaultThemes.dark,
        }
    }
  */

  return {
    name: 'light',
    palette: defaultThemes.light,
  };
}

export const defaultTheme = getDefaultTheme();

/* istanbul ignore next */
export const ThemeContext = React.createContext<IThemeContext>({
  currentTheme: defaultTheme,
  switchTo: () => { },
});

export const ThemeProvider: React.FC<IProps> = ({ customThemes, children }) => {
  const [themesLoaded, setThemesLoaded] = useState(false);
  const [availableThemes, setAvailableThemes] = useState<Record<string, ITheme>>(defaultThemes);
  const [currentTheme, setCurrentTheme] = useState<IViableTheme>(defaultTheme);

  const setViableThemeOrDefault = useCallback(
    (themeName: string): [string, ITheme] => {
      const requestedTheme = availableThemes[themeName] as ITheme;
      let theme = defaultTheme;

      if (requestedTheme) {
        theme = {
          name: themeName,
          palette: requestedTheme,
        };
      } else {
        console.warn(`[WARN] Adoption Theme - requested theme "${themeName}" was not found. Defaulting to "${theme.name
          }" preset.\n
Add your theme to 'customThemes' property on <ThemeProvider>.
Available themes: ${Object.keys(availableThemes).join(', ')}`);
      }

      setCurrentTheme(theme);

      return [theme.name, theme.palette];
    },
    [availableThemes]
  );

  useEffect(() => {
    if (!customThemes || Object.keys(customThemes).length === 0) {
      return setThemesLoaded(true);
    }
    const filledCustomThemes: Record<string, ITheme> = {};

    Object.keys(customThemes).forEach((key) => {
      const viableTheme = (mergeDeep(defaultTheme.palette, customThemes[key]) as unknown) as ITheme;
      filledCustomThemes[key] = viableTheme;
    });

    setAvailableThemes((prevState) => {
      return { ...prevState, ...filledCustomThemes };
    });

    setThemesLoaded(true);
  }, [customThemes]);

  useEffect(() => {
    if (!themesLoaded) return;

    const theme = localStorage.getItem(LOCAL_STORAGE_KEY) ?? 'light';
    setViableThemeOrDefault(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themesLoaded]);

  const switchTo = (nextTheme: ThemeLabel | string) => {
    const [name] = setViableThemeOrDefault(nextTheme);
    localStorage.setItem(LOCAL_STORAGE_KEY, name);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, switchTo }}>
      <SCThemeProvider theme={currentTheme.palette}>{children}</SCThemeProvider>
    </ThemeContext.Provider>
  );
};
