import { IProps } from './interfaces';
import { TxStatus } from './txStatus';

export const defaultColorMap: Record<TxStatus, string> = {
	completed: '#f08a5d',
	pending: 'deepskyblue',
	unknown: 'grey',
	failed: 'red'
}

export const defaultProps: Partial<IProps> = {
	date: {
		locale: 'en-US',
		options: {
			day: 'numeric',
			month: 'numeric',
			hour: 'numeric',
			minute: 'numeric'
		}
	}
}