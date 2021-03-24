import React from 'react';
import { action } from '@storybook/addon-actions';
import { addDecorator, Meta, Story } from '@storybook/react';
import { ThemeWrapper } from '../../providers/theme/themeWrapper';
import { CurrencySwap } from '.';
import { IProps } from './interfaces';
import { withConsole } from '@storybook/addon-console';
import { activeProtocols } from '../ProtocolSelector/__tests__/mocks';

export default {
  title: 'Components/CurrencySwap',
  argTypes: {
    protocols: {
      input: 'object',
    },
  },
} as Meta;

const args = {
  protocols: {
    input: activeProtocols,
  },
  locked: false,
  maxFractionDigits: 5,
  noShadow: false,
};

const Basic: Story<IProps> = (args) => (
  <>
    <div style={{ display: 'inline-block' }}>
      <CurrencySwap
        onSubmit={action('onSubmit', {
          clearOnStoryChange: true,
        })}
        {...args}
      />
    </div>
    <p>
      Once clicked on Swap, check the result into the <i>Actions</i> tab below 👇
    </p>
  </>
);
Basic.args = args;

const Themed: Story<IProps> = (args) => {
  return (
    <ThemeWrapper>
      <Basic {...args} />
    </ThemeWrapper>
  );
};
Themed.args = args;

addDecorator((storyFn, context) => withConsole()(storyFn)(context));

export { Basic, Themed };
