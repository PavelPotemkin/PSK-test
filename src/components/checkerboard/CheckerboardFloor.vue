<script setup lang="ts">
import { IFloor } from "@/interfaces/floor.interface";
import CheckerboardFlat from "@/components/checkerboard/CheckerboardFlat.vue";
import { useStore } from "@/store";
import { IFlat, IFlatsWithFilter } from "@/interfaces/flats.interface";
import { ComputedRef, inject } from "vue";
import { flatsInjectionSymbol } from "@/lib/injectionSymbols/flat";

defineProps<{
  floor: IFloor;
}>();

const emit = defineEmits(["flatHover", "flatBlur"]);

const store = useStore();

const openFlat = (flat: IFlat) => {
  store.changeCurrentFlatId(flat.id);
};

const flats = inject<ComputedRef<IFlatsWithFilter>>(flatsInjectionSymbol);

const onFlatHover = (index: number) => {
  emit("flatHover", index);
};

const onFlatBlur = () => {
  emit("flatBlur");
};
</script>

<template>
  <ul class="floor">
    <CheckerboardFlat
      class="floor__item"
      v-for="(flat, index) in floor.flats"
      :key="flat.id"
      :flat="flats[flat.id]"
      :disabled="flats[flat.id].disabled || false"
      @open="openFlat"
      @mouseenter="!flats[flat.id].disabled ? onFlatHover(index + 1) : null"
      @mouseleave="onFlatBlur"
    />
  </ul>
</template>

<style lang="scss" scoped>
.floor {
  display: flex;
  align-items: center;
  list-style: none;
  gap: 0.5em;
}
</style>
