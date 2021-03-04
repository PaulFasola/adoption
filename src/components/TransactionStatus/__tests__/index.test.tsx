import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { configure, shallow } from 'enzyme';
import { TxStatus } from '../txStatus';
import { TransactionStatus } from '..';

expect.extend(toHaveNoViolations);
configure({ adapter: new Adapter() });

describe('TransactionStatus component', () => {
  it('should render', () => {
    shallow(<TransactionStatus amount="0.0001" symbol="BTC" status={TxStatus.PENDING} />)
  });

  const ComplexTx = (<TransactionStatus
    date={{
      value: new Date(2009, 0, 9, 10, 42)
    }}
    animated
    autoShowDetails
    amount="0.1"
    symbol="BTC"
    status={TxStatus.COMPLETED}
    txURL="https://www.blockchain.com/btc/tx/369d241af595fc253479abe394e2f21fda05820a0416942f63266dd793035cf1"
    txFees="0.005"
    sender={{
      hash: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      url: "https://www.blockchain.com/btc/address/1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
    }}
    receiver={{
      hash: "1CounterpartyXXXXXXXXXXXXXXXUWLpVr",
      url: "https://www.blockchain.com/btc/address/1CounterpartyXXXXXXXXXXXXXXXUWLpVr"
    }}
  />);

  it('should render a complex form', () => {
    const wrapper = shallow(ComplexTx);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should not have any accessibility issues', async () => {
    const { container } = render(ComplexTx);
    expect(await axe(container)).toHaveNoViolations();
  });
});