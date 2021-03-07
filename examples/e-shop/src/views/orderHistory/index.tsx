import React from 'react';
import { Grid, withStyles, makeStyles } from '@material-ui/core';
import { TransactionStatus } from 'adoption';
import { useRecoilState } from 'recoil';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { PetsRounded } from '@material-ui/icons';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IOrder } from './IOrder';
import { orderHistoryState } from '../../atoms';

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
    display: 'flex',
    justifyContent: 'center',
    minWidth: '350px',
  },
});

export const OrderHistory: React.FC = () => {
  const [orderHistory] = useRecoilState<IOrder[]>(orderHistoryState);
  const classes = useStyles();

  return (
    <>
      <Grid container direction='row' justify='center' alignItems='center'>
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
              {orderHistory.map((row, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell component='th' scope='row'>
                    <ul>
                      {row.articles.map((name, i) => (
                        <li key={i}>
                          <PetsRounded fontSize={'small'} />
                          {name}
                        </li>
                      ))}
                    </ul>
                  </StyledTableCell>
                  <StyledTableCell>{row.shippingTo}</StyledTableCell>
                  <StyledTableCell>{row.date}</StyledTableCell>
                  <StyledTableCell>
                    {row.status === 'pending' && (
                      <p>
                        Send your payment at:
                        <br />
                        {row.paymentAddress}
                      </p>
                    )}
                    {row.comment}
                  </StyledTableCell>
                  <StyledTableCell className={classes.txCell}>
                    <TransactionStatus
                      animated
                      symbol='WOOF'
                      amount={row.cost.toString()}
                      status={row.status}
                      date={{
                        value: new Date(row.date),
                      }}
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
