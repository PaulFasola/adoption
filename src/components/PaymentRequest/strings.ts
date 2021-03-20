export interface IStrings {
  request: string;
  cancel: string;
  seller: string;
  status: string;
  help: string;
  txStatus: {
    pending: string;
    complete: string;
    failed: string;
  };
  deadline: string;
  receivedAmount: string;
  remainingAmount: string;
  transactions: string;
}

export const defaultStrings: IStrings = {
  request: 'Please send {amount} {symbol} to address:',
  status: 'Current status',
  seller: 'Merchant',
  txStatus: {
    complete: 'Payment complete',
    pending: 'Waiting for payment',
    failed: 'Payment failed',
  },
  cancel: 'Cancel',
  help: 'Need help? Click here!',
  deadline: 'Send before',
  receivedAmount: 'Amount received',
  remainingAmount: 'Amount remaining',
  transactions: 'Transactions ({txAmount})',
};
