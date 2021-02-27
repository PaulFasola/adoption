import React from 'react';
import { storiesOf } from '@storybook/react';
import { TransactionStatus } from '.';

storiesOf('Transaction Status', module)
  .add('Default', () => <TransactionStatus />);
