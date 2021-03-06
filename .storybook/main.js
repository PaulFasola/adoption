const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        actions: false,
        controls: false,
      },
    },
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
  ],
  webpackFinal: async (config, { configType }) => {
    return config;
  },
};
