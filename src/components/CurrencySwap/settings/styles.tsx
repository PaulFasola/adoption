import styled from 'styled-components';
import _ from '../../../providers/theme/styleFetcher';

export interface IStyleProps {
  visible?: boolean;
}

interface SP extends IStyleProps {}

export const Container = styled.div`
  z-index: -1;
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${(p) => _(p.theme, 'primary', 'backgroundColor')};
  transition: opacity 0.25s;
  overflow: hidden;

  ${(p: SP) =>
    p.visible &&
    `
    z-index: 0;
		opacity: 1;
	`};
`;

export const Content = styled.div`
  padding: 25px;
`;
