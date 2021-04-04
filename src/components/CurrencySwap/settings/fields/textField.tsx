import React from 'react';
import { Input } from '../../../common/Input';
import { IProps } from './fieldBuilder';

export const TextField: React.FC<IProps> = ({ type, value, name, onChange }) => (
  <Input
    onValueChange={(value) => onChange(name, value)}
    type={type === 'number' ? 'number' : 'text'}
    value={value && value.toString()}
  />
);
