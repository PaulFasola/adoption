import React from 'react';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import { ITheme } from '../../providers/theme/ITheme';
import { ThemeWrapper } from '../../providers/theme/themeWrapper';
import { activeProtocols } from './__tests__/mocks';
import { IProps } from './interfaces';
import { ProtocolSelector } from '.';

export default {
  title: 'Components/ProtocolSelector',
};

const args = {
  list: activeProtocols,
};

const Basic: Story<IProps> = (args) => {
  return <ProtocolSelector onChange={action('onChange')} {...args} />;
};
Basic.args = args;

const Themed: Story<IProps> = (args) => {
  const customThemes: Record<string, Partial<ITheme>> = {
    ugly: {
      primary: {
        hoverColor: 'blue',
        hoverBgColor: 'green',
      },
      defaultButton: {
        backgroundColor: 'pink',
        color: 'yellow',
        hoverBgColor: 'red',
      },
    },
  };

  return (
    <ThemeWrapper customThemes={customThemes}>
      <ProtocolSelector {...args} />
    </ThemeWrapper>
  );
};
Themed.args = args;

export { Basic, Themed };
