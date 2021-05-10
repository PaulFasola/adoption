import styled from 'styled-components';
import _ from '../../../providers/theme/styleFetcher';

export const Container = styled.div`
  display: inline-flex;
  align-items: center;
`;

export const Slider = styled.span`
  display: block;
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0.4s;
  border-radius: 32px;
  border: 1px solid ${({ theme }) => _(theme, 'primary', 'borderColor')};

  &:before {
    position: absolute;
    content: '';
    height: 22px;
    width: 22px;
    left: 4px;
    bottom: 4px;
    background-color: ${({ theme }) => _(theme, 'disabled', 'color')};
    transition: transform 0.25s;
    border-radius: 50%;
  }
`;

export const Switch = styled.div`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 32px;

  input {
    opacity: 0;
    width: 0;
    height: 0;

    &:focus + ${Slider} {
      outline: none;
    }

    &:checked + ${Slider}:before {
      transform: translateX(28px);
    }
  }
`;
