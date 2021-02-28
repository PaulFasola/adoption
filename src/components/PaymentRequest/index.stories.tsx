import React from 'react';
import { PaymentRequest } from '../PaymentRequest';

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
      status={'Waiting for payment'}
      deadline={{
        dateLocale: 'en-US',
        datetime: dueDate,
        humanized: true
      }}
    />
  )
};

export const Completed = (): React.ReactNode => {
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
      amount={{ toPay: 0.2, received: 0.2 }}
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
      status={'Waiting for payment'}
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
      status={'Waiting for payment'}
      deadline={{
        dateLocale: 'en-US',
        datetime: dueDate,
        humanized: true
      }}
    />
  )
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
      status={'Waiting for payment'}
      deadline={{
        dateLocale: 'en-US',
        datetime: dueDate,
        humanized: true
      }}
      strings={{
        cancel: 'Very cancelling',
        seller: 'Seller',
        deadline: 'Deadline',
        completed: 'Done',
        request: 'Pay {amount} {symbol} to get your item',
        help: 'Wow, help here',
        status: 'Waiting',
        receivedAmount: 'Received:',
        remainingAmount: 'Remaining:',
        transactions: '{txAmount} transactions'
      }}
    />
  )
};
