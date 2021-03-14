export interface IProtocol {
  logoURI: string;
  name: string;
  decimals: number;
  symbol: string;
  /**
   * The price, used to calculate the the amount ration between two protocols.
   * It can be USD/BTC/... or whaterver. Just ensure to use the same "currency" for every protocols.
   */
  price: number;
  /**
   * The amount that the user currently has.
   */
  balance?: number;
  /**
   * Defines if the protocol will be selectable from the user.
   */
  hidden?: boolean;
}

export interface IProps {
  disabled?: boolean;
  current?: IProtocol;
  list: IProtocol[];
  allowCustom?: boolean;

  onChange?: (newProtocol: IProtocol | null) => void;
}
