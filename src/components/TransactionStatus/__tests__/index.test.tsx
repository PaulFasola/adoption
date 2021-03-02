import React from 'react';
import { TransactionStatus } from '..';
import { render } from '@testing-library/react';
import { TxStatus } from '../txStatus';

describe('TransactionStatus Component', () => {
  it('TransactionStatus renders', () => {
    const button = render(<TransactionStatus amount="0.0001" symbol="BTC" status={TxStatus.PENDING} />);
    expect(button.container.querySelector('div')).toBeTruthy();
  });
});