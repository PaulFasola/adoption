export interface IStrings {
  from: string;
  to: string;
  balance: string;
  buttonLabels: {
    settings: string;
    swap: string;
  };
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
  buttonLabels: {
    swap: 'Swap values',
    settings: 'Settings',
  },
  submitButton: {
    unlockWallet: 'Unlock Wallet',
    insufficientBalance: 'Insufficient balance',
    proceed: 'Swap',
  },
};
