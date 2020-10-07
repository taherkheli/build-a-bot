<template>
  <div class="content">
    <button @click="addToCart" class="add-to-cart">Add to Cart</button>
    <div class="top-row">
      <div class="top part">
        <div class="robot-name">
          {{ selectedRobot.head.title }}
          <span v-if="selectedRobot.head.onSale" class="sale">Sale!</span>
        </div>
        <div class="robot-name"></div>
          <img :src="selectedRobot.head.src" title="head"/>
          <button @click="selectPreviousHead" class="prev-selector">&#9668;</button>
          <button @click="selectNextHead" class="next-selector">&#9658;</button>
      </div>
    </div>
    <div class="middle-row">
      <div class="left part">
        <img :src="selectedRobot.leftarm.src" title="left arm"/>
        <button @click="selectPreviousLeftArm" class="prev-selector">&#9650;</button>
        <button @click="selectNextLeftArm" class="next-selector">&#9660;</button>
      </div>
      <div class="center part">
        <img :src="selectedRobot.torso.src" title="torso"/>
        <button @click="selectPreviousTorso" class="prev-selector">&#9668;</button>
        <button @click="selectNextTorso" class="next-selector">&#9658;</button>
      </div>
      <div class="right part">
        <img :src="selectedRobot.rightarm.src" title="right arm"/>
        <button @click="selectPreviousRightArm" class="prev-selector">&#9650;</button>
        <button @click="selectNextRightArm" class="next-selector">&#9660;</button>
      </div>
    </div>
    <div class="bottom-row">
      <div class="bottom part">
        <img :src="selectedRobot.base.src" title="base"/>
        <button @click="selectPreviousBase" class="prev-selector">&#9668;</button>
        <button @click="selectNextBase" class="next-selector">&#9658;</button>
      </div>
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
          <tr v-for="(cost, index) in cart" :key="index">
            <td>{{ cost }}</td>
            <td class="cost">{{cost}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, computed, ref, Ref,
} from 'vue';
import availableParts from '@/data/parts';

export default defineComponent({
  props: [],
  setup() {
    const parts = availableParts;
    const selectedHeadIndex = ref(0);
    const selectedTorsoIndex = ref(0);
    const selectedBaseIndex = ref(0);
    const selectedLeftArmIndex = ref(0);
    const selectedRightArmIndex = ref(0);
    const cart: Ref<object[]> = ref([]);

    // TODO: How is reactie thingy any bettter when computed does the job anyway?
    // const selectedRobot: any = reactive({
    //   head: computed(() => availableParts.heads[selectedHeadIndex.value]),
    //   torso: computed(() => availableParts.torsos[selectedTorsoIndex.value]),
    //   base: computed(() => availableParts.bases[selectedBaseIndex.value]),
    //   leftarm: computed(() => availableParts.arms[selectedLeftArmIndex.value]),
    //   rightarm: computed(() => availableParts.arms[selectedRightArmIndex.value]),
    // });

    const selectedRobot = computed(() => ({
      head: availableParts.heads[selectedHeadIndex.value],
      torso: availableParts.torsos[selectedTorsoIndex.value],
      base: availableParts.bases[selectedBaseIndex.value],
      leftarm: availableParts.arms[selectedLeftArmIndex.value],
      rightarm: availableParts.arms[selectedRightArmIndex.value],
    }));

    function selectNextHead() {
      selectedHeadIndex.value += 1;
      if (selectedHeadIndex.value === parts.heads.length) {
        selectedHeadIndex.value = 0;
      }
    }

    function selectPreviousHead() {
      selectedHeadIndex.value -= 1;
      if (selectedHeadIndex.value < 0) {
        selectedHeadIndex.value = parts.heads.length - 1;
      }
    }

    function selectNextTorso() {
      selectedTorsoIndex.value += 1;
      if (selectedTorsoIndex.value === parts.torsos.length) {
        selectedTorsoIndex.value = 0;
      }
    }

    function selectPreviousTorso() {
      selectedTorsoIndex.value -= 1;
      if (selectedTorsoIndex.value < 0) {
        selectedTorsoIndex.value = parts.torsos.length - 1;
      }
    }

    function selectNextBase() {
      selectedBaseIndex.value += 1;
      if (selectedBaseIndex.value === parts.bases.length) {
        selectedBaseIndex.value = 0;
      }
    }

    function selectPreviousBase() {
      selectedBaseIndex.value -= 1;
      if (selectedBaseIndex.value < 0) {
        selectedBaseIndex.value = parts.bases.length - 1;
      }
    }

    function selectNextLeftArm() {
      selectedLeftArmIndex.value += 1;
      if (selectedLeftArmIndex.value === parts.arms.length) {
        selectedLeftArmIndex.value = 0;
      }
    }

    function selectPreviousLeftArm() {
      selectedLeftArmIndex.value -= 1;
      if (selectedLeftArmIndex.value < 0) {
        selectedLeftArmIndex.value = parts.arms.length - 1;
      }
    }

    function selectNextRightArm() {
      selectedRightArmIndex.value += 1;
      if (selectedRightArmIndex.value === parts.arms.length) {
        selectedRightArmIndex.value = 0;
      }
    }

    function selectPreviousRightArm() {
      selectedRightArmIndex.value -= 1;
      if (selectedRightArmIndex.value < 0) {
        selectedRightArmIndex.value = parts.arms.length - 1;
      }
    }

    function addToCart() {
      const r = selectedRobot.value;
      const cost = r.head.cost + r.leftarm.cost + r.torso.cost + r.rightarm.cost + r.base.cost;
      cart.value.push({ r, cost });
    }

    return {
      selectNextHead,
      selectPreviousHead,
      selectedHeadIndex,
      selectNextTorso,
      selectPreviousTorso,
      selectedTorsoIndex,
      selectNextBase,
      selectPreviousBase,
      selectedBaseIndex,
      selectNextLeftArm,
      selectPreviousLeftArm,
      selectedLeftArmIndex,
      selectNextRightArm,
      selectPreviousRightArm,
      selectedRightArmIndex,
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
</style>
