import styled from 'styled-components';
import { ITheme } from '../../../providers/theme/ITheme';
import _ from '../../../providers/theme/styleFetcher';

export interface IStyleProps {
  theme: ITheme;
  disabled?: boolean;
  overrideTheme?: ITheme;

  onClick?: () => void;
}

interface SP extends IStyleProps {}

export const Link = styled.a`
  color: ${({ theme, overrideTheme }: SP) => _(overrideTheme ?? theme, 'primary', 'color')};
  text-decoration: none;
`;

export const IconContainer = styled.div`
  min-width: 0.5em;
  margin: 3px;
  display: inline-block;
  vertical-align: middle;

  ${({ onClick }: SP) =>
    typeof onClick !== 'undefined' &&
    `
    :hover, &:focus {
      opacity: 0.6;
    }
  `}

  svg .fillable {
    fill: ${({ theme, overrideTheme }: SP) => _(overrideTheme ?? theme, 'primary', 'color')};

    ${({ theme, disabled }: SP) =>
      disabled &&
      `
        fill: ${_(theme, 'disabled', 'color')}
      `}
  }
`;
