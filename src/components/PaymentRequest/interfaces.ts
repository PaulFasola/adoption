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

export interface ITransaction {
  txHash: string;
  txUrl: string;
  amount: number;
}
