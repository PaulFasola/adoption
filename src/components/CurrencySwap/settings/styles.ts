import styled from 'styled-components';
import _ from '../../../providers/theme/styleFetcher';
import { scrollbar } from '../../common/style';

export interface IStyleProps {
  visible?: boolean;
}

interface SP extends IStyleProps {}

export const Container = styled.div`
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${(p) => _(p.theme, 'primary', 'backgroundColor')};
  transition: opacity 0.25s;
  overflow-y: auto;
  pointer-events: none;

  ${scrollbar}

  ${(p: SP) =>
    p.visible &&
    `
    pointer-events: all;
		opacity: 1;
	`};
`;

/**
 * @param canOverflow: we adjusts the container's padding depending on the number of settings,
 * since the overflow's scrollbar alters the container's inner width.
 */
export const Content = styled.div<{ canOverflow: boolean }>`
  padding: ${({ canOverflow }) => (canOverflow ? 23 : 25)}px;
  overflow: hidden;
`;

export const Field = styled.div`
  &:not(:first-of-type) {
    margin-top: 0.75rem;
  }

  color: ${(p) => _(p.theme, 'primary', 'color')};
`;

export const Label = styled.label`
  display: block;

  &:not(:first-of-type) {
    margin-top: 1rem;
  }

  div[type='help-circle-o'] {
    width: 13px;
    margin-left: 5px;

    path {
      transition: fill 0.2s;
    }

    &:hover,
    &:focus {
      path {
        fill: ${(p) => _(p.theme, 'disabled', 'color')};
      }
    }
  }
`;
