import styled from 'styled-components';
import _ from '../../../providers/theme/styleFetcher';

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
  overflow: hidden;
  pointer-events: none;

  ${(p: SP) =>
    p.visible &&
    `
    pointer-events: all;
		opacity: 1;
	`};
`;

export const Content = styled.div`
  padding: 25px;
`;

export const Field = styled.div``;

export const Label = styled.label``;
