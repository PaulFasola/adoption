import React, { useLayoutEffect, useState } from 'react';
import { Container, SwapButton, SwapInput, InputWrapper, SubmitButton } from './style';
import { Icon, IconType } from '../common/Icon';
import { IProps, IProtocolPipe } from './interfaces';
import { ProtocolSelector } from '../ProtocolSelector';
import { IProtocol } from '../ProtocolSelector/interfaces';

const CurrencySwap: React.FC<IProps> = (props) => {
  const [protocols, setProtocols] = useState<IProtocolPipe>({ input: [], output: [] });
  const [activeProtocols, setActiveProtocols] = useState<{
    input?: IProtocol;
    output?: IProtocol;
  }>();

  /* istanbul ignore next */
  useLayoutEffect(() => {
    const { input, output } = props.protocols;
    const inputList = input ?? [];

    setProtocols({
      input: inputList,
      output: output ?? inputList,
    });
  }, [props.protocols]);

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
        <div>
          <span>From</span>
        </div>
        <div>
          <SwapInput type='decimal' maxLength={20} placeholder='0.00' />
          <div>
            <ProtocolSelector
              current={activeProtocols?.input}
              list={protocols.input}
              onChange={(proto) =>
                setActiveProtocols({ ...activeProtocols, input: proto ?? undefined })
              }
            />
          </div>
        </div>
      </InputWrapper>
      <SwapButton>
        <Icon type={IconType.ArrowDown} style={{ width: '18px' }} onClick={_handleValueSwap} />
      </SwapButton>
      <InputWrapper>
        <span>To</span>
        <div>
          <SwapInput type='decimal' maxLength={20} placeholder='0.00' />
          <ProtocolSelector
            current={activeProtocols?.output}
            list={protocols.output}
            onChange={(proto) =>
              setActiveProtocols({ ...activeProtocols, output: proto ?? undefined })
            }
          />
        </div>
      </InputWrapper>
      <SubmitButton disabled={props.locked} onClick={props?.onSubmit}>
        {_getButtonValue()}
      </SubmitButton>
    </Container>
  );
};

// TransactionStatus.defaultProps = defaultProps;

export { CurrencySwap };
