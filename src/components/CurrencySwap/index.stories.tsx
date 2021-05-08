import React, { useState } from 'react';
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
const MAX_DEADLINE_MINS = 1440;

const handleBeforeValueChange = (maxValue: number) => (value: string) => {
  const percentage = Number(value);

  if (isNaN(percentage)) {
    return null;
  }

  if (percentage > maxValue) {
    return maxValue.toString();
  }

  // Note: a trailing dot will not bother us here (Number(X.) = X)
  return value;
};

export const Basic: Story<IProps> = (args) => (
  <>
    <div style={{ display: 'inline-block' }}>
      <CurrencySwap onSubmit={action('onSubmit', { clearOnStoryChange: true })} {...args} />
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

export const WithSettings: Story<IProps> = () => {
  const DEFAULT_GOD_TOGGLE_ENABLED = false;
  const getGodToggleText = (enabled: boolean) => (enabled ? 'Activated!' : 'Deactivated');

  const [godToggleText, setGodToggleText] = useState(getGodToggleText(DEFAULT_GOD_TOGGLE_ENABLED));

  const handleSettingChange = (key: string, value: any) => {
    if (key === 'aCoolToggle') {
      setGodToggleText(getGodToggleText(Boolean(value)));
    }
    console.log(`Setting '${key}' changed to ${value} (it's a ${typeof value})`);
  };

  return (
    <>
      <div style={{ display: 'inline-block' }}>
        <CurrencySwap
          onSubmit={action('onSubmit', { clearOnStoryChange: true })}
          onSettingChanged={handleSettingChange}
          protocols={{
            input: activeProtocols,
          }}
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
                beforeValueChange: handleBeforeValueChange(MAX_CUSTOM_PERCENTAGE),
              },
            },
            deadline: {
              visible: true,
              type: 'number',
              label: 'Transaction deadline',
              text: 'Minutes',
              customInput: {
                type: 'number',
                min: 1,
                max: 1440, // 24h
                value: 5,
                beforeValueChange: handleBeforeValueChange(MAX_DEADLINE_MINS),
              },
              hint:
                'The deadline before reverting your transaction that is still pending past this time',
            },
            aCoolToggle: {
              visible: true,
              type: 'boolean',
              label: 'Activate god mode',
              hint: 'This toggle doesn`t do anything in this example, like the other fields :p',
              text: godToggleText,
            },
          }}
        />
      </div>
      <p>
        Once clicked on Swap, check the result into the <i>Actions</i> tab below 👇
      </p>
    </>
  );
};

export const Themed: Story<IProps> = (args) => (
  <ThemeWrapper>
    <Basic {...args} />
  </ThemeWrapper>
);

Themed.args = Basic.args;
