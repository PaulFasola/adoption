import React, { useContext } from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { axe, toHaveNoViolations } from 'jest-axe';
import { configure, mount, shallow } from 'enzyme';
import { render } from '@testing-library/react';
import { LocalizationContext, LocalizationProvider } from '../localizationProvider';
import { TransactionStatus, TxStatus } from '../../../components/TransactionStatus';
import { ILocalizedStrings } from '../ILocalizedStrings';

import 'jest-styled-components';

expect.extend(toHaveNoViolations);
configure({ adapter: new Adapter() });

describe('LocalizationProvider component', () => {
  it('should render children', () => {
    shallow(
      <LocalizationProvider>
        <TransactionStatus amount='0.0001' symbol='BTC' status={TxStatus.PENDING} />
      </LocalizationProvider>
    );
  });

  it('should fallback to the default locale if the requested one is missing', async () => {
    const MISSING_LOCALE_LABEL = 'missingLocale';

    const MyComponent = (): React.ReactElement => {
      const { currentlocalization, switchTo } = useContext(LocalizationContext);

      return (
        <>
          {currentlocalization.locale}
          <button data-testid='switch-locale' onClick={() => switchTo(MISSING_LOCALE_LABEL)}>
            switch
          </button>
          <TransactionStatus amount='0.0001' symbol='BTC' status={TxStatus.PENDING} />
        </>
      );
    };

    const component = render(
      <LocalizationProvider>
        <MyComponent />
      </LocalizationProvider>
    );

    const consoleOutput: string[] = [];
    const mockedWarn = (output: string) => consoleOutput.push(output);

    const button = await component.findByTestId('switch-locale');
    const originalWarn = console.warn;

    console.warn = mockedWarn;
    button.click();
    console.warn = originalWarn;

    expect(consoleOutput.length).toEqual(1);
    expect(consoleOutput[0].indexOf(MISSING_LOCALE_LABEL)).toBeGreaterThan(-1);
  });

  it('should render custom locales when requested', async () => {
    const CUST_LOCALE_NAME = 'fr-FR';

    const appLocales: Record<string, Partial<ILocalizedStrings>> = {
      [CUST_LOCALE_NAME]: {
        paymentRequest: {
          // Anything here, this is not part of the scope
          cancel: 'Annuler',
        },
      },
    };

    const MyComponent = (): React.ReactElement => {
      const { currentlocalization, switchTo } = useContext(LocalizationContext);

      return (
        <>
          <button onClick={() => switchTo(CUST_LOCALE_NAME)}></button>
          <p data-testid='locale-name'>{currentlocalization.locale}</p>
          <TransactionStatus amount='0.0001' symbol='BTC' status={TxStatus.PENDING} />
        </>
      );
    };

    const component = mount(
      <LocalizationProvider customLocales={appLocales}>
        <MyComponent />
      </LocalizationProvider>
    );

    const button = component.find('button');
    button.simulate('click');

    const localeName = component.find('[data-testid="locale-name"]');
    expect(localeName.text()).toEqual(CUST_LOCALE_NAME);
  });

  it('should not have any accessibility issues', async () => {
    const { container } = render(
      <LocalizationProvider>
        <TransactionStatus amount='0.0001' symbol='BTC' status={TxStatus.PENDING} />
      </LocalizationProvider>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
