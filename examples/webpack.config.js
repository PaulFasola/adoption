/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const webpack = require('webpack');
const commonConfig = require('./common.webpack.config');
const eshop = require('./e-shop/webpack.config.js');

const eshopConfig = Object.assign({}, commonConfig, eshop);

module.exports = [eshopConfig];
