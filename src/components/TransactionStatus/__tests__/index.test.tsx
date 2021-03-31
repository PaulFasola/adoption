import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import { advanceTo, clear } from 'jest-date-mock';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { configure, shallow } from 'enzyme';
import { TxStatus } from '../txStatus';
import { TransactionStatus } from '..';

import 'jest-styled-components';

expect.extend(toHaveNoViolations);
configure({ adapter: new Adapter() });

describe('TransactionStatus component', () => {
  it('should render', () => {
    shallow(<TransactionStatus amount='0.0001' symbol='BTC' status={TxStatus.PENDING} />);
  });

  it('should render the tx date, when provided', () => {
    advanceTo(new Date(2009, 1, 3, 0, 0, 0));
    const wrapper = shallow(
      <TransactionStatus
        amount='0.0001'
        symbol='BTC'
        status={TxStatus.PENDING}
        date={{ value: new Date() }}
      />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
    clear();
  });

  it('should render a date in the specified locale', () => {
    advanceTo(new Date(2009, 1, 3, 0, 0, 0));
    const wrapper = shallow(
      <TransactionStatus
        amount='0.0001'
        symbol='BTC'
        status={TxStatus.PENDING}
        date={{ value: new Date(), locale: 'fr-FR' }}
      />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
    clear();
  });

  const ComplexTx = (
    <TransactionStatus
      animated
      autoShowDetails
      amount='0.1'
      symbol='BTC'
      status={TxStatus.COMPLETED}
      txURL='https://www.blockchain.com/btc/tx/369d241af595fc253479abe394e2f21fda05820a0416942f63266dd793035cf1'
      txFees='0.005'
      sender={{
        hash: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        url: 'https://www.blockchain.com/btc/address/1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      }}
      receiver={{
        hash: '1CounterpartyXXXXXXXXXXXXXXXUWLpVr',
        url: 'https://www.blockchain.com/btc/address/1CounterpartyXXXXXXXXXXXXXXXUWLpVr',
      }}
      date={{
        value: new Date(2009, 0, 9, 10, 42),
      }}
    />
  );

  it('should render a complex form', () => {
    const wrapper = shallow(ComplexTx);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should not have any accessibility issues', async () => {
    const { container } = render(ComplexTx);

    expect(await axe(container)).toHaveNoViolations();
  });
});
