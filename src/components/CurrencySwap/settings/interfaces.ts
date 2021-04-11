import { IProps as IInputProps } from '../../common/Input/interfaces';
import { IProps } from '../interfaces';

export interface ISettingsProps extends Pick<IProps, 'settings'> {
  settings: ISettings;
  visible?: boolean;
  renderable?: boolean;
}

export interface ISettings {
  [key: string]: ISetting;
}

export type SettingType = 'boolean' | 'string' | 'number' | 'radio';

export interface ISetting {
  visible: boolean;
  type: SettingType;
  label: string;
  hint?: string;
  customInput?: IInputProps;
  value?: any;
}
