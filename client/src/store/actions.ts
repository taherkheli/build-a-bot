import { ActionTree } from 'vuex';
import axios from 'axios';
import MutationTypes from './mutations';
import { State } from './state';

enum ActionTypes {
  GetParts = 'GET_PARTS'
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
};

export default ActionTypes;
