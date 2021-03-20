import { IViableLocale } from './ILocalizationContext';
import { defaultStrings as defaultPRStrings } from '../../components/PaymentRequest/strings';

export const defaultLocale = 'en-US';

export const defaultLocalization: IViableLocale = {
  locale: defaultLocale,
  strings: {
    paymentRequest: {
      ...defaultPRStrings,
    },
  },
};
