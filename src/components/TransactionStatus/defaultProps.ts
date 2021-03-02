import { TxStatus } from './txStatus';

export const defaultColorMap: Record<TxStatus, string> = {
	completed: '#f08a5d',
	pending: 'deepskyblue',
	unknown: 'grey',
	failed: 'red'
}