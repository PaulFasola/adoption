import React from 'react';
import { MultiSwitch } from '../../../common/MultiSwitch';
import { IProps } from './fieldBuilder';

export const RadioField: React.FC<IProps> = ({ name, value, onChange }) => {
  if (!Array.isArray(value)) {
    console.warn(`[WARN] Adoption CurrencySwap settings - `);
    return null;
  }

  return (
    <MultiSwitch
      name={`radio-${name}`}
      onChange={(value) => onChange(name, value)}
      values={value}
    />
  );
};
