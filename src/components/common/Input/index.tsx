import React, { useState } from 'react';
import { Outline, Label, Input as StyledInput } from './style';

interface IInputElementProps {
  maxLength?: number;
  minLength?: number;
  max?: number;
  min?: number;
  value?: string;
  label?: string;
  style?: React.CSSProperties;
}

interface IProps extends IInputElementProps {
  type: 'text' | 'number';
  style?: React.CSSProperties;
}

const Input: React.FC<IProps> = (props) => {
  const [isFloating, setIsFloating] = useState<boolean>(false);

  const _handleBlur = (): void => {
    setIsFloating(false);
  };

  return (
    <Outline>
      {typeof props.label === 'string' && (
        <Label htmlFor='test' floating={isFloating}>
          {props.label}
        </Label>
      )}
      <StyledInput {...props} id='test' onFocus={() => setIsFloating(true)} onBlur={_handleBlur} />
    </Outline>
  );
};

Input.defaultProps = {
  type: 'text',
};

export { Input };
