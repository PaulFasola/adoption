import React from 'react';
import { DefaultTheme, ThemedCssFunction } from 'styled-components';

interface IProps {
  styles?: ThemedCssFunction<DefaultTheme>
}

const TransactionStatus: React.FC<IProps> = (props) => {
  const _handleClick = (): void => {

  }

  return (
    <div onClick={_handleClick} {...props}>
      {props.children}
    </div>
  );
};

TransactionStatus.defaultProps = {

}

export { TransactionStatus };
