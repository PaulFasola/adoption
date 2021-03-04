import React from "react"
import { Grid, withStyles, makeStyles } from "@material-ui/core"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TransactionStatus, TxStatus } from "adoption";

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
	centeredContent: {
		display: 'flex',
		justifyContent: 'center',
	}
});

export const OrderHistory: React.FC = () => {
	const classes = useStyles();

	const rows = [
		{ item: 'Dog portrait #5', shippingTo: 'Earth', date: new Date() }
	];

	return (
		<>
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="center"
			>
				<TableContainer component={Paper}>
					<Table className={classes.table} aria-label="customized table">
						<TableHead>
							<TableRow>
								<StyledTableCell align="right">Order</StyledTableCell>
								<StyledTableCell align="right">Shipping to</StyledTableCell>
								<StyledTableCell align="right">Date</StyledTableCell>
								<StyledTableCell />
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<StyledTableRow key={row.item}>
									<StyledTableCell component="th" scope="row">
										{row.item}
									</StyledTableCell>
									<StyledTableCell align="right">{row.shippingTo}</StyledTableCell>
									<StyledTableCell align="right">{row.date}</StyledTableCell>
									<StyledTableCell align="right" className={classes.centeredContent}>
										<TransactionStatus
											symbol="ADOP"
											amount={"0.8"}
											status={TxStatus.COMPLETED}
											date={{
												value: new Date()
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
	)
}