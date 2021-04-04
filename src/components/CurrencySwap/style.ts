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
  background-color: ${(p) => _(p.theme, 'primary', 'backgroundColor')};
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
    color: ${(p) => _(p.theme, 'primary', 'color')};
  }

  & > div {
    display: flex;
    align-items: center;

    /* ProtocolSelector wrapper */
    div {
      margin-right: 0.2em;
    }
  }
`;

export const SwapInput = styled(Input)`
  border: none;
  width: calc(100% - 10px);
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

  &:hover path,
  &:focus path {
    transition: fill 0.15s ease-in;
    fill: ${(p) => _(p.theme, 'disabled', 'color')}!important;
  }

  path {
    fill: ${(p) => _(p.theme, 'primary', 'color')}!important;
  }

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
  background-color: ${(p) => _(p.theme, 'defaultButton', 'backgroundColor')};
  border: 0;
  color: ${(p) => _(p.theme, 'secondary', 'color')};
  width: 100%;
  margin: 1rem auto 0 auto;
  padding: 15px;
  outline: none;
  cursor: pointer;

  &:disabled {
    color: ${(p) => _(p.theme, 'disabled', 'color')};
    background-color: ${(p) => _(p.theme, 'disabled', 'backgroundColor')};
    cursor: auto;
  }

  &:hover,
  &:focus {
    &:not(:disabled) {
      background-color: ${(p) => _(p.theme, 'defaultButton', 'hoverBgColor')};
    }
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
