import React, { useLayoutEffect, useState } from 'react';
import { Container, SwapButton, SwapInput, InputWrapper, SubmitButton, Overview } from './style';
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

  const _handleValueChange = (end: 'input' | 'output') => (newValue: string): void => {
    const value = Number(newValue);

    if (!activeProtocols || !activeProtocols[end] || isNaN(value)) {
      return;
    }

    const updatedProto: IProtocol = { ...(activeProtocols[end] as IProtocol), value };
    setActiveProtocols({ ...activeProtocols, ...{ [end]: updatedProto } });
  };

  const _getPriceEquiv = (): React.ReactNode => {
    if (!activeProtocols?.input || !activeProtocols?.output) {
      return;
    }

    return (
      <Overview>
        1 {activeProtocols.input.symbol} = x {activeProtocols.output.symbol}
      </Overview>
    );
  };

  return (
    <Container noShadow={props.noShadow}>
      <InputWrapper>
        <div>
          <span>From</span>
          {activeProtocols?.input && (
            <Overview>
              Balance: {activeProtocols.input.value ?? 0} {activeProtocols.input.symbol}
            </Overview>
          )}
        </div>
        <div>
          <SwapInput
            type='decimal'
            maxLength={20}
            placeholder='0.00'
            value={activeProtocols?.input?.value}
            onValueChange={_handleValueChange('input')}
          />
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
        <Icon
          type={IconType.ArrowDown}
          style={{ width: '18px' }}
          onClick={() =>
            setActiveProtocols({ input: activeProtocols?.output, output: activeProtocols?.input })
          }
        />
      </SwapButton>
      <InputWrapper>
        <span>To</span>
        {_getPriceEquiv()}
        <div>
          <SwapInput
            type='decimal'
            maxLength={20}
            placeholder='0.00'
            value={activeProtocols?.output?.value}
            onValueChange={_handleValueChange('output')}
          />
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
