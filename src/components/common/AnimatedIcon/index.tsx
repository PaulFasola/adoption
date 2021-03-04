import React from 'react';
import { CheckMark, Circle, Container, IconContainer, Times } from './style';

export enum IconType {
	Sucess = 'success',
	Failure = 'failure'
}

interface IProps {
	type: IconType
	style?: React.CSSProperties;
}

export const AnimatedIcon: React.FC<IProps> = ({ type, style }: IProps) => {
	const successCircle: React.ReactNode = (
		<Container xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
			<Circle cx="26" cy="26" r="25" fill="none" />
			<CheckMark fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
		</Container>
	);

	const failureCircle: React.ReactNode = (
		<Container viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
			<Circle cx="26" cy="26" r="25" fill="none" />
			<Times>
				<path fill="none" d="M16,16 l20,20" />
				<path fill="none" d="M16,36 l20,-20" />
			</Times>
		</Container>
	);

	const icons: Record<IconType, React.ReactNode> = {
		"success": successCircle,
		"failure": failureCircle,
	};

	return (
		<IconContainer style={style}>
			{icons[type]}
		</IconContainer>
	)
};
