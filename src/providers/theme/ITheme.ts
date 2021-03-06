export interface ITheme {
  primary: Partial<{
    backgroundColor: string;
    color: string;
    rule: string;
    boxShadow: string;
  }>;
}

export type PaletteCategory = 'primary' | 'secondary';
export type StyleProp = 'backgroundColor' | 'color' | 'boxShadow' | 'rule';
