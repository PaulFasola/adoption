import { PaymentStatus } from "./enums/paymentStatus";
import { IProps, IStrings } from "./interfaces";

export const defaultStrings: IStrings = {
	request: 'Please send {amount} {symbol} to address:',
	status: 'Current status',
	seller: 'Merchant',
	txStatus: {
		complete: 'Payment complete',
		pending: 'Waiting for payment',
		failed: 'Payment failed'
	},
	cancel: 'Cancel',
	help: 'Need help? Click here!',
	deadline: 'Send before',
	receivedAmount: 'Amount received',
	remainingAmount: 'Amount remaining',
	transactions: 'Transactions ({txAmount})'
}

export const defaultProps: Partial<IProps> = {
	symbol: 'BTC',
	status: PaymentStatus.PENDING,
	showQRCode: true
}