import { createStore } from 'vuex';
import Cart from '@/data/Cart';
import Data from '@/data/Data';
import axios from 'axios';
import { state, State } from './state';

const store = createStore<State>({
  state,
  mutations: {
    addRobotToCart(s: State, robot: Cart) {
      s.cart.push(robot);
    },
    updateData(s: State, parts: Data) {
      s.data = parts;
      s.loaded = true;
    },
  },
  actions: {
    getParts({ commit }) {
      axios.get('/api/parts')
        .then((result) => commit('updateData', result.data))
        .catch(console.error);
    },
  },
  getters: {
    cartSaleItems(s: State): Cart[] {
      return s.cart.filter((item) => item.head.onSale);
    },
  },
});

export default store;
