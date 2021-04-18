import { css } from 'styled-components';
import _ from '../../providers/theme/styleFetcher';

export const scrollbar = css`
  &::-webkit-scrollbar-track {
    background-color: ${(p) => _(p.theme, 'primary', 'backgroundColor')};
    border: 1px solid #dedede;
  }

  &::-webkit-scrollbar {
    width: 6px;
    background-color: #dedede;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(p) => _(p.theme, 'primary', 'color')};
    border: 1px solid #dedede;
  }
`;

export const centerContent = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
