<template>
  <div v-if="loaded">
    <h2>Arms</h2>
    The arms are how your robot will interact with the world.
    They come in a variety of shapes and functions.
    <div v-for="(arm, idx) in arms" :key="idx">
      <h4>{{arm.title}}</h4>
      <div>{{arm.description}}</div>
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
  name: 'RobotArms',
  setup() {
    const store = useStore();
    store.dispatch(ActionTypes.GetParts);

    const loaded: Ref<boolean> = computed(() => store.state.loaded);
    const arms: Ref<Part[]> = computed(() => store.state.data.arms);

    return {
      loaded,
      arms,
    };
  },
});
</script>
