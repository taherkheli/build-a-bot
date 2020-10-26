import { createStore } from 'vuex';
import Cart from '@/data/Cart';
import { state, State } from './state';

const store = createStore<State>({
  state,
  mutations: {
    addRobotToCart(s: State, robot: Cart) {
      state.cart.push(robot);
    },
  },
});

export default store;
