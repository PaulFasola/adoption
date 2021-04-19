import React, { Fragment, useState } from 'react';
import { IProps as IInputProps } from '../Input/interfaces';
import { Container, Slider, Label, CustomValue } from './style';

interface IProps {
  name: string;
  values: string[];
  customValue?: IInputProps;

  onChange?: (value: string) => void;
}

export const MultiSwitch: React.FC<IProps> = (props) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleChange = (value: string, customValue?: boolean): void => {
    if (typeof props.onChange === 'function') {
      const suffix = props.customValue?.suffix ?? '';

      props.onChange(`${value}${customValue ? suffix : ''}`);
    }

    setSelectedValue(value);
  };

  return (
    <Container hasCustomValue={props.customValue != null}>
      {props.values.map((value, i) => (
        <Fragment key={i}>
          <input
            id={`item-${i}`}
            type='radio'
            value={value}
            name={props.name}
            onChange={(e) => handleChange((e.target as HTMLInputElement).value)}
            checked={selectedValue === value}
          />
          <Label htmlFor={`item-${i}`} tabIndex={0}>
            <span>{value}</span>
          </Label>
        </Fragment>
      ))}
      {props.customValue && (
        <Fragment>
          <CustomValue
            {...props.customValue}
            onValueChange={(value) => handleChange(value, true)}
            onFocus={() => setSelectedValue(null)}
            onBlur={() => setSelectedValue(null)}
          />
          <span className='suffix'>{props.customValue?.suffix}</span>
        </Fragment>
      )}
      <Slider />
    </Container>
  );
};
