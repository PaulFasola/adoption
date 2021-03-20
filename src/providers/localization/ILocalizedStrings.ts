import { IStrings as IPRStrings } from '../../components/PaymentRequest/strings';
import { IStrings as ICSStrings } from '../../components/CurrencySwap/strings';
import { IStrings as ITxStatusStrings } from '../../components/TransactionStatus/strings';
import { IStrings as IPSStrings } from '../../components/ProtocolSelector/strings';

export interface ILocalizedStrings {
  paymentRequest: Partial<IPRStrings>;
  transactionStatus: Partial<ITxStatusStrings>;
  currencySwap: Partial<ICSStrings>;
  protocolSelector: Partial<IPSStrings>;
}
