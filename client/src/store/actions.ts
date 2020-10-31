import { ActionTree } from 'vuex';
import axios from 'axios';
import Cart from '@/data/Cart';
import MutationTypes from './mutations';
import { State } from './state';

enum ActionTypes {
  GetParts = 'GET_PARTS',
  SaveCart = 'SAVE_CART'
}

export const actions: ActionTree<State, State> = {
  async [ActionTypes.GetParts]({ commit }) {
    try {
      const result = await axios.get('/api/parts');
      commit(MutationTypes.UPDATE_DATA, result.data);
    } catch (error) {
      console.log(error);
    }
  },
  async [ActionTypes.SaveCart]({ commit, state }, robot: Cart) {
    try {
      const cart = [...state.cart, robot];
      const result = await axios.post('/api/cart', cart);
      console.log(result);
      commit(MutationTypes.ADD_ROBOT_TO_CART, robot);
    } catch (error) {
      console.log(error);
    }
  },
};

export default ActionTypes;
