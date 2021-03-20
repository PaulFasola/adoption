import { useContext } from 'react';
import { IViableLocale } from '../providers/localization/ILocalizationContext';
import { LocalizationContext } from '../providers/localization/localizationProvider';

export const useLocale = (): IViableLocale => {
  const { currentlocalization } = useContext(LocalizationContext);
  return currentlocalization;
};
