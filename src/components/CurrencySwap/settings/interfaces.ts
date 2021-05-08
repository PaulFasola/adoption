import { IProps as IInputProps } from '../../common/Input/interfaces';
import { IProps } from '../interfaces';

export type SettingChangedCallback = (key: string, value: any) => void;

export interface ISettingsProps extends Pick<IProps, 'settings'> {
  settings: ISettings;
  visible?: boolean;
  renderable?: boolean;
  onSettingChanged?: SettingChangedCallback;
}

export interface ISettings {
  [key: string]: ISetting;
}

export type SettingType = 'boolean' | 'string' | 'number' | 'radio';

export interface ISetting {
  visible: boolean;
  type: SettingType;
  label: string;
  text?: string;
  hint?: string;
  customInput?: IInputProps;
  value?: any;
}
