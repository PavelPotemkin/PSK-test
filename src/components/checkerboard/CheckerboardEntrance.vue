<script setup lang="ts">
import CheckerboardFloor from "@/components/checkerboard/CheckerboardFloor.vue";
import { IEntrance } from "@/interfaces/entrances.interface";

defineProps<{
  entrance: IEntrance;
}>();
</script>

<template>
  <div class="entrance">
    <CheckerboardFloor
      v-for="floor in entrance.floors"
      :key="floor.floor"
      :floor="floor"
    />
  </div>
</template>

<style lang="scss" scoped>
.entrance {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}
</style>
