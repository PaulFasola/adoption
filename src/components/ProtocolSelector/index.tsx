import React, { useLayoutEffect, useState } from 'react';
import { Button, IconWrapper, Symbol, DropDownList } from './style';
import { IProps, IProtocol } from './interfaces';
import { Icon, IconType } from '../common/Icon';

export const ProtocolSelector: React.FC<IProps> = (props) => {
  const [protocol, setProtocol] = useState<IProtocol>();
  const [dropdownIsOpen, setDropdownIsOpen] = useState<boolean>(false);

  useLayoutEffect(() => {
    setProtocol(props.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.current]);

  if (!protocol) {
    return (
      <Button disabled={props.disabled}>
        Select a protocol
        <Icon type={IconType.ArrowDown} style={{ width: '0.8em' }} disabled={props.disabled} />
      </Button>
    );
  }

  const _handleProtocolPick = (protocol: IProtocol) => (): void => {
    if (typeof props.onChange === 'function') {
      props.onChange(protocol);
    }

    setProtocol(protocol);
    setDropdownIsOpen(false);
  };

  const fullLabel = `${protocol.name} - ${protocol.symbol}`;
  return (
    <>
      <Button
        title={fullLabel}
        onClick={() => setDropdownIsOpen(!dropdownIsOpen)}
        disabled={props.disabled}
      >
        <IconWrapper>
          <img src={protocol.logoURI} title={fullLabel} />
        </IconWrapper>
        <Symbol>{protocol.symbol}</Symbol>
        {props.list.length > 0 && (
          <Icon type={IconType.ArrowDown} style={{ width: '0.8em' }} disabled={props.disabled} />
        )}
      </Button>

      <DropDownList open={dropdownIsOpen}>
        {props.list.map((protocol, i) => (
          <li key={i} onClick={_handleProtocolPick(protocol)}>
            <IconWrapper>
              <img src={protocol.logoURI} title={fullLabel} />
            </IconWrapper>
            <div>{protocol.name}</div>
            <div>{protocol.symbol}</div>
          </li>
        ))}
      </DropDownList>
    </>
  );
};
