<script setup lang="ts">
import CheckerboardCeil from "@/components/checkerboard/CheckerboardCeil.vue";

defineProps<{
  count: number;
}>();
</script>

<template>
  <div class="floor-numbers">
    <CheckerboardCeil
      v-for="i in count"
      :key="i"
      class="floor-numbers__inner text-primary"
    >
      <span class="body-1">{{ i }}</span>
    </CheckerboardCeil>
  </div>
</template>

<style lang="scss">
.floor-numbers {
  display: flex;
  flex-direction: column-reverse;
  align-self: start;
  gap: 0.5em;
}
</style>
