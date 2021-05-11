import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import {
  Container,
  SwapButton,
  SwapInput,
  InputWrapper,
  SubmitButton,
  Overview,
  SettingsButton,
} from './style';
import { IProps, IProtocolArrayPipe, IProtocolPipe, ProtocolEnd, ISwapValues } from './interfaces';
import { Icon, IconType } from '../common/Icon';
import { ProtocolSelector } from '../ProtocolSelector';
import { IProtocol } from '../ProtocolSelector/interfaces';
import { preventCommonSymbol } from './utils';
import { usePrevious } from '../../hooks/usePrevious';
import { useLocale } from '../../hooks/useLocale';
import { IStrings } from './strings';
import { SettingsPanel } from './settings';
import { ISettingsProps } from './settings/interfaces';
import { DEFAULT_MAX_FRACTION_DIGITS } from './settings/constants';

const CurrencySwap: React.FC<IProps> = (props) => {
  const locale = useLocale();
  const strs = locale.strings.currencySwap as IStrings;

  const [protocols, setProtocols] = useState<IProtocolArrayPipe>({ input: [], output: [] });
  const [activeProtocols, setActiveProtocols] = useState<IProtocolPipe>();
  const [swapValues, setSwapValues] = useState<ISwapValues>({});
  const [canSwap, setCanSwap] = useState<boolean>(false);
  const [settingsPanel, setSettingsPanel] = useState<Omit<ISettingsProps, 'settings'>>({
    renderable: false,
  });

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

  useEffect(() => {
    const isRenderable = (): boolean => {
      if (!props.settings) return false;

      let show = false;
      Object.values(props.settings).every((setting): boolean => {
        if (setting && Boolean(setting['visible'])) {
          show = true;
          return false;
        }
        return true;
      });

      return show;
    };

    setSettingsPanel((prevState) => ({
      ...prevState,
      renderable: isRenderable(),
    }));
  }, [props.settings]);

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
    (end: ProtocolEnd, value: number) => {
      if (!activeProtocols || !activeProtocols[end]) return;

      const currentProto = activeProtocols[end] as IProtocol;
      const oppositeEnd = end === 'input' ? 'output' : 'input';
      const oppositeProto = activeProtocols[oppositeEnd] as IProtocol | undefined;
      let oppositeValue = oppositeProto ? (value * currentProto.price) / oppositeProto.price : null;

      if (oppositeValue) {
        /* istanbul ignore next */
        const toStr = oppositeValue.toLocaleString(locale.locale, {
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
    [activeProtocols, getMaxFractionDigits, locale.locale]
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

  const handleValueChange = (end: ProtocolEnd) => (newValue: string) => {
    const value = Number(newValue);
    setSwapValues({ input: undefined, output: undefined });

    if (isNaN(value)) return;
    reflectProtocolsAndPrices(end, value);
  };

  // TODO: use a proper e2e to test accessibility
  /* istanbul ignore next */
  const handleKeyboardSubmission = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && canSwap) {
      handleSubmit();
    }
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

    setSwapValues({ input: 0, output: 0 });
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
        {(input.price / output.price).toLocaleString(locale.locale, {
          maximumFractionDigits: getMaxFractionDigits(output.decimals),
        })}
        &nbsp;
        {output.symbol}
      </Overview>
    );
  };

  const getSwapInput = (end: ProtocolEnd): React.ReactNode => (
    <div>
      <SwapInput
        type='decimal'
        maxLength={19}
        placeholder='0.00'
        value={swapValues[end]}
        onValueChange={handleValueChange(end)}
      />
      <div>
        <ProtocolSelector
          current={activeProtocols ? activeProtocols[end] : undefined}
          list={protocols[end].filter((x) => !x.hidden)}
          onChange={(newProto) =>
            setActiveProtocols({ ...activeProtocols, ...{ [end]: newProto } })
          }
        />
      </div>
    </div>
  );

  const getButtonValue = (): string => {
    const { insufficientBalance, unlockWallet, proceed } = strs.submitButton;

    if (props.locked) {
      return unlockWallet;
    }

    if (
      activeProtocols &&
      swapValues.input &&
      activeProtocols.input &&
      typeof activeProtocols.input.balance === 'number'
    ) {
      if (activeProtocols.input.balance < swapValues.input) {
        return insufficientBalance;
      }
    }

    return proceed;
  };

  return (
    <Container noShadow={props.noShadow}>
      <InputWrapper onKeyPress={handleKeyboardSubmission}>
        <div>
          <span>{strs.from}</span>
          {activeProtocols?.input && (
            <Overview>
              {strs.balance} {activeProtocols.input.balance > 0 ? activeProtocols.input.balance : 0}
            </Overview>
          )}
        </div>
        {getSwapInput('input')}
      </InputWrapper>
      <SwapButton
        aria-label={strs.buttonLabels.swap}
        onClick={(e) => {
          // TODO: use a proper e2e to test accessibility
          /* istanbul ignore next */
          if (e.screenX > 0 && e.screenY) {
            // unfocus when the user clicks on the button since this last will keep the focus
            // that event shouldn't be trigerred while using keyboard navigation for accessibility reasons
            e.currentTarget.blur();
          }

          setSwapValues({ input: swapValues.output, output: swapValues.input });
          /* istanbul ignore next */
          setActiveProtocols({ input: activeProtocols?.output, output: activeProtocols?.input });
        }}
      >
        <Icon type={IconType.ArrowDown} />
      </SwapButton>
      <InputWrapper onKeyPress={handleKeyboardSubmission}>
        <span>{strs.from}</span>
        {getPriceEquiv()}
        {getSwapInput('output')}
      </InputWrapper>
      <SubmitButton aria-label='Submit' disabled={!canSwap} onClick={handleSubmit}>
        <div>{getButtonValue()}</div>
        <SettingsButton
          hidden={!settingsPanel.renderable}
          aria-label={strs.buttonLabels.settings}
          type={settingsPanel.visible ? IconType.Times : IconType.Settings}
          settingsVisible={settingsPanel.visible}
          onClick={() =>
            setSettingsPanel((prevState) => ({ ...prevState, visible: !settingsPanel.visible }))
          }
        />
      </SubmitButton>
      {settingsPanel.renderable && props.settings && (
        <SettingsPanel
          settings={props.settings}
          visible={settingsPanel.visible}
          onSettingChanged={props.onSettingChanged}
        />
      )}
    </Container>
  );
};

CurrencySwap.defaultProps = {
  maxFractionDigits: DEFAULT_MAX_FRACTION_DIGITS,
};

export { CurrencySwap };
