import { TxStatus } from 'adoption';

export interface IOrder {
  date: string;
  articles: string[];
  comment?: string;
  status: TxStatus;
  shippingTo: string;
  paymentAddress: string;
  cost: number;
}
