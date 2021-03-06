import React, { useContext } from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { configure, shallow } from 'enzyme';
import { ThemeContext, ThemeProvider } from '../themeProvider';
import { TransactionStatus, TxStatus } from '../../../components/TransactionStatus';
import { ITheme } from '../ITheme';

expect.extend(toHaveNoViolations);
configure({ adapter: new Adapter() });

describe('ThemeProvider component', () => {
  it('should render', () => {
    shallow(
      <ThemeProvider>
        <TransactionStatus amount='0.0001' symbol='BTC' status={TxStatus.PENDING} />
      </ThemeProvider>
    );
  });

  it('should fallback to the default theme if the requested one is missing', async () => {
    const MISSING_THEME_LABEL = 'missingTheme';

    const MyComponent = (): React.ReactElement => {
      const { currentTheme, switchTo } = useContext(ThemeContext);

      return (
        <>
          {currentTheme.name}
          <button data-testid='switch-theme' onClick={() => switchTo(MISSING_THEME_LABEL)}>
            switch
          </button>
          <TransactionStatus amount='0.0001' symbol='BTC' status={TxStatus.PENDING} />
        </>
      );
    };

    const component = render(
      <ThemeProvider>
        <MyComponent />
      </ThemeProvider>
    );

    const consoleOutput: string[] = [];
    const mockedWarn = (output: string) => consoleOutput.push(output);

    const button = await component.findByTestId('switch-theme');
    const originalWarn = console.warn;

    console.warn = mockedWarn;
    button.click();
    console.warn = originalWarn;

    expect(consoleOutput.length).toEqual(1);
    expect(consoleOutput[0].indexOf(MISSING_THEME_LABEL)).toBeGreaterThan(-1);
  });

  it('should render custom themes when requested', async () => {
    const appTheme: Record<string, Partial<ITheme>> = {
      myTheme: {
        primary: {
          backgroundColor: 'blue',
        },
      },
    };

    const MyComponent = (): React.ReactElement => {
      const { currentTheme, switchTo } = useContext(ThemeContext);

      return (
        <>
          {currentTheme.name}
          <button data-testid='switch-theme' onClick={() => switchTo('shouldFail')}>
            switch
          </button>
          <TransactionStatus amount='0.0001' symbol='BTC' status={TxStatus.PENDING} />
        </>
      );
    };

    const component = render(
      <ThemeProvider customThemes={appTheme}>
        <MyComponent />
      </ThemeProvider>
    );
    const button = await component.findByTestId('switch-theme');
    button.click();

    expect(component).toMatchSnapshot();
  });

  it('should not have any accessibility issues', async () => {
    const { container } = render(
      <ThemeProvider>
        <TransactionStatus amount='0.0001' symbol='BTC' status={TxStatus.PENDING} />
      </ThemeProvider>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
