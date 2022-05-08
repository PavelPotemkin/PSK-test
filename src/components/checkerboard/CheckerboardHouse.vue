<script setup lang="ts">
import { IEntrances } from "@/interfaces/entrances.interface";
import CheckerboardFloorNumbers from "@/components/checkerboard/CheckerboardFloorNumbers.vue";
import CheckerboardEntrance from "@/components/checkerboard/CheckerboardEntrance.vue";

const props = defineProps<{
  entrances: IEntrances;
}>();

const maxFloorCount = Math.max(
  ...props.entrances.map((entrance) => entrance.floors.length)
);
</script>

<template>
  <div class="house">
    <ul class="house__floor-numbers">
      <CheckerboardFloorNumbers :count="maxFloorCount" />
    </ul>

    <div class="house__floors" v-for="entrance in entrances" :key="entrance.id">
      <CheckerboardEntrance :entrance="entrance" />

      <div class="house__bottom">
        <h4 class="body-2 text-primary">
          {{ entrance.title }}
        </h4>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.house {
  display: flex;
  align-items: end;
  gap: 1em;

  &__floor-numbers {
    align-self: start;
  }

  &__floors {
    display: flex;
    flex-direction: column;
    gap: 2em;
  }

  &__bottom {
    white-space: nowrap;
  }
}
</style>
