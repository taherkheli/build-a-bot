<template>
  <div class="content">
    <button @click="addToCart" class="add-to-cart">Add to Cart</button>
    <div class="top-row">
      <div class="top part" :class="{'sale-border': selectedRobot.head.onSale}">
        <!-- <div class="robot-name">
          {{ selectedRobot.head.title }}
          <span v-if="selectedRobot.head.onSale" class="sale">Sale!</span>
        </div> -->
        <div class="robot-name"></div>
          <part-selector :parts="availableParts.heads"/>
        </div>
    </div>
    <div class="middle-row">
      <part-selector :parts="availableParts.arms"/>
      <part-selector :parts="availableParts.torsos"/>
      <part-selector :parts="availableParts.arms"/>
    </div>
    <div class="bottom-row">
      <part-selector :parts="availableParts.bases"/>
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
.part {
  position: relative;
  width:165px;
  height:165px;
  border: 3px solid #aaa;
}
.part img {
  width:165px;
}
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
.head {
  border-bottom: none;
}
.left {
  border-right: none;
}
.right {
  border-left: none;
}
.left img {
  transform: rotate(-90deg);
}
.right img {
  transform: rotate(90deg);
}
.bottom {
  border-top: none;
}
.prev-selector {
  position: absolute;
  z-index:1;
  top: -3px;
  left: -28px;
  width: 25px;
  height: 171px;
}
.next-selector {
  position: absolute;
  z-index:1;
  top: -3px;
  right: -28px;
  width: 25px;
  height: 171px;
}
.center .prev-selector, .center .next-selector {
  opacity:0.8;
}
.left .prev-selector {
  top: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.left .next-selector {
  top: auto;
  bottom: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.right .prev-selector {
  top: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.right .next-selector {
  top: auto;
  bottom: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.right .next-selector {
  right: -3px;
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
