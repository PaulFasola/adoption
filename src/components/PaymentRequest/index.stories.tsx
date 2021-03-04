import React, { Fragment, useState } from 'react';
import { PaymentRequest } from '../PaymentRequest';
import { PaymentStatus } from './enums/paymentStatus';
import { ITransaction } from './interfaces';

export default {
  title: 'PaymentRequest',
  component: PaymentRequest,
  argTypes: {
    // todo
  }
};

export const Basic = (): React.ReactNode => {
  return (
    <PaymentRequest
      symbol='BTC'
      decimalPlaces={8}
      logos={{
        coin: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Bitcoin_logo.svg"
      }}
      address="1BitcoinEaterAddressDontSendf59kuE"
      amount={{ toPay: 0.9 }}
    />
  )
};

export const Detailed = (): React.ReactNode => {
  const dueDate = new Date();
  dueDate.setTime(dueDate.setMinutes(dueDate.getMinutes() + 15));
  return (
    <PaymentRequest
      status={PaymentStatus.PENDING}
      symbol='BTC'
      decimalPlaces={8}
      sellerName='Such Company LTD'
      logos={{
        coin: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Bitcoin_logo.svg",
        company: require('../../assets/fictiveCompany.png')
      }}
      address="1BitcoinEaterAddressDontSendf59kuE"
      amount={{ toPay: 0.9, received: 0 }}
      deadline={{
        dateLocale: 'en-US',
        datetime: dueDate,
        humanized: true
      }}
    />
  )
};

export const AnimatedStatus = (): React.ReactNode => {
  const dueDate = new Date();
  dueDate.setTime(dueDate.setMinutes(dueDate.getMinutes() + 15));
  return (
    <PaymentRequest waitAnimation
      status={PaymentStatus.PENDING}
      symbol='BTC'
      decimalPlaces={8}
      sellerName='Such Company LTD'
      logos={{
        coin: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Bitcoin_logo.svg",
        company: require('../../assets/fictiveCompany.png')
      }}
      address="1BitcoinEaterAddressDontSendf59kuE"
      amount={{ toPay: 0.9, received: 0 }}
      deadline={{
        dateLocale: 'en-US',
        datetime: dueDate,
        humanized: true
      }}
    />
  )
};

export const Transacted = (): React.ReactNode => {
  const dueDate = new Date();
  dueDate.setTime(dueDate.setMinutes(dueDate.getMinutes() + 15));
  return (
    <PaymentRequest
      status={PaymentStatus.PENDING}
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
      deadline={{
        dateLocale: 'en-US',
        datetime: dueDate,
        humanized: true
      }}
    />
  )
};

const txs = new Array<ITransaction>(30);
txs.fill({
  txHash: '369d241af595fc253479abe394e2f21fda05820a0416942f63266dd793035cf1',
  txUrl: 'https://www.blockchain.com/btc/tx/369d241af595fc253479abe394e2f21fda05820a0416942f63266dd793035cf1',
  amount: 0.01
}, 0, 20);

export const Completed = (): React.ReactNode => {
  const dueDate = new Date();
  dueDate.setTime(dueDate.setMinutes(dueDate.getMinutes() + 15));
  return (
    <PaymentRequest
      status={PaymentStatus.COMPLETE}
      symbol='BTC'
      decimalPlaces={8}
      sellerName='Such Company LTD'
      logos={{
        coin: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Bitcoin_logo.svg",
        company: require('../../assets/fictiveCompany.png')
      }}
      address="1BitcoinEaterAddressDontSendf59kuE"
      amount={{ toPay: 0.2, received: 0.2 }}
      transactions={txs}
      deadline={{
        dateLocale: 'en-US',
        datetime: dueDate,
        humanized: true
      }}
    />
  )
};

export const WithActions = (): React.ReactNode => {
  const dueDate = new Date();
  dueDate.setTime(dueDate.setMinutes(dueDate.getMinutes() + 15));
  return (
    <PaymentRequest
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
      customStatusText={'Waiting for payment'}
      deadline={{
        dateLocale: 'en-US',
        datetime: dueDate,
        humanized: true
      }}
    />
  )
};

export const Simulation: React.FC = () => {
  const [status, setStatus] = useState<PaymentStatus>();

  const dueDate = new Date();
  dueDate.setTime(dueDate.setMinutes(dueDate.getMinutes() + 15));

  const _triggerStatus = (status: PaymentStatus) => (): void => {
    setStatus(status);
  }

  return (
    <Fragment>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={_triggerStatus(PaymentStatus.COMPLETE)}>Trigger success</button>
        <button onClick={_triggerStatus(PaymentStatus.FAILED)}>Trigger failure</button>
      </div>
      <PaymentRequest
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
        deadline={{
          dateLocale: 'en-US',
          datetime: dueDate,
          humanized: true
        }}
        status={status}
      />
    </Fragment>
  );
};

export const CustomStrings = (): React.ReactNode => {
  const dueDate = new Date();
  dueDate.setTime(dueDate.setMinutes(dueDate.getMinutes() + 15));
  return (
    <PaymentRequest
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
        datetime: dueDate,
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
      }}
    />
  )
};