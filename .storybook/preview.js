import { themes } from '@storybook/theming';
import { addDecorator } from '@storybook/react';
import { withPropsTable } from 'storybook-addon-react-docgen';

import '@storybook/addon-console';

addDecorator(withPropsTable);

export const parameters = {
  actions: {
    argTypesRegex: '^on.*',
  },
  darkMode: {
    darkClass: 'lights-out',
    lightClass: 'lights-on',
    current: 'light',
    stylePreview: false,
    dark: { ...themes.dark, appBg: '#121212', appContentBg: '#121212' },
    light: { ...themes.normal },
  },
};
