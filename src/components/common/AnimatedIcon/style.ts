import styled from "styled-components";
import { stroke } from "../animations";

export const Circle = styled.circle`
	stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 2;
    stroke-miterlimit: 10;
    stroke: #4bb71b;
    fill: #fff;
	animation: ${stroke} 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
`;

export const Container = styled.svg`
	width: 100px;
	height: 100px;
	display: block;
	position:relative;
	margin: 0 auto;
`;

export const CheckMark = styled.path`
	stroke-width: 2;
	stroke-miterlimit: 10;
	box-shadow: inset 0px 0px 0px #4bb71b;
	border-radius: 50%;
	stroke: #4bb71b;
	transform-origin: 50% 50%;
	stroke-dasharray: 48;
	stroke-dashoffset: 48;
	animation: ${stroke} 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
`;

export const Times = styled.g`
	path {
		stroke-width: 2;
		stroke: #4bb71b;
		stroke-dasharray: 48;
		stroke-dashoffset: 48;
		transform-origin: 50% 50% 0;
		animation: 0.3s ease 0.8s normal forwards 1 running ${stroke};
	}
`;

export const IconContainer = styled.div`
	display: inline-block;
    vertical-align: middle;
`;