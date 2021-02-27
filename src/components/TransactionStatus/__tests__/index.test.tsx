import React from 'react';
import { TransactionStatus } from '..';
import { render } from '@testing-library/react';

describe('TransactionStatus Component', () => {
  it('TransactionStatus renders', () => {
    const button = render(<TransactionStatus />);
    expect(button.container.querySelector('div')).toBeTruthy();
  });
});