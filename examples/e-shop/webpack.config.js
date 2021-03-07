// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

process.env.PROJECT_NAME = 'Da great Doggo Shop';

module.exports = {
  entry: path.resolve(__dirname, './index.tsx'),
  output: {
    path: path.resolve(__dirname, '../demos/e-shop'),
    filename: 'bundle.js',
  },
};
