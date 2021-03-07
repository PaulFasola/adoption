import { TxStatus } from 'adoption';
import { IAddress } from 'adoption/components/TransactionStatus/interfaces';

export interface IOrder {
  date: string;
  articles: string[];
  comment?: string;
  status: TxStatus;
  shippingTo?: string;
  paymentAddress?: string;
  sender?: IAddress;
  receiver?: IAddress;
  txFees?: string;
  txURL?: string;
  cost: number;
}
