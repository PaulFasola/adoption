import React, { ChangeEvent, Fragment, useState } from 'react';
import { IProps as IInputProps } from '../Input/interfaces';
import { Container, Slider, Label, CustomValue } from './style';

interface IProps {
  name: string;
  values: string[];
  customValue?: IInputProps;

  onChange?: (value: string) => void;
}

export const MultiSwitch: React.FC<IProps> = ({ name, values, customValue, onChange }) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
    onChange && onChange(target.value);
    setSelectedValue(target.value);
  };

  return (
    <Container hasCustomValue={customValue != null}>
      {values.map((value, i) => (
        <Fragment key={i}>
          <input
            id={`item-${i}`}
            type='radio'
            value={value}
            name={name}
            onChange={handleChange}
            checked={selectedValue === value}
          />
          <Label htmlFor={`item-${i}`} tabIndex={0}>
            <span>{value}</span>
          </Label>
        </Fragment>
      ))}
      {customValue && (
        <Fragment>
          <CustomValue
            {...customValue}
            onValueChange={(val) => onChange && onChange(val)}
            onFocus={() => setSelectedValue(null)}
            onBlur={() => setSelectedValue(null)}
          />
        </Fragment>
      )}
      <Slider />
    </Container>
  );
};
