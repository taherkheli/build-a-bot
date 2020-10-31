import { createStore } from 'vuex';
import { mutations } from '@/store/mutations';
import { actions } from '@/store/actions';
import getters from '@/store/getters';
import { state, State } from './state';

const store = createStore<State>({
  state,
  mutations,
  actions,
  getters,
});

export default store;
