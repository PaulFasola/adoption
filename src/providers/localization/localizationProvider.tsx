import React, { useCallback, useEffect, useState } from 'react';
import { ILocalizationContext, IViableLocale, LocaleType } from './ILocalizationContext';
import { mergeDeep } from '../../utils/mergeDeep';
import { ILocalizedStrings } from './ILocalizedStrings';
import { defaultLocale, defaultLocalization } from './defaultLocalization';

const LOCAL_STORAGE_KEY = 'adoption-locale';

interface IProps {
  customLocales?: Record<string, Partial<ILocalizedStrings>>;
}

/* istanbul ignore next */
export const LocalizationContext = React.createContext<ILocalizationContext>({
  currentlocalization: defaultLocalization,
  switchTo: () => {},
});

export const LocalizationProvider: React.FC<IProps> = ({ customLocales, children }) => {
  const [localesLoaded, setLocalesLoaded] = useState(false);

  const [availableLocales, setAvailableLocales] = useState<
    Record<string, Partial<ILocalizedStrings>>
  >({
    [defaultLocale]: defaultLocalization.strings,
  });

  const [currentlocalization, setCurrentLocalization] = useState<IViableLocale>(
    defaultLocalization
  );

  const setViableLocaleOrDefault = useCallback(
    (locale: LocaleType, warn = true): [string, ILocalizedStrings] => {
      const requestedStrings = availableLocales[locale] as ILocalizedStrings;
      let viableLocalization = defaultLocalization;

      if (requestedStrings) {
        viableLocalization = {
          locale,
          strings: requestedStrings,
        };
      } else {
        warn &&
          console.warn(`[WARN] Adoption Localization - requested locale "${locale}" was not found. Defaulting to "${defaultLocale}" preset.\n
Add your locale to 'customLocales' property on <LocalizationProvider>.
Available locales: ${Object.keys(availableLocales).join(', ')}`);
        locale = defaultLocale;
      }

      setCurrentLocalization(viableLocalization);

      return [locale, requestedStrings];
    },
    [availableLocales]
  );

  useEffect(() => {
    if (!customLocales || Object.keys(customLocales).length === 0) {
      return setLocalesLoaded(true);
    }

    const filledCustomLocales: Record<string, ILocalizedStrings> = {};
    Object.keys(customLocales).forEach((key) => {
      const viableLocale = (mergeDeep(
        defaultLocalization.strings,
        customLocales[key]
      ) as unknown) as ILocalizedStrings;
      filledCustomLocales[key] = viableLocale;
    });

    setAvailableLocales((prevState) => {
      return { ...prevState, ...filledCustomLocales };
    });
    setLocalesLoaded(true);
  }, [customLocales]);

  useEffect(() => {
    if (!localesLoaded) return;

    let warn = true;
    let locale = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!locale) {
      /* istanbul ignore next */
      locale = navigator.language || navigator['userLanguage'];
      warn = false;
    }

    /* istanbul ignore next */
    setViableLocaleOrDefault(locale ?? defaultLocale, warn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localesLoaded]);

  const switchTo = (nextLocale: LocaleType) => {
    const [name] = setViableLocaleOrDefault(nextLocale);
    localStorage.setItem(LOCAL_STORAGE_KEY, name);
  };

  return (
    <LocalizationContext.Provider value={{ currentlocalization, switchTo }}>
      {children}
    </LocalizationContext.Provider>
  );
};
