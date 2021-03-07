import React from 'react';

import { makeStyles, Button } from '@material-ui/core';
import { ShoppingBasket } from '@material-ui/icons';
import { useRecoilState } from 'recoil';
import { basketState, modalState } from '../../atoms';
import { IArticle } from '../../components/articleCard/IArticle';

export const Basket: React.FC = () => {
  const [_, setIsModalOpen] = useRecoilState<boolean>(modalState);
  const [basket] = useRecoilState<IArticle[]>(basketState);

  const useStyles = makeStyles((theme) => ({
    modal: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
    button: { margin: theme.spacing(1) },
  }));

  const styles = useStyles();

  return (
    <Button
      disabled={basket.length === 0}
      variant='contained'
      color='default'
      size='large'
      className={styles.button}
      startIcon={<ShoppingBasket />}
      onClick={(): void => setIsModalOpen(true)}
    >
      Checkout ({basket.length})
    </Button>
  );
};
