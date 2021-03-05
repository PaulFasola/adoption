import styled, { css, FlattenSimpleInterpolation } from "styled-components";
import { infiniteProgress, finiteProgress } from "../common/animations";
import { defaultColorMap } from "./defaultProps";
import { TxStatus } from "./txStatus";

export interface IStyleProps {
	animate?: TxStatus | null;
	backgroundColor?: string;
	clickable?: boolean;
	hasDate?: boolean;
	showDetails?: boolean;
	showSide?: boolean;
}

interface SP extends IStyleProps { };

export const Container = styled.div`
	position: relative;
	width: 100%;
	max-width: 375px;
    max-height: 50px;
    text-align: left;
    box-shadow: 0 12px 28px rgb(0 0 0 / 10%);
	background-color: #fff;
    border-radius: 3px;
    font-size: 12px;
    overflow: hidden;
	transition: max-height .4s;

	${(p: SP) => p.hasDate && `
    	max-height: 60px;
	`}

	${(p: SP) => p.showDetails && `
		max-height: 500px;
	`}
`;

export const IconWrapper = styled.div`
	display: inline-block;
	width: 25px;
	float: right;
	${(p: SP) => p.clickable && `
		cursor: pointer;
	`}
`;

export const Row = styled.div`
	display: grid;
	grid-template-columns: 5fr 5fr;

	${(p: SP) => p.showSide && `
		grid-template-columns: 4fr 4fr 2fr;
	`}
`;

export const Amount = styled.div`
	padding: 0 10px 0 10px;
	display: inline-block;
	margin-right: 5px;

	h1, p {
		display: inline-block;
	}

	h1{
		margin: 10px 3px 15px 0;
	}
`;

export const Date = styled.div`
	font-size: 10px;
	position: absolute;
	bottom: -4px;
	width: 100%;
	height: 20px;
	color: rgba(0, 0, 0, 0.5);
	background-color: #fff;

	> span {
		margin: 0 15px 0 10px;
	}
`;

export const Status = styled.div`
	width: 60%;
    align-self: center;
	font-size: 14px;
    margin-top: 5px;
`;

export const Side = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	align-items: center;

	div:not(:first-of-type) {
		margin: 0 0 0 10px;
	}

	&:after {
		content: '';
		height: 50%;
		width: 1.3px;
		left: 0;
		position: absolute;
		background-color: rgba(0, 0, 0, 0.2);
	  }
`;

// # StatusBar start
const _pendingAnim = (bgColor?: string) => css`
	transition: width .3s linear;
	&:before {
		content: '';
		display: block;
		position: absolute;
		background-color: ${bgColor};
		top: 0;
		left: 0;
		bottom: 0;
		animation: ${infiniteProgress} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
	}
`;

const _finiteAnim = (bgColor?: string) => css`
	transition: width .3s linear;
	&:before {
		content: '';
		display: block;
		position: absolute;
		background-color: ${bgColor};
		top: 0;
		left: 0;
		bottom: 0;
		animation: ${finiteProgress} 0.8s linear 0s 1 normal forwards;
	}
`;

const _getAnimation = (animation?: string | null, bgColor?: string | null): FlattenSimpleInterpolation | null => {
	switch (animation) {
		case TxStatus.FAILED:
		case TxStatus.UNKNOWN:
		case TxStatus.COMPLETED:
			return _finiteAnim(bgColor ?? defaultColorMap[animation]);
		case TxStatus.PENDING: return _pendingAnim(bgColor ?? 'lightblue');
		default: return null;
	}
}

export const StatusBar = styled.div`
	width: 100%;
	height: 5px;
	background-color: ${(p: SP) => !p.animate ? p.backgroundColor : null};
	position: absolute;
    overflow: hidden;
	top: 0;

	${(p: IStyleProps) => _getAnimation(p.animate, p.backgroundColor)}
`;
// # StatusBar end

// # DetailedView start
export const DetailedView = styled.div`
	  padding: 10px;
	  min-height: 30px;
	  margin-bottom: 15px;
`;

export const Trajectory = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	div {
		display: inline-block;
	}
`;

export const Arrow = styled.div`
	color: rgba(0, 0, 0, 0.6);
	transform: rotate( 45deg );
	width: 0;
	height: 0;
	border: 5px solid transparent;
	border-top: 5px solid;
	border-right: 5px solid;
	margin: 3px 15px 15px 10px;
`;

export const TxFees = styled.div`
	  text-align: center;
`;

export const CustomComponent = styled.div`
	overflow: auto;
	max-width: 100%;
	margin-top: 10px;
`;
// # DetailedView end