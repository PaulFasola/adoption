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

const MAX_CUSTOM_PERCENTAGE = 150;
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
            hint: 'The tolerated difference between the executed price and the expected price.',
            value: ['0.1%', '0.5%', '1%', '2%'],
            customInput: {
              type: 'decimal',
              placeholder: '0.00',
              suffix: '%',
              beforeValueChange: (value: string) => {
                const percentage = Number(value);

                if (isNaN(percentage)) {
                  return null;
                }

                if (percentage > MAX_CUSTOM_PERCENTAGE) {
                  return MAX_CUSTOM_PERCENTAGE.toString();
                }

                // Note: a trailing dot will not bother us here (Number(X.) = X)
                return value;
              },
            },
          },
          deadline: {
            visible: true,
            type: 'number',
            label: 'Transaction deadline',
            hint:
              'The deadline before reverting your transaction that is still pending past this time',
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
