import { messages as msgs } from './defaultThemes';

export interface ITheme {
  primary: Partial<{
    backgroundColor: string;
    color: string;
    rule: string;
    boxShadow: string;
    borderColor: string;
  }>;
  disabled: Partial<{
    color: string;
  }>;
  messages: {
    success: string;
    info: string;
    warning: string;
    error: string;
  };
}

export type PaletteCategory = 'primary' | 'messages' | 'disabled';

export type StyleProp =
  | 'backgroundColor'
  | 'color'
  | 'boxShadow'
  | 'rule'
  | 'borderColor'
  | keyof typeof msgs;
