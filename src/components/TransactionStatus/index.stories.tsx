import React, { Fragment, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { TransactionStatus } from '../TransactionStatus';
import { IAdress } from './interfaces';
import { TxStatus } from './txStatus';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const txCompleted = require('../../assets/txstatus-completed.jpg');

export default {
  title: 'Components/TransactionStatus',
};

const Spacer = styled.div`
  margin: 10px 0 10px 0;
`;

export const Basic = (): React.ReactNode => {
  return (
    <TransactionStatus
      status={TxStatus.COMPLETED}
      amount='0.1'
      symbol='BTC'
      txURL='https://www.blockchain.com/btc/tx/369d241af595fc253479abe394e2f21fda05820a0416942f63266dd793035cf1'
    />
  );
};

export const Statuses = (): React.ReactNode => (
  <Fragment>
    <Spacer>
      <TransactionStatus
        amount='0.1'
        symbol='BTC'
        txURL='https://www.blockchain.com/btc/tx/369d241af595fc253479abe394e2f21fda05820a0416942f63266dd793035cf1'
      />
    </Spacer>
    <Spacer>
      <TransactionStatus
        amount='0.1'
        symbol='BTC'
        status={TxStatus.PENDING}
        txURL='https://www.blockchain.com/btc/tx/369d241af595fc253479abe394e2f21fda05820a0416942f63266dd793035cf1'
      />
    </Spacer>
    <Spacer>
      <TransactionStatus
        amount='0.1'
        symbol='BTC'
        status={TxStatus.COMPLETED}
        txURL='https://www.blockchain.com/btc/tx/369d241af595fc253479abe394e2f21fda05820a0416942f63266dd793035cf1'
      />
    </Spacer>
    <Spacer>
      <TransactionStatus
        amount='0.1'
        symbol='BTC'
        status={TxStatus.FAILED}
        txURL='https://www.blockchain.com/btc/tx/369d241af595fc253479abe394e2f21fda05820a0416942f63266dd793035cf1'
      />
    </Spacer>
  </Fragment>
);

export const TransactionDetails = (): React.ReactNode => {
  return (
    <TransactionStatus
      amount='0.1'
      symbol='BTC'
      txFees='0.0001'
      date={{
        value: new Date(),
      }}
      sender={{
        hash: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        url: 'https://www.blockchain.com/btc/address/1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      }}
      receiver={{
        hash: '1CounterpartyXXXXXXXXXXXXXXXUWLpVr',
      }}
      customDetailComponent={<b>Hello, this is a custom component!</b>}
      txURL='https://www.blockchain.com/btc/tx/369d241af595fc253479abe394e2f21fda05820a0416942f63266dd793035cf1'
    />
  );
};

export const Animated = (): React.ReactNode => (
  <Fragment>
    <Spacer>
      <TransactionStatus
        animated
        amount='0.1'
        symbol='BTC'
        status={TxStatus.PENDING}
        txURL='https://www.blockchain.com/btc/tx/369d241af595fc253479abe394e2f21fda05820a0416942f63266dd793035cf1'
      />
    </Spacer>
    <Spacer>
      <TransactionStatus
        animated
        amount='0.1'
        symbol='BTC'
        status={TxStatus.UNKNOWN}
        txURL='https://www.blockchain.com/btc/tx/369d241af595fc253479abe394e2f21fda05820a0416942f63266dd793035cf1'
      />
    </Spacer>
    <Spacer>
      <TransactionStatus
        animated
        amount='0.1'
        symbol='BTC'
        status={TxStatus.COMPLETED}
        txURL='https://www.blockchain.com/btc/tx/369d241af595fc253479abe394e2f21fda05820a0416942f63266dd793035cf1'
      />
    </Spacer>
    <Spacer>
      <TransactionStatus
        animated
        amount='0.1'
        symbol='BTC'
        status={TxStatus.FAILED}
        txURL='https://www.blockchain.com/btc/tx/369d241af595fc253479abe394e2f21fda05820a0416942f63266dd793035cf1'
      />
    </Spacer>
  </Fragment>
);

export const Simulation: React.FC = () => {
  interface ITransaction {
    sender: IAdress;
    receiver: IAdress;
  }

  const timer = useRef<NodeJS.Timeout>();

  const [status, setStatus] = useState<TxStatus>(TxStatus.PENDING);
  const [tx, setTx] = useState<Partial<ITransaction>>({});
  const [isInit, setIsInit] = useState<boolean>(false);
  const [txURL, setTxURL] = useState<string>();

  const _clearTimeout = () => timer.current && clearInterval(timer.current);
  const _delay = (delay: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, delay));

  useEffect(() => {
    return () => _clearTimeout();
  }, []);

  const runSimulation = (): void => {
    _clearTimeout();

    _delay(3 * 1000)
      .then(() =>
        setTxURL(
          'https://www.blockchain.com/btc/tx/369d241af595fc253479abe394e2f21fda05820a0416942f63266dd793035cf1'
        )
      )

      // wait 5s before completing that transaction
      .then(() => _delay(5 * 1000))
      .then(() => setStatus(TxStatus.COMPLETED))

      // let's say, tx infos need to be fetched before being able to render them
      .then(() => _delay(1.5 * 1000))
      .then(() =>
        setTx({
          ...tx,
          ...{
            sender: {
              hash: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
              url: 'https://www.blockchain.com/btc/address/1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
            },
            receiver: {
              hash: '1CounterpartyXXXXXXXXXXXXXXXUWLpVr',
              url: 'https://www.blockchain.com/btc/address/1CounterpartyXXXXXXXXXXXXXXXUWLpVr',
            },
            txFees: '0.0001',
            customDetailComponent: (
              <img src={txCompleted} alt='Custom component' style={{ width: '100%' }} />
            ),
          },
        })
      );
  };

  const _handleReset = (): void => {
    setTx({});
    setStatus(TxStatus.PENDING);
    runSimulation();
  };

  const _handleInit = (): void => {
    setIsInit(true);
    runSimulation();
  };

  if (!isInit) {
    return <button onClick={_handleInit}>Begin transaction</button>;
  }

  return (
    <Spacer>
      <TransactionStatus
        animated
        autoShowDetails
        amount='0.1'
        symbol='BTC'
        status={status}
        txURL={txURL}
        date={{
          value: new Date(),
        }}
        {...tx}
      />
      <button style={{ marginTop: '10px' }} onClick={_handleReset}>
        Reset
      </button>
      <i style={{ display: 'block', fontSize: '12px', marginTop: '10px' }}>
        <p>
          In this example, <u>autoShowDetails</u> property is added. <br />
          When the component will receive props, it will automatically expand the card. This is
          fully optional.
        </p>
      </i>
    </Spacer>
  );
};
