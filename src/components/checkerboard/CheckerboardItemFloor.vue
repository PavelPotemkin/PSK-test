<script setup lang="ts">
import { IFloor } from "@/interfaces/floor.interface";
import CheckerboardFlat from "@/components/checkerboard/CheckerboardItemFlat.vue";

defineProps<{
  floor: IFloor;
}>();
</script>

<template>
  <ul class="floor">
    <li class="floor__number">
      {{ floor.floor }}
    </li>

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
  margin: 0.5em 0;

  &__number {
    width: 1.5em;
    height: 1.5em;
    margin-right: 0.5em;
    color: darkgrey;
    font-size: 0.75em;
  }
}
</style>
