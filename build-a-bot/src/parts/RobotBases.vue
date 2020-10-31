<template>
  <div v-if="loaded">
    <h2>Bases</h2>
    The Base is critical to the mobility of your robot. Be
    sure to choose a base that will work well with the terrain
    where your robot needs to operate.
    <div v-for="(base, idx) in bases" :key="idx">
      <h4>{{base.title}}</h4>
      <div>{{base.description}}</div>
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
  name: 'RobotBases',
  setup() {
    const store = useStore();
    store.dispatch(ActionTypes.GetParts);

    const loaded: Ref<boolean> = computed(() => store.state.loaded);
    const bases: Ref<Part[]> = computed(() => store.state.data.bases);

    return {
      loaded,
      bases,
    };
  },
});
</script>
