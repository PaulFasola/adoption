import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input } from '../../../common/Input';
import { IProps as IInputProps } from '../../../common/Input/interfaces';
import _ from '../../../../providers/theme/styleFetcher';
import { IProps } from './fieldBuilder';

interface ILocalProps {
  customInput?: IInputProps;
}

const Container = styled.div`
  display: inline-flex;
  width: 100%;
  align-items: center;

  div:first-of-type {
    width: 50%;
    height: 30px;

    input {
      border: 2px solid ${(p) => _(p.theme, 'disabled', 'color')};
      -webkit-appearance: none;
      -moz-appearance: none;
      width: 80%;
      height: 8px;
    }
  }

  div {
    display: inline-block;

    &.field-desc {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
`;

export const TextField: React.FC<IProps & ILocalProps> = ({
  type,
  name,
  customInput,
  text,
  onChange,
}) => {
  const [value, setValue] = useState<string | number>('');

  const sanitizeValue = useCallback(
    (value: string | number) => {
      let inputValue = value;

      if (customInput && ['decimal', 'number'].includes(customInput.type)) {
        const { min, max } = customInput;
        const number = Number(value);

        if (max && max < number) inputValue = max;
        if (min && min > number) inputValue = min;
      }

      return inputValue;
    },
    [customInput]
  );

  useEffect(() => {
    const inputValue: string | number = sanitizeValue(customInput?.value?.toString() ?? '');
    setValue(inputValue);
  }, [customInput, sanitizeValue]);

  const handleValueChange = (value: string) => {
    const sanitizedValue = sanitizeValue(value);
    setValue(sanitizedValue);
    onChange(name, sanitizedValue);
  };

  return (
    <Container>
      <Input
        {...customInput}
        onValueChange={handleValueChange}
        type={type === 'number' ? 'number' : 'text'}
        value={value}
      />
      <div className='field-desc' title={text}>
        {text}
      </div>
    </Container>
  );
};
