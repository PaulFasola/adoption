import { IProtocol } from '../ProtocolSelector/interfaces';

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

  onSubmit?: (submission: ISwapSubmission) => void;
}

export interface ISwapValues {
  input?: number;
  output?: number;
}
