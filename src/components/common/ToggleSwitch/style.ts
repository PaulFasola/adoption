import styled from 'styled-components';
import _ from '../../../providers/theme/styleFetcher';

export const Container = styled.div`
  display: flex;
  align-items: center;

  label {
    margin-left: 5px;
  }
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
  border-radius: 34px;
  border: 2px solid ${({ theme }) => _(theme, 'disabled', 'color')};

  &:before {
    position: absolute;
    content: '';
    height: 25px;
    width: 25px;
    left: 3px;
    bottom: 3px;
    background-color: ${({ theme }) => _(theme, 'disabled', 'color')};
    transition: 0.4s;
    border-radius: 50%;
  }
`;

export const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  input {
    opacity: 0;
    width: 0;
    height: 0;

    &:focus + ${Slider} {
      outline: none;
    }

    &:checked + ${Slider}:before {
      transform: translateX(25px);
    }
  }
`;
