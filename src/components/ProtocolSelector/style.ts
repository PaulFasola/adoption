import styled from 'styled-components';
import _ from '../../providers/theme/styleFetcher';

export interface IStyleProps {
  open?: boolean;
  src?: string;
}

interface SP extends IStyleProps {}

export const Button = styled.button`
  min-width: 6rem;
  position: relative;
  align-items: center;
  height: 2.5em;
  border-radius: 16px;
  border: 1px solid red;
  outline: none;
  border: none;
  transition: width 0.3s ease;

  div:nth-child(1) {
    margin: 0px 0.25rem 0px 0.75rem;
  }

  div:nth-child(2) {
    margin: 0px 0.25rem 0px 0.35rem;
  }

  &:not(:disabled) {
    cursor: pointer;
  }

  > * {
    display: inline-block;
  }
`;

export const IconWrapper = styled.div`
  height: 20px;
  width: 20px;
  vertical-align: middle;
  background-image: url('${(p: SP) => p.src}');
  background-repeat: no-repeat;
`;

export const Symbol = styled.div`
  font-size: 1.1em;
  margin: 2px 0 0 5px;
  vertical-align: middle;
`;

export const DropDownList = styled.ul`
  margin: 0;
  max-height: 0px;
  max-width: 13rem;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0;
  width: auto;
  list-style: none;
  transition: all 0.3s ease;

  ${(p: SP) =>
    p.open &&
    `
    max-height: 8rem;
  `};

  li {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    font-size: 0.8em;
    padding: 5px;

    :hover {
      background-color: ${(p) => _(p.theme, 'disabled', 'color')};

      div:nth-of-type(3) {
        border-color: ${(p) => _(p.theme, 'messages', 'success')};
        color: ${(p) => _(p.theme, 'messages', 'success')};
      }
    }

    img {
      margin-right: 5px;
    }

    div:nth-of-type(2) {
      display: inline-block;
      vertical-align: middle;
      width: 100%;
    }

    div:nth-of-type(3) {
      font-size: 0.7em;
      border: 1px solid ${(p) => _(p.theme, 'disabled', 'color')};
      color: ${(p) => _(p.theme, 'disabled', 'color')};
      padding: 1px;
    }
  }
`;
