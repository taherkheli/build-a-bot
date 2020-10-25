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
      type: String,
      default: '0',
    },
  },
  setup(props) {
    const part = computed(() => {
      const idNum: number = +props.id;
      let parts: Part[] = availableParts.heads;

      // TODO: get rid of this nasty switch n figure out a way to do a simple
      // {let parts: Part[] = availableParts[props.partType];}
      switch (props.partType) {
        case ('heads'): {
          parts = availableParts.heads;
          break;
        }
        case ('arms'): {
          parts = availableParts.arms;
          break;
        }
        case ('torsos'): {
          parts = availableParts.torsos;
          break;
        }
        case ('bases'): {
          parts = availableParts.bases;
          break;
        }
        default: {
          parts = availableParts.heads;
          break;
        }
      }

      return parts[idNum];
    });

    return {
      part,
    };
  },
});
</script>
