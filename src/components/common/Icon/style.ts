import styled from 'styled-components';
import _ from '../../../providers/theme/styleFetcher';

export interface IStyleProps {
  animate?: boolean;
  onClick?: () => void;
}

interface SP extends IStyleProps {}

export const Link = styled.a`
  color: rgba(0, 0, 0, 0.8);
  text-decoration: none;
`;

export const IconContainer = styled.div`
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
  }
`;

export const ArrowSwap = styled.svg`
  height: 100%;
  ${(p: SP) =>
    p.animate &&
    `
    transition: transform  ease-in-out 2s infinite;
    path:first-of-type {
      transform: translateY(-55px);
    }
    path:nth-child(2){
      transform: translate3d(0, -50%, 0);
    }
  `}
`;
