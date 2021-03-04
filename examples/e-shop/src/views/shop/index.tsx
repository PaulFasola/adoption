import React from "react"
import { Grid, makeStyles } from "@material-ui/core"
import { PaymentRequest } from 'adoption';

const useStyles = makeStyles((theme) => ({}));

export const Shop: React.FC = () => {
	const styles = useStyles();

	return (
		<>
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="center"
			>
				<PaymentRequest
					symbol='BTC'
					decimalPlaces={8}
					logos={{
						coin: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Bitcoin_logo.svg"
					}}
					address="1BitcoinEaterAddressDontSendf59kuE"
					amount={{ toPay: 0.9 }}
				/>
			</Grid>
		</>
	)
}