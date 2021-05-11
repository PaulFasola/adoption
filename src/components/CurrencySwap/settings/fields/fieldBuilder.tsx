/* istanbul ignore file */
import React from 'react';
import { SettingChangedCallback, SettingType } from '../interfaces';
import { ReactNode } from 'react';
import { BooleanField } from './booleanField';
import { RadioField } from './radioField';
import { TextField } from './textField';
import { IProps as IInputProps } from '../../../common/Input/interfaces';

export interface IProps {
  name: string;
  type: SettingType;
  text?: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  value?: object;
  debounce?: boolean;

  onChange?: SettingChangedCallback;
}

export const buildField = (props: IProps, customInput?: IInputProps): ReactNode => {
  switch (props.type) {
    case 'string':
      return <TextField {...props} />;
    case 'number':
      return <TextField {...props} customInput={customInput} />;
    case 'boolean':
      return <BooleanField {...props} />;
    case 'radio':
      return <RadioField {...props} customInput={customInput} />;
    default:
      return null;
  }
};
