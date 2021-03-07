import { TxStatus } from 'adoption';
import { IOrder } from 'views/orderHistory/IOrder';

export const defaultOrders: IOrder[] = [
  {
    articles: ['Gandhog'],
    shippingTo: 'somewhere',
    date: new Date('09/03/2009').toUTCString(),
    status: TxStatus.COMPLETED,
    cost: 10000,
    txFees: '0.1',
    txURL: '#urlToTransactionHere',
    sender: {
      hash: 'yourWoofAddresss',
    },
    receiver: {
      hash: 'dagratedoggoWoofAddress',
    },
  },
  {
    articles: ['Woof1.0', 'Steve Dogs'],
    shippingTo: 'over',
    date: new Date('09/02/2009').toUTCString(),
    status: TxStatus.COMPLETED,
    cost: 8541.01,
    txFees: '0.01',
    txURL: '#urlToTransactionHere',
    sender: {
      hash: 'yourWoofAddresss',
    },
    receiver: {
      hash: 'dagratedoggoWoofAddress',
    },
  },
  {
    articles: ['Sn00pD0g Collector'],
    shippingTo: 'the rainbow',
    date: new Date('09/01/2009').toUTCString(),
    status: TxStatus.FAILED,
    cost: 359.998,
    txURL: '#urlToTransactionHere',
    comment: 'Deadline reached.',
    sender: {
      hash: 'yourWoofAddresss',
    },
    receiver: {
      hash: 'dagratedoggoWoofAddress',
    },
    txFees: '0.001',
  },
  {
    articles: ['Maintenance fees'],
    date: new Date('09/04/2009').toUTCString(),
    status: TxStatus.COMPLETED,
    cost: 0.5,
    txURL: '#urlToTransactionHere',
    txFees: '0.0001',
    sender: {
      hash: 'yourWoofAddresss',
    },
    receiver: {
      hash: 'dagratedoggoWoofAddress',
    },
  },
  {
    articles: ['Refund: Woof at the beach'],
    date: new Date('09/06/2009').toUTCString(),
    status: TxStatus.COMPLETED,
    cost: 12,
    txURL: '#urlToTransactionHere',
    txFees: '0.00001',
    sender: {
      hash: 'dagratedoggoWoofAddress',
    },
    receiver: {
      hash: 'yourWoofAddresss',
    },
  },
  {
    articles: ['Woof at the beach'],
    shippingTo: 'the place you wanted',
    date: new Date('09/05/2009').toUTCString(),
    status: TxStatus.COMPLETED,
    txURL: '#urlToTransactionHere',
    txFees: '0.00001',
    cost: 12,
    sender: {
      hash: 'yourWoofAddresss',
    },
    receiver: {
      hash: 'dagratedoggoWoofAddress',
    },
  },
];
