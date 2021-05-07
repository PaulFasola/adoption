import React from 'react';
import { Container, Slider, Switch } from './style';

export interface IToggleSwitchProps {
  id: string;
  checked?: boolean;
  onChange?: (state: boolean) => void;
  size?: 'default';
  small?: boolean;
  disabled?: boolean;
  label?: string;
}

export const ToggleSwitch: React.FC<IToggleSwitchProps> = ({
  id,
  checked,
  onChange,
  label,
  disabled,
}) => {
  return (
    <Container>
      <Switch>
        <input
          id={id}
          type='checkbox'
          onChange={(e) => onChange && onChange(e.target.checked)}
          checked={checked}
          disabled={disabled}
        />
        <Slider />
      </Switch>
      {label && <label htmlFor={id}>{label}</label>}
    </Container>
  );
};
