import React, { useContext } from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { axe, toHaveNoViolations } from 'jest-axe';
import { configure, mount, shallow } from 'enzyme';
import { render } from '@testing-library/react';
import { ThemeContext, ThemeProvider } from '../themeProvider';
import { TransactionStatus, TxStatus } from '../../../components/TransactionStatus';
import { ITheme } from '../ITheme';

import 'jest-styled-components';

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
    const CUST_THEME_NAME = 'wow';

    const appTheme: Record<string, Partial<ITheme>> = {};
    appTheme[CUST_THEME_NAME] = {
      primary: {
        backgroundColor: 'blue',
      },
    };

    const MyComponent = (): React.ReactElement => {
      const { currentTheme, switchTo } = useContext(ThemeContext);

      return (
        <>
          <button onClick={() => switchTo(CUST_THEME_NAME)}></button>
          <p data-testid='theme-name'>{currentTheme.name}</p>
          <TransactionStatus amount='0.0001' symbol='BTC' status={TxStatus.PENDING} />
        </>
      );
    };

    const component = mount(
      <ThemeProvider customThemes={appTheme}>
        <MyComponent />
      </ThemeProvider>
    );

    const button = component.find('button');
    button.simulate('click');

    const themeName = component.find('[data-testid="theme-name"]');
    expect(themeName.text()).toEqual(CUST_THEME_NAME);
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
