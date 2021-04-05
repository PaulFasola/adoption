import styled from 'styled-components';
import _ from '../../providers/theme/styleFetcher';
import { ITheme } from '../../providers/theme/ITheme';
import { scrollbar } from '../common/style';

export interface IStyleProps {
  theme: ITheme;
  open?: boolean;
}

interface SP extends IStyleProps {}

export const Button = styled.button`
  display: flex;
  color: ${({ theme }) => _(theme, 'defaultButton', 'color')};
  background-color: ${({ theme }) => _(theme, 'defaultButton', 'backgroundColor')};
  position: relative;
  align-items: center;
  border-radius: 16px;
  min-height: 1.75rem;
  min-width: 7.3rem;
  outline: none;
  border: none;

  div:nth-child(1) {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0 0.5rem 0 0.5rem;
  }

  &:not(:disabled) {
    cursor: pointer;

    &:hover,
    &:focus {
      background-color: ${({ theme }) => _(theme, 'defaultButton', 'hoverBgColor')};
    }
  }

  > * {
    display: inline-block;
  }
`;

export const ProtocolIcon = styled.img`
  height: 20px;
  width: 35px;
  margin: 0.15rem 0 0.15rem 0.15rem;
  vertical-align: middle;
  overflow: hidden;
`;

export const Symbol = styled.div`
  font-size: 1.1em;
  margin: 2px 0;
  vertical-align: middle;
  width: 100%;
`;

export const DropDownList = styled.div`
  position: absolute;
  height: 6.5rem;
  background-color: ${({ theme }) => _(theme, 'primary', 'backgroundColor')};
  color: ${({ theme }) => _(theme, 'primary', 'color')};
  z-index: 1;
  margin: 0 0 0 10px;
  max-width: 12rem;
  padding: 0;
  overflow-x: hidden;
  overflow-y: auto;
  transition: max-height 0.18s ease-in-out;
  max-height: 0;
  box-shadow: ${({ theme }) => _(theme, 'primary', 'boxShadow')};
  ${({ open }: SP) =>
    open &&
    `
    max-height: 10rem;
  `};

  ${scrollbar}

  div {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    font-size: 0.9em;
    padding: 0.17rem 1.5rem 0.25rem 0;

    &:hover,
    &:focus {
      outline: none;
      background-color: ${({ theme }) => _(theme, 'primary', 'hoverBgColor')};
      color: ${({ theme }) => _(theme, 'primary', 'hoverColor')};

      div:nth-of-type(2) {
        border-color: ${({ theme }) => _(theme, 'primary', 'color')};
        color: ${({ theme }) => _(theme, 'primary', 'color')};
      }
    }

    img {
      margin-right: 0.5rem;
    }

    div:nth-of-type(1) {
      display: inline-block;
      vertical-align: middle;
      margin-right: 0.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    div:nth-of-type(2) {
      font-size: 0.7em;
      padding: 1px;
      border: 1px solid ${({ theme }) => _(theme, 'disabled', 'color')};
      color: ${({ theme }) => _(theme, 'disabled', 'color')};
      position: absolute;
      right: 0.6rem;
    }
  }
`;
