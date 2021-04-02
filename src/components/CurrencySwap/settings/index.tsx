import React from 'react';
import { Container, Content } from './styles';
import { IProps } from '../interfaces';

interface ISettingsProps extends Pick<IProps, 'settings'> {
  visible?: boolean;
}

export const Settings: React.FC<ISettingsProps> = (props) => {
  return (
    <Container visible={props.visible}>
      <Content></Content>
    </Container>
  );
};
