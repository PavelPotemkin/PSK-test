<script setup lang="ts">
import CheckerboardFloor from "@/components/checkerboard/CheckerboardFloor.vue";
import { IEntrance } from "@/interfaces/entrances.interface";
import { reactive } from "vue";

defineProps<{
  entrance: IEntrance;
}>();

const verticalBgStyleObject = reactive({
  left: "0",
  opacity: "0",
});

const horizontalBgStyleObject = reactive({
  top: "0",
  opacity: "0",
});

const onFlatHover = (flatNumber: number, reverseFloorNumber: number) => {
  verticalBgStyleObject.opacity = "1";
  verticalBgStyleObject.left = `${flatNumber * 2 - 2}em`;
  horizontalBgStyleObject.opacity = "1";
  horizontalBgStyleObject.top = `${reverseFloorNumber * 2}em`;
};

const onFlatBlur = () => {
  horizontalBgStyleObject.opacity = "0";
  verticalBgStyleObject.opacity = "0";
};
</script>

<template>
  <div class="entrance">
    <CheckerboardFloor
      v-for="(floor, index) in entrance.floors"
      :key="floor.floor"
      :floor="floor"
      @flatHover="onFlatHover($event, index)"
      @flatBlur="onFlatBlur"
    />

    <div
      class="entrance__hover-bg entrance__hover-bg_vertical"
      :style="verticalBgStyleObject"
    ></div>
    <div
      class="entrance__hover-bg entrance__hover-bg_horizontal"
      :style="horizontalBgStyleObject"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.entrance {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5em;

  &__hover-bg {
    position: absolute;
    z-index: -1;
    background-color: darkslategrey;
    box-shadow: 0 0 0 0.3em darkslategrey;
    transition: 0.3s opacity;

    &_vertical {
      top: 0;
      bottom: 0;
      width: 1.5em;
    }

    &_horizontal {
      left: 0;
      right: 0;
      height: 1.5em;
    }
  }
}
</style>
