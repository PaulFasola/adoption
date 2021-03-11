import styled from 'styled-components';
import { ITheme } from '../../../providers/theme/ITheme';
import _ from '../../../providers/theme/styleFetcher';

export interface IStyleProps {
  theme: ITheme;
  disabled?: boolean;
  animate?: boolean;
  onClick?: () => void;
}

interface SP extends IStyleProps {}

export const Link = styled.a`
  color: rgba(0, 0, 0, 0.8);
  text-decoration: none;
`;

export const IconContainer = styled.div`
  min-width: 0.5em;
  margin: 5px 3px 3px 3px;
  display: inline-block;
  vertical-align: middle;

  ${(p: SP) =>
    typeof p.onClick !== 'undefined' &&
    `
    :hover {
      opacity: 0.6;
    }
  `}

  svg .fillable {
    fill: ${(p) => _(p.theme, 'primary', 'color')};

    ${(p: SP) =>
      p.disabled &&
      `
      fill: ${_(p.theme, 'disabled', 'color')}
    `}
  }
`;
