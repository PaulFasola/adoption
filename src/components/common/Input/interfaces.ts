export interface InputProps {
  id?: string;
  pattern?: string;
  className?: string;
  maxLength?: number;
  minLength?: number;
  max?: number;
  min?: number;
  placeholder?: string;
  value?: string;
  label?: string;
  autoComplete?: 'on' | 'off';
  autoFill?: 'on' | 'off';
  style?: React.CSSProperties;

  onChange?: (value: string) => void;
}

export interface IProps extends InputProps {
  type: 'text' | 'number' | 'decimal';
  style?: React.CSSProperties;
}
