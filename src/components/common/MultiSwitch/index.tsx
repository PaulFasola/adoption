import React, { ChangeEvent, Fragment } from 'react';
import { Container, Switch, Label, Input } from './style';

interface IProps {
  name: string;
  values: string[];
  onChange?: (value: string) => void;
}

export const MultiSwitch: React.FC<IProps> = ({ name, values, onChange }) => {
  const handleChange = (e: ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
    onChange && onChange(target.value);
  };

  return (
    <Container>
      {values.map((value, i) => (
        <Fragment key={i}>
          <Input type='radio' value={value} id={`item-${i}`} name={name} onChange={handleChange} />
          <Label htmlFor={`item-${i}`}>
            <span>{value}</span>
          </Label>
        </Fragment>
      ))}
      <Switch />
    </Container>
  );
};
