import React, { useState, useEffect } from 'react';
import { IProps, IInputProps } from './interfaces';
import { defaultInputProps } from './defaultProps';
import { Outline, Label, Input as StyledInput } from './style';

const Input: React.FC<IProps> = (props) => {
  const [isFloating, setIsFloating] = useState<boolean>(false);
  const [inputProps, setInputProps] = useState<IInputProps>({ ...defaultInputProps, ...props });

  useEffect(() => {
    setInputProps((prevProps) => ({ ...prevProps, id: Math.random().toString(36).substring(7) }));

    if (props.label && typeof props.placeholder === 'string') {
      setInputProps((prevProps) => ({ ...prevProps, placeholder: undefined }));
    }
  }, [props.label, props.placeholder]);

  useEffect(() => {
    setInputProps((prevProps) => ({ ...prevProps, value: props.value }));
  }, [props.value]);

  useEffect(() => {
    let pattern: string | undefined;

    if (props.type === 'decimal') {
      pattern = '^[0-9]*[.,]?[0-9]*$';
    }

    if (props.pattern) {
      pattern = props.pattern;
    }

    setInputProps((prevProps) => ({ ...prevProps, pattern }));
  }, [props.type, props.pattern]);

  const handleBlur = (): void => {
    if (!inputProps.value || inputProps.value.toString().length === 0) {
      setIsFloating(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void | boolean => {
    let value = e.target.value;

    if (inputProps.pattern && !value.match(inputProps.pattern)) {
      e.preventDefault();
      return false;
    }

    if (typeof props.beforeValueChange === 'function') {
      const adjustedValue = props.beforeValueChange(value);

      if (adjustedValue) {
        value = adjustedValue;
      } else {
        return false;
      }
    }

    setInputProps({ ...inputProps, value });

    if (typeof props.onValueChange === 'function') {
      props.onValueChange(value);
    }
  };

  const getValue = (): string | number => {
    if (props.type === 'decimal' || props.type === 'number') {
      if (!inputProps.value || isNaN(Number(inputProps.value))) {
        return '';
      }

      if (props.type === 'decimal' && typeof props.maximumFractionDigits === 'number') {
        return inputProps.value.toLocaleString(undefined, {
          maximumFractionDigits: props.maximumFractionDigits,
        });
      }

      return inputProps.value;
    }

    return inputProps.value ?? '';
  };

  delete inputProps.onValueChange;

  if (
    typeof props.maxLength === 'number' &&
    props.value &&
    props.value.toString().length > props.maxLength
  ) {
    inputProps.title = `${props.title ? `${props.title} - ` : ''}${props.value.toString()}`;
  }

  return (
    <Outline>
      {typeof props.label === 'string' && (
        <Label htmlFor={props.id} floating={isFloating}>
          {props.label}
        </Label>
      )}
      <StyledInput
        onFocus={() => setIsFloating(true)}
        onBlur={handleBlur}
        onChange={handleChange}
        {...inputProps}
        value={getValue()}
      />
    </Outline>
  );
};

Input.defaultProps = {
  type: 'text',
};

export { Input };
