import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDebounce } from '../../../../hooks/useDebounce';
import { ToggleSwitch } from '../../../common/ToggleSwitch';
import { DEFAULT_DEBOUNCE_DELAY } from '../constants';
import { IProps } from './fieldBuilder';

const Container = styled.div`
  display: flex;
  align-items: center;

  & > span {
    margin-left: 5px;
  }
`;

export const BooleanField: React.FC<IProps> = ({ name, onChange, text, debounce }) => {
  const [newState, setNewState] = useState(false);
  const debouncedvalue = useDebounce(newState, DEFAULT_DEBOUNCE_DELAY, debounce);

  useEffect(() => {
    onChange?.(name, debouncedvalue);
  }, [debouncedvalue, onChange, name]);

  return (
    <Container>
      <ToggleSwitch id={name} onChange={(state) => setNewState(state)} />
      {text && <span>{text}</span>}
    </Container>
  );
};
