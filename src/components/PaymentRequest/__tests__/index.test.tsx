import React from 'react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { render } from '@testing-library/react';
import { PaymentRequest } from '../';

expect.extend(toHaveNoViolations);

const BasicComponent = (<PaymentRequest
  symbol='BTC'
  decimalPlaces={8}
  logos={{
    coin: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Bitcoin_logo.svg"
  }}
  address="1BitcoinEaterAddressDontSendf59kuE"
  amount={{ toPay: 0.9 }} />);

const DetailedComponent = (<PaymentRequest
  symbol='BTC'
  decimalPlaces={8}
  sellerName='Such Company LTD'
  logos={{
    coin: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Bitcoin_logo.svg",
    company: require('../../assets/fictiveCompany.png')
  }}
  address="1BitcoinEaterAddressDontSendf59kuE"
  amount={{ toPay: 0.9, received: 0 }}
  status={'Waiting for payment'}
  deadline={{
    dateLocale: 'en-US',
    datetime: new Date(),
    humanized: true
  }}
/>);

const components = {
  'PaymentRequest - Minimalistic': BasicComponent,
  'PaymentRequest - Detailed': DetailedComponent
}

Object.keys(components).forEach(name => (
  describe(`${name}`, () => {
    it('should render', () => {
      const button = render(components[name]);
      expect(button.container.querySelector('div')).toBeTruthy();
    });

    it('should not have any accessibility issues', async () => {
      const { container } = render(components[name]);
      expect(await axe(container)).toHaveNoViolations();
    });
  })
));

