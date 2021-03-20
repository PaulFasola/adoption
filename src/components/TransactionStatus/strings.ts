import { TxStatus } from '.';

export interface IStrings {
  fees: string;
  status: string;
  statuses: Record<TxStatus, string>;
}

export const defaultStrings: IStrings = {
  fees: '(fees)',
  status: 'Status',
  statuses: {
    completed: 'completed',
    pending: 'pending',
    unknown: 'unknown',
    failed: 'failed',
  },
};
