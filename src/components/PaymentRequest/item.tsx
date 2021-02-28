import React from 'react';
import styled from 'styled-components';

interface IProps {
	title: string;
}

const Container = styled.div`
	padding: 4px 0;
	display: flex;
	align-items: baseline;
`;

const Title = styled.div`
	display: inline-block;
	width: 50%;
	padding-right: 8px;
	box-sizing: border-box;
	vertical-align: top;
	font-size: 12px;
	opacity: .6;
	text-align: right;

	@media only screen and (max-width: 480px) {
		padding-right: 2px;
	}
`;

const Value = styled.div`
	display: inline-block;
	padding-left: 8px;
	width: 50%;
	box-sizing: border-box;

	@media only screen and (max-width: 480px) {
		padding-left: 2px;
	}
`;


export const Item: React.FC<IProps> = ({ title, children }) => {
	return (
		<Container>
			<Title>{title}:</Title>
			<Value>{children}</Value>
		</Container>
	);
};