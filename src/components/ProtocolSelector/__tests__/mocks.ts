import { IProtocol } from '../interfaces';

export const activeProtocols = [
  { name: 'Bitcoin', symbol: 'BTC', decimals: 8, price: 61000 },
  { name: 'Ethereum', symbol: 'ETH', decimals: 18, price: 2189 },
  { name: 'BinanceCoin', symbol: 'BNB', decimals: 8, price: 300 },
  { name: 'Cardano', symbol: 'ADA', decimals: 6, price: 1.106 },
  { name: 'ChainLink', symbol: 'LINK', decimals: 6, price: 29.76 },
].map<IProtocol>((coin) => ({
  ...coin,
  logoURI: `https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/${coin.symbol.toLowerCase()}.svg`,
}));
