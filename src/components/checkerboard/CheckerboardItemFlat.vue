<script setup lang="ts">
import { IFlat, IFlatId } from "@/interfaces/flats.interface";
import { useStore } from "@/store";

const store = useStore();
const props = defineProps<{
  flatId: IFlatId;
}>();

const flat: IFlat = store.flats[props.flatId];
</script>

<template>
  <div class="flat">
    <span class="flat__inner">
      {{ flat.plan_type }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.flat {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5em;
  height: 1.5em;
  background-color: darkgrey;
  color: white;

  &__inner {
    font-size: 0.75em;
  }
}
</style>
