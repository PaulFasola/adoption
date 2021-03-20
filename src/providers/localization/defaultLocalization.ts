import { IViableLocale } from './ILocalizationContext';

import { defaultStrings as defaultPRStrings } from '../../components/PaymentRequest/strings';
import { defaultStrings as defaultCSStrings } from '../../components/CurrencySwap/strings';
import { defaultStrings as defaultTxStatusStrings } from '../../components/TransactionStatus/strings';
import { defaultStrings as defaultPSStrings } from '../../components/ProtocolSelector/strings';

export const defaultLocale = 'en-US';

export const defaultLocalization: IViableLocale = {
  locale: defaultLocale,
  strings: {
    paymentRequest: defaultPRStrings,
    transactionStatus: defaultTxStatusStrings,
    currencySwap: defaultCSStrings,
    protocolSelector: defaultPSStrings,
  },
};
