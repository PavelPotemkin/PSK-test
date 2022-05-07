<script setup lang="ts">
import { IFloor } from "@/interfaces/floor.interface";
import CheckerboardFlat from "@/components/checkerboard/CheckerboardFlat.vue";

defineProps<{
  floor: IFloor;
}>();
</script>

<template>
  <ul class="floor">
    <CheckerboardFlat
      class="floor__item"
      v-for="flat in floor.flats"
      :key="flat.id"
      :flat-id="flat.id"
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
