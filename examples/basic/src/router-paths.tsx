import React from "react";
import { useHistory } from "react-router-dom";
import { OrderHistory } from "./views/orderHistory";
import { Shop } from "./views/shop";

export enum Path {
	Index = '/',
	OrderHistory = '/orderhistory'
}

export const routeMap: Record<Path, React.ReactNode> = {
	'/': <Shop />,
	'/orderhistory': <OrderHistory />
}