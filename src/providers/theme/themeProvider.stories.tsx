import React, { useContext } from 'react';
import { PaymentRequest } from '../../components/PaymentRequest';
import { PaymentStatus } from '../../components/PaymentRequest/enums/paymentStatus';
import { ITheme } from './ITheme';
import { ThemeContext, ThemeProvider } from './themeProvider';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const companyAsset = require('../../assets/fictiveCompany.png');

export default {
  title: 'ThemeProvider',
};

const LabRat = (): React.ReactElement => {
  return (
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
      status={PaymentStatus.COMPLETE}
      strings={{
        txStatus: {
          failed: 'Payment failed :(',
          pending: 'Waiting for payment',
          complete: 'Paid! Redirecting...',
        },
      }}
    />
  );
};

export const Presets: React.FC = () => {
  const MyPaymentRequest: React.FC = () => {
    const { currentTheme, switchTo } = useContext(ThemeContext);

    return (
      <>
        <div style={{ marginBottom: '20px' }}>
          <p>
            Theme is <b>{currentTheme.name}</b>.
          </p>
          <button onClick={() => switchTo('dark')}>Go dark</button>
          <button onClick={() => switchTo('light')}>Go light</button>
        </div>
        <LabRat />
      </>
    );
  };

  return (
    <ThemeProvider>
      <MyPaymentRequest />
    </ThemeProvider>
  );
};

export const CustomPresets: React.FC = () => {
  const customThemes: Record<string, ITheme> = {
    wow: {
      primary: {
        backgroundColor: 'pink',
        color: 'purple',
      },
    },
  };

  const MyPaymentRequest: React.FC = () => {
    const { currentTheme, switchTo } = useContext(ThemeContext);
    const availableThemes = [...Object.keys(customThemes), ...['light', 'dark']];
    return (
      <>
        <div style={{ marginBottom: '20px' }}>
          <p>
            Theme is <b>{currentTheme.name}</b>.
          </p>
          {availableThemes.map((key, i) => (
            <button key={i.toString()} onClick={() => switchTo(key)}>
              Go {key}
            </button>
          ))}
          <button
            onClick={() => {
              switchTo('fail');
              alert('Check your console, a warning is waiting for you ;)');
            }}
          >
            Go fail (will.. fail).
          </button>
        </div>
        <LabRat />
      </>
    );
  };

  return (
    <ThemeProvider customThemes={customThemes}>
      <MyPaymentRequest />
    </ThemeProvider>
  );
};
