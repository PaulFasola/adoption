import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useHistory } from 'react-router';
import { PaymentRequest, TxStatus } from 'adoption';
import { Button, makeStyles } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { IOrder } from '../../views/orderHistory/IOrder';
import { IArticle } from '../../components/articleCard/IArticle';
import { basketState, modalState, orderHistoryState } from '../../atoms';
import { constants } from '../../../constants';

const PAYMENT_ADDRESS = '1EaterAddressDontSendf59kuE';

interface IBasketInfos {
  toPay: number;
  articles: string[];
}

const defaultBasketInfos: IBasketInfos = {
  articles: [],
  toPay: 0,
};

const useStyles = makeStyles(() => ({
  centered: { display: 'flex', placeContent: 'center', marginTop: '15px' },
  skipButton: { display: 'block', margin: '15px auto' },
}));

export const PaymentProcess: React.FC = () => {
  const [orderHistory, setOrderHistory] = useRecoilState<IOrder[]>(orderHistoryState);
  const [basket, setBasket] = useRecoilState<IArticle[]>(basketState);
  const [_, setIsModalOpen] = useRecoilState<boolean>(modalState);
  const [basketInfos, setBasketInfos] = useState<IBasketInfos>(defaultBasketInfos);

  const history = useHistory();
  const styles = useStyles();

  useEffect(() => {
    if (basket.length === 0) {
      setBasketInfos(defaultBasketInfos);
      return;
    }

    setBasketInfos({
      articles: basket.map((o) => o.label),
      toPay: basket
        .map((o) => o.price)
        .reduce((a, b) => {
          return a + b;
        }),
    });
  }, [basket]);

  const { articles, toPay } = basketInfos;

  const _handleSkip = (): void => {
    // Skipping will empty the basket and store the order so that it can be visible in the order history
    setIsModalOpen(false);

    setBasket([]);

    setOrderHistory([
      ...orderHistory,
      {
        articles,
        status: TxStatus.PENDING,
        paymentAddress: PAYMENT_ADDRESS,
        shippingTo: 'Somewhere, on Earth',
        date: new Date().toUTCString(),
        cost: toPay,
      },
    ]);

    history.push('/orderHistory');
  };

  const columns = [
    { field: 'id', headerName: 'ID', hide: true },
    {
      field: 'image',
      headerName: 'Article',
      // eslint-disable-next-line react/display-name
      renderCell: (params: any): React.ReactElement => (
        <img style={{ width: 100 }} src={params.row.image} alt={params.row.label} />
      ),
    },
    { field: 'label', width: 200, headerName: 'First name' },
    {
      field: 'price',
      headerName: `Price`,
      width: 100,
      valueGetter: (params: any) => `${params.row.price.toString()} ${constants.coin}`,
    },
  ];

  const rows = basket.map((item, i) => ({ ...item, id: i }));

  return (
    <>
      <div style={{ width: '100%' }}>
        <DataGrid autoHeight rows={rows} columns={columns} pageSize={4} />
      </div>

      <div className={styles.centered}>
        <PaymentRequest
          symbol={constants.coin}
          decimalPlaces={8}
          logos={{ coin: constants.assets.coin, company: constants.assets.company }}
          address={PAYMENT_ADDRESS}
          amount={{ toPay }}
        />
      </div>

      <Button
        className={styles.skipButton}
        disabled={basket.length === 0}
        variant='contained'
        color='primary'
        size='medium'
        onClick={_handleSkip}
      >
        I&apos;ll pay later
      </Button>
    </>
  );
};
