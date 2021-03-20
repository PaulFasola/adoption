import { IStrings as IPRStrings } from '../../components/PaymentRequest/strings';
import { IStrings as ITxStatusStrings } from '../../components/TransactionStatus/strings';

export interface ILocalizedStrings {
  paymentRequest: Partial<IPRStrings>;
  transactionStatus: Partial<ITxStatusStrings>;
}
