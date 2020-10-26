import { createStore } from 'vuex';
import Cart from '@/data/Cart';
import { state, State } from './state';

const store = createStore<State>({
  state,
  mutations: {
    addRobotToCart(s: State, robot: Cart) {
      s.cart.push(robot);
    },
  },
  getters: {
    cartSaleItems(s: State): Cart[] {
      return s.cart.filter((item) => item.head.onSale);
    },
  },
});

export default store;
