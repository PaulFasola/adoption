export interface IProps {
	address: string;
	symbol: string;
	amount: {
		toPay: number;
		received?: number;
	}
	logos: {
		coin: string;
		company?: string;
	};
	decimalPlaces: number;
	waitAnimation?: boolean;
	sellerName?: string;
	strings?: Partial<IStrings>;
	onCancel?: () => void;
	helpUrl?: string;
	status?: string;
	showQRCode?: boolean;
	transactions?: ITransaction[];
	deadline?: {
		dateLocale?: string;
		datetime: Date;
		humanized?: boolean;
	};
}

export interface IStrings {
	request: string;
	cancel: string;
	seller: string;
	status: string;
	help: string;
	completed: string;
	deadline: string;
	receivedAmount: string;
	remainingAmount: string;
	transactions: string;
}

export interface ITransaction {
	txHash: string;
	txUrl: string;
	amount: number;
}