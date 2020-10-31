<template>
<div>
    <div class="header">
        <span v-if="open" @click="open = !open">&#x25B2;Collapse</span>
        <span v-if="!open" @click="open = !open">&#x25BC;Expand</span>
    </div>
    <slot v-if="open">
      <div>DefaultContent</div>
    </slot>
</div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';

export default defineComponent({
  name: 'ColalpsibleSection',
  setup() {
    const open: Ref<boolean> = ref(true);

    return {
      open,
    };
  },
});
</script>
<style scoped>
  .header {
    background-color: #bbb;
    padding: 3px;
    cursor: pointer;
  }
</style>
