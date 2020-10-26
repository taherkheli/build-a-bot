<template>
  <div>
    <h1>Cart</h1>
    <table>
      <thead>
        <tr>
          <th class="robot-title">
            Robot
          </th>
          <th class="cost">
            Cost
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(robot, index) in cart" :key="index">
          <td class="robot-title">
            {{robot.head.title}}
          </td>
          <td class="cost">
            {{robot.cost}}
          </td>
        </tr>
      </tbody>
    </table>
 </div>
</template>

<script lang="ts">
import {
  defineComponent, Ref, computed,
} from 'vue';
import Cart from '@/data/Cart';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'ShoppingCart',
  setup() {
    const store = useStore();
    const cart: Ref<Cart[]> = computed(() => store.state.cart);

    return {
      cart,
    };
  },
});
</script>

<style scoped>
  td, th {
    padding: 5px;
  }
  .robot-title {
    text-align: left;
    padding-right: 200px;
  }
  .cost {
    text-align: right;
  }
</style>
