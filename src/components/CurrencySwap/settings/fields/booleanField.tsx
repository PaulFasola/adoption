import React from 'react';
import styled from 'styled-components';
import { ToggleSwitch } from '../../../common/ToggleSwitch';
import { IProps } from './fieldBuilder';

const Container = styled.div`
  display: flex;
  align-items: center;

  & > span {
    margin-left: 5px;
  }
`;

export const BooleanField: React.FC<IProps> = ({ name, onChange, text }) => {
  const handleChange = (newState: boolean) => {
    if (typeof onChange !== 'function') {
      return;
    }

    onChange(name, newState);
  };

  return (
    <Container>
      <ToggleSwitch id={name} onChange={handleChange} />
      {text && <span>{text}</span>}
    </Container>
  );
};
