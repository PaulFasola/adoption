import React from 'react';
import { SettingType } from '../interfaces';
import { ReactNode } from 'react';
import { BooleanField } from './booleanField';
import { RadioField } from './radioField';
import { TextField } from './textField';

export interface IProps {
  name: string;
  type: SettingType;
  value?: Record<string, unknown>;

  onChange: (name: string, value: any) => void;
}

export const buildField = (props: IProps): ReactNode => {
  switch (props.type) {
    case 'string':
      return <TextField {...props} />;
    case 'number':
      return <TextField {...props} />;
    case 'boolean':
      return <BooleanField {...props} />;
    case 'radio':
      return <RadioField {...props} />;
    default:
      return null;
  }
};
