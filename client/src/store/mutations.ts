import { MutationTree } from 'vuex';
import Data from '@/data/Data';
import Cart from '@/data/Cart';
import { State } from './state';

enum MutationTypes {
  UPDATE_DATA = 'UPDATE_DATA',
  ADD_ROBOT_TO_CART = 'ADD_ROBOT_TO_CART',
}

export const mutations: MutationTree<State> = {
  [MutationTypes.UPDATE_DATA](state: State, parts: Data) {
    state.data = parts;
    state.loaded = true;
  },
  [MutationTypes.ADD_ROBOT_TO_CART](state: State, robot: Cart) {
    state.cart.push(robot);
  },
};

export default MutationTypes;
