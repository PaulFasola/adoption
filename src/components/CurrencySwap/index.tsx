import React, { useLayoutEffect } from 'react';
import { Input } from '../common/Input';
import { IProps } from './interfaces';
import { Container } from './style';

const CurrencySwap: React.FC<IProps> = (props) => {
  /* istanbul ignore next */
  useLayoutEffect(() => {}, []);

  return (
    <Container noShadow={props.noShadow}>
      <Input type='text' label={'Wow'} maxLength={20} />
    </Container>
  );
};

// TransactionStatus.defaultProps = defaultProps;

export { CurrencySwap };
