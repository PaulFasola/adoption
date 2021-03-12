import styled from 'styled-components';
import _ from '../../providers/theme/styleFetcher';
import { ITheme } from '../../providers/theme/ITheme';
import { Input } from '../common/Input';

export interface IStyleProps {
  theme: ITheme;
  noShadow?: boolean;
}

interface SP extends IStyleProps {}

export const Container = styled.div`
  position: relative;
  padding: 15px;
  min-height: 190px;
  max-height: 800px;
  min-width: 250px;
  max-width: 350px;
  backgroundcolor: ${(p) => _(p.theme, 'primary', 'backgroundColor')};
  box-shadow: ${(p) => _(p.theme, 'primary', 'boxShadow')};

  ${(p: SP) =>
    p.noShadow &&
    `
    box-shadow: none;
  `}
`;

export const InputWrapper = styled.div`
  position: relative;
  border: 1px solid ${(p) => _(p.theme, 'primary', 'borderColor')};
  background-clip: padding-box;

  span:first-of-type {
    display: inline-block;
    margin: 5px 5px 0 5px;
  }

  & > div {
    display: flex;
    align-items: center;
  }
`;

export const SwapInput = styled(Input)`
  border: none;
  width: 100%;
  font-size: 1.2em;
`;

export const SwapButton = styled.button`
  display: block;
  height: 50px;
  width: 50px;
  margin: auto;
  padding: 0;
  outline: 0;
  border: none;
  background: transparent;
  cursor: pointer;

  > div {
    display: block;
    width: 35px;
    margin: auto;
    overflow: visible;
  }
`;

export const SubmitButton = styled.button`
  position: relative;
  font-size: 1.2em;
  background-color: transparent;
  border: 1px solid ${(p) => _(p.theme, 'primary', 'borderColor')};
  width: 100%;
  margin: 1rem auto 0 auto;
  padding: 15px;
  outline: none;
  cursor: pointer;

  &:hover:not(:disabled) {
    opacity: 0.8;
  }
`;

export const Overview = styled.span`
  position: absolute;
  right: 10px;
  top: 8px;
  font-size: 0.7em;
  text-transform: uppercase;
  color: ${(p) => _(p.theme, 'primary', 'color')};
`;
