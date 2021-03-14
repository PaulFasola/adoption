import { IProtocol } from '../ProtocolSelector/interfaces';

export interface IProtocolArrayPipe {
  input: IProtocol[];
  output: IProtocol[];
}

export interface IProtocolPipe {
  input?: IProtocol;
  output?: IProtocol;
}

export interface IProps {
  locked?: boolean;
  noShadow?: boolean;
  protocols: Partial<IProtocolArrayPipe>;
  maxFractionDigits?: number;

  onSubmit?: () => void;
}

export interface ISwapValues {
  input?: number;
  output?: number;
}
