import React from "react"
import { Grid, makeStyles, Modal, Button } from "@material-ui/core";
import { ShoppingBasket } from "@material-ui/icons";
import { PaymentRequest } from 'adoption';
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
	modal: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
	button: { margin: theme.spacing(1) }
}));

export const Shop: React.FC = () => {
	const [open, setOpen] = useState<boolean>(false);
	const styles = useStyles();

	const _toggleModal = (): void => setOpen(!open);

	return (
		<>
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="center"
			>
				<Button
					variant="contained"
					color="primary"
					size="large"
					className={styles.button}
					startIcon={<ShoppingBasket />}
					onClick={_toggleModal}
				>
					Checkout
      			</Button>
			</Grid>
			<Modal
				className={styles.modal}
				open={open}
				onClose={_toggleModal}
				aria-labelledby="Checkout Modal"
				aria-describedby="Proceed to checkout, prepare your cryptos!"
			>
				<div>
					<PaymentRequest
						symbol='BTC'
						decimalPlaces={8}
						logos={{
							coin: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Bitcoin_logo.svg"
						}}
						address="1BitcoinEaterAddressDontSendf59kuE"
						amount={{ toPay: 0.9 }}
					/>
				</div>
			</Modal>
		</>
	)
}