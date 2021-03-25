import React, { useContext } from 'react';
import { PaymentStatus } from '../../components/PaymentRequest/enums/paymentStatus';
import { TransactionStatus, TxStatus } from '../../components/TransactionStatus';
import { PaymentRequest } from '../../components/PaymentRequest';
import { LocalizationContext } from './localizationProvider';
import { ILocalizedStrings } from './ILocalizedStrings';
import { LocalizationWrapper } from './localizationWrapper';
import { Meta, Story } from '@storybook/react';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const companyAsset = require('../../assets/fictiveCompany.png');

export default {
  title: 'LocalizationProvider',
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

export const CustomLocales: Story = () => {
  const FailButton: React.FC = () => {
    const { switchTo } = useContext(LocalizationContext);
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

  const customLocales: Record<string, Partial<ILocalizedStrings>> = {
    'fr-FR': {
      transactionStatus: {
        statuses: {
          completed: 'Terminé',
          failed: 'Echec',
          pending: 'En attente',
          unknown: 'Iconnu',
        },
      },
      paymentRequest: {
        request: "Merci d'envoyer {amount} {symbol} à l'adresse suivante:",
        seller: 'Marchand',
        receivedAmount: 'Montant reçu',
        deadline: 'Envoyer avant',
        remainingAmount: 'Montant restant',
        status: 'État',
        help: "Besoin d'aide? Cliquez ici!",
        txStatus: {
          complete: 'Payment terminé',
          failed: 'Échec du paiement',
          pending: 'En attente du paiement',
        },
      },
    },
    'do-GE': {
      transactionStatus: {
        statuses: {
          completed: 'WOW, Done',
          failed: 'very failing',
          pending: 'so pending',
          unknown: '?????',
        },
      },
      paymentRequest: {
        request: 'Pls send much {symbol} ({amount} {symbol}) to:',
        help: 'Such help? Click here!',
        receivedAmount: 'Received (wow thanks)',
        remainingAmount: 'Remaining (pls)',
        txStatus: {
          complete: 'Very paid',
          failed: 'Not paid :(',
          pending: 'Waiting...',
        },
      },
    },
  };

  return (
    <LocalizationWrapper customLocales={customLocales}>
      <FailButton />
      <LabRat />
    </LocalizationWrapper>
  );
};
CustomLocales.parameters = {
  controls: { hideNoControlsWarning: true },
};
