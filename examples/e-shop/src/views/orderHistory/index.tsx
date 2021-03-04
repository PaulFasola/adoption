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

	function createData(name, calories, fat, carbs, protein) {
		return { name, calories, fat, carbs, protein };
	}

	const rows = [
		createData('Frozen yoghurt', 159, 6.0, 24, 4.0)
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
								<StyledTableRow key={row.name}>
									<StyledTableCell component="th" scope="row">
										{row.name}
									</StyledTableCell>
									<StyledTableCell align="right">{row.fat}</StyledTableCell>
									<StyledTableCell align="right">{row.carbs}</StyledTableCell>
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