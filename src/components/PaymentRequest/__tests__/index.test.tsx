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
  transactions={[
    {
      txHash: '369d241af595fc253479abe394e2f21fda05820a0416942f63266dd793035cf1',
      txUrl: 'https://www.blockchain.com/btc/tx/369d241af595fc253479abe394e2f21fda05820a0416942f63266dd793035cf1',
      amount: 0.1
    },
    {
      txHash: '123',
      txUrl: 'https://www.blockchain.com/btc/tx/519f6c9581ce27e0a59f5f8e427b672087e1f2eb1aead0d66288de62ed3e9647',
      amount: 0.1
    }
  ]}
  deadline={{
    dateLocale: 'en-US',
    datetime: new Date(),
    humanized: true
  }}
  strings={{
    help: 'FooBar'
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

describe(`PaymentRequest - Edge cases`, () => {

});