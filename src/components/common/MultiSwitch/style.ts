import styled from 'styled-components';
import _ from '../../../providers/theme/styleFetcher';

export const Container = styled.div`
  position: relative;
  padding: 20px;
  background-clip: padding-box;
  border: 1px solid ${(p) => _(p.theme, 'primary', 'borderColor')};

  input[type='radio'] {
    position: absolute;
    opacity: 0;
  }
`;

export const Label = styled.label`
  position: relative;
  z-index: 1;
  float: left;
  display: inline-block;
  width: 40px;
  height: 20px;
  cursor: pointer;
  color: ${(p) => _(p.theme, 'primary', 'color')};
  transition: all 500ms ease-in-out;
`;

export const Switch = styled.span`
  position: absolute;
  top: 2px;
  left: 2px;
  height: 100%;
  width: 40px;
  background-color: ${(p) => _(p.theme, 'disabled', 'color')};
`;

export const Input = styled.input``;
