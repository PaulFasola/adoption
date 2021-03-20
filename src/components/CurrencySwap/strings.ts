export interface IStrings {
  from: string;
  to: string;
  balance: string;
  swapBtnLabel: string;
  submitButton: {
    unlockWallet: string;
    proceed: string;
    insufficientBalance: string;
  };
}

export const defaultStrings: IStrings = {
  from: 'From',
  to: 'To',
  balance: 'Balance:',
  swapBtnLabel: 'Swap values',
  submitButton: {
    unlockWallet: 'Unlock Wallet',
    insufficientBalance: 'Insufficient balance',
    proceed: 'Swap',
  },
};
