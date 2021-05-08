import { IProtocol } from '../ProtocolSelector/interfaces';
import { ISettings, SettingChangedCallback } from './settings/interfaces';

export type ProtocolEnd = 'input' | 'output';

export interface IProtocolArrayPipe {
  input: IProtocol[];
  output: IProtocol[];
}

export interface IProtocolPipe {
  input?: IProtocol;
  output?: IProtocol;
}

export interface ISwapSubmission {
  amounts: ISwapValues;
  protocols: IProtocolPipe;
}

export interface IProps {
  locked?: boolean;
  noShadow?: boolean;
  protocols: Partial<IProtocolArrayPipe>;
  maxFractionDigits?: number;
  settings?: ISettings;

  onSubmit?: (submission: ISwapSubmission) => void;
  onSettingChanged?: SettingChangedCallback;
}

export interface ISwapValues {
  input?: number;
  output?: number;
}
