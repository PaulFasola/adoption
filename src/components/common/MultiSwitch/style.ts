import styled from 'styled-components';
import { ITheme } from '../../../providers/theme/ITheme';
import _ from '../../../providers/theme/styleFetcher';
import { Input } from '../Input';
import { centerContent } from '../style';

interface IStyleProps {
  theme: ITheme;
  hasCustomValue?: boolean;
  isCustomFieldFocused?: boolean;
}

interface SP extends IStyleProps {}

const getFieldWidth = (hasCustomValue?: boolean) => {
  // TODO: handle size for 3 & 4 radios
  return hasCustomValue ? 65 : 82;
};

export const Slider = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: ${(p) => _(p.theme, 'disabled', 'color')};
`;

const getInputTransitions = (hasCustomValue?: boolean): string => {
  const fieldWidth = getFieldWidth(hasCustomValue);
  let style = '';

  style += `
    div ~ ${Slider} {
      transition: left .2s ease-in-out;
      left: ${fieldWidth * 5 - fieldWidth + 1}px;
    }
  `;

  for (let i = 1; i < 5; i++) {
    style += `
      input[type='radio']:nth-of-type(${i}):checked ~ ${Slider} {
        transition: left .2s ease-in-out;
        left: ${fieldWidth * i - fieldWidth}px;
      }
    `;
  }

  return style;
};

export const Label = styled.label`
  ${centerContent}
  z-index: 1;
  position: relative;
  height: 100%;
  float: left;
  cursor: pointer;
  color: ${(p) => _(p.theme, 'primary', 'color')};
  transition: all 500ms ease-in-out;

  &:focus {
    outline: none;
  }

  span {
    user-select: none;
  }
`;

export const CustomValue = styled(Input)`
  position: relative;
  z-index: 1;
  outline: none;
  border: none;
  box-sizing: border-box;
  font-size: 1em;
  overflow: hiddenl
  width: 65px;

  &:placeholder-shown {
    color: ${(p) => _(p.theme, 'disabled', 'color')};
  }

  &:focus {
    color: ${(p) => _(p.theme, 'primary', 'color')};
  }

  ::selection {
    color: ${(p) => _(p.theme, 'primary', 'backgroundColor')};
    background: ${(p) => _(p.theme, 'primary', 'color')};
  }
`;

export const Container = styled.div`
  overflow: hidden;
  position: relative;
  flex-wrap: nowrap;
  box-sizing: border-box;
  display: inline-block;
  padding: 0;
  width: 100%;
  height: 2rem;
  background-clip: padding-box;
  border: 2px solid ${(p) => _(p.theme, 'primary', 'borderColor')};
  transition: left 1.8s ease-in-out;
  ${centerContent}

  input[type='radio'] {
    position: absolute;
    visibility: hidden;
  }

  div {
    display: inline-block;
    & > input {
      padding: 0 15px 0 8px;
      width: 95% !important;
    }
  }

  span.suffix {
    position: absolute;
    z-index: 1;
    right: 0;
    padding-right: 5px;
  }

  ${({ hasCustomValue }: SP) => `
    ${Label}, ${Slider}, ${CustomValue}, div {
      width: ${getFieldWidth(hasCustomValue)}px;
    }
  `}

  ${({ hasCustomValue }: SP) => getInputTransitions(hasCustomValue)}
`;
