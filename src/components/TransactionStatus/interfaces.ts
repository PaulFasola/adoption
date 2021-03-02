import { TxStatus } from "./txStatus";

export interface IProps {
	amount: string;
	symbol: string;
	status?: TxStatus;
	animated?: boolean;
	txURL?: string;
	colorMap?: Record<TxStatus, string>;
	uncapitalizeStatus?: boolean;
	autoShowDetails?: boolean;

	// TxDetails
	sender?: IAdress;
	receiver?: IAdress;
	txFees?: string;
	customDetailComponent?: React.ReactNode;
}

export interface IAdress {
	hash: string;
	url?: string;
}