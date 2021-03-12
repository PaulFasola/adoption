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
  position: relative;
  align-items: center;
  border-radius: 16px;
  border: 1px solid red;
  outline: none;
  border: none;
  margin: 0 3px 0 3px;
  transition: width 0.3s ease;

  div:nth-child(1) {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0 0.2rem 0 0.2rem;
  }

  &:not(:disabled) {
    cursor: pointer;
  }

  > * {
    display: inline-block;
  }
`;

export const ProtocolIcon = styled.img`
  height: 20px;
  width: 20px;
  vertical-align: middle;
`;

export const Symbol = styled.div`
  font-size: 1.1em;
  margin: 2px 0 0 5px;
  vertical-align: middle;
`;

export const DropDownList = styled.ul`
  position: absolute;
  background-color: ${({ theme }: SP) => _(theme, 'primary', 'backgroundColor')};
  color: ${({ theme }: SP) => _(theme, 'primary', 'color')};
  z-index: 1;
  margin: 0;
  padding: 0;
  max-height: 0px;
  min-width: 10rem;
  max-width: 13rem;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  right: 0;
  width: auto;
  list-style: none;
  transition: max-height 0.2s ease;

  ${scrollbar}

  ${({ open }: SP) => open && 'max-height: 8rem;'};

  li {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    font-size: 0.8em;
    padding: 5px;

    :hover {
      background-color: ${({ theme }) => _(theme, 'disabled', 'color')};

      div:nth-of-type(2) {
        border-color: ${({ theme }) => _(theme, 'primary', 'color')};
        color: ${({ theme }) => _(theme, 'primary', 'color')};
      }
    }

    img {
      margin-right: 5px;
    }

    div:nth-of-type(1) {
      display: inline-block;
      vertical-align: middle;
      margin-right: 0.5rem;
    }

    div:nth-of-type(2) {
      font-size: 0.7em;
      padding: 1px;
      border: 1px solid ${({ theme }) => _(theme, 'disabled', 'color')};
      color: ${({ theme }) => _(theme, 'disabled', 'color')};
    }
  }
`;
