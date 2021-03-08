import { TxStatus } from './txStatus';

export interface IProps {
  amount: string;
  symbol: string;
  status?: TxStatus;
  animated?: boolean;
  noShadow?: boolean;
  date?: {
    value?: Date;
    locale?: string;
    options?: Intl.DateTimeFormatOptions;
  };
  txURL?: string;
  colorMap?: Record<TxStatus, string>;
  uncapitalizeStatus?: boolean;
  autoShowDetails?: boolean;

  // TxDetails
  sender?: IAddress;
  receiver?: IAddress;
  txFees?: string;
  customDetailComponent?: React.ReactNode;
}

export interface IAddress {
  hash: string;
  url?: string;
}
