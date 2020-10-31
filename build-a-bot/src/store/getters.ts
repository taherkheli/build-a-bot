import { GetterTree } from 'vuex';
import Cart from '@/data/Cart';
import { State } from './state';

const getters: GetterTree<State, State> = {
  cartSaleItems(s: State): Cart[] {
    return s.cart.filter((item) => item.head.onSale);
  },
};

export default getters;
