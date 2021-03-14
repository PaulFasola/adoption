/* istanbul ignore file */
import React, { useContext } from 'react';
import { ITheme } from './ITheme';
import { ThemeContext, ThemeProvider } from './themeProvider';

interface IProps {
  customThemes?: Record<string, Partial<ITheme>>;
}

export const ThemeWrapper: React.FC<IProps> = ({ customThemes, children }) => {
  const Wrapper: React.FC<IProps> = ({ customThemes, children }) => {
    const { currentTheme, switchTo } = useContext(ThemeContext);
    const availableThemes = [...Object.keys(customThemes ?? []), ...['light', 'dark']];

    return (
      <>
        <div style={{ marginBottom: '1rem' }}>
          <p>
            Theme is <b>{currentTheme.name}</b>
            <br />
            <small>
              It&apos;s saved into your browser&apos;s localStorage, so this theme will persist if
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
    <ThemeProvider customThemes={customThemes}>
      <Wrapper customThemes={customThemes}>{children}</Wrapper>
    </ThemeProvider>
  );
};
