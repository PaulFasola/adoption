import React from 'react';
import { activeProtocols } from '../ProtocolSelector/__tests__/mocks';
import { CurrencySwap } from '.';

export default {
  title: 'Components/CurrencySwap',
};

export const Basic = (): React.ReactNode => {
  return (
    <CurrencySwap
      protocols={{
        input: activeProtocols,
      }}
    />
  );
};
