import styled from 'styled-components';
import _ from '../../../providers/theme/styleFetcher';

export const Link = styled.a`
  color: rgba(0, 0, 0, 0.8);
  text-decoration: none;
`;

export const IconContainer = styled.div`
  margin: 5px 3px 3px 3px;
  display: inline-block;
  vertical-align: middle;

  svg .fillable {
    fill: ${(p) => _(p.theme, 'primary', 'color')};
  }
`;
