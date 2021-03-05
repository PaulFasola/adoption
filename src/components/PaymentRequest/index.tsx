import React, { Fragment, useLayoutEffect, useState } from 'react';
import { CancelButton, Container, DetailedView, Header, HelpLink, Request, Spinner, TransactionList, Visual, QRCode } from './style';
import { AnimatedIcon, IconType as AnimatedIconType } from '../common/AnimatedIcon';
import { defaultStrings, defaultProps } from './defaultProps';
import { AdaptiveSpan } from '../common/AdaptiveSpan';
import { PaymentStatus } from './enums/paymentStatus';
import { padDigits } from '../../utils/arithmetic';
import { shortenHash } from '../../utils/string';
import { IProps, IStrings } from './interfaces';
import { Icon, IconType } from '../common/Icon';
import { Item } from './item';

const PaymentRequest: React.FC<IProps> = (props) => {
	const remainingAmount = props.amount.toPay - (props.amount.received ?? 0);
	const [strings, setStrings] = useState<IStrings>(defaultStrings);

	useLayoutEffect(() => {
		if (props.strings) {
			setStrings(s => { return { ...s, ...props.strings } });
		}
	}, [props.strings]);

	const _getFromDate = (date: Date): string => {
		let unit: Intl.RelativeTimeFormatUnit = 'day';
		let value = 0;

		const currentDate = new Date();
		const dayCount = (date.getTime() - currentDate.getTime()) / (1000 * 3600 * 24);
		value = dayCount;

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
		return new Intl.RelativeTimeFormat(props.deadline?.dateLocale ?? 'en-US').format(Math.ceil(value), unit)
	}

	const _getStatus = (): string => {
		if (remainingAmount <= 0) {
			return strings.txStatus.complete;
		} else if (props.customStatusText) {
			return props.customStatusText;
		}
		return props.status ? strings.txStatus[props.status] : '';
	}

	const _renderVisual = (): React.ReactNode => {
		if (props.status && [PaymentStatus.FAILED, PaymentStatus.COMPLETE].includes(props.status)) {
			return <AnimatedIcon key={props.status}
				type={props.status === PaymentStatus.FAILED ? AnimatedIconType.Failure : AnimatedIconType.Sucess}
				style={{ display: 'flex', margin: 'auto' }}
			/>;
		} else if (props.showQRCode) {
			return (
				<QRCode
					bgColor="transparent"
					fgColor="#000000"
					level="L"
					style={{ width: 100 }}
					value={props.address} />
			)
		}
		return null;
	}

	return (
		<Container>
			<Header>
				<img src={props.logos.coin} alt={`${props.symbol} logo`} />
				{props.logos.company && <img src={props.logos.company} alt={`Company logo`} />}
			</Header>
			<div>
				<Request>
					<AdaptiveSpan
						text={strings.request}
						mapping={[
							{ tag: '{amount}', value: props.amount.toPay, style: 'bold' },
							{ tag: '{symbol}', value: props.symbol }
						]}
					/>
					<div title={props.address}>{props.address}</div>
				</Request>
				<Visual>
					{_renderVisual()}
				</Visual>
				<DetailedView>
					{props.sellerName ? <Item title={strings.seller}><span title={props.sellerName}>{props.sellerName}</span></Item> : null}
					{typeof props.amount.received === 'number' ? <Fragment>
						<Item title={strings.receivedAmount}>{padDigits(props.amount.received, props.decimalPlaces)} {props.symbol}</Item>
						<Item title={strings.remainingAmount}>{padDigits(remainingAmount, props.decimalPlaces)} {props.symbol}</Item>
					</Fragment> : null}
					{props.deadline && remainingAmount > 0 ? <Item title={strings.deadline}>
						{new Intl.DateTimeFormat(props.deadline.dateLocale ?? 'en-US').format(props.deadline.datetime)}
						{props.deadline.humanized && <span>&nbsp;({_getFromDate(props.deadline.datetime)})</span>}
					</Item> : null}
					{props.transactions?.length ? <Item title={strings.transactions.replace('{txAmount}', props.transactions.length.toString())}>
						<TransactionList>
							{props.transactions.map((transaction, index) => (
								<li key={index}>
									<a href={transaction.txUrl} title="Transaction" rel="noreferrer" target="_blank">
										{shortenHash(transaction.txHash, 3)}
									</a>
									<i>({padDigits(transaction.amount, props.decimalPlaces)} {props.symbol})</i>
								</li>
							))}
						</TransactionList>
					</Item> : null}
					<Item title={strings.status}>
						{(props.waitAnimation && props.status === PaymentStatus.PENDING) && <Spinner />}
						<AdaptiveSpan showTitle text={_getStatus()} style='bold' />
					</Item>
				</DetailedView>
			</div>
			<div>
				{props.onCancel && <CancelButton onClick={props.onCancel}>{strings.cancel}</CancelButton>}
				{props.helpUrl && <HelpLink href={props.helpUrl} title={strings.help} target="blank">
					<Icon type={IconType.HelpCircleO} style={{ width: 13, lineHeight: '15px' }} />{strings.help}
				</HelpLink>}
			</div>
		</Container>
	);
};

PaymentRequest.defaultProps = defaultProps;

export { PaymentRequest };