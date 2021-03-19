import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Container, SwapButton, SwapInput, InputWrapper, SubmitButton, Overview } from './style';
import { IProps, IProtocolArrayPipe, IProtocolPipe, ProtocolEnd, ISwapValues } from './interfaces';
import { Icon, IconType } from '../common/Icon';
import { ProtocolSelector } from '../ProtocolSelector';
import { IProtocol } from '../ProtocolSelector/interfaces';
import { preventCommonSymbol } from './utils';
import { usePrevious } from '../../hooks/usePrevious';

const DEFAULT_MAX_FRACTION_DIGITS = 8;

const CurrencySwap: React.FC<IProps> = (props) => {
  const [protocols, setProtocols] = useState<IProtocolArrayPipe>({ input: [], output: [] });
  const [activeProtocols, setActiveProtocols] = useState<IProtocolPipe>();
  const [swapValues, setSwapValues] = useState<ISwapValues>({});
  const [canSwap, setCanSwap] = useState<boolean>(false);

  const dataRef = usePrevious(activeProtocols);

  /* istanbul ignore next */
  useLayoutEffect(() => {
    const { input, output } = props.protocols;
    const inputList = input ?? [];

    setProtocols({
      input: inputList,
      output: output ?? inputList,
    });
  }, [props.protocols]);

  const getMaxFractionDigits = useCallback(
    (decimals?: number): number => {
      const decimalsOrDefault = decimals ?? DEFAULT_MAX_FRACTION_DIGITS;

      if (!props.maxFractionDigits || props.maxFractionDigits >= decimalsOrDefault) {
        return decimalsOrDefault;
      }

      return props.maxFractionDigits;
    },
    [props.maxFractionDigits]
  );

  const reflectProtocolsAndPrices = useCallback(
    (end: ProtocolEnd, value: number): void => {
      if (!activeProtocols || !activeProtocols[end]) return;

      const currentProto = activeProtocols[end] as IProtocol;
      const oppositeEnd = end === 'input' ? 'output' : 'input';
      const oppositeProto = activeProtocols[oppositeEnd] as IProtocol | undefined;
      let oppositeValue = oppositeProto ? (value * currentProto.price) / oppositeProto.price : null;

      if (oppositeValue) {
        /* istanbul ignore next */
        const toStr = oppositeValue.toLocaleString('en-US', {
          maximumFractionDigits: getMaxFractionDigits(activeProtocols[end]?.decimals),
        });
        oppositeValue = parseFloat(toStr.replace(/[^\d\.\-]/g, ''));
      }

      setSwapValues((prevProps) => ({
        ...prevProps,
        [end]: value,
        [oppositeEnd]: oppositeValue,
      }));
    },
    [activeProtocols, getMaxFractionDigits]
  );

  useEffect(() => {
    setProtocols((prevState) => {
      return {
        ...prevState,
        ...preventCommonSymbol(prevState, activeProtocols),
      };
    });

    const end: ProtocolEnd = dataRef?.input !== activeProtocols?.input ? 'output' : 'input';
    reflectProtocolsAndPrices(end, swapValues[end] ?? 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProtocols, reflectProtocolsAndPrices]);

  /**
   * Determines if swapping is possible
   */
  useEffect((): void => {
    if (
      !activeProtocols ||
      !activeProtocols.input ||
      !activeProtocols.output ||
      !swapValues.input
    ) {
      return setCanSwap(false);
    }

    if (
      activeProtocols.input.balance <= 0 ||
      (swapValues.input ?? -1) <= 0 ||
      swapValues.input > activeProtocols.input.balance
    ) {
      return setCanSwap(false);
    }

    return setCanSwap(!props.locked);
  }, [props.locked, activeProtocols, swapValues]);

  const handleValueChange = (end: ProtocolEnd) => (newValue: string): void => {
    const value = Number(newValue);
    setSwapValues({ input: undefined, output: undefined });

    if (isNaN(value)) return;
    reflectProtocolsAndPrices(end, value);
  };

  const handleProtocolChange = (end: ProtocolEnd) => (newProto: IProtocol) => {
    setActiveProtocols({ ...activeProtocols, ...{ [end]: newProto } });
  };

  const handleSubmit = () => {
    /** istanbul ignore next */
    if (!swapValues || !activeProtocols) return;

    if (typeof props.onSubmit === 'function') {
      props.onSubmit({
        amounts: swapValues,
        protocols: activeProtocols,
      });
    }

    setSwapValues({
      input: 0,
      output: 0,
    });
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
        1 {input.symbol} =&nbsp;
        {(input.price / output.price).toLocaleString('en-US', {
          maximumFractionDigits: getMaxFractionDigits(output.decimals),
        })}
        &nbsp;
        {output.symbol}
      </Overview>
    );
  };

  const getButtonValue = (): string => {
    if (props.locked) {
      return 'Unlock Wallet';
    }

    if (
      activeProtocols &&
      swapValues.input &&
      activeProtocols.input &&
      typeof activeProtocols.input.balance === 'number'
    ) {
      if (activeProtocols.input.balance < swapValues.input) {
        return 'Insufficient balance';
      }
    }

    return 'Swap';
  };

  return (
    <Container noShadow={props.noShadow}>
      <InputWrapper>
        <div>
          <span>From</span>
          {activeProtocols?.input && (
            <Overview>
              Balance: {activeProtocols.input.balance > 0 ? activeProtocols.input.balance : 0}
            </Overview>
          )}
        </div>
        <div>
          <SwapInput
            type='decimal'
            maxLength={19}
            placeholder='0.00'
            value={swapValues.input}
            onValueChange={handleValueChange('input')}
          />
          <div>
            <ProtocolSelector
              current={activeProtocols?.input}
              list={protocols.input.filter((x) => !x.hidden)}
              onChange={handleProtocolChange('input')}
            />
          </div>
        </div>
      </InputWrapper>
      <SwapButton
        aria-label='Swap values'
        onClick={() => {
          setSwapValues({ input: swapValues.output, output: swapValues.input });
          /* istanbul ignore next */
          setActiveProtocols({ input: activeProtocols?.output, output: activeProtocols?.input });
        }}
      >
        <Icon type={IconType.ArrowDown} style={{ width: '18px' }} />
      </SwapButton>
      <InputWrapper>
        <span>To</span>
        {getPriceEquiv()}
        <div>
          <SwapInput
            type='decimal'
            maxLength={19}
            placeholder='0.00'
            value={swapValues.output}
            onValueChange={handleValueChange('output')}
          />
          <div>
            <ProtocolSelector
              current={activeProtocols?.output}
              list={protocols.output.filter((x) => !x.hidden)}
              onChange={handleProtocolChange('output')}
            />
          </div>
        </div>
      </InputWrapper>
      <SubmitButton aria-label='Submit' disabled={!canSwap} onClick={handleSubmit}>
        {getButtonValue()}
      </SubmitButton>
    </Container>
  );
};

CurrencySwap.defaultProps = {
  maxFractionDigits: DEFAULT_MAX_FRACTION_DIGITS,
};

export { CurrencySwap };
