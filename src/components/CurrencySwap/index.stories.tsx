import React from 'react';
import { ThemeWrapper } from '../../providers/theme/themeWrapper';
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

export const Themed = (): React.ReactNode => {
  return (
    <ThemeWrapper>
      <CurrencySwap
        protocols={{
          input: activeProtocols,
        }}
      />
    </ThemeWrapper>
  );
};
