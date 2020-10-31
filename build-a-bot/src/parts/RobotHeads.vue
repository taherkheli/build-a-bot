<template>
  <div v-if="loaded">
    <h2>Heads</h2>
    The head is where the brain of your robot will reside. Heads have
    different capabilities so be sure to choose the one that fits your needs.
    <div v-for="(head, idx) in heads" :key="idx">
      <h4>{{head.title}}</h4>
      <div>{{head.description}}</div>
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
  name: 'RobotHeads',
  setup() {
    const store = useStore();
    store.dispatch(ActionTypes.GetParts);

    const loaded: Ref<boolean> = computed(() => store.state.loaded);
    const heads: Ref<Part[]> = computed(() => store.state.data.heads);

    return {
      loaded,
      heads,
    };
  },
});
</script>
