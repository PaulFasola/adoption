export interface IInputProps {
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
  regex?: string | undefined;

  onValueChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export interface IProps extends IInputProps {
  type: 'text' | 'number' | 'decimal';
  maximumFractionDigits?: number;
  style?: React.CSSProperties;

  beforeValueChange?: (value: string) => string | null;
}
