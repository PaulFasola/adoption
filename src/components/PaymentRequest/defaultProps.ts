import { PaymentStatus } from './enums/paymentStatus';
import { IProps } from './interfaces';

export const defaultProps: Partial<IProps> = {
  symbol: 'BTC',
  status: PaymentStatus.PENDING,
  showQRCode: true,
};
