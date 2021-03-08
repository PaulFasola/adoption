import React from 'react';
import { Outline, Input as StyledInput } from './style';

export enum IconType {
  Sucess = 'success',
  Failure = 'failure',
}

interface IInputElementProps {
  maxLength: number;
  minLength: number;
  max: number;
  min: number;
  placeholder?: string;
  value: string;
}

interface IProps extends IInputElementProps {
  type: 'text' | 'number';
  style?: React.CSSProperties;
}

const Input: React.FC<IProps> = (props) => {
  return (
    <Outline>
      <StyledInput {...props} />
    </Outline>
  );
};

Input.defaultProps = {
  type: 'text',
};

export { Input };
