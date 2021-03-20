/* istanbul ignore file */
import React, { useContext } from 'react';
import { ILocalizedStrings } from './ILocalizedStrings';
import { defaultLocale } from './defaultLocalization';
import { LocaleType } from './ILocalizationContext';
import { LocalizationContext, LocalizationProvider } from './localizationProvider';

interface IProps {
  customLocales?: Record<LocaleType, Partial<ILocalizedStrings>>;
}

export const LocalizationWrapper: React.FC<IProps> = ({ customLocales, children }) => {
  const Wrapper: React.FC<IProps> = ({ customLocales, children }) => {
    const { currentlocalization, switchTo } = useContext(LocalizationContext);
    const availableThemes = [...Object.keys(customLocales ?? []), defaultLocale];

    return (
      <>
        <div style={{ marginBottom: '1rem' }}>
          <p>
            Locale is <b>{currentlocalization.locale}</b>
            <br />
            <small>
              It&apos;s saved into your browser&apos;s localStorage, so this locale will persist if
              you refresh the page.
            </small>
          </p>
          {availableThemes.map((key, i) => (
            <button style={{ margin: '0 0.2rem' }} key={i.toString()} onClick={() => switchTo(key)}>
              Go {key}
            </button>
          ))}
        </div>

        {children}
      </>
    );
  };
  return (
    <LocalizationProvider customLocales={customLocales}>
      <Wrapper customLocales={customLocales}>{children}</Wrapper>
    </LocalizationProvider>
  );
};
