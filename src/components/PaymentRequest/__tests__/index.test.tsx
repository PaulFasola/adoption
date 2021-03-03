import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { render } from '@testing-library/react';
import { PaymentRequest } from '../';
import { ITransaction } from '../interfaces';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

configure({ adapter: new Adapter() });

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
  }} />);

const components = {
  'PaymentRequest - Minimalistic': BasicComponent,
  'PaymentRequest - Detailed': DetailedComponent
}

Object.keys(components).forEach(name => (
  describe(`${name}`, () => {
    it('should render', () => {
      shallow(components[name])
    });
  })
));

describe('PaymentRequest Detailed', () => {
  it('should set txStatus to "completed" when the remaining balance is <=0 ', () => {
    const wrapper = shallow(<PaymentRequest
      symbol='BTC'
      decimalPlaces={8}
      sellerName='Such Company LTD'
      logos={{
        coin: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Bitcoin_logo.svg",
        company: require('../../assets/fictiveCompany.png')
      }}
      address="1BitcoinEaterAddressDontSendf59kuE"
      amount={{ toPay: 0.9, received: 0.9 }}
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
      }} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Should be fully strings customizable', () => {
    const wrapper = shallow(<PaymentRequest
      symbol='BTC'
      decimalPlaces={8}
      sellerName='Such Company LTD'
      logos={{
        coin: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Bitcoin_logo.svg",
        company: require('../../assets/fictiveCompany.png')
      }}
      address="1BitcoinEaterAddressDontSendf59kuE"
      amount={{ toPay: 0.9, received: 0.2 }}
      transactions={[
        {
          txHash: '369d241af595fc253479abe394e2f21fda05820a0416942f63266dd793035cf1',
          txUrl: 'https://www.blockchain.com/btc/tx/369d241af595fc253479abe394e2f21fda05820a0416942f63266dd793035cf1',
          amount: 0.1
        },
        {
          txHash: '519f6c9581ce27e0a59f5f8e427b672087e1f2eb1aead0d66288de62ed3e9647',
          txUrl: 'https://www.blockchain.com/btc/tx/519f6c9581ce27e0a59f5f8e427b672087e1f2eb1aead0d66288de62ed3e9647',
          amount: 0.1
        }
      ]}
      helpUrl='https://github.com/PaulFasola/adoption/blob/master/README.md'
      onCancel={() => alert('User wants to cancel, do something here!')}
      deadline={{
        dateLocale: 'en-US',
        datetime: new Date(2009, 1, 3),
        humanized: true
      }}
      customStatusText={'Custom status message'}
      strings={{
        cancel: 'Very cancelling',
        seller: 'Seller',
        deadline: 'Deadline',
        // txStatus is overriden by customStatusText props in this example.
        txStatus: {
          complete: 'Done \o/',
          failed: 'Failed :(',
          pending: 'is pending...'
        },
        request: 'Pay {amount} {symbol} to get your item',
        help: 'Wow, help here',
        status: 'Transaction',
        receivedAmount: 'Received:',
        remainingAmount: 'Remaining:',
        transactions: '{txAmount} transactions'
      }} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

const txs = new Array<ITransaction>(30).fill({
  txHash: '369d241af595fc253479abe394e2f21fda05820a0416942f63266dd793035cf1',
  txUrl: 'https://www.blockchain.com/btc/tx/369d241af595fc253479abe394e2f21fda05820a0416942f63266dd793035cf1',
  amount: 0.1
}, 0, 20);

const PaymentRequestComponent = (<PaymentRequest
  symbol='BTC'
  decimalPlaces={8}
  logos={{
    coin: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Bitcoin_logo.svg"
  }}
  transactions={txs}
  address="1BitcoinEaterAddressDontSendf59kuE"
  amount={{ toPay: 0.9 }} />);

describe(`PaymentRequest - Edge cases`, () => {
  it('should prevent transaction container to overflow', () => {
    const component = render(PaymentRequestComponent);
    const lastLi = component.container.querySelector('li:last-child') as HTMLLIElement;
    if (!lastLi) fail();
    expect(lastLi.offsetParent).toBe(null); // null offsetParent = the element is not visible
  });
});