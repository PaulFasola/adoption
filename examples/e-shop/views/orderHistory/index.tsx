import React, { useEffect, useState } from 'react';
import { Grid, withStyles, makeStyles } from '@material-ui/core';
import { TransactionStatus } from 'adoption';
import { useRecoilState } from 'recoil';

import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { PetsRounded } from '@material-ui/icons';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';

import { orderHistoryState, headerState, basketState } from '../../atoms';
import { constants } from '../../constants';
import { IArticle } from '../../components/articleCard/IArticle';
import { Basket } from '../../components/basket';
import { IOrder } from './IOrder';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  txCell: {
    minWidth: '400px',
  },
  container: {
    marginTop: '20px',
  },
});

export const OrderHistory: React.FC = () => {
  const [orderHistory] = useRecoilState<IOrder[]>(orderHistoryState);
  const [sortedOrders, setSortedOrders] = useState<IOrder[]>([]);
  const [_, setHeader] = useRecoilState(headerState);
  const [basket] = useRecoilState<IArticle[]>(basketState);

  const classes = useStyles();

  useEffect(() => {
    setHeader({
      title: 'Da great doggo portraits shop',
      sideComponent: <Basket />,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basket]);

  useEffect(() => {
    setSortedOrders(
      [...orderHistory].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      })
    );
  }, [orderHistory]);

  return (
    <>
      <Grid
        className={classes.container}
        container
        direction='row'
        justify='center'
        alignItems='center'
      >
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label='customized table'>
            <TableHead>
              <TableRow>
                <StyledTableCell>Order</StyledTableCell>
                <StyledTableCell>Shipping to</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Comments</StyledTableCell>
                <StyledTableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedOrders.map((row, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell component='th' scope='row'>
                    <ul>
                      {row.articles.map((name, i) => (
                        <li key={i}>
                          <PetsRounded fontSize={'small'} />
                          &nbsp;{name}
                        </li>
                      ))}
                    </ul>
                  </StyledTableCell>
                  <StyledTableCell>{row.shippingTo}</StyledTableCell>
                  <StyledTableCell>{row.date}</StyledTableCell>
                  <StyledTableCell>
                    {row.status === 'pending' && (
                      <p>
                        Send your payment to:
                        <br />
                        {row.paymentAddress}
                      </p>
                    )}
                    {row.comment}
                  </StyledTableCell>
                  <StyledTableCell className={classes.txCell}>
                    <TransactionStatus
                      animated={row.status === 'pending'}
                      symbol={constants.coin}
                      amount={row.cost.toString()}
                      status={row.status}
                      txFees={row.txFees}
                      txURL={row.txURL}
                      receiver={row.receiver}
                      sender={row.sender}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};
