import { ITheme } from '../providers/theme/ITheme';

declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}
