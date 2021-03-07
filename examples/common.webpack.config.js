/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.tsx?$/],
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      react: path.resolve('./node_modules/react'),
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'index.html',
      templateContent: `
<html>
	<meta charset="utf-8" />
	<title>An Adoption experiment</title>
	<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet" />
	<body>
		<div id="root" />
	</body>
</html>`,
    }),
  ],
  devServer: {
    publicPath: '/',
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './demos/'),
    hot: true,
  },
};
