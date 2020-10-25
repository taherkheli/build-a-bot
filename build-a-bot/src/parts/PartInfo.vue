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
import availableParts from '@/data/Data';
import Part from '@/data/Part';

export default defineComponent({
  name: 'PartInfo',
  props: {
    partType: {
      type: String,
      required: true,
      validator: (value: string): boolean => ['heads', 'arms', 'torsos', 'bases'].includes(value),
    },
    id: {
      type: Number,
      default: 0,
      validator: (value: number): boolean => Number.isInteger(value),
    },
  },
  setup(props) {
    const part = computed(() => (availableParts[props.partType][props.id]));

    return {
      part,
    };
  },
});
</script>
