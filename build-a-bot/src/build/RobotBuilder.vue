<template>
  <div class="content">
    <div class="preview">
      <CollapsibleSection>
      </CollapsibleSection>
      <CollapsibleSection>
      <div class="preview-content">
        <div class="top-row">
          <img :src="selectedRobot.head.src"/>
        </div>
        <div class="middle-row">
          <img :src="selectedRobot.leftarm.src" class="rotate-left"/>
          <img :src="selectedRobot.torso.src"/>
          <img :src="selectedRobot.rightarm.src" class="rotate-right"/>
        </div>
        <div class="bottom-row">
          <img :src="selectedRobot.base.src"/>
        </div>
      </div>
      </CollapsibleSection>
          <button @click="addToCart" class="add-to-cart">Add to Cart</button>
      </div>
    </div>
    <div class="top-row">
      <PartSelector :parts="availableParts.heads"
                      position="top"
                      @part-selected="part => selectedRobot.head=part"/>
    </div>
    <div class="middle-row">
      <PartSelector :parts="availableParts.arms"
                      position="left"
                      @part-selected="part => selectedRobot.leftarm=part"/>
      <PartSelector :parts="availableParts.torsos"
                      position="center"
                      @part-selected="part => selectedRobot.torso=part"/>
      <PartSelector :parts="availableParts.arms"
                      position="right"
                      @part-selected="part => selectedRobot.rightarm=part"/>
    </div>
    <div class="bottom-row">
      <PartSelector :parts="availableParts.bases"
                      position="bottom"
                      @part-selected="part => selectedRobot.base=part"/>
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
            <td>{{ robot.head.title }}</td>
            <td class="cost">{{robot.cost}}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script lang="ts">
import {
  defineComponent, reactive, ref, Ref,
} from 'vue';
import CollapsibleSection from '@/shared/CollapsibleSection.vue';
import availableParts from '@/data/MyParts';
import Robot from '@/data/Robot';
import Part from '@/data/Part';
import PartSelector from './PartSelector.vue';

interface Cart extends Robot {
  cost: number;
}
export default defineComponent({
  name: 'RobotBuilder',
  components: {
    PartSelector,
    CollapsibleSection,
  },
  props: [],
  setup() {
    const cart: Ref<Cart[]> = ref([]);

    const defaultPart = (): Part => ({
      description: '',
      title: '',
      src: '',
      type: '',
      cost: 0,
      id: 0,
      onSale: false,
    });

    const selectedRobot: Robot = reactive({
      head: defaultPart(),
      torso: defaultPart(),
      base: defaultPart(),
      leftarm: defaultPart(),
      rightarm: defaultPart(),
    });

    function addToCart() {
      const cost = selectedRobot.head.cost + selectedRobot.torso.cost
        + selectedRobot.base.cost + selectedRobot.leftarm.cost + selectedRobot.leftarm.cost;
      cart.value.push({ ...selectedRobot, cost });
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
  width: 210px;
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
.preview {
  position: absolute;
  top: -20px;
  right: 0;
  width: 210px;
  height: 210px;
  padding: 5px;
}
.preview-content {
  border: 1px solid #999;
}
.preview img {
  width: 50px;
  height: 50px;
}
.rotate-right {
  transform: rotate(90deg);
}
.rotate-left {
  transform: rotate(-90deg);
}
</style>
