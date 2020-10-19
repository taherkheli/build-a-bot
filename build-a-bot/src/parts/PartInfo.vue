<template>
  <div>
    <h1>{{ part.title }}</h1>
    <div>
      {{ part.description }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PartInfo',
  setup() {
    const part = {
      title: 'Part Title',
      description: 'Part Description',
    };

    return {
      part,
    };
  },
});
</script>
