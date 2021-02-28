import styled from "styled-components";

export const Container = styled.div`
	position: absolute;
	color: #000000;
	background-color: #ffffff;
	width: 360px;
	max-height: 600px;
	padding: 50px;
	text-align: left;
	box-shadow: 0 12px 28px rgba(0,0,0,0.1);
	border-radius: 3px;
	font-size: 12px;

	@media only screen and (max-width: 480px) {
		padding: 0 0 25px 0;
		width: 285px;
    }
`;

export const Header = styled.div`
	margin-bottom: 25px;
	max-height: 150px;
	display: flex;
	align-items: center;
    justify-content: space-between;

	img {
		max-width: 150px;

		&:not(:first-of-type){
			float: right;
		}
	}

	@media only screen and (max-width: 480px) {
		padding: 15px 30px 0 30px;
		img {
			max-width: 100px;
		}
    }
`;

export const Spinner = styled.div`
	display: inline-block;
	width: 6px;
	height: 6px;
	border: 2px solid rgba(0,0,0,.3);
	border-radius: 50%;
	border-top-color: #fff;
	animation: spin 1s ease-in-out infinite;
	margin-right : 5px;

	@keyframes spin {
		to { -webkit-transform: rotate(360deg); }
  	}

  	@-webkit-keyframes spin {
		to { -webkit-transform: rotate(360deg); }
  	}
`;

export const Body = styled.div``;

export const DetailedView = styled.div`
	display: block;
	margin: 15px 0 15px 0;
`;

export const Request = styled.div`
	text-align: center;
	margin-bottom: 15px;

	> div {
		margin-top: 15px;

		border-top: 1px solid #dedede;
		border-bottom: 1px solid #dedede;
		font-weight: bold;
		padding: 10px 0 10px 0;
	}
`;

export const TransactionList = styled.ul`
	padding: 0;
	margin: 0;
	list-style: none;

	li {
		i {
			margin-left: 5px;
		}
	}
`;

export const Footer = styled.div``;

export const CancelButton = styled.button`
	display: block;
	cursor: pointer;
	margin: 0 auto 5px auto;
    padding: 0.35em 1.2em;
    border: 0.1em solid #fff;
    border-radius: 0.12em;
    box-sizing: border-box;
    text-decoration: none;
    font-weight: 300;
    color: #000;
    text-align: center;

	&:hover {
		color: #FFFFFF;
		background-color: #f7931a;
	}
`;

export const HelpLink = styled.a`
	position: absolute;
	margin: auto;
	left: 0;
	right: 0;
	bottom: 15px;
	text-align: center;
	margin: 10px auto 0 auto;
	text-align: center;
	text-decoration: none;
	font-weight: 700;
	color: #000;
`;

export const HelpIcon = styled.div`
	display: inline-block;
	margin-right: 5px;
	text-align: center;
	background-color: transparent;
	border: solid 1px #000;
	border-radius: 50%;
	width: 12px;
	height: 12px;
	line-height: 13px;

	&:before {
		content: '?';
		font-size: 6px
		font-weight: 700;
		color: #000;
	}
`;