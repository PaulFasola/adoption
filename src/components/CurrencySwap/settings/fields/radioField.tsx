import React, { useEffect, useState } from 'react';
import { useDebounce } from '../../../../hooks/useDebounce';
import { IProps as IInputProps } from '../../../common/Input/interfaces';
import { MultiSwitch } from '../../../common/MultiSwitch';
import { DEFAULT_DEBOUNCE_DELAY } from '../constants';
import { IProps } from './fieldBuilder';

interface ILocalProps {
  customInput?: IInputProps;
}

export const RadioField: React.FC<IProps & ILocalProps> = ({
  name,
  value,
  customInput,
  onChange,
  debounce,
}) => {
  const [switchValue, setSwitchValue] = useState('');
  const debouncedvalue = useDebounce(switchValue, DEFAULT_DEBOUNCE_DELAY, debounce);

  useEffect(() => {
    onChange?.(name, debouncedvalue);
  }, [debouncedvalue, onChange, name]);

  if (!Array.isArray(value)) {
    console.warn(
      `[WARN] Adoption CurrencySwap settings - Provided value for radio "${name}" is not an array. Got ${typeof value} instead.`
    );
    return null;
  }

  return (
    <MultiSwitch
      name={`radio-${name}`}
      onChange={(value) => setSwitchValue(value)}
      values={value}
      customValue={customInput}
    />
  );
};
