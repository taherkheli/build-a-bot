<template>
  <div class="content" v-if="loaded">
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
  </div>
</template>

<script lang="ts">
import {
  defineComponent, reactive, ref, Ref, computed,
} from 'vue';
import CollapsibleSection from '@/shared/CollapsibleSection.vue';
import Robot from '@/data/Robot';
import Part from '@/data/Part';
import Cart from '@/data/Cart';
import { useStore } from 'vuex';
import Data from '@/data/Data';
import ActionTypes from '@/store/actions';
import PartSelector from './PartSelector.vue';

export default defineComponent({
  name: 'RobotBuilder',
  beforeRouteLeave(to, from, next) {
    if (this.addedToCart) {
      next(true);
    } else {
      /* eslint no-alert: 0 */
      /* eslint no-restricted-globals: 0 */
      const response = confirm('Nothin added to cart. Are you sure you want to leave?');
      next(response);
    }
  },
  components: {
    PartSelector,
    CollapsibleSection,
  },
  props: [],
  setup() {
    const store = useStore();
    store.dispatch(ActionTypes.GetParts);

    const loaded: Ref<boolean> = computed(() => store.state.loaded);
    const availableParts: Ref<Data> = computed(() => store.state.data);
    const addedToCart: Ref<boolean> = ref(false);

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
      const c: Cart = { ...selectedRobot, cost };
      store.dispatch(ActionTypes.AddRobotToServer, c);
      addedToCart.value = true;
    }

    return {
      loaded,
      availableParts,
      selectedRobot,
      addToCart,
      addedToCart,
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
