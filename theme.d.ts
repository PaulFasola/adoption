import { ITheme } from './src/providers/theme/ITheme';

declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}
