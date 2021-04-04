import React from 'react';
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react';
import { ThemeWrapper } from '../../providers/theme/themeWrapper';
import { IProps } from './interfaces';
import { activeProtocols } from '../ProtocolSelector/__tests__/mocks';
import { CurrencySwap } from '.';

export default {
  title: 'Components/CurrencySwap',
} as Meta;

export const Basic: Story<IProps> = (args) => (
  <>
    <div style={{ display: 'inline-block' }}>
      <CurrencySwap
        onSubmit={action('onSubmit', {
          clearOnStoryChange: true,
        })}
        settings={{
          slippageTolerance: {
            visible: true,
            label: 'Slippage tolerance',
            type: 'radio',
            value: ['0.1%', '0.5%', '1%', '2%'],
          },
        }}
        {...args}
      />
    </div>
    <p>
      Once clicked on Swap, check the result into the <i>Actions</i> tab below 👇
    </p>
  </>
);

Basic.args = {
  protocols: {
    input: activeProtocols,
  },
  locked: false,
  maxFractionDigits: 5,
  noShadow: false,
};

export const Themed: Story<IProps> = (args) => (
  <ThemeWrapper>
    <Basic {...args} />
  </ThemeWrapper>
);

Themed.args = Basic.args;
