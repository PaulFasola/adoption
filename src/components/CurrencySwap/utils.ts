import { IProtocol } from '../ProtocolSelector/interfaces';
import { IProtocolArrayPipe, IProtocolPipe } from './interfaces';

export const excludeCommonSymbol = (
  activeProtocol: IProtocol,
  array: Readonly<IProtocol[]>
): IProtocol[] => {
  const idx = array.findIndex((x) => x.symbol === activeProtocol.symbol);
  const output = [...array];

  /* istanbul ignore next */
  if (idx > -1) {
    output[idx].hidden = true;
  }

  return output;
};

export const preventCommonSymbol = (
  protocols: Readonly<IProtocolArrayPipe>,
  activeProtocols?: IProtocolPipe
): IProtocolArrayPipe => {
  const newProtoState = {
    ...protocols,
    ...{
      input: protocols.input.map((x) => {
        x.hidden = false;
        return x;
      }),
      output: protocols.output.map((x) => {
        x.hidden = false;
        return x;
      }),
    },
  };

  if (activeProtocols?.output) {
    newProtoState.input = excludeCommonSymbol(activeProtocols.output, newProtoState.input);
  }

  if (activeProtocols?.input) {
    newProtoState.output = excludeCommonSymbol(activeProtocols.input, newProtoState.output);
  }

  return newProtoState;
};
