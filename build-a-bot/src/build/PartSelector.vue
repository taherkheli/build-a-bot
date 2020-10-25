<template>
  <div class="part" :class="position">
    <img @click="showPartInfo" :src="selectedPart.src" />
    <button @click="selectPreviousPart" class="prev-selector"></button>
    <button @click="selectNextPart" class="next-selector"></button>
    <span class="sale" v-show="selectedPart.onSale">Sale!</span>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, computed, Ref, ref, PropType,
} from 'vue';
import Part from '@/data/Part';
import router from '@/router';

export default defineComponent({
  props: {
    parts: {
      type: Array as PropType<Part[]>,
      default: () => [{ a: 'b' }], // only to avoid a linting error
    },
    position: {
      type: String,
      required: true,
      validator: (value: string): boolean => ['top', 'left', 'center', 'right', 'bottom'].includes(value),
    },
  },
  setup(props, { emit }) {
    const selectedIndex: Ref<number> = ref(0);

    const selectedPart: Ref<Part> = computed(() => props.parts[selectedIndex.value]);

    function emitSelectedPart() {
      emit('part-selected', selectedPart);
    }

    function selectNextPart() {
      console.log(props);
      selectedIndex.value += 1;
      if (selectedIndex.value === props.parts.length) {
        selectedIndex.value = 0;
      }
      emitSelectedPart();
    }

    function selectPreviousPart() {
      selectedIndex.value -= 1;
      if (selectedIndex.value < 0) {
        selectedIndex.value = props.parts.length - 1;
      }
      emitSelectedPart();
    }

    // this can be removed by using :to and providing the same object in router-link.
    // I tried but had trouble making it work. Moving on
    function showPartInfo() {
      router.push({
        name: 'Parts',
        params: {
          id: selectedIndex.value.toString(),
          partType: selectedPart.value.type,
        },
      });
    }

    onMounted(() => {
      emitSelectedPart();
    });

    return {
      selectNextPart,
      selectPreviousPart,
      selectedPart,
      showPartInfo,
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
.sale {
  position: absolute;
  bottom: 5px;
  right: 5px;
  color: white;
  background-color: red;
  padding: 3px;
}
.part-title {
  position: absolute;
  width: 100%;
  text-align: center;
  font-size: 18px;
  color: red;
  padding-top: 5px;
  top: -25px;
}
.part img {
  width:165px;
  cursor: pointer;
}
.top {
  border-bottom: none;
}
.left {
  border-right: none;
}
.right {
  border-left: none;
}
.bottom {
  border-top: none;
}
.left img {
  transform: rotate(-90deg);
}
.right img {
  transform: rotate(90deg);
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
.left .prev-selector:after,  .right .prev-selector:after{
  content: '\25B2'
}
.left .next-selector:after, .right .next-selector:after {
  content: '\25BC'
}
.top .prev-selector:after, .bottom .prev-selector:after, .center .prev-selector:after{
  content: '\25C4'
}
.top .next-selector:after, .bottom .next-selector:after, .center .next-selector:after{
  content: '\25BA'
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
.highlight {
  border: 1px solid red;
}
</style>
