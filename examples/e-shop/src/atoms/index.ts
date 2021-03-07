import { IArticle } from 'components/articleCard/IArticle';
import { IHeaderProps } from 'components/header/IHeaderProps';
import { atom } from 'recoil';
import { IOrder } from 'views/orderHistory/IOrder';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const headerState = atom<IHeaderProps>({
  key: 'headerState',
  default: {
    title: 'My Shop',
  },
});

export const modalState = atom<boolean>({
  key: 'modalState',
  default: false,
});

export const basketState = atom<IArticle[]>({
  key: 'basketState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const orderHistoryState = atom<IOrder[]>({
  key: 'orderHistoryState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
