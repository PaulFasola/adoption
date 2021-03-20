import { defaultLocale } from './defaultLocalization';
import { ILocalizedStrings } from './ILocalizedStrings';

export type LocaleType = typeof defaultLocale | string;

export interface IViableLocale {
  locale: LocaleType;
  strings: Partial<ILocalizedStrings>;
}

export interface ILocalizationContext {
  currentlocalization: IViableLocale;
  switchTo: (lang: LocaleType) => void;
}
