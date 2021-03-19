export type PaletteCategory = 'primary' | 'secondary' | 'messages' | 'defaultButton' | 'disabled';

interface IPalette {
  backgroundColor: string;
  color: string;
  rule: string;
  boxShadow: string;
  borderColor: string;
  hoverBgColor: string;
  hoverColor: string;
}

interface IDisabledPalette {
  color: string;
}

interface IMessagePalette {
  success: string;
  info: string;
  warning: string;
  error: string;
}

interface IButtonPalette {
  color: string;
  backgroundColor: string;
  hoverBgColor: string;
}

export type StyleProp =
  | keyof IPalette
  | keyof IMessagePalette
  | keyof IDisabledPalette
  | keyof IButtonPalette;

export interface ITheme {
  primary: Partial<IPalette>;
  secondary: Partial<IPalette>;
  disabled: Partial<IDisabledPalette>;
  messages: Partial<IMessagePalette>;
  defaultButton: Partial<IButtonPalette>;
}
