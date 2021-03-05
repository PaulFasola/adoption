import React, { useLayoutEffect, useState } from 'react';
import { Amount, Arrow, Container, CustomComponent, Date, DetailedView, IconWrapper, Row, Side, Status, StatusBar, Trajectory, TxFees } from './style';
import { AdaptiveSpan } from '../common/AdaptiveSpan';
import { defaultColorMap, defaultProps } from './defaultProps';
import { shortenHash } from '../../utils/string';
import { Icon, IconType } from '../common/Icon';
import { IAdress, IProps } from './interfaces';
import { TxStatus } from './txStatus';

const TransactionStatus: React.FC<IProps> = (props) => {
  const [status, setStatus] = useState<TxStatus>(TxStatus.UNKNOWN);
  const [colorMap, setColorMap] = useState<Record<TxStatus, string>>(defaultColorMap);
  const [isToggled, setIsToggled] = useState<boolean>(false);

  const shouldRenderDetails = Boolean(props.txFees || props.sender || props.receiver || props.customDetailComponent);
  const shouldRenderTrajectory = Boolean(props.sender || props.receiver);
  const shouldRenderSide = Boolean(props.txURL || shouldRenderDetails);

  /* istanbul ignore next */
  useLayoutEffect(() => {
    if (props.status) {
      setStatus(props.status);
    }

    if (props.autoShowDetails && shouldRenderDetails) {
      setIsToggled(true);
    }

    setColorMap({ ...defaultColorMap, ...props.colorMap })
  }, [props.status, props.colorMap, props.autoShowDetails, shouldRenderDetails])

  const _handleToggleClick = (): void => setIsToggled(!isToggled);

  const _getStatus = (): string => {
    let output = status.toUpperCase() + status.slice(1);
    if (!props.uncapitalizeStatus) output = status.toUpperCase();

    return output;
  }

  const _getTransaction = (tx?: IAdress): React.ReactNode => {
    if (!tx || !tx.hash) return null;

    return (
      <a href={tx.url} rel="noreferrer" target="_blank">
        {shortenHash(tx.hash, 7)}
      </a>
    )
  }

  return (
    <Container showDetails={isToggled} hasDate={Boolean(props.date?.value)}>
      <StatusBar backgroundColor={colorMap[status]} animate={props.animated ? props.status : null} />
      <Row showSide={shouldRenderSide}>
        <Amount>
          <AdaptiveSpan
            text="<h1>{amount}</h1><p>{symbol}</p>"
            mapping={[
              { tag: '{amount}', value: props.amount, style: 'bold' },
              { tag: '{symbol}', value: props.symbol },
            ]} />
        </Amount>
        <Status title={`Status`}>
          {_getStatus()}
        </Status>
        {(shouldRenderSide) &&
          <Side>
            {props.txURL &&
              <IconWrapper>
                <Icon type={IconType.OutboundLink} style={{ width: 21 }} url={props.txURL} targetBlank />
              </IconWrapper>}
            {shouldRenderDetails &&
              <IconWrapper clickable onClick={_handleToggleClick}>
                <Icon type={isToggled ? IconType.ArrowUp : IconType.ArrowDown} style={{ width: 15 }} />
              </IconWrapper>}
          </Side>}
      </Row>
      {shouldRenderDetails &&
        <DetailedView>
          {shouldRenderTrajectory && <div>
            <Trajectory>
              {_getTransaction(props.sender)}
              {props.sender && props.receiver && <Arrow />}
              {_getTransaction(props.receiver)}
            </Trajectory>
            <TxFees>{props.txFees} {props.symbol} (fees)</TxFees>
          </div>
          }
          <CustomComponent>
            {props.customDetailComponent}
          </CustomComponent>
        </DetailedView>}
      {props.date && props.date.value &&
        <Date>
          <span>{new Intl.DateTimeFormat(props.date.locale ?? 'en-US', props.date.options).format(props.date.value)}</span>
        </Date>}
    </Container>
  );
};

TransactionStatus.defaultProps = defaultProps;

export { TransactionStatus, TxStatus };