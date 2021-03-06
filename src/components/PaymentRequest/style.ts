import styled from 'styled-components';
import { QRCode as QRSvg } from 'react-qr-svg';
import _ from '../../providers/theme/styleFetcher';

export const Container = styled.div`
  color: ${(p) => _(p.theme, 'primary', 'color')};
  background-color: ${(p) => _(p.theme, 'primary', 'backgroundColor')};
  width: 360px;
  max-height: 600px;
  padding: 40px;
  text-align: left;
  box-shadow: ${(p) => _(p.theme, 'primary', 'boxShadow')};
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
    max-height: 115px;

    &:not(:first-of-type) {
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
  border: 2px solid rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  border-top-color: ${(p) => _(p.theme, 'primary', 'backgroundColor')};
  animation: spin 1s ease-in-out infinite;
  margin-right: 5px;

  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }

  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;

export const QRCode = styled(QRSvg)`
  display: block;
  margin: auto;
`;

export const DetailedView = styled.div`
  display: block;
  margin: 15px 0 15px 0;
`;

export const Request = styled.div`
  text-align: center;
  margin-bottom: 15px;

  > div {
    margin-top: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
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
  max-height: 60px;
  overflow-x: hidden;
  overflow-y: auto;

  li {
    i {
      margin-left: 5px;
    }
  }

  &::-webkit-scrollbar-track {
    background-color: ${(p) => _(p.theme, 'primary', 'backgroundColor')};
    border: 1px solid #dedede;
  }

  &::-webkit-scrollbar {
    width: 9px;
    background-color: #dedede;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(p) => _(p.theme, 'primary', 'color')};
    border: 1px solid #dedede;
  }
`;

export const Visual = styled.div``;

export const CancelButton = styled.button`
  display: block;
  cursor: pointer;
  margin: 0 auto 5px auto;
  padding: 0.35em 1.2em;
  border: 0.1em solid ${(p) => _(p.theme, 'primary', 'backgroundColor')};
  border-radius: 0.12em;
  box-sizing: border-box;
  text-decoration: none;
  font-weight: 300;
  color: ${(p) => _(p.theme, 'primary', 'color')};
  text-align: center;

  &:hover {
    color: ${(p) => _(p.theme, 'primary', 'backgroundColor')};
    background-color: #f7931a;
  }

  &:focus {
    outline: none;
  }
`;

export const HelpLink = styled.a`
  display: block;
  margin: auto;
  cursor: pointer;
  left: 0;
  right: 0;
  bottom: 15px;
  text-align: center;
  margin: 10px auto 0 auto;
  text-align: center;
  text-decoration: none;
  font-weight: 700;
  color: ${(p) => _(p.theme, 'primary', 'color')};
`;
