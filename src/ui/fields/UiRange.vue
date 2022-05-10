<script lang="ts" setup>
import { IRange } from "@/interfaces/fields/range.interface";
import { ref, watch } from "vue";

const props = defineProps<{
  min: number;
  max: number;
  minLimit: number;
  maxLimit: number;
}>();

const emit = defineEmits<{
  (e: "update:min", values: IRange["min"]): void;
  (e: "update:max", values: IRange["max"]): void;
}>();

const leftValue = ref<string>(String(props.min));
const rightValue = ref<string>(String(props.max));

watch(
  () => leftValue.value,
  (value) => {
    leftValue.value = String(
      +value >= +rightValue.value ? +rightValue.value - 1 : +value
    );
  }
);
watch(
  () => rightValue.value,
  (value) => {
    rightValue.value = String(
      +value <= +leftValue.value ? +leftValue.value + 1 : +value
    );
  }
);

const onChange = () => {
  emit("update:min", +leftValue.value);
  emit("update:max", +rightValue.value);
};
</script>

<template>
  <div class="ui-range">
    <slot />
    <div class="ui-range__inputs">
      <input
        type="range"
        v-model="leftValue"
        :min="minLimit"
        :max="maxLimit"
        @change="onChange"
      />

      <input
        type="range"
        v-model="rightValue"
        :min="minLimit"
        :max="maxLimit"
        @change="onChange"
      />

      <div class="ui-range__bg-line"></div>
    </div>
    <div class="ui-range__outputs">
      <span>{{ leftValue }}</span>
      <span>{{ rightValue }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$h: 1rem;

@mixin track() {
  width: 100%;
  height: 100%;
  background: none;
}

@mixin thumb() {
  border: none;
  width: $h;
  height: $h;
  border-radius: 50%;
  background: darkgray;
  pointer-events: auto;
  cursor: pointer;
}

.ui-range {
  &__inputs {
    --dif: calc(var(--max) - var(--min));
    display: grid;
    grid-template: repeat(2, max-content) #{$h}/ 1fr 1fr;
    overflow: hidden;
    position: relative;
    margin: 1em auto;
    width: 100%;
  }

  &__bg-line {
    background: white;
    height: 4px;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
  }

  &__inputs input[type="range"] {
    &::-webkit-slider-runnable-track,
    &::-webkit-slider-thumb,
    & {
      -webkit-appearance: none;
    }

    grid-column: 1 / span 2;
    grid-row: 3;
    z-index: 1;
    top: 0;
    left: 0;
    margin: 0;
    background: none;
    pointer-events: none;

    &::-webkit-slider-thumb {
      @include thumb;
    }

    &::-moz-range-thumb {
      @include thumb;
    }
  }

  &__outputs {
    display: flex;
    justify-content: space-between;
  }
}
</style>
