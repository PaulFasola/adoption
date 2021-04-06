import styled from 'styled-components';
import { ITheme } from '../../../providers/theme/ITheme';
import _ from '../../../providers/theme/styleFetcher';
import { Input } from '../Input';

interface IStyleProps {
  theme: ITheme;
  hasCustomValue?: boolean;
}

interface SP extends IStyleProps {}

const getFieldWidth = (hasCustomValue?: boolean) => (hasCustomValue ? 65 : 82);

export const Slider = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${({ hasCustomValue }: SP) => getFieldWidth(hasCustomValue)}px;
  background-color: ${(p) => _(p.theme, 'disabled', 'color')};
`;

const getInputsTransition = (hasCustomValue?: boolean): string => {
  const fieldWidth = getFieldWidth(hasCustomValue);
  let test = '';

  for (let i = 1; i < 5; i++) {
    test += `
      input[type='radio']:nth-of-type(${i}):checked ~ ${Slider} {
        transition: left .2s ease-in-out;
        left: ${fieldWidth * i - fieldWidth}px;
      }
    `;
  }

  return test;
};

export const Container = styled.div`
  overflow: hidden;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  padding: 0;
  height: 30px;
  background-clip: padding-box;
  border: 2px solid ${(p) => _(p.theme, 'primary', 'borderColor')};
  transition: left 1.8s ease-in-out;

  input[type='radio'] {
    position: absolute;
    visibility: hidden;
  }

  ${(p: SP) => getInputsTransition(p.hasCustomValue)}
`;

export const Label = styled.label`
  position: relative;
  z-index: 1;
  float: left;
  width: ${({ hasCustomValue }: SP) => getFieldWidth(hasCustomValue)}px;
  cursor: pointer;
  text-align: center;
  color: ${(p) => _(p.theme, 'primary', 'color')};
  transition: all 500ms ease-in-out;
`;

export const CustomValue = styled(Input)`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  outline: none;
  border: none;
  width: 40px;
  margin-right: 15px;
  box-sizing: border-box;

  &:placeholder-shown {
    color: ${(p) => _(p.theme, 'disabled', 'color')};
  }

  &:focus {
    color: ${(p) => _(p.theme, 'primary', 'color')};
  }
`;
