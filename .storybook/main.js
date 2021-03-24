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
    'storybook-addon-react-docgen',
    'storybook-dark-mode',
    '@storybook/addon-essentials',
  ],
};
