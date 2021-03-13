import React, { useLayoutEffect, useState } from 'react';
import { Container, SwapButton, SwapInput, InputWrapper, SubmitButton, Overview } from './style';
import { IProps, IProtocolPipe, ISwapValues } from './interfaces';
import { Icon, IconType } from '../common/Icon';
import { ProtocolSelector } from '../ProtocolSelector';
import { IProtocol } from '../ProtocolSelector/interfaces';
import { defaultSwapValues } from './defaultProps';

const DEFAULT_MAX_FRACTION_DIGITS = 5;

const CurrencySwap: React.FC<IProps> = (props) => {
  const [swapValues, setSwapValues] = useState<ISwapValues>(defaultSwapValues);
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

  const getButtonValue = (): string => {
    if (props.locked) {
      return 'Unlock Wallet';
    }

    return 'Insufficient Balance';
  };

  const handleValueChange = (end: 'input' | 'output') => (newValue: string): void => {
    const value = Number(newValue);

    setSwapValues({ input: 0, output: 0 });

    if (!activeProtocols || !activeProtocols[end] || isNaN(value)) {
      return;
    }

    const endProto = activeProtocols[end] as IProtocol;
    const oppositeEndProto = activeProtocols[end === 'input' ? 'output' : 'input'] as IProtocol;

    setSwapValues({
      input: value,
      output: (value * endProto.price) / oppositeEndProto.price,
    });

    setActiveProtocols({ ...activeProtocols, ...endProto, ...oppositeEndProto });
  };

  const getPriceEquiv = (): React.ReactNode => {
    if (!activeProtocols?.input || !activeProtocols?.output) {
      return;
    }

    const { input, output } = activeProtocols;
    if (input.price <= 0) {
      return;
    }

    return (
      <Overview>
        1 {input.symbol} ={' '}
        {(input.price / output.price).toLocaleString(undefined, {
          maximumFractionDigits: getMaxFractionDigits(output.decimals),
        })}{' '}
        {output.symbol}
      </Overview>
    );
  };

  const getMaxFractionDigits = (decimals?: number): number => {
    const decimalsOrDefault = decimals ?? DEFAULT_MAX_FRACTION_DIGITS;

    if (!props.maxFractionDigits || props.maxFractionDigits >= decimalsOrDefault) {
      console.log(decimalsOrDefault);
      return decimalsOrDefault;
    }

    console.log(props.maxFractionDigits);
    return props.maxFractionDigits;
  };

  return (
    <Container noShadow={props.noShadow}>
      <InputWrapper>
        <div>
          <span>From</span>
          {activeProtocols?.input && (
            <Overview>Balance: {activeProtocols.input.balance ?? 0}</Overview>
          )}
        </div>
        <div>
          <SwapInput
            type='decimal'
            maxLength={20}
            maximumFractionDigits={getMaxFractionDigits(activeProtocols?.input?.decimals)}
            placeholder='0.00'
            value={swapValues.input}
            onValueChange={handleValueChange('input')}
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
          onClick={() => {
            setSwapValues({ input: swapValues.output, output: swapValues.input });
            setActiveProtocols({ input: activeProtocols?.output, output: activeProtocols?.input });
          }}
        />
      </SwapButton>
      <InputWrapper>
        <span>To</span>
        {getPriceEquiv()}
        <div>
          <SwapInput
            type='decimal'
            maxLength={20}
            placeholder='0.00'
            maximumFractionDigits={getMaxFractionDigits(activeProtocols?.output?.decimals)}
            value={swapValues.output}
            onValueChange={handleValueChange('output')}
          />
          <div>
            <ProtocolSelector
              current={activeProtocols?.output}
              list={protocols.output}
              onChange={(proto) =>
                setActiveProtocols({ ...activeProtocols, output: proto ?? undefined })
              }
            />
          </div>
        </div>
      </InputWrapper>
      <SubmitButton disabled={props.locked} onClick={props?.onSubmit}>
        {getButtonValue()}
      </SubmitButton>
    </Container>
  );
};

CurrencySwap.defaultProps = {
  maxFractionDigits: DEFAULT_MAX_FRACTION_DIGITS,
};

export { CurrencySwap };
