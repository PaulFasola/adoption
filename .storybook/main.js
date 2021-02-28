const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        actions: false,
        controls: false
      },
    },
    '@storybook/addon-storysource',
    'storybook-addon-react-docgen'
  ],
  webpackFinal: async (config, { configType }) => {
    return config;
  },
};
