import { PaymentStatus } from './enums/paymentStatus';

export interface IProps {
  address: string;
  symbol: string;
  amount: {
    toPay: number;
    received?: number;
  };
  logos: {
    coin: string;
    company?: string;
  };
  decimalPlaces: number;
  waitAnimation?: boolean;
  sellerName?: string;
  strings?: Partial<IStrings>;
  onCancel?: () => void;
  helpUrl?: string;
  showQRCode?: boolean;
  noShadow?: boolean;
  transactions?: ITransaction[];
  customStatusText?: string;
  status?: PaymentStatus;
  deadline?: {
    dateLocale?: string;
    datetime: Date;
    humanized?: boolean;
  };
}

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

export interface ITransaction {
  txHash: string;
  txUrl: string;
  amount: number;
}
