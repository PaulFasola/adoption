import { IProtocol } from '../interfaces';

export const activeProtocols = [
  { name: 'Bitcoin', symbol: 'BTC', decimals: 8 },
  { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
  { name: 'BinanceCoin', symbol: 'BNB', decimals: 8 },
  { name: 'Cardano', symbol: 'ADA', decimals: 6 },
  { name: 'ChainLink', symbol: 'LINK', decimals: 6 },
].map<IProtocol>((coin) => ({
  ...coin,
  logoURI: `https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/${coin.symbol.toLowerCase()}.svg`,
}));
