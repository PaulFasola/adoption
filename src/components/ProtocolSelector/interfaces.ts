export interface IProtocol {
  logoURI: string;
  name: string;
  decimals: number;
  symbol: string;
  value: number;
  balance?: number;
}

export interface IProps {
  disabled?: boolean;
  current?: IProtocol;
  list: IProtocol[];
  allowCustom?: boolean;

  onChange?: (newProtocol: IProtocol | null) => void;
}
