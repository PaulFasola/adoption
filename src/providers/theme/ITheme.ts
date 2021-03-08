export interface ITheme {
  primary: Partial<{
    backgroundColor: string;
    color: string;
    rule: string;
    boxShadow: string;
  }>;
  disabled: Partial<{
    color: string;
  }>;
}

export type PaletteCategory = 'primary' | 'secondary' | 'disabled';
export type StyleProp = 'backgroundColor' | 'color' | 'boxShadow' | 'rule';
