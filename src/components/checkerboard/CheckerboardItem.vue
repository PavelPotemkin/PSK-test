<script setup lang="ts">
import CheckerboardFloor from "@/components/checkerboard/CheckerboardItemFloor.vue";
import { IEntrance } from "@/interfaces/entrances.interface";

defineProps<{
  entrance: IEntrance;
}>();
</script>

<template>
  <div>
    123
    <CheckerboardFloor
      v-for="floor in entrance.floors"
      :key="floor.floor"
      :floor="floor"
    />
    321
  </div>
</template>
