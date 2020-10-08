<template>
  <div class="content">
    <button @click="addToCart" class="add-to-cart">Add to Cart</button>
    <div class="top-row">
      <part-selector :parts="availableParts.heads" position="top"/>
    </div>
    <div class="middle-row">
      <part-selector :parts="availableParts.arms" position="left"/>
      <part-selector :parts="availableParts.torsos" position="center"/>
      <part-selector :parts="availableParts.arms" position="right"/>
    </div>
    <div class="bottom-row">
      <part-selector :parts="availableParts.bases" position="bottom"/>
    </div>
    <div>
      <h1>Cart</h1>
      <table>
        <thead>
          <tr>
            <th>Robot</th>
            <th class="cost">
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(robot, index) in cart" :key="index">
            <td>{{ robot.r.head.title }}</td>
            <td class="cost">{{robot.cost}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref, Ref,
} from 'vue';
import availableParts from '@/data/parts';
import PartSelector from './PartSelector.vue';

export default defineComponent({
  name: 'RobotBuilder',
  components: {
    PartSelector,
  },
  props: [],
  setup() {
    const cart: Ref<object[]> = ref([]);

    const selectedRobot = {
      head: {},
      torso: {},
      base: {},
      leftarm: {},
      rightarm: {},
    };

    function addToCart() {
      const r = selectedRobot;
      // const cost = r.head.cost + r.leftarm.cost + r.torso.cost + r.rightarm.cost + r.base.cost;
      const cost = 120;
      cart.value.push({ r, cost });
    }

    return {
      availableParts,
      selectedRobot,
      addToCart,
      cart,
    };
  },
});
</script>

<style scoped>
.top-row {
  display:flex;
  justify-content: space-around;
}
.middle-row {
  display:flex;
  justify-content: center;
}
.bottom-row {
  display:flex;
  justify-content: space-around;
  border-top: none;
}
.robot-name {
  position: absolute;
  top: -25px;
  text-align: center;
  width: 100%;
}
.sale{
  color: red;
}
.content{
  position: relative;
}
.add-to-cart{
  position: absolute;
  right: 30px;
  width: 220px;
  padding: 3px;
  font-size: 16px;
}
td, th {
  text-align: left;
  padding: 5px;
  padding-right: 20px;
}
.cost {
  text-align: right;
}
.sale-border{
  border: 3px solid red;
}
</style>
