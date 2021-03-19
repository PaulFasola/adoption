export interface InputProps {
  id?: string;
  pattern?: string;
  className?: string;
  maxLength?: number;
  minLength?: number;
  max?: number;
  min?: number;
  placeholder?: string;
  title?: string;
  value?: string | number;
  label?: string;
  autoComplete?: 'on' | 'off';
  autoFill?: 'on' | 'off';
  style?: React.CSSProperties;

  onValueChange?: (value: string) => void;
}

export interface IProps extends InputProps {
  type: 'text' | 'number' | 'decimal';
  maximumFractionDigits?: number;
  style?: React.CSSProperties;
}
