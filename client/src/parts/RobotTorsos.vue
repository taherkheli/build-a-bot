<template>
  <div v-if="loaded">
    <h2>Torsos</h2>
    The torso is the central part of your robot that holds everything
    together. Choosing the right torso will help ensure your robot
    functions well with the parts you choose.
    <div v-for="(torso, idx) in torsos" :key="idx">
      <h4>{{torso.title}}</h4>
      <div>{{torso.description}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, Ref, computed,
} from 'vue';
import Part from '@/data/Part';
import { useStore } from 'vuex';
import ActionTypes from '@/store/actions';

export default defineComponent({
  name: 'RobotTorsos',
  setup() {
    const store = useStore();
    store.dispatch(ActionTypes.GetParts);

    const loaded: Ref<boolean> = computed(() => store.state.loaded);
    const torsos: Ref<Part[]> = computed(() => store.state.data.torsos);

    return {
      loaded,
      torsos,
    };
  },
});
</script>
