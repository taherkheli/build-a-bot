<template>
  <div>
    <h1>{{ part.title }}</h1>
    <div>
      {{ part.description }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'PartInfo',
  props: {
    partType: {
      type: String,
      required: true,
      validator: (value: string): boolean => ['heads', 'arms', 'torsos', 'bases'].includes(value),
    },
    id: {
      type: Number, // TODO: this is passed in as string not number. handle it
      default: 0,
      validator: (value: number): boolean => Number.isInteger(value),
    },
  },
  setup(props) {
    const store = useStore();
    store.dispatch('getParts');
    const part = computed(() => (store.state.data[props.partType][props.id]));

    return {
      part,
    };
  },
});
</script>
