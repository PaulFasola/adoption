import styled from 'styled-components';

export interface IStyleProps {
  floating?: boolean;
  rounded?: boolean;
}

interface SP extends IStyleProps {}

export const Outline = styled.div`
  position: relative;
`;

export const Input = styled.input`
  background: transparent;
  outline: none;
  padding: 10px;
  border: 1px solid #000;
  box-shadow: none;

  ${(props: SP) =>
    !props.rounded &&
    `
		border-radius: 15px;
	`}

  &:focus {
    outline: none;
    box-shadow: inset 0 -0.25em 0.5em lighten(#000, 50%);
  }

  &:-moz-ui-invalid {
    box-shadow: none !important;
  }
`;

export const Label = styled.label`
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 0 2px;
  line-height: 20px;
  font-size: 14px;
  letter-spacing: 0.125em;
  color: #000;
  background: #fff;
  pointer-events: none;
  transition: transform 120ms;
  transform-origin: left center;
  transform: translateY(0) scale(1);

  ${(props: SP) =>
    props.floating &&
    `
		transform:translateY(-19px) scale(0.9);
	`}
`;
