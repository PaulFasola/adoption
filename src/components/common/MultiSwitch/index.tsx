import React, { ChangeEvent, Fragment } from 'react';
import { IProps as IInputProps } from '../Input/interfaces';
import { Container, Slider, Label, CustomValue } from './style';

interface IProps {
  name: string;
  values: string[];
  customValue?: IInputProps;

  onChange?: (value: string) => void;
}

export const MultiSwitch: React.FC<IProps> = ({ name, values, customValue, onChange }) => {
  const handleChange = (e: ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
    onChange && onChange(target.value);
  };

  return (
    <Container>
      {values.map((value, i) => (
        <Fragment key={i}>
          <input type='radio' value={value} id={`item-${i}`} name={name} onChange={handleChange} />
          <Label htmlFor={`item-${i}`}>
            <span>{value}</span>
          </Label>
        </Fragment>
      ))}
      {customValue && <CustomValue {...customValue} />}
      <Slider />
    </Container>
  );
};
