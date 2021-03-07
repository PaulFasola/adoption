import React from 'react';
import { useRecoilState } from 'recoil';
import { useHistory } from 'react-router';
import { PaymentRequest, TxStatus } from 'adoption';
import { Button } from '@material-ui/core';
import { IOrder } from '../../views/orderHistory/IOrder';
import { IArticle } from '../../components/articleCard/IArticle';
import { basketState, orderHistoryState } from '../../atoms';

// Logos
import coinLogo from '../../assets/woofLogo.jpg';
import companyLogo from '../../assets/companyLogo.png';

const PAYMENT_ADDRESS = '1WoofEaterAddressDontSendf59kuE';

export const PaymentProcess: React.FC = () => {
  const [orderHistory, setOrderHistory] = useRecoilState<IOrder[]>(orderHistoryState);
  const [basket, setBasket] = useRecoilState<IArticle[]>(basketState);

  const history = useHistory();

  const toPay = basket
    .map((o) => o.price)
    .reduce((a, b) => {
      return a + b;
    });

  const articles = basket.map((o) => o.label);

  const _handleSkip = (): void => {
    // Skipping will empty the basket and store the order so that it can be visible in the order history

    setBasket([]);

    setOrderHistory([
      ...orderHistory,
      {
        articles,
        status: TxStatus.PENDING,
        paymentAddress: PAYMENT_ADDRESS,
        shippingTo: 'Somewhere, on Earth',
        date: new Date(),
        cost: toPay,
      },
    ]);

    history.push('/orderHistory');
  };

  return (
    <>
      <PaymentRequest
        symbol='WOOF'
        decimalPlaces={8}
        logos={{
          coin: coinLogo,
          company: companyLogo,
        }}
        address={PAYMENT_ADDRESS}
        amount={{ toPay }}
      />
      <Button
        disabled={basket.length === 0}
        variant='contained'
        color='default'
        size='large'
        onClick={_handleSkip}
      >
        Checkout ({basket.length})
      </Button>
    </>
  );
};
