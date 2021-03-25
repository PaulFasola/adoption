import React, { Fragment, useState } from 'react';
import { ILocalizedStrings } from '../../providers/localization/ILocalizedStrings';
import { LocalizationProvider } from '../../providers/localization/localizationProvider';
import { PaymentRequest } from '../PaymentRequest';
import { PaymentStatus } from './enums/paymentStatus';
import { IProps, ITransaction } from './interfaces';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import companyLogo from '../../assets/fictiveCompany.png';

export default {
  title: 'Components/PaymentRequest',
} as Meta;

const dueDate = new Date();
dueDate.setTime(dueDate.setMinutes(dueDate.getMinutes() + 15));

export const Basic: Story<IProps> = (args) => <PaymentRequest {...args} />;
Basic.args = {
  symbol: 'BTC',
  decimalPlaces: 8,
  logos: {
    coin: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Bitcoin_logo.svg',
  },
  address: '1BitcoinEaterAddressDontSendf59kuE',
  amount: {
    toPay: 0.9,
  },
  noShadow: false,
};

export const Detailed: Story<IProps> = (args) => (
  <PaymentRequest status={PaymentStatus.PENDING} {...args} />
);
Detailed.args = {
  ...Basic.args,
  showQRCode: true,
  status: PaymentStatus.PENDING,
  sellerName: 'Such Company LTD',
  logos: {
    coin: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Bitcoin_logo.svg',
    company: companyLogo,
  },
  amount: { toPay: 0.9, received: 0 },
  deadline: {
    dateLocale: 'en-US',
    datetime: dueDate,
    humanized: true,
  },
};

export const AnimatedStatus: Story<IProps> = (args) => <PaymentRequest waitAnimation {...args} />;
AnimatedStatus.args = {
  ...Detailed.args,
  waitAnimation: true,
};

export const Transacted: Story<IProps> = (args) => <PaymentRequest {...args} />;
Transacted.args = {
  ...Detailed.args,
  amount: {
    toPay: 0.9,
    received: 0.2,
  },
};

const txs = new Array<ITransaction>(30).fill(
  {
    txHash: '369d241af595fc253479abe394e2f21fda05820a0416942f63266dd793035cf1',
    txUrl:
      'https://www.blockchain.com/btc/tx/369d241af595fc253479abe394e2f21fda05820a0416942f63266dd793035cf1',
    amount: 0.01,
  },
  0,
  20
);

export const Completed: Story<IProps> = (args) => <PaymentRequest {...args} />;
Completed.args = {
  ...Detailed.args,
  status: PaymentStatus.COMPLETE,
  transactions: txs,
  amount: {
    toPay: 0.2,
    received: 0.2,
  },
};

export const WithActions: Story<IProps> = (args) => <PaymentRequest {...args} />;
WithActions.args = {
  ...Detailed.args,
  transactions: [
    {
      txHash: '369d241af595fc253479abe394e2f21fda05820a0416942f63266dd793035cf1',
      txUrl:
        'https://www.blockchain.com/btc/tx/369d241af595fc253479abe394e2f21fda05820a0416942f63266dd793035cf1',
      amount: 0.1,
    },
    {
      txHash: '519f6c9581ce27e0a59f5f8e427b672087e1f2eb1aead0d66288de62ed3e9647',
      txUrl:
        'https://www.blockchain.com/btc/tx/519f6c9581ce27e0a59f5f8e427b672087e1f2eb1aead0d66288de62ed3e9647',
      amount: 0.1,
    },
  ],
  helpUrl: 'https://github.com/PaulFasola/adoption/blob/master/README.md',
  onCancel: () => {
    action('onCancel');
    alert('User wants to cancel, do something here!');
  },
};

export const CustomStrings: Story<IProps> = (args) => {
  const locales: Record<string, Partial<ILocalizedStrings>> = {
    ['en-US']: {
      paymentRequest: {
        cancel: 'Very cancelling',
        seller: 'Seller',
        deadline: 'Deadline',
        // txStatus is overriden by customStatusText props in this example.
        txStatus: {
          complete: 'Done o/',
          failed: 'Failed :(',
          pending: 'is pending...',
        },
        request: 'Pay {amount} {symbol} to get your item',
        help: 'Wow, help here',
        status: 'Transaction',
        receivedAmount: 'Received:',
        remainingAmount: 'Remaining:',
        transactions: '{txAmount} transactions',
      },
    },
  };

  return (
    <LocalizationProvider customLocales={locales}>
      <PaymentRequest {...args} />
    </LocalizationProvider>
  );
};
CustomStrings.args = {
  ...WithActions.args,
  customStatusText: 'Custom status message',
};

export const Simulation: Story<IProps> = () => {
  const [status, setStatus] = useState<PaymentStatus>();

  const handleClick = (status: PaymentStatus) => (): void => {
    setStatus(status);
  };

  return (
    <Fragment>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleClick(PaymentStatus.COMPLETE)}>Trigger success</button>
        <button onClick={handleClick(PaymentStatus.FAILED)}>Trigger failure</button>
      </div>
      <PaymentRequest
        symbol='BTC'
        decimalPlaces={8}
        sellerName='Such Company LTD'
        logos={{
          coin: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Bitcoin_logo.svg',
          company: companyLogo,
        }}
        address='1BitcoinEaterAddressDontSendf59kuE'
        amount={{ toPay: 0.9, received: 0.2 }}
        transactions={[
          {
            txHash: '369d241af595fc253479abe394e2f21fda05820a0416942f63266dd793035cf1',
            txUrl:
              'https://www.blockchain.com/btc/tx/369d241af595fc253479abe394e2f21fda05820a0416942f63266dd793035cf1',
            amount: 0.1,
          },
          {
            txHash: '519f6c9581ce27e0a59f5f8e427b672087e1f2eb1aead0d66288de62ed3e9647',
            txUrl:
              'https://www.blockchain.com/btc/tx/519f6c9581ce27e0a59f5f8e427b672087e1f2eb1aead0d66288de62ed3e9647',
            amount: 0.1,
          },
        ]}
        helpUrl='https://github.com/PaulFasola/adoption/blob/master/README.md'
        deadline={{
          dateLocale: 'en-US',
          datetime: dueDate,
          humanized: true,
        }}
        status={status}
      />
    </Fragment>
  );
};
Simulation.parameters = {
  controls: { hideNoControlsWarning: true },
};
