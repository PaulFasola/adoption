import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import { render } from '@testing-library/react';
import { PaymentRequest } from '../';
import { ITransaction } from '../interfaces';
import { configure, shallow } from 'enzyme';
import { PaymentStatus } from '../enums/paymentStatus';
import { advanceBy, advanceTo, clear } from 'jest-date-mock';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const companyAsset = require('../../assets/fictiveCompany.png');

configure({ adapter: new Adapter() });

const testRelativeDateTime = (unit: string, offset: number): void => {
  it(`should render relative time correctly (${unit})`, () => {
    // Let's mock that date
    const mockedDate = new Date(2009, 1, 3, 0, 0, 0);
    advanceTo(mockedDate);

    // Adds 2 hours to the current timestamp
    advanceBy(offset);
    const future = new Date();

    // Go back into the past
    advanceTo(mockedDate);

    /**
     * date   = 2009, 1, 3, 0, 0, 0
     * future = 2009, 1, 3, 2, 0, 0
     */
    const wrapper = shallow(
      <PaymentRequest
        deadline={{ datetime: future, humanized: true }}
        symbol='BTC'
        decimalPlaces={8}
        logos={{
          coin: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Bitcoin_logo.svg"
        }}
        address="1BitcoinEaterAddressDontSendf59kuE"
        amount={{ toPay: 0.9 }}
      />);

    expect(toJson(wrapper)).toMatchSnapshot();
    clear();
  });
}

describe(`PaymentRequest Basic`, () => {

  it('should render', () => {
    shallow(
      <PaymentRequest
        symbol='BTC'
        decimalPlaces={8}
        logos={{
          coin: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Bitcoin_logo.svg"
        }}
        address="1BitcoinEaterAddressDontSendf59kuE"
        amount={{ toPay: 0.9 }}
      />);
  });

  // "Should render relative time correctly {unit}"
  testRelativeDateTime('minutes', 2 * 60 * 1000);
  testRelativeDateTime('hours', 2 * 60 * 60 * 1000);
  testRelativeDateTime('days', 2 * 24 * 60 * 60 * 1000);

  it('should render a visual animation if status is "completed" or "failed"', () => {
    [PaymentStatus.COMPLETE, PaymentStatus.FAILED].forEach(status => {
      const wrapper = shallow(
        <PaymentRequest
          status={status}
          symbol='BTC'
          decimalPlaces={8}
          logos={{
            coin: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Bitcoin_logo.svg"
          }}
          address="1BitcoinEaterAddressDontSendf59kuE"
          amount={{ toPay: 0.9 }}
        />);

      expect(toJson(wrapper)).toMatchSnapshot();
    })
  });

  it('should not render any visual status if 1) payment status is not "completed" or "failed" and 2) showQRCode prop is false.', () => {
    const wrapper = shallow(
      <PaymentRequest
        showQRCode={false}
        symbol='BTC'
        decimalPlaces={8}
        logos={{
          coin: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Bitcoin_logo.svg"
        }}
        address="1BitcoinEaterAddressDontSendf59kuE"
        amount={{ toPay: 0.9 }}
      />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe('PaymentRequest Detailed', () => {
  it('should render', () => {
    shallow(
      <PaymentRequest
        symbol='BTC'
        decimalPlaces={8}
        sellerName='Such Company LTD'
        logos={{
          coin: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Bitcoin_logo.svg",
          company: companyAsset
        }}
        helpUrl="http://foobar/"
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
        }}
      />);
  });

  it('should be fully string customizable', () => {
    const wrapper = shallow(
      <PaymentRequest
        symbol='BTC'
        decimalPlaces={8}
        logos={{
          coin: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Bitcoin_logo.svg"
        }}
        address="1BitcoinEaterAddressDontSendf59kuE"
        amount={{ toPay: 0.9 }}
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
        }}
      />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should set txStatus to "completed" when the remaining balance is <= 0', () => {
    const wrapper = shallow(<PaymentRequest
      symbol='BTC'
      decimalPlaces={8}
      sellerName='Such Company LTD'
      logos={{
        coin: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Bitcoin_logo.svg",
        company: companyAsset
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
      }}
    />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render spining animation when status is "pending" and waitAnimation is true.', () => {
    const wrapper = shallow(<PaymentRequest
      waitAnimation
      status={PaymentStatus.PENDING}
      symbol='BTC'
      decimalPlaces={8}
      logos={{
        coin: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Bitcoin_logo.svg"
      }}
      address="1BitcoinEaterAddressDontSendf59kuE"
      amount={{ toPay: 0.9 }}
    />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Should be fully strings customizable', () => {
    const wrapper = shallow(<PaymentRequest
      symbol='BTC'
      decimalPlaces={8}
      sellerName='Such Company LTD'
      logos={{
        coin: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Bitcoin_logo.svg",
        company: companyAsset
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
        datetime: new Date(2009, 1, 3)
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

const PaymentRequestComponent = (<PaymentRequest
  symbol='BTC'
  decimalPlaces={8}
  logos={{
    coin: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Bitcoin_logo.svg"
  }}
  transactions={
    // Spawn 30 txs
    new Array<ITransaction>(30).fill({
      txHash: '369d241af595fc253479abe394e2f21fda05820a0416942f63266dd793035cf1',
      txUrl: 'https://www.blockchain.com/btc/tx/369d241af595fc253479abe394e2f21fda05820a0416942f63266dd793035cf1',
      amount: 0.1
    }, 0, 20)
  }
  address="1BitcoinEaterAddressDontSendf59kuE"
  strings={{
    help: 'Halp!'
  }}
  amount={{ toPay: 0.9 }} />);

describe(`PaymentRequest - Edge cases`, () => {
  it('should prevent transaction container to overflow', () => {
    const component = render(PaymentRequestComponent);
    const lastLi = component.container.querySelector('li:last-child') as HTMLLIElement;
    if (!lastLi) fail();
    expect(lastLi.offsetParent).toBe(null); // null offsetParent = the element is not visible
  });
});