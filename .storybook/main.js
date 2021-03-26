const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    {
      name: '@storybook/addon-docs/preset',
      options: {
        sourceLoaderOptions: {
          parser: 'typescript',
        },
      },
    },
    '@storybook/addon-storysource',
    'storybook-dark-mode',
    'storybook-addon-react-docgen',
    '@storybook/addon-a11y',
    '@storybook/addon-essentials',
  ],
};
