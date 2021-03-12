import { IProtocol } from '../ProtocolSelector/interfaces';

export interface IProtocolPipe {
  input: IProtocol[];
  output: IProtocol[];
}

export interface IProps {
  locked?: boolean;
  noShadow?: boolean;
  protocols: Partial<IProtocolPipe>;

  onSubmit?: () => void;
}
