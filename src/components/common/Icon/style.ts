import styled from 'styled-components';
import { ITheme } from '../../../providers/theme/ITheme';
import _ from '../../../providers/theme/styleFetcher';

export interface IStyleProps {
  theme: ITheme;
  disabled?: boolean;
  defaultTheme?: boolean;

  onClick?: () => void;
}

interface SP extends IStyleProps {}

export const Link = styled.a`
  color: ${({ theme, defaultTheme }: SP) => _(!defaultTheme ? theme : null, 'primary', 'color')};
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
    :hover {
      opacity: 0.6;
    }
  `}

  svg .fillable {
    fill: ${({ theme, defaultTheme }: SP) => _(!defaultTheme ? theme : null, 'primary', 'color')};

    ${({ theme, disabled }: SP) =>
      disabled &&
      `
        fill: ${_(theme, 'disabled', 'color')}
      `}
  }
`;
