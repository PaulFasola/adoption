import styled from 'styled-components';

export const Outline = styled.div``;

export const Input = styled.input`
  outline: none;
  width: 100%;

  &:-moz-ui-invalid {
    box-shadow: none !important;
  }
`;
