<script setup lang="ts">
import { IFloor } from "@/interfaces/floor.interface";
import CheckerboardFlat from "@/components/checkerboard/CheckerboardFlat.vue";
import { useStore } from "@/store";
import { IFlat } from "@/interfaces/flats.interface";

defineProps<{
  floor: IFloor;
}>();

const store = useStore();
const flats = store.flats;

const openFlat = (flat: IFlat) => {
  store.changeCurrentFlatId(flat.id);
};
</script>

<template>
  <ul class="floor">
    <CheckerboardFlat
      class="floor__item"
      v-for="flat in floor.flats"
      :key="flat.id"
      :flat="flats[flat.id]"
      @open="openFlat"
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
