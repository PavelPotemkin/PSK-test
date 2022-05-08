<script setup lang="ts">
import CheckerboardHouse from "@/components/checkerboard/CheckerboardHouse.vue";
import { IGroupedEntrancesAcc } from "@/interfaces/entrances.interface";

defineProps<{
  houses: IGroupedEntrancesAcc;
}>();
</script>

<template>
  <section class="list">
    <CheckerboardHouse
      v-for="house_id of Object.keys(houses)"
      :key="house_id"
      :entrances="houses[house_id]"
    />
  </section>
</template>

<style lang="scss" scoped>
.list {
  display: flex;
  align-items: end;
  gap: 4em;
}
</style>
