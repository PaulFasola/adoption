import styled from 'styled-components';
import _ from '../../providers/theme/styleFetcher';

export interface IStyleProps {
  noShadow?: boolean;
}

interface SP extends IStyleProps {}

export const Container = styled.div`
  ${(p: SP) =>
    p.noShadow &&
    `
    box-shadow: none;
  `}
`;
