import styled from 'styled-components';
import _ from '../../providers/theme/styleFetcher';
import { ITheme } from '../../providers/theme/ITheme';
import { Input } from '../common/Input';
import { Icon } from '../common/Icon';

export interface IStyleProps {
  theme: ITheme;
  noShadow?: boolean;
  settingsVisible?: boolean;
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
    margin-right: 0.2em;
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

    svg {
      width: 18px;
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

export const SubmitButton = styled.button`
  display: flex;
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
  align-items: baseline;

  div {
    display: inline-block;
    flex-grow: 1;
    padding-left: 30px;
  }

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

export const SettingsIcon = styled(Icon)`
  justify-content: right;
  margin: 0;

  > div {
    background-color: ${(p) => _(p.theme, 'primary', 'backgroundColor')};
    padding: 0 5px 0 5px;
    border-radius: 30px;

    svg {
      width: 18px;
      margin-top: 5px;
      fill: ${(p) => _(p.theme, 'primary', 'color')};
    }
  }

  &:hover {
    opacity: 1;

    svg {
      transition: transform 0.1s;
      transform: scale(1.1);
    }
  }

  ${(p: SP) =>
    p.settingsVisible &&
    `
    z-index: 1;

    > div {
      border: 1px solid ${_(p.theme, 'disabled', 'color')};
      svg {
        width: 16px;
      }
    }
  `}
`;
