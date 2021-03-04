import React from 'react';
import { hot } from 'react-hot-loader';
import { PaymentRequest } from 'adoption';

export const App = hot(module)(() => (
  <div>
    <PaymentRequest
      symbol='BTC'
      decimalPlaces={8}
      logos={{
        coin: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Bitcoin_logo.svg"
      }}
      address="1BitcoinEaterAddressDontSendf59kuE"
      amount={{ toPay: 0.9 }}
    />
  </div>
));
