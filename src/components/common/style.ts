import { css } from 'styled-components';
import _ from '../../providers/theme/styleFetcher';

export const scrollbar = css`
  /* Firefox */
  scrollbar-color: ${(p) =>
    _(p.theme, 'primary', 'color') + ' ' + _(p.theme, 'primary', 'backgroundColor')};
  scrollbar-width: thin;

  /* Webkit-based browsers */
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
