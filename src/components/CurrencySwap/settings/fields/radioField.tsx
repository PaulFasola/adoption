import React from 'react';
import { IProps as IInputProps } from '../../../common/Input/interfaces';
import { MultiSwitch } from '../../../common/MultiSwitch';
import { IProps } from './fieldBuilder';

interface ILocalProps {
  customInput?: IInputProps;
}

export const RadioField: React.FC<IProps & ILocalProps> = ({
  name,
  value,
  customInput,
  onChange,
}) => {
  if (!Array.isArray(value)) {
    console.warn(
      `[WARN] Adoption CurrencySwap settings - Provided value for radio "${name}" is not an array. Got ${typeof value} instead.`
    );
    return null;
  }

  return (
    <MultiSwitch
      name={`radio-${name}`}
      onChange={(value) => onChange(name, value)}
      values={value}
      customValue={customInput}
    />
  );
};
