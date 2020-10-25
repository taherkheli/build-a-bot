<template>
  <div>
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
import { defineComponent } from 'vue';
import availableParts from '@/data/Data';

export default defineComponent({
  name: 'RobotArms',
  setup() {
    return { arms: availableParts.arms };
  },
});
</script>
