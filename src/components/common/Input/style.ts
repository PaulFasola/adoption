import styled from 'styled-components';
import _ from '../../../providers/theme/styleFetcher';

export interface IStyleProps {
  disabled?: boolean;
  floating?: boolean;
  rounded?: boolean;
}

interface SP extends IStyleProps {}

export const Outline = styled.div`
  width: 100%;
`;

export const Input = styled.input`
  background: transparent;
  color: ${({ theme }) => _(theme, 'primary', 'color')};
  outline: none;
  padding: 10px;
  box-shadow: none;
  text-overflow: ellipsis;

  ${(props: SP) =>
    props.rounded &&
    `
		border-radius: 15px;
	`}

  &: focus {
    outline: none;
    box-shadow: inset 0 -0.25em 0.5em lighten(#000, 50%);
    border-width: 2px;
  }

  &:-moz-ui-invalid {
    box-shadow: none !important;
  }
`;

export const Label = styled.label`
  position: absolute;
  top: 25px;
  left: 25px;
  padding: 0 2px;
  line-height: 20px;
  font-size: 14px;
  letter-spacing: 0.125em;
  color: ${(p) => _(p.theme, 'primary', 'color')};
  background: ${(p) => _(p.theme, 'primary', 'backgroundColor')};
  pointer-events: none;
  transition: transform 120ms;
  transform-origin: left center;
  transform: translateY(0) scale(1);

  ${(props: SP) => props.floating && 'transform: translateY(-19px) scale(0.9);'}
`;
