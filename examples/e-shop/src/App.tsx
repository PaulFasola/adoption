import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { makeStyles } from '@material-ui/core';
import { Modal } from '@material-ui/core';
import { hot } from 'react-hot-loader';
import { Container } from '@material-ui/core';
import { PaymentProcess } from './components/paymentProcess';
import { Header } from './components/header';
import { constants } from '../constants';
import { routeMap } from './router-paths';
import { modalState } from './atoms';

import './style.scss';

const useStyles = makeStyles(() => ({
  container: { marginTop: '10px' },
  modal: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
  modalBody: { backgroundColor: 'white', padding: '50px', width: '30%' },
}));

export const App = hot(module)(() => {
  const [isModalOpen, setIsModalOpen] = useRecoilState<boolean>(modalState);
  const styles = useStyles();

  return (
    <BrowserRouter>
      <Header />
      <Container className={styles.container}>
        <Switch>
          {Object.entries(routeMap).map(([path, component], index) => (
            <Route exact path={path} key={index.toString()}>
              {component}
            </Route>
          ))}
        </Switch>

        <Modal
          className={styles.modal}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          aria-labelledby='Checkout Modal'
          aria-describedby={`Proceed to checkout, prepare your ${constants.coin}!`}
        >
          <div className={styles.modalBody}>
            <PaymentProcess />
          </div>
        </Modal>
      </Container>
    </BrowserRouter>
  );
});
