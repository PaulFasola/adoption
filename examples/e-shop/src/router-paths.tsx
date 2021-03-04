import React from "react";
import { Donate } from "./views/donate/ìndex";
import { OrderHistory } from "./views/orderHistory";
import { Shop } from "./views/shop";

export enum Path {
	Index = '/',
	OrderHistory = '/orderhistory',
	Donate = '/donate'
}

export const routeMap: Record<Path, React.ReactNode> = {
	'/': <Shop />,
	'/orderhistory': <OrderHistory />,
	'/donate': <Donate />
}