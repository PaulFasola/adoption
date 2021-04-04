import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Button, ProtocolIcon, Symbol, DropDownList } from './style';
import { IProps, IProtocol } from './interfaces';
import { Icon, IconType } from '../common/Icon';
import { useLocale } from '../../hooks/useLocale';
import { IStrings } from './strings';

export const ProtocolSelector: React.FC<IProps> = (props) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const strs = useLocale().strings.protocolSelector as IStrings;

  const [protocol, setProtocol] = useState<IProtocol>();
  const [dropdownIsOpen, setDropdownIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const _handleOuterClick = (e: MouseEvent): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        dropdownIsOpen && setDropdownIsOpen(false);
      }
    };

    document.addEventListener('click', _handleOuterClick);
    return () => {
      document.removeEventListener('click', _handleOuterClick);
    };
  }, [dropdownIsOpen]);

  useLayoutEffect(() => {
    setProtocol(props.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.current]);

  // TODO: use a proper e2e to test accessibility
  /* istanbul ignore next */
  const handleKeypress = (protocol: IProtocol) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleProtocolPick(protocol)();
    }
  };

  const handleProtocolPick = (protocol: IProtocol) => (): void => {
    if (typeof props.onChange === 'function') {
      props.onChange(protocol);
    }

    setProtocol(protocol);
    setDropdownIsOpen(false);
  };

  const fullLabel = `${protocol?.name} - ${protocol?.symbol}`;

  const button = useMemo(() => {
    if (protocol) {
      return (
        <Button
          title={fullLabel}
          disabled={props.disabled}
          onClick={() => setDropdownIsOpen(!dropdownIsOpen)}
        >
          <ProtocolIcon src={protocol.logoURI} title={fullLabel} />
          <Symbol>{protocol.symbol}</Symbol>
          {props.list.length > 0 && (
            <Icon
              defaultTheme
              type={IconType.ArrowDown}
              style={{ width: '0.8em' }}
              disabled={props.disabled}
            />
          )}
        </Button>
      );
    }

    return (
      <Button disabled={props.disabled} onClick={() => setDropdownIsOpen(!dropdownIsOpen)}>
        <div>{strs.selectProtocol}</div>
        <Icon
          defaultTheme
          type={IconType.ArrowDown}
          style={{ width: '0.6em' }}
          disabled={props.disabled}
        />
      </Button>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [protocol, props.disabled]);

  return (
    <>
      {button}
      <DropDownList data-test='dropdown' open={dropdownIsOpen} tabIndex={0} ref={dropdownRef}>
        {props.list.map((protocol, i) => (
          <div
            key={i}
            onClick={handleProtocolPick(protocol)}
            onKeyPress={handleKeypress(protocol)}
            tabIndex={0}
          >
            <ProtocolIcon src={protocol.logoURI} title={fullLabel} />
            <div>{protocol.name}</div>
            <div>{protocol.symbol}</div>
          </div>
        ))}
      </DropDownList>
    </>
  );
};
