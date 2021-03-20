import React, { Fragment } from 'react';
import { useLocale } from '../../hooks/useLocale';
import {
  CancelButton,
  Container,
  DetailedView,
  Header,
  HelpLink,
  Request,
  Spinner,
  TransactionList,
  Visual,
  QRCode,
} from './style';
import { AnimatedIcon, IconType as AnimatedIconType } from '../common/AnimatedIcon';
import { defaultProps } from './defaultProps';
import { AdaptiveSpan } from '../common/AdaptiveSpan';
import { PaymentStatus } from './enums/paymentStatus';
import { padDigits } from '../../utils/arithmetic';
import { shortenHash } from '../../utils/string';
import { IProps } from './interfaces';
import { Icon, IconType } from '../common/Icon';
import { IStrings } from './strings';
import { Item } from './item';

const PaymentRequest: React.FC<IProps> = (props) => {
  const locale = useLocale();
  const strs = locale.strings.paymentRequest as IStrings;

  const remainingAmount = props.amount.toPay - (props.amount.received ?? 0);

  const _getFromDate = (date: Date): string => {
    const currentDate = new Date();
    const dayCount = (date.getTime() - currentDate.getTime()) / (1000 * 3600 * 24);

    let unit: Intl.RelativeTimeFormatUnit = 'day';
    let value = dayCount;

    if (dayCount >= 0 && dayCount <= 1) {
      const hoursCount = Math.abs(currentDate.getTime() - date.getTime()) / 36e5;
      unit = 'hours';
      value = hoursCount;

      if (hoursCount <= 1) {
        const minCount = Math.abs(currentDate.getTime() - date.getTime()) / 1000 / 60;
        unit = 'minute';
        value = Math.ceil(minCount);
      }
    }

    /* istanbul ignore next */
    return new Intl.RelativeTimeFormat(props.deadline?.dateLocale ?? locale.locale).format(
      Math.ceil(value),
      unit
    );
  };

  const _getStatus = (): string => {
    if (remainingAmount <= 0) {
      return strs.txStatus.complete;
    } else if (props.customStatusText) {
      return props.customStatusText;
    }

    return strs.txStatus[props.status!];
  };

  const _renderVisual = (): React.ReactNode => {
    if (props.status && [PaymentStatus.FAILED, PaymentStatus.COMPLETE].includes(props.status)) {
      return (
        <AnimatedIcon
          key={props.status}
          type={
            props.status === PaymentStatus.FAILED
              ? AnimatedIconType.Failure
              : AnimatedIconType.Sucess
          }
          style={{ display: 'flex', margin: 'auto' }}
        />
      );
    } else if (props.showQRCode) {
      return (
        <QRCode
          bgColor='transparent'
          fgColor='#000000'
          level='L'
          style={{ width: 100 }}
          value={props.address}
        />
      );
    }
    return null;
  };

  return (
    <Container noShadow={props.noShadow}>
      <Header>
        <img src={props.logos.coin} alt={`${props.symbol} logo`} />
        {props.logos.company && <img src={props.logos.company} alt={`Company logo`} />}
      </Header>
      <div>
        <Request>
          <AdaptiveSpan
            text={strs.request}
            mapping={[
              { tag: '{amount}', value: props.amount.toPay, style: 'bold' },
              { tag: '{symbol}', value: props.symbol },
            ]}
          />
          <div title={props.address}>{props.address}</div>
        </Request>
        <Visual>{_renderVisual()}</Visual>
        <DetailedView>
          {props.sellerName ? (
            <Item title={strs.seller}>
              <span title={props.sellerName}>{props.sellerName}</span>
            </Item>
          ) : null}
          {typeof props.amount.received === 'number' ? (
            <Fragment>
              <Item title={strs.receivedAmount}>
                {padDigits(props.amount.received, props.decimalPlaces)} {props.symbol}
              </Item>
              <Item title={strs.remainingAmount}>
                {padDigits(remainingAmount, props.decimalPlaces)} {props.symbol}
              </Item>
            </Fragment>
          ) : null}
          {props.deadline && remainingAmount > 0 ? (
            <Item title={strs.deadline}>
              {new Intl.DateTimeFormat(props.deadline.dateLocale ?? locale.locale).format(
                props.deadline.datetime
              )}
              {props.deadline.humanized && (
                <span>&nbsp;({_getFromDate(props.deadline.datetime)})</span>
              )}
            </Item>
          ) : null}
          {props.transactions?.length ? (
            <Item
              title={strs.transactions.replace('{txAmount}', props.transactions.length.toString())}
            >
              <TransactionList>
                {props.transactions.map((transaction, index) => (
                  <li key={index}>
                    <a
                      href={transaction.txUrl}
                      title='Transaction'
                      rel='noreferrer'
                      target='_blank'
                    >
                      {shortenHash(transaction.txHash, 3)}
                    </a>
                    <i>
                      ({padDigits(transaction.amount, props.decimalPlaces)} {props.symbol})
                    </i>
                  </li>
                ))}
              </TransactionList>
            </Item>
          ) : null}
          <Item title={strs.status}>
            {props.waitAnimation && props.status === PaymentStatus.PENDING && <Spinner />}
            <AdaptiveSpan showTitle text={_getStatus()} style='bold' />
          </Item>
        </DetailedView>
      </div>
      <div>
        {props.onCancel && <CancelButton onClick={props.onCancel}>{strs.cancel}</CancelButton>}
        {props.helpUrl && (
          <HelpLink href={props.helpUrl} title={strs.help} target='blank'>
            <Icon type={IconType.HelpCircleO} style={{ width: 13, lineHeight: '15px' }} />
            {strs.help}
          </HelpLink>
        )}
      </div>
    </Container>
  );
};

PaymentRequest.defaultProps = defaultProps;

export { PaymentRequest };
