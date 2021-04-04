import React, { useContext } from 'react';
import { PaymentStatus } from '../../components/PaymentRequest/enums/paymentStatus';
import { TransactionStatus, TxStatus } from '../../components/TransactionStatus';
import { PaymentRequest } from '../../components/PaymentRequest';
import { ThemeContext } from './themeProvider';
import { ITheme } from './ITheme';
import { ThemeWrapper } from './themeWrapper';
import { Meta, Story } from '@storybook/react';

import companyAsset from '../../assets/fictiveCompany.png';

export default {
  title: 'ThemeProvider',
} as Meta;

const LabRat = (): React.ReactElement => (
  <>
    <TransactionStatus
      status={TxStatus.PENDING}
      amount='0.1'
      symbol='BTC'
      txURL='https://www.blockchain.com/btc/tx/369d241af595fc253479abe394e2f21fda05820a0416942f63266dd793035cf1'
    />
    <br />
    <PaymentRequest
      symbol='BTC'
      decimalPlaces={8}
      sellerName='Such Company LTD'
      logos={{
        coin: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Bitcoin_logo.svg',
        company: companyAsset,
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
        datetime: new Date(),
        humanized: true,
      }}
      status={PaymentStatus.PENDING}
    />
  </>
);

export const Presets: Story = () => (
  <ThemeWrapper>
    <LabRat />
  </ThemeWrapper>
);
Presets.parameters = {
  controls: { hideNoControlsWarning: true },
};

export const CustomThemes: Story = () => {
  const customThemes: Record<string, Partial<ITheme>> = {
    wow: {
      primary: {
        backgroundColor: 'pink',
        color: 'yellow',
      },
    },
    veryOrganic: {
      primary: {
        backgroundColor: 'lightgreen',
        color: 'darkgreen',
      },
    },
  };

  const FailButton: React.FC = () => {
    const { switchTo } = useContext(ThemeContext);
    return (
      <button
        style={{ marginBottom: '1.5rem' }}
        onClick={() => {
          switchTo('thatDoesNotExist');
          setTimeout(() => {
            alert('Check the console below, a warning is waiting for you ;)');
          }, 200);
        }}
      >
        Go thatDoesNotExist (will fail).
      </button>
    );
  };

  return (
    <ThemeWrapper customThemes={customThemes}>
      <FailButton />
      <LabRat />
    </ThemeWrapper>
  );
};
CustomThemes.parameters = {
  controls: { hideNoControlsWarning: true },
};
