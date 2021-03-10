import React, { useLayoutEffect, useState } from 'react';
import { Container, SwapButton, SwapInput, InputWrapper, SubmitButton } from './style';
import { Icon, IconType } from '../common/Icon';
import { IProps } from './interfaces';

const CurrencySwap: React.FC<IProps> = (props) => {
  const [swapShouldAnim, setSwapShouldAnim] = useState<boolean>();

  /* istanbul ignore next */
  useLayoutEffect(() => {}, []);

  const _getButtonValue = (): string => {
    if (props.locked) {
      return 'Unlock Wallet';
    }

    return 'Insufficient Balance';
  };

  const _handleValueSwap = (): void => {
    throw new Error('Not implemented (yet).');
  };

  return (
    <Container noShadow={props.noShadow}>
      <InputWrapper>
        <span>From</span>
        <SwapInput type='decimal' maxLength={20} placeholder='0.00' />
      </InputWrapper>
      <SwapButton
        onMouseOver={() => setSwapShouldAnim(true)}
        onMouseOut={() => setSwapShouldAnim(false)}
      >
        <Icon
          animate={swapShouldAnim}
          type={IconType.ArrowDown}
          style={{ width: '18px' }}
          onClick={_handleValueSwap}
        />
      </SwapButton>
      <InputWrapper>
        <span>To</span>
        <SwapInput type='decimal' maxLength={20} placeholder='0.00' />
      </InputWrapper>
      <SubmitButton onClick={props?.onSubmit} disabled={props.locked}>
        {_getButtonValue()}
      </SubmitButton>
    </Container>
  );
};

// TransactionStatus.defaultProps = defaultProps;

export { CurrencySwap };
